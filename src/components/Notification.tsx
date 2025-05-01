import React, { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  onClose?: () => void;
}

export default function Notification({
  message,
  type = 'info',
  duration = 5000,
  position = 'top-right',
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Match this with the CSS transition duration
  };

  if (!isVisible) return null;

  // Determine position classes
  let positionClasses = '';
  switch (position) {
    case 'top-right':
      positionClasses = 'top-4 right-4';
      break;
    case 'top-left':
      positionClasses = 'top-4 left-4';
      break;
    case 'bottom-right':
      positionClasses = 'bottom-4 right-4';
      break;
    case 'bottom-left':
      positionClasses = 'bottom-4 left-4';
      break;
    case 'top-center':
      positionClasses = 'top-4 left-1/2 transform -translate-x-1/2';
      break;
    case 'bottom-center':
      positionClasses = 'bottom-4 left-1/2 transform -translate-x-1/2';
      break;
  }

  // Determine type classes
  let typeClasses = '';
  switch (type) {
    case 'success':
      typeClasses = 'bg-green-500 text-white';
      break;
    case 'error':
      typeClasses = 'bg-red-500 text-white';
      break;
    case 'warning':
      typeClasses = 'bg-yellow-500 text-white';
      break;
    case 'info':
    default:
      typeClasses = 'bg-blue-500 text-white';
      break;
  }

  return (
    <div
      className={`fixed ${positionClasses} z-50 transition-all duration-300 ${
        isLeaving ? 'opacity-0 transform translate-y-[-20px]' : 'opacity-100'
      }`}
    >
      <div
        className={`rounded-lg shadow-lg px-6 py-3 flex items-center ${typeClasses}`}
      >
        <div className="mr-3">
          {type === 'success' && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {type === 'error' && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {type === 'warning' && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
          {type === 'info' && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <p>{message}</p>
        <button
          onClick={handleClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
