import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

const baseFieldClasses =
  'w-full rounded-[var(--radius-control)] border border-line bg-surface px-3 py-2 text-sm text-text placeholder:text-muted/70 outline-none transition-colors focus:border-accent-500 dark:border-line-dark dark:bg-surface-dark dark:text-text-dark';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(baseFieldClasses, error && 'border-signal-red focus:border-signal-red', className)}
      {...props}
    />
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, error, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={cn(baseFieldClasses, 'min-h-24 resize-none', error && 'border-signal-red focus:border-signal-red', className)}
      {...props}
    />
  );
});

interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, error, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-[13px] font-medium text-text dark:text-text-dark">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-[12px] text-signal-red">{error}</p>
      ) : hint ? (
        <p className="text-[12px] text-muted dark:text-muted-dark">{hint}</p>
      ) : null}
    </div>
  );
}
