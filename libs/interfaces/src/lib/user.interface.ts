export enum UserRole {
  TEACHER,
  STUDENT,
}

export enum PurchaseState {
  STARTED = 'started',
  WAITING_FOR_PAYMENT = 'waitingForPayment',
  PURCHASED = 'purchased',
  CANCELLED = 'cancelled',
}

export interface IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses?: IUserCourses[];
}

export interface IUserCourses {
  courseId: string;
  purchaseState: PurchaseState;
}
