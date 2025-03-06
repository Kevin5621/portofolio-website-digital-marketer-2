'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface RevealImageProps {
  isVisible: boolean;
  imageSrc: string;
  imageAlt: string;
  initialScale?: number;
  finalScale?: number;
  width?: number | string;
  height?: number | string;
  transitionDuration?: number;
  className?: string;
}

export function RevealImage({
  isVisible,
  imageSrc,
  imageAlt,
  initialScale = 0.5,
  finalScale = 1,
  width = '200px',
  height = '200px',
  transitionDuration = 0.3,
  className = '',
}: RevealImageProps) {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(initialScale);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | null>(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });
  
  // Initialize cursor position
  useEffect(() => {
    prevCursorPosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setCursorPosition(prevCursorPosition.current);
  }, []);

  // Mouse movement handling with easing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const dx = clientX - prevCursorPosition.current.x;
    const dy = clientY - prevCursorPosition.current.y;

    // Apply easing to the cursor movement
    const easeAmount = 0.2;
    const newX = prevCursorPosition.current.x + dx * easeAmount;
    const newY = prevCursorPosition.current.y + dy * easeAmount;

    prevCursorPosition.current = { x: newX, y: newY };
    setCursorPosition({ x: newX, y: newY });
  }, []);

  // Setup mouse movement tracking
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      requestRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
        requestRef.current = null;
      });
    };

    window.addEventListener('mousemove', updateCursorPosition);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleMouseMove]);

  // Handle visibility changes
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isVisible) {
      timeoutRef.current = setTimeout(() => {
        setOpacity(1);
        setScale(finalScale);
      }, 50);
    } else {
      setOpacity(0);
      setScale(initialScale);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, initialScale, finalScale]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed pointer-events-none z-20 ${className}`}
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: opacity,
        width: width,
        height: height,
        transition: `opacity ${transitionDuration}s ease, transform ${transitionDuration}s ease`,
      }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover rounded-lg"
        fill
      />
    </div>
  );
}