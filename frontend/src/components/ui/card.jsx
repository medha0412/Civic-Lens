import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-lg border bg-muted text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
