use crate::commands::{BATTLES, CURRENT_PLAYER};
use crate::structs::information::Information;
use tauri::command;

#[command]
pub fn get_information() -> Information {
    println!("get_information");
    let battles = BATTLES.lock().unwrap().clone();
    let player = CURRENT_PLAYER.lock().unwrap().clone().unwrap();


    let mut information = Information::default();
    information.pseudo = player.nickname.clone();
    information.total_game = battles.len();

    println!("player {:?}", player);
    information
}

