use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Default, Debug, Clone)]
pub enum Status {
    #[default]
    Lost,
    Win,
    Draw,
    Timeout,
    Warning,
}
