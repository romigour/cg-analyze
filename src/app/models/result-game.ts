import {Opposant} from "./opposant";

export interface ResultGame {
    idGame: number;
    status: string;
    idxGame: number;
    oppPseudo: string;
    oppRank: string;
    oppElo: string;
    opposants: Array<Opposant>;
    ecartScore: number;
}