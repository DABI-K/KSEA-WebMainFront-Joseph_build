export interface Membership {
  id: string;
  email: string;
  type: string;
  subscriptionId?: string;
  customerId?: string;
  subscriptionStatus?: string;
  expirationDate?: Date;
  paymentHistory?: PaymentHistoryItem[];
  lifetimeDate?: Date;
  numberOfPayments?: number;
  schoolInfo?: SchoolInfo;
}

export interface PaymentHistoryItem {
  date: Date;
  action: string;
  amounts: number;
  description: string;
}

export interface SchoolInfo {
  type: string;
  name: string;
}
