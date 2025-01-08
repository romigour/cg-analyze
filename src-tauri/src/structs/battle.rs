use crate::structs::game::Game;
use crate::structs::player::Player;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Battle {
    pub players: Vec<Player>,
    #[serde(rename = "gameId")]
    pub game_id: u64,
    pub done: bool,
    pub game: Option<Game>,
    #[serde(rename = "ecartScore")]
    pub ecart_score: Option<f64>,
}