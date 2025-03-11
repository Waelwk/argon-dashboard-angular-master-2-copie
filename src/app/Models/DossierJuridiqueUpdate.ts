import { DossierJuridique } from "./ DossierJuridique";
import { RendezVous } from "./RendezVous";

export class DossierJuridiqueUpdate {
    id?: number;
    dossierJuridique?: DossierJuridique; // Vous devrez également définir cette classe
    evaluation?: string;
    demandeDocuments?: boolean;
    rendezVous?: RendezVous; // Vous devrez également définir cette classe
    note?: string;
    dateCreation?: Date;
}