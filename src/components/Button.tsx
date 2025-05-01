import React, { useState, useEffect } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  animateOnHover?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  animateOnHover = true,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  // Base classes
  let baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'px-3 py-1.5 text-sm';
      break;
    case 'lg':
      sizeClasses = 'px-6 py-3 text-lg';
      break;
    case 'md':
    default:
      sizeClasses = 'px-4 py-2 text-base';
      break;
  }
  
  // Variant classes
  let variantClasses = '';
  let focusRingColor = '';
  switch (variant) {
    case 'secondary':
      variantClasses = 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800';
      focusRingColor = 'focus:ring-gray-500';
      break;
    case 'outline':
      variantClasses = 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100';
      focusRingColor = 'focus:ring-blue-500';
      break;
    case 'text':
      variantClasses = 'bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100';
      focusRingColor = 'focus:ring-blue-500';
      break;
    case 'primary':
    default:
      variantClasses = 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800';
      focusRingColor = 'focus:ring-blue-500';
      break;
  }
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  // Animation classes
  const animationClasses = animateOnHover && !disabled && !loading 
    ? 'transform hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-sm' 
    : '';
  
  // Pressed effect
  useEffect(() => {
    if (isPressed) {
      const timer = setTimeout(() => {
        setIsPressed(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isPressed]);
  
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      setIsPressed(true);
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${focusRingColor} ${widthClasses} ${disabledClasses} ${animationClasses} ${className} ${isPressed ? 'transform scale-95' : ''}`}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
}
