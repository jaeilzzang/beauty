export interface UserInputDto {
  email: string;
}

export interface User {
  created_at: string;
  nickname: string;
  name: string;
  email: string;
  updated_at: string;
  refesh_token: string;
  uuid: string;
  user_no: 1;
  email_verify: boolean;
}

export interface UserOutputDto {
  user: User;
}
