export const mockPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "$29/mo",
    features: ["Up to 100 clients", "Email support", "Basic analytics"],
    accent: "#00FF88",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$99/mo",
    features: [
      "Unlimited clients",
      "Priority support",
      "Advanced analytics",
      "AI insights",
    ],
    accent: "#3B82F6",
  },
] as const;
