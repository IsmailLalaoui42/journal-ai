"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center group">
            <div className="w-14 h-14 relative mr-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 animate-float">
              <Image
                src="/images/ensa_logo.png"
                alt="ENSA Beni Mellal Logo"
                width={112}
                height={112}
                quality={100}
                priority
                className="object-contain drop-shadow-xl transition-all duration-300"
                style={{
                  filter: 'contrast(1.15) brightness(1.08) drop-shadow(0 0 18px #3b82f6cc)',
                  background: 'linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 100%)',
                  borderRadius: '18px',
                }}
              />
              {/* Animated glowing border */}
              <span className="absolute inset-0 rounded-[18px] border-2 border-blue-400 opacity-0 group-hover:opacity-90 animate-spin-slow pointer-events-none shadow-lg"></span>
            </div>
            <div className="flex flex-col items-start">
              <h1
                className="
                  text-2xl md:text-3xl font-extrabold
                  bg-gradient-to-r from-blue-900 via-blue-500 to-blue-800
                  bg-clip-text text-transparent
                  animate-gradient-x
                  relative
                  transition-transform duration-300
                  hover:scale-105
                  group
                  tracking-tight
                "
              >
                ENSA Beni Mellal
                {/* Ligne bleue supprimée */}
              </h1>
              <span
                className="
                  mt-1 text-xs md:text-sm font-semibold
                  bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400
                  bg-clip-text text-transparent
                  animate-gradient-x
                  tracking-wide
                  block
                  max-w-[180px] md:max-w-none
                  whitespace-nowrap
                  overflow-hidden
                  text-ellipsis
                "
              >
                École Nationale des Sciences Appliquées de Beni Mellal
              </span>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Accueil
            </Link>
            <Link href="/actualites" className="text-gray-700 hover:text-blue-600 transition-colors">
              Actualités
            </Link>
            <Link href="/activites" className="text-gray-700 hover:text-blue-600 transition-colors">
              Activités
            </Link>
            <Link href="/abonnement" className="text-gray-700 hover:text-blue-600 transition-colors">
              Abonnement
            </Link>
          </nav>

          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link href="/actualites" className="text-gray-700 hover:text-blue-600 transition-colors">
                Actualités
              </Link>
              <Link href="/activites" className="text-gray-700 hover:text-blue-600 transition-colors">
                Activités
              </Link>
              <Link href="/abonnement" className="text-gray-700 hover:text-blue-600 transition-colors">
                Abonnement
              </Link>
              <header className="flex justify-end items-center p-4 gap-4 h-16">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </header>
            </nav>
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="w-4 h-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
