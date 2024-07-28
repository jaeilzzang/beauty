// interface AppMetadata {
//   provider: string;
//   providers: string[];
// }

import { User } from "@supabase/supabase-js";

// interface UserMetadata {
//   avatar_url: string;
//   email: string;
//   email_verified: boolean;
//   full_name: string;
//   iss: string;
//   name: string;
//   phone_verified: boolean;
//   picture: string;
//   provider_id: string;
//   sub: string;
// }

// interface IdentityData {
//   [key: string]: any;
// }

// interface Identity {
//   identity_id: string;
//   id: string;
//   user_id: string;
//   identity_data: IdentityData;
//   provider: string;
//   last_sign_in_at: string;
//   created_at: string;
//   updated_at: string;
//   email: string;
// }

// interface User {
//   id: string;
//   aud: string;
//   role: string;
//   email: string;
//   email_confirmed_at: string;
//   phone: string;
//   confirmed_at: string;
//   last_sign_in_at: string;
//   app_metadata: AppMetadata;
//   user_metadata: UserMetadata;
//   identities: Identity[];
//   created_at: string;
//   updated_at: string;
//   is_anonymous: boolean;
// }

export interface UserInputDto {
  email: string;
}

// export interface User {
//   created_at: string;
//   nickname: string;
//   name: string;
//   email: string;
//   updated_at: string;
//   refesh_token: string;
//   uuid: string;
//   user_no: 1;
//   email_verify: boolean;
// }

export interface UserOutputDto {
  user: User;
}
