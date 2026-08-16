import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: "bg-gray-100 text-gray-800  ",
    primary: "bg-primary/20 text-[#2a5a3d]  ",
    success: "bg-green-100 text-green-800  ",
    warning: "bg-yellow-100 text-yellow-800  ",
    danger: "bg-red-100 text-red-800  ",
    info: "bg-blue-100 text-blue-800  ",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors border border-transparent",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
