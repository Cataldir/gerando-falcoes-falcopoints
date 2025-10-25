import { IconType } from 'react-icons';

export interface Badge {
  id: string;
  name: string;
  threshold: number;
  description: string;
  icon: IconType;
  color: string;
}
