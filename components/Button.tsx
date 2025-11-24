import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  icon, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 focus:ring-brand-500",
    secondary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 focus:ring-indigo-500",
    outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400"
  };

  const sizes = "px-4 py-2.5 text-sm sm:text-base";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};