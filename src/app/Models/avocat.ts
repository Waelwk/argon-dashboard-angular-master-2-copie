import { Cabinet } from './cabinet';
import { User } from './user';

export interface Avocat extends User {
  specialitee?: string;
  diplome?: string;
    cabinet?:Cabinet;
}
