export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
  googleID: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface IRegister {
  username: string;
  password: string;
  displayName: string;
  phone: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface Photo {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  title: string;
  image: string | null;
}

export interface PhotoMutation {
  title: string;
  image: File | null;
}

export interface PhotoResponse {
  photoData: {
    _id: string;
    title: string;
    image: string;
  };
  message: string;
}
