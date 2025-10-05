export type Plan = {
    id: string;
    name: string;
    price: number;
    billingCycle: 'monthly' | 'yearly';
    features: string[];
    popular?: boolean;
    current?: boolean;
  }
  
  export type UserSubscription = {
    plan: string;
    status: 'trial' | 'active' | 'cancelled' | 'expired';
    currentPeriodEnd: string;
    nextBillingDate: string;
  }
  