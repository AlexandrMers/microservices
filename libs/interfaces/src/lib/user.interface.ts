export enum UserRole {
  TEACHER,
  STUDENT,
}

export interface IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
