"use client";

import Image from "next/image";
import React from "react";
import { Smartphone, Tablet, Watch } from "lucide-react";

const products = [
  {
    name: "Apple Watch S9",
    category: "Smartwatch",
    price: 799,
    img: "/products/watch.png",
    stock: 320,
    trend: "+8.5%",
    color: "emerald",
    icon: Watch,
  },
  {
    name: "iPhone 15 Pro Max",
    category: "Smartphone",
    price: 1099,
    img: "/products/iphone.png",
    stock: 524,
    trend: "+12.3%",
    color: "sky",
    icon: Smartphone,
  },
  {
    name: "iPad Air (5th Gen)",
    category: "Tablet",
    price: 899,
    img: "/products/ipad.png",
    stock: 480,
    trend: "+6.1%",
    color: "violet",
    icon: Tablet,
  },
] as const;

const colorPalette = {
  emerald: {
    price: "var(--accent-green)",
    badgeBg: "rgba(34,201,151,0.12)",
    badgeBorder: "rgba(34,201,151,0.3)",
    badgeText: "var(--accent-green)",
    glow: "0 0 12px rgba(34,201,151,0.25)",
    iconBg: "rgba(34,201,151,0.12)",
    iconBorder: "rgba(34,201,151,0.35)",
    iconColor: "var(--accent-green)",
  },
  sky: {
    price: "#60a5fa",
    badgeBg: "rgba(59,130,246,0.12)",
    badgeBorder: "rgba(59,130,246,0.3)",
    badgeText: "#93c5fd",
    glow: "0 0 12px rgba(59,130,246,0.25)",
    iconBg: "rgba(59,130,246,0.12)",
    iconBorder: "rgba(59,130,246,0.35)",
    iconColor: "#60a5fa",
  },
  violet: {
    price: "#a78bfa",
    badgeBg: "rgba(167,139,250,0.12)",
    badgeBorder: "rgba(167,139,250,0.3)",
    badgeText: "#c4b5fd",
    glow: "0 0 12px rgba(167,139,250,0.25)",
    iconBg: "rgba(167,139,250,0.12)",
    iconBorder: "rgba(167,139,250,0.35)",
    iconColor: "#a78bfa",
  },
} as const;

export default function TopProducts() {
  return (
    <div className="fade-in">
      <h2 className="text-2xl font-bold text-white shadow-[0_0_5px_rgba(16,185,129,0.5)] mb-4">
        Top Products
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => {
          const palette = colorPalette[product.color];
          const Icon = product.icon;
          return (
            <div
              key={product.name}
              className="group glass gradient-border p-4 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-200"
              style={{ boxShadow: "0 0 18px rgba(34,201,151,0.2)" }}
            >
              <div
                className="inline-flex items-center justify-center rounded-xl border p-2 mb-3"
                style={{
                  backgroundColor: palette.iconBg,
                  borderColor: palette.iconBorder,
                  boxShadow: palette.glow,
                }}
              >
                <Icon className="w-8 h-8" style={{ color: palette.iconColor }} />
              </div>
              <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover opacity-90 transition duration-300 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-lg font-semibold text-primary">
                {product.name}
              </h3>
              <p className="text-xs text-secondary uppercase">
                {product.category}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <span
                  className="font-medium"
                  style={{ color: palette.price }}
                >
                  ${product.price}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: palette.badgeBg,
                    borderColor: palette.badgeBorder,
                    color: palette.badgeText,
                    boxShadow: palette.glow,
                  }}
                >
                  {product.trend}
                </span>
              </div>
              <p className="mt-1 text-xs text-secondary">
                {product.stock} in stock
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
