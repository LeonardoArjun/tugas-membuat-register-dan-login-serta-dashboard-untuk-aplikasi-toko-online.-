export interface GetMe {
  status: boolean;
  token: string;
  message: string;
  user: User;
}

export interface User {
  id: number;
  nama_user: string;
  email: string;
  role: string;
}
