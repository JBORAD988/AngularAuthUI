export interface UserModel{
  isEdit: boolean;
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const defaultUserModel: UserModel = {
  isEdit: true,
  id: '',
  username:'',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
};
