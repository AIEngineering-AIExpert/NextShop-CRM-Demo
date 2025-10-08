/*
 * Reusable primary button styled with the project brand color.
 */
"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", style, ...props }, ref) => {
    const baseClasses =
      "inline-flex h-10 items-center justify-center rounded-xl glass text-sm font-medium px-4 py-2 text-primary transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-green)] disabled:cursor-not-allowed disabled:opacity-60";

    const merged = className ? `${baseClasses} ${className}` : baseClasses;

    const mergedStyle = {
      backgroundColor: "rgba(34,201,151,0.16)",
      border: "1px solid rgba(34,201,151,0.28)",
      boxShadow: "0 0 12px rgba(34,201,151,0.22)",
      ...style,
    };

    return <button ref={ref} className={merged} style={mergedStyle} {...props} />;
  },
);

Button.displayName = "Button";

export default Button;
