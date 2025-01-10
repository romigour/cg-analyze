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
    pub position: i32,
    #[serde(rename = "oppPseudo")]
    pub opp_pseudo: String,
    #[serde(rename = "oppRank")]
    pub opp_rank: String,
    #[serde(rename = "oppElo")]
    pub opp_elo: String,
    pub opposants: Vec<Opposant>,
    #[serde(rename = "ecartScore")]
    pub ecart_score: f64,
}
