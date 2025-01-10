use crate::structs::codingame::game::Game;
use crate::structs::codingame::player::Player;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Battle {
    pub players: Vec<Player>,
    #[serde(rename = "gameId")]
    pub game_id: u32,
    pub done: bool,
    pub game: Option<Game>,
    #[serde(rename = "idxGame")]
    pub idx_game: Option<i32>,
    #[serde(rename = "ecartScore")]
    pub ecart_score: Option<f64>,
}
