export class GetCognitoUserDto {
  id?: string;
  mfa_setting?: string;
  mfa_methods?: string[];
  enabled?: boolean;
  status?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  attributes?: {
    email?: string;
    sub?: string;
  };
  groups?: (string | undefined)[];
}
