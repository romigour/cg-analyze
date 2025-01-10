use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Default, Debug, Clone)]
pub struct Information {
    pub pseudo: String,
    #[serde(rename = "totalGame")]
    pub total_game: usize,
    #[serde(rename = "totalWin")]
    pub total_win: usize,
    #[serde(rename = "totalDraw")]
    pub total_draw: usize,
    #[serde(rename = "totalLost")]
    pub total_lost: usize,
    #[serde(rename = "totalTimeout")]
    pub total_timeout: usize,
}
