use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Information {
    pub pseudo: String,
    pub total_game: u32,
    pub total_win: u32,
    pub total_draw: u32,
    pub total_lost: u32,
    pub total_timeout: u32,
}
