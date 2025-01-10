use tauri::command;
use crate::commands::{BATTLES, SESSION_HANDLE};

#[command]
pub fn get_information()  {
    println!("get_information()");
    let battles = BATTLES.lock().unwrap();
    let session_handle = SESSION_HANDLE.lock().unwrap();
}

