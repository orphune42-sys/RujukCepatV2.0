import React from 'react';

export default function FilterPills({ items, activeItem, onSelect, className = '', activeClassName = 'bg-accent text-white shadow-sm', inactiveClassName = 'bg-white text-gray-600 border border-gray-200', pillClassName = 'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all' }) {
  return (
    <div className={`flex overflow-x-auto gap-2 pb-2 ${className}`}>
      {items.map((item) => {
        const label = typeof item === 'string' ? item : item.label;
        const value = typeof item === 'string' ? item : (item.id || item.value);
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={`${pillClassName} ${activeItem === value ? activeClassName : inactiveClassName}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
