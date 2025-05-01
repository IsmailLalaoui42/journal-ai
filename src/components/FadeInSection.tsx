import React, { useEffect, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FadeInSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  // Determine the initial transform based on direction
  let initialTransform = 'translateY(30px)';
  if (direction === 'down') initialTransform = 'translateY(-30px)';
  if (direction === 'left') initialTransform = 'translateX(30px)';
  if (direction === 'right') initialTransform = 'translateX(-30px)';

  return (
    <div
      ref={domRef}
      className={`${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : initialTransform,
        transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
