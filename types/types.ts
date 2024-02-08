export interface User {
  id: string;
  firstName: string;
  email: string;
  password: string;
}

export interface Photo {
  id: string;
  title: string;
  description: string;
  path: string;
  userId: string;
  createdAt: number;
}
