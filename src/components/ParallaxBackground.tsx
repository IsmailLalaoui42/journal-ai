import React, { useState, useEffect } from 'react';

interface ParallaxBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
  speed?: number;
  height?: string;
  overlay?: boolean;
  overlayColor?: string;
  className?: string;
}

export default function ParallaxBackground({
  imageUrl,
  children,
  speed = 0.5,
  height = '500px',
  overlay = true,
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  className = '',
}: ParallaxBackgroundProps) {
  const [offsetY, setOffsetY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle scroll for parallax effect
  useEffect(() => {
    if (isMobile) return; // Disable parallax on mobile for better performance
    
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: isMobile ? 'none' : `translateY(${offsetY * speed}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />
      
      {overlay && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: overlayColor }}
        />
      )}
      
      <div className="relative h-full z-10">
        {children}
      </div>
    </div>
  );
}
