/*
 * Simple card container for surface content.
 */
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => {
    const baseClasses =
      "glass p-6";

    const merged = className ? `${baseClasses} ${className}` : baseClasses;

    return <div ref={ref} className={merged} {...props} />;
  },
);

Card.displayName = "Card";

export default Card;
