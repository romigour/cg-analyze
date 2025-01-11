use crate::structs::codingame::agent::Agent;
use crate::structs::codingame::battle::Battle;
use crate::structs::codingame::game::Game;
use crate::structs::codingame::player::Player;
use crate::structs::opposant::Opposant;
use crate::structs::result_game::ResultGame;
use crate::structs::status::Status;
use once_cell::sync::Lazy;
use reqwest::Client;
use serde_json::json;
use std::error::Error;
use std::sync::Mutex;
use tauri::command;

pub static RESULT_GAME: Lazy<Mutex<Vec<ResultGame>>> = Lazy::new(|| Mutex::new(Vec::new()));
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
    let url =
        "https://www.codingame.com/services/gamesPlayersRanking/findLastBattlesByTestSessionHandle";
    let body = json!([session_handle, null]);
    let client = Client::new();
    let response = client.post(url).json(&body).send().await?;

    if response.status().is_success() {
        let battles: Vec<Battle> = response.json().await?;

        let mut updated_battles = Vec::new();

        let limit = 15;
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

        let mut battles: Vec<Battle> = Vec::new();

        let size_battles = updated_battles.len();

        for (i, battle) in updated_battles.iter().enumerate() {
            let idx = size_battles - i;

            battles.push(Battle {
                game_id: battle.game_id,
                players: battle.players.clone(),
                done: battle.done,
                game: battle.game.clone(),
                idx_game: Option::from(idx as i32),
            });
        }

        let mut player = CURRENT_PLAYER.lock().unwrap();
        let my_player = battles
            .first()
            .map(|battle| {
                battle
                    .players
                    .clone()
                    .into_iter()
                    .find(|player| player.test_session_handle == session_handle)
            })
            .flatten();

        *player = my_player.clone();

        treatment(battles, my_player.unwrap());

        println!("Battles loaded.");
        Ok(())
    } else {
        Err(format!("Erreur HTTP : {}", response.status()).into())
    }
}

fn treatment(battles: Vec<Battle>, my_player: Player) {
    let mut results_game = Vec::new();

    battles
        .iter()
        .filter(|battle| battle.game.is_some())
        .for_each(|battle| {
            let opposants: Vec<Opposant> = battle
                .clone()
                .game
                .unwrap()
                .agents
                .iter()
                .filter(|agent| agent.codingamer.user_id != my_player.user_id)
                .map(|agent| Opposant {
                    pseudo: agent.clone().codingamer.pseudo,
                    rank: if agent.clone().rank.is_some() {
                        agent.clone().rank.unwrap() as i32
                    } else {
                        -1
                    },
                    score: agent.clone().score,
                })
                .collect();
            let opt_agent: Option<Agent> = battle
                .clone()
                .game
                .unwrap()
                .agents
                .iter()
                .filter(|agent| agent.codingamer.user_id == my_player.user_id)
                .map(|agent| agent.clone())
                .next();

            let status_battle: Status;

            let position = battle
                .players
                .iter()
                .filter(|player| player.user_id == my_player.user_id)
                .map(|player| player.position)
                .next();
            if position.is_none() || position.unwrap() != 0 {
                if battle.game.is_some()
                    && battle
                        .clone()
                        .game
                        .unwrap()
                        .scores
                        .iter()
                        .any(|&score| score == -1.0)
                {
                    status_battle = Status::Timeout;
                } else {
                    status_battle = Status::Lost;
                }
            } else {
                status_battle = Status::Win;
            }

            let warning_battle = opt_agent.is_some()
                && battle.game.as_ref().unwrap().frames.iter().any(|frame| {
                    frame.agent_id == opt_agent.clone().unwrap().index
                        && frame.summary.is_some()
                        && frame
                            .summary
                            .as_ref()
                            .unwrap()
                            .contains(&format!("¤RED¤${}", opt_agent.clone().unwrap().index))
                });

            let scores = battle.game.clone().unwrap().scores;
            let ecart_score = (scores[0] - scores[1]).abs();

            let stderr_game: Vec<String> = battle
                .game
                .as_ref()
                .unwrap()
                .frames
                .iter()
                .filter(|frame| frame.agent_id == opt_agent.clone().unwrap().index)
                .filter(|frame| frame.stderr.is_some())
                .map(|frame| frame.stderr.as_ref().unwrap())
                .cloned()
                .collect();

            let stdout_game: Vec<String> = battle
                .game
                .as_ref()
                .unwrap()
                .frames
                .iter()
                .filter(|frame| frame.agent_id == opt_agent.clone().unwrap().index)
                .filter(|frame| frame.stdout.is_some())
                .map(|frame| frame.stdout.as_ref().unwrap())
                .cloned()
                .collect();

            let result_game = ResultGame {
                id_game: battle.game_id,
                idx_game: battle.idx_game.unwrap(),
                status: status_battle,
                warning: warning_battle,
                position: position.unwrap() + 1,
                opposants: opposants.clone(),
                ecart_score,
                stderr: stderr_game.clone(),
                stdout: stdout_game.clone(),
            };
            results_game.push(result_game);
        });

    let mut result_game_save = RESULT_GAME.lock().unwrap();
    result_game_save.clear();

    *result_game_save = results_game
}

async fn fetch_game_data(game_id: u32) -> Result<Game, Box<dyn Error>> {
    let url = "https://www.codingame.com/services/gameResultRemoteService/findByGameId";
    let body = json!([game_id.to_string().as_str(), null]);

    let client = Client::new();
    let response = client.post(url).json(&body).send().await?;

    if response.status().is_success() {
        let game: Game = response.json().await?;
        Ok(game)
    } else {
        Err(Box::new(std::io::Error::new(
            std::io::ErrorKind::Other,
            "Failed to fetch game data",
        )))
    }
}
