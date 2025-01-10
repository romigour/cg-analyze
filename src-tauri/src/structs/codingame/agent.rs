use super::codingamer::Codingamer;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Agent {
    pub index: i32,
    pub codingamer: Codingamer,
    #[serde(rename = "agentId")]
    pub agent_id: u64,
    pub score: f64,
    pub rank: Option<u64>,
    pub valid: bool,
}