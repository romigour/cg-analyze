use crate::structs::codingame::battle::Battle;
use crate::structs::codingame::game::Game;
use crate::structs::codingame::player::Player;
use once_cell::sync::Lazy;
use reqwest::Client;
use serde_json::json;
use std::error::Error;
use std::sync::Mutex;
use tauri::command;

pub static BATTLES: Lazy<Mutex<Vec<Battle>>> = Lazy::new(|| Mutex::new(Vec::new()));
pub static CURRENT_PLAYER: Lazy<Mutex<Option<Player>>> = Lazy::new(|| Mutex::new(None));

#[command]
pub fn load_history(session_handle: &str) -> Result<(), String> {
    tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(fetch_battles(session_handle))
        .map_err(|e| e.to_string())
}

async fn fetch_battles(session_handle: &str) -> Result<(), Box<dyn Error>> {
    println!("Fetching battles...");
    let url = "https://www.codingame.com/services/gamesPlayersRanking/findLastBattlesByTestSessionHandle";
    let body = json!([session_handle, null]);
    let client = Client::new();
    let response = client.post(url).json(&body).send().await?;

    if response.status().is_success() {
        let battles: Vec<Battle> = response.json().await?;

        let mut updated_battles = Vec::new();

        let limit = 5;
        let mut count = 0;

        for mut battle in battles {
            if count >= limit {
                break; // Sortir de la boucle si on a atteint la limite
            }
            count += 1;
            if let Ok(game) = fetch_game_data(battle.game_id).await {
                battle.game = Some(game);
            } else {
                println!("Aucune donnée pour le game_id {}", battle.game_id);
            }
            updated_battles.push(battle);
        }

        let mut battles = BATTLES.lock().unwrap();
        battles.clear();

        for battle in updated_battles.iter() {
            battles.push(Battle {
                game_id: battle.game_id,
                players: battle.players.clone(),
                done: battle.done,
                game: battle.game.clone(),
                ecart_score: battle.ecart_score,
            });
        }

        let mut player = CURRENT_PLAYER.lock().unwrap();
        *player = battles
            .first()
            .map(|battle| {
                battle.players.clone()
                    .into_iter()
                    .find(|player| player.test_session_handle == session_handle)
            })
            .flatten();

        println!("Battles loaded.");
        Ok(())
    } else {
        Err(format!("Erreur HTTP : {}", response.status()).into())
    }
}

async fn fetch_game_data(game_id: u64) -> Result<Game, Box<dyn Error>> {
    let url = "https://www.codingame.com/services/gameResultRemoteService/findByGameId";
    let body = json!([game_id.to_string().as_str(), null]);

    let client = Client::new();
    let response = client.post(url).json(&body).send().await?;

    if response.status().is_success() {
        let game: Game = response.json().await?;
        Ok(game)
    } else {
        Err(Box::new(std::io::Error::new(std::io::ErrorKind::Other, "Failed to fetch game data")))
    }
}

