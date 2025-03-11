import { Manager } from "./manager";

export interface Cabinet {
  id?: number;
  adresse?: string;
  numTel?: string;
  emailC?: string;
  dateCreation?: string;
  nom?: string;
  manager?: Manager;
}