export interface ResetPasswordDTO {
  account: string;
  password: string;
  newPassword: string;
  repeatNewPassword: string;
}
