use crate::commands::{CURRENT_PLAYER, RESULT_GAME};
use crate::structs::information::Information;
use crate::structs::status::Status;
use tauri::command;

#[command]
pub fn get_information() -> Information {
    println!("get_information");
    let result_game = RESULT_GAME.lock().unwrap().clone();
    let player = CURRENT_PLAYER.lock().unwrap().clone().unwrap();

    let mut information = Information::default();
    information.pseudo = player.clone().nickname.unwrap().clone();
    information.total_game = result_game.len();
    information.total_win = result_game
        .iter()
        .filter(|result| result.status == Status::Win)
        .count();
    information.total_lost = result_game
        .iter()
        .filter(|result| result.status == Status::Lost)
        .count();
    information.total_draw = result_game
        .iter()
        .filter(|result| result.status == Status::Draw)
        .count();
    information.total_timeout = result_game
        .iter()
        .filter(|result| result.status == Status::Timeout)
        .count();

    information
}
