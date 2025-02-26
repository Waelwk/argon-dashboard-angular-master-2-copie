import { Cabinet } from './cabinet';
import { User } from './user';

export interface Assistant extends User {
  archivee: boolean;
  domaine: string;
  cabinet:Cabinet;
}
