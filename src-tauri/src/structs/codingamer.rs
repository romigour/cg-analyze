use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Codingamer {
    #[serde(rename = "userId")]
    pub user_id: u64,
    pub pseudo: String,
    pub enable: bool,
}