use crate::structs::opposant::Opposant;
use crate::structs::status::Status;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Default, Debug, Clone)]
pub struct ResultGame {
    #[serde(rename = "idGame")]
    pub id_game: u32,
    #[serde(rename = "idxGame")]
    pub idx_game: i32,
    pub status: Status,
    pub warning: bool,
    pub position: i32,
    pub opposants: Vec<Opposant>,
    #[serde(rename = "ecartScore")]
    pub ecart_score: f64,
    pub stderr: Vec<String>,
    pub stdout: Vec<String>,
}
