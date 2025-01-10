use crate::structs::codingame::agent::Agent;
use crate::structs::codingame::frame::Frame;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Game {
    #[serde(rename = "gameId")]
    pub game_id: u64,
    pub agents: Vec<Agent>,
    pub frames: Vec<Frame>,
    pub scores: Vec<f64>,
    pub ranks: Vec<i32>,
}
