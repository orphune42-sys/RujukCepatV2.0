import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Select({ value, onChange, options, placeholder = 'Pilih opsi', icon, className, buttonClassName, ariaLabel, required = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button type="button" aria-label={ariaLabel || placeholder} aria-expanded={isOpen} aria-required={required} onClick={() => setIsOpen((open) => !open)} className={cn('flex h-11 w-full items-center rounded-lg border border-border bg-background px-4 text-left text-sm text-text shadow-sm transition-all hover:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary   ', icon && 'pl-12', buttonClassName)}>
        {icon && <span className="pointer-events-none absolute left-4 text-muted ">{icon}</span>}
        <span className={cn('flex-1 truncate', !selectedOption && 'text-muted')}>{selectedOption?.label || placeholder}</span>
        <ChevronDown className={cn('h-4 w-4 text-muted transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div role="listbox" className="absolute z-[70] mt-2 max-h-56 w-full overflow-y-auto overscroll-contain rounded-xl border border-border bg-white p-1.5 shadow-xl shadow-black/10">
          {options.map((option) => (
            <button key={option.value} type="button" role="option" aria-selected={option.value === value} onClick={() => { onChange(option.value); setIsOpen(false); }} className={cn('flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-text transition-colors hover:bg-secondary  ', option.value === value && 'bg-secondary text-accent  ')}>
              <span className="flex-1">{option.label}</span>{option.value === value && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
