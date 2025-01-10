mod commands;
mod structs;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::greet,
            commands::load_history,
            commands::search,
            commands::get_information,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
