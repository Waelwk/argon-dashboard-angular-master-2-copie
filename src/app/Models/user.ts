export interface User {
  id?: number; // Peut être optionnel
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  
  role?: Role;
  enabled?: boolean;
  archivee?:boolean;
}

export enum Role {
  ADMIN = 'ADMIN',
  AVOCAT = 'AVOCAT',
  ASSISTANT = 'ASSISTANT',
  CLIENT = 'CLIENT',
  MANAGER = 'MANAGER'
}
