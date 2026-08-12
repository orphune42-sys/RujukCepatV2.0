import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export function Card({ className, children, hover = false, ...props }) {
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover ? { whileHover: { y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' } } : {};
  
  return (
    <Component
      className={cn(
        "bg-white dark:bg-[#15241b] rounded-xl border border-border dark:border-border-dark shadow-sm overflow-hidden",
        hover && "transition-shadow duration-300",
        className
      )}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("px-6 py-4 border-b border-border dark:border-border-dark", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-text dark:text-text-dark", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn("px-6 py-4 bg-gray-50/50 dark:bg-black/20 border-t border-border dark:border-border-dark flex items-center", className)} {...props}>
      {children}
    </div>
  );
}
