export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  avatar: string;
  displayName: string;
  googleID?: string;
}
