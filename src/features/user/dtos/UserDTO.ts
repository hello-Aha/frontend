export interface UserDTO {
  id: string;
  displayName: string;
  email: string;
  isActive: boolean;
  signInCount: number;
  lastSessionAt: string;
  createdAt: string;
  googleUserId: string | null;
  facebookUserId: string | null;
}
