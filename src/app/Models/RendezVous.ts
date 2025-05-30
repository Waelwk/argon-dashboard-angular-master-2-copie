import { Avocat } from "./avocat";
import { Client } from "./client";
import { DossierJuridique } from "./DossierJuridique";
import { DossierJuridiqueUpdate } from "./DossierJuridiqueUpdate";
import { StatutRendezVous } from "./StatutRendezVous";
export interface RendezVous {
    id: number;
    dateHeure: Date;
    motif: string;
    statut?: StatutRendezVous;
    demandeParClient: boolean;
    avocat?: Avocat;
    client?: Client;
    demandePar?:DemandePar;
    dossierJuridiqueUpdate?: DossierJuridiqueUpdate;
DossierJuridique?:DossierJuridique;
  }
  export enum DemandePar{
    CLIENT,
	    AVOCAT,
	    DOSSIER_JURIDIQUE
  }
  