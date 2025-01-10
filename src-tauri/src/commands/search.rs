use crate::commands::{BATTLES, CURRENT_PLAYER};
use crate::structs::codingame::player::Player;
use crate::structs::opposant::Opposant;
use crate::structs::result_game::ResultGame;
use crate::structs::status::Status;
use tauri::command;

#[command]
pub fn search() -> Vec<ResultGame> {
    let battles = BATTLES.lock().unwrap().clone();
    let opt_player = CURRENT_PLAYER.lock().unwrap().clone();
    let my_player = match opt_player {
        Some(p) => p,
        None => Player::default(),
    };
    let mut results_game = Vec::new();
    battles.iter().for_each(|battle| {
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

        println!("opposants {:?}", opposants);
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

        let result_game = ResultGame {
            id_game: battle.game_id,
            idx_game: battle.idx_game.unwrap(),
            status: status_battle,
            position: position.unwrap() + 1,
            opp_pseudo: "".to_string(),
            opp_rank: "".to_string(),
            opp_elo: "".to_string(),
            opposants: opposants.clone(),
            ecart_score: battle.ecart_score.unwrap(),
        };
        results_game.push(result_game);
    });

    results_game
}
