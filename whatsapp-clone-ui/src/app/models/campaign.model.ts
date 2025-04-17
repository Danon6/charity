export interface Campaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  creatorId: string;
  creatorName: string;
  imageUrl?: string;
  active: boolean;
  createdDate: string;
  lastModifiedDate: string;
}
