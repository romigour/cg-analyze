use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Default, Debug, Clone)]
pub struct Opposant {
    pub pseudo: String,
    pub rank: i32,
    pub score: f64,
}
