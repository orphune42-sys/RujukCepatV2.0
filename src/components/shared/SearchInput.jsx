import React from 'react';
import { Search } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder = 'Cari...', className = '', iconSize = 20 }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={iconSize} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-border bg-[#f8faf9] pl-11 pr-4 text-sm text-text placeholder:text-muted/50 transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/60"
      />
    </div>
  );
}
