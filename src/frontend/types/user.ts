export type DonorLevel = 'bronze' | 'silver' | 'gold';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  cpf: string;
  phone: string;
  avatarUrl: string;
  points: number;
  totalDonated: number;
  totalRedeemed: number;
  level: DonorLevel;
}
