import { Avocat } from "./avocat";
import { Cabinet } from "./cabinet";
import { Client } from "./client";

export interface DossierJuridique {
    id?: number;
    emailClient?: string;
    reference?: string;
    cabinet?: Cabinet;  // Assuming Cabinet is another model you have
    titre?: string;
    description?: string;
    type?: string;
    statut?: string;
    priorite?: string;
    categorie?: string;
    dateCreation?: string;  // Use ISO date string format for LocalDate
    dateCloture?: string | null;  // This can be null if not set
    avocat?: Avocat;  // Assuming Avocat is another model you have
   // updates: DossierJuridiqueUpdate[];  // Assuming DossierJuridiqueUpdate is another model you have
    client?: Client | null;  // Can be null if not set
    codeAcces?: string;
  }