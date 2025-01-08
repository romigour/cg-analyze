import {Player} from "./player";
import {Game} from "./game";

export interface Battle {
    players: Array<Player>;
    gameId: number;
    done: boolean;
    game?: Game;
    ecartScore?: number;
}