use crate::commands::BATTLES;
use crate::structs::codingame::battle::Battle;
use tauri::command;

#[command]
pub fn search() -> Vec<Battle> {
    let battles = BATTLES.lock().unwrap();
    println!("search {:?}", battles.len());
    battles.clone()
}
