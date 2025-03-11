import { DossierJuridiqueUpdate } from "./DossierJuridiqueUpdate";

export class RendezVous {
    id: number;
    dateHeure?: Date;
    motif?: string;
    //dossierJuridiqueUpdate?: DossierJuridiqueUpdate; // Optionnel, car il est ignoré dans le JSON
}