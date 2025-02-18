import { Cabinet } from "./cabinet";
import { User } from "./user";




export interface Manager extends User {
  cabinet: Cabinet;
}
