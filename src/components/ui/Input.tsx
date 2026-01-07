import React, { forwardRef } from 'react';

// Actually, nextjs starter doesn't usually come with cn. I'll make it self-contained or create the util.
// Let's create the util first or inline it. Inlining is safer for now to avoid extra files if not needed, but cleaner is better.
// I'll stick to simple string concatenation for now as I can't check for lib/utils existence easily in one go without potential error.
// Wait, I can try to see if I can create it. But simpler:
// just use template strings.

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <input
          ref={ref}
          className={`
            flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
            border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-950
            text-gray-900 dark:text-gray-100
            focus:ring-blue-500 dark:focus:ring-blue-400
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className || ''}
          `}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 font-medium">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
