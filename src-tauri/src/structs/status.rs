use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Default, Debug, Clone, PartialEq)]
pub enum Status {
    #[default]
    Lost,
    Win,
    Draw,
    Timeout,
    Warning,
    All,
}
