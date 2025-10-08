"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { AlertTriangle, Battery, PackageCheck } from "lucide-react";

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  total: number;
};

const initialStock: InventoryItem[] = [
  {
    id: 1,
    name: "iPhone 17 Pro Max",
    category: "Smartphone",
    price: 1299,
    stock: 82,
    total: 120,
  },
  {
    id: 2,
    name: "Apple Vision Pro 2",
    category: "AR Headset",
    price: 3499,
    stock: 24,
    total: 100,
  },
  {
    id: 3,
    name: "AirPods Max 2",
    category: "Audio",
    price: 699,
    stock: 63,
    total: 100,
  },
  {
    id: 4,
    name: "MacBook Air M4",
    category: "Laptop",
    price: 1799,
    stock: 48,
    total: 80,
  },
  {
    id: 5,
    name: "Apple Watch S10",
    category: "Wearable",
    price: 599,
    stock: 15,
    total: 100,
  },
  {
    id: 6,
    name: "iPad Pro M4 OLED",
    category: "Tablet",
    price: 1499,
    stock: 92,
    total: 100,
  },
];

export default function InventoryWidget() {
  const [data, setData] = useState<InventoryItem[]>(initialStock);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          const newStock = Math.min(
            item.total,
            Math.max(0, item.stock + delta),
          );
          return { ...item, stock: newStock };
        }),
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mt-10">
      <h2
        className="text-lg font-semibold mb-4 flex items-center gap-2"
        style={{ color: "var(--accent-green)" }}
      >
        <PackageCheck style={{ color: "var(--accent-green)" }} /> Inventory &
        Stock Alerts
      </h2>
      <div className="space-y-4">
        {data.map((product) => {
          const pct = Math.round((product.stock / product.total) * 100);
          const progressColor =
            pct > 60 ? "bg-green-500" : pct > 20 ? "bg-yellow-500" : "bg-red-500";
          const statusIcon =
            pct > 60 ? (
              <Battery className="w-4 h-4 text-green-400" />
            ) : pct > 20 ? (
              <Battery className="w-4 h-4 text-yellow-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400" />
            );

          return (
            <div key={product.id} className="p-4 rounded-xl bg-[rgba(24,24,24,0.75)]">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <div className="text-primary font-medium">
                    {product.name}
                  </div>
                  <div className="text-xs text-secondary">
                    {product.category}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary">
                  {statusIcon}
                  <span>${product.price}</span>
                </div>
              </div>
              <div className="w-full bg-[rgba(48,48,48,0.85)] rounded-full h-2 overflow-hidden">
                <div
                  className={`${progressColor} h-2 transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-secondary mt-1">
                <span>{pct}% in stock</span>
                <span>
                  {product.stock}/{product.total}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
