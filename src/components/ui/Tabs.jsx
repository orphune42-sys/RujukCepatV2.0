import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export function Tabs({ defaultValue, className, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ className, activeTab, setActiveTab, children }) {
  return (
    <div className={cn("inline-flex h-11 items-center justify-center rounded-lg bg-secondary/50 dark:bg-black/20 p-1 text-muted", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
}

export function TabsTrigger({ value, className, activeTab, setActiveTab, children }) {
  const isActive = activeTab === value;
  
  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive 
          ? "bg-white dark:bg-[#15241b] text-text dark:text-text-dark shadow-sm" 
          : "hover:bg-white/50 hover:text-text dark:hover:text-text-dark",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, activeTab, children }) {
  if (activeTab !== value) return null;
  
  return (
    <div
      className={cn(
        "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </div>
  );
}
