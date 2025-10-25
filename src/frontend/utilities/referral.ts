const BASE_URL = 'https://gerandofalcoes.portaldoadoor.org';

export const generateReferralLink = (username: string): string => {
  const token = Math.random().toString(36).slice(2, 10);
  return `${BASE_URL}/convida?ref=${username}&token=${token}`;
};
