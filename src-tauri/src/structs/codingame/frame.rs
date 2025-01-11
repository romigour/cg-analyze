use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Frame {
    #[serde(rename = "gameInformation")]
    pub game_information: Option<String>,
    pub stdout: Option<String>,
    pub stderr: Option<String>,
    pub summary: Option<String>,
    #[serde(rename = "agentId")]
    pub agent_id: i32,
}
