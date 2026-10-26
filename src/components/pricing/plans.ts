export type Plan = {
  name: string;
  price: string;
  description: string;
  featured?: boolean;
  features: string[];
};

export type PricingMetric = {
  label: string;
  note?: string;
  values: string[];
};

export const PLANS: Plan[] = [
  {
    name: "Free",
    price: "0",
    description: "For prototypes, experiments, and learning the platform.",
    features: ["1 project", "500 MB PostgreSQL", "1,000 monthly active users"],
  },
  {
    name: "Starter",
    price: "5",
    description: "For a small app with room to find its footing.",
    features: ["1 project", "1 GB PostgreSQL", "5,000 monthly active users"],
  },
  {
    name: "Pro",
    price: "19",
    description: "For products becoming part of people's daily work.",
    featured: true,
    features: ["3 projects", "5 GB PostgreSQL", "25,000 monthly active users"],
  },
  {
    name: "Business",
    price: "79",
    description: "For teams running production systems at a larger scale.",
    features: ["10 projects", "25 GB PostgreSQL", "100,000 monthly active users"],
  },
  {
    name: "Scale",
    price: "299",
    description: "For high-volume products with serious operational needs.",
    features: ["25 projects", "100 GB PostgreSQL", "500,000 monthly active users"],
  },
];

export const PRICING_METRICS: PricingMetric[] = [
  { label: "Projects", values: ["1", "1", "3", "10", "25"] },
  { label: "PostgreSQL storage", values: ["500 MB", "1 GB", "5 GB", "25 GB", "100 GB"] },
  { label: "Monthly active users", values: ["1,000", "5,000", "25,000", "100,000", "500,000"] },
  { label: "API requests / month", values: ["100K", "500K", "2M", "10M", "50M"] },
  { label: "Object storage", values: ["1 GB", "5 GB", "20 GB", "100 GB", "500 GB"] },
  { label: "Bandwidth / month", values: ["2 GB", "10 GB", "50 GB", "250 GB", "1 TB"] },
  { label: "Emails sent / month", note: "Transactional and product email.", values: ["500", "2,000", "10,000", "50,000", "200,000"] },
  { label: "Storage buckets", values: ["3", "10", "25", "100", "500"] },
  { label: "Scheduled tasks", values: ["3", "15", "50", "250", "1,000"] },
  { label: "Inbound webhooks", values: ["5", "20", "100", "500", "2,000"] },
  { label: "Outbound webhooks", values: ["5", "20", "100", "500", "2,000"] },
  { label: "Flow runs / month", values: ["5K", "50K", "250K", "1M", "5M"] },
  { label: "User API keys / user", values: ["5", "10", "25", "50", "100"] },
  { label: "Realtime concurrent connections", values: ["100", "500", "2,500", "10,000", "50,000"] },
  { label: "Realtime messages / month", values: ["250K", "2M", "10M", "50M", "250M"] },
  { label: "Request log history", values: ["1 day", "3 days", "7 days", "30 days", "90 days"] },
  { label: "Flow run history", values: ["3 days", "7 days", "30 days", "90 days", "180 days"] },
  { label: "Sign-in history", values: ["7 days", "30 days", "90 days", "180 days", "365 days"] },
  { label: "Audit log history", values: ["7 days", "30 days", "90 days", "365 days", "730 days"] },
];
