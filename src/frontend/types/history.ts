export interface PointsHistoryItem {
  id: string;
  action: string;
  date: string;
  points: number;
  type: 'earn' | 'redeem';
}
