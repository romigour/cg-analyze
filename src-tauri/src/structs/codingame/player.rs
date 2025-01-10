use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Default, Debug, Clone)]
pub struct Player {
    #[serde(rename = "playerAgentId")]
    pub player_agent_id: u64,
    pub position: i32,
    #[serde(rename = "userId")]
    pub user_id: u64,
    pub nickname: String,
    #[serde(rename = "publicHandle")]
    pub public_handle: String,
    pub avatar: Option<u64>,
    #[serde(rename = "testSessionHandle")]
    pub test_session_handle: String,
    #[serde(rename = "submissionId")]
    pub submission_id: u64,
}
