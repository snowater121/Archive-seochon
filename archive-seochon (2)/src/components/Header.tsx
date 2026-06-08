/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, History, ShoppingBag, MapPin, Sliders, Feather } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navItems = [
    { id: 'home', label: '서촌 소개', icon: BookOpen },
    { id: 'analyze', label: '의복과 서간', icon: Feather },
    { id: 'archive', label: '서정 아카이브', icon: History },
    { id: 'shop', label: '큐레이션 숍', icon: ShoppingBag },
    { id: 'place', label: '서촌 아틀리에', icon: MapPin },
    { id: 'admin', label: '서간 문법고', icon: Sliders },
  ];

  return (
    <header className="border-b border-ink/10 bg-paper sticky top-0 z-40">
      {/* Editorial Top Border Accent */}
      <div className="h-1 bg-burgundy w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Newspaper Style Master-Header */}
        <div className="py-6 flex flex-col items-center justify-center border-b border-soft-border">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex flex-col sm:flex-row items-center gap-4 group select-none cursor-pointer focus:outline-none text-left"
            id="logo-button"
          >
            {/* Elegant AS Monogram Stamp / Care-label Symbol */}
            <div className="w-14 h-14 border border-soft-border flex flex-col items-center justify-center rounded-none bg-receipt shadow-sm relative shrink-0 group-hover:border-burgundy group-hover:text-burgundy transition-all duration-300">
              <span className="font-serif text-lg font-bold tracking-tight text-ink group-hover:text-burgundy">AS</span>
              <span className="font-mono text-[8px] text-silver uppercase tracking-[0.1em] scale-90 -mt-1">SEOCHON</span>
              {/* Outer seal dots */}
              <div className="absolute top-1 left-1 w-1 h-1 rounded-none bg-burgundy/40" />
              <div className="absolute bottom-1 right-1 w-1 h-1 rounded-none bg-burgundy/40" />
            </div>

            {/* Typography block */}
            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2.5">
                <h1 className="font-serif text-3xl font-extrabold tracking-tight text-ink group-hover:text-burgundy transition-colors">
                  Archive Seochon
                </h1>
                <span className="hidden sm:inline font-mono text-[9px] text-silver font-semibold tracking-widest uppercase">
                  EST. 2026 / RESIDENT-01
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="h-[1px] w-4 bg-soft-border group-hover:bg-burgundy/30 transition-colors" />
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-burgundy">
                  문장을 입다
                </p>
                <p className="font-sans text-[10px] text-ink-muted/80 tracking-tight">
                  | Literary Wear & Curation Hub
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Navigation Bar */}
        <nav className="flex justify-center overflow-x-auto scrollbar-none py-3">
          <div className="flex space-x-1 sm:space-x-4 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'analyze' && activeTab === 'result');
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-none transition-all duration-200 text-sm font-medium border ${
                    isActive
                      ? 'bg-burgundy text-paper border-burgundy shadow-sm'
                      : 'text-ink-muted border-transparent hover:text-ink hover:bg-paper-dark/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-serif tracking-tight whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
