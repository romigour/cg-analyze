#[tauri::command]
pub fn load_history_battles(session_handle: &str) -> String {
    format!("loadHistoryBattles, {}! ", session_handle)
}

