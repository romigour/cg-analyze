use crate::commands::RESULT_GAME;
use crate::structs::result_game::ResultGame;
use crate::structs::status::Status;
use tauri::command;

#[command]
pub fn search(status: Status, search_term: String) -> Vec<ResultGame> {
    println!(
        "Searching for results with status {:?} et search_term {:?}",
        status, search_term
    );
    let result_game = RESULT_GAME.lock().unwrap().clone();

    let mut game = result_game.clone();

    if !search_term.is_empty() {
        game = game
            .iter()
            .filter(|result| {
                result.stdout.iter().any(|s| s.contains(&search_term))
                    || result.stderr.iter().any(|s| s.contains(&search_term))
            })
            .cloned()
            .collect();
    }

    if status == Status::All {
        game
    } else if status == Status::Warning {
        game.iter()
            .filter(|result| result.warning)
            .cloned()
            .collect()
    } else {
        game.iter()
            .filter(|result| result.status == status)
            .cloned()
            .collect()
    }
}
