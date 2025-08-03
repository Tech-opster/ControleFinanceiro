export interface CreateUserDTO {
  name: string;
  email: string;
  firebaseUid: string;
}

// types/IUser.ts
export type UpdateUserDTO = Partial<CreateUserDTO>;