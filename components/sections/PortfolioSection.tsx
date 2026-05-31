'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';

import { Modal } from '@/components/ui/Modal';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioSectionProps {
  items: PortfolioItem[];
}

/**
 * Portfolio section with responsive grid gallery and modal details.
 * Hover effect: scale 1.05 + glassmorphism overlay.
 * Click opens modal with full details and external link.
 */
export function PortfolioSection({ items }: PortfolioSectionProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const currentTriggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = (item: PortfolioItem) => {
    currentTriggerRef.current = triggerRefs.current.get(item.id) || null;
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <section id="portfolio" aria-label="Portfolio" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Portfolio
        </h2>

        {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <button
              key={item.id}
              ref={(el) => {
                if (el) triggerRefs.current.set(item.id, el);
              }}
              onClick={() => handleOpen(item)}
              aria-haspopup="dialog"
              className="group relative rounded-2xl overflow-hidden text-left
                transition-transform duration-300 ease-in-out
                hover:scale-105
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-primary-red"
            >
              {/* Thumbnail */}
              <div className="aspect-[4/3] relative">
                <Image
                  src={item.thumbnail}
                  alt={item.thumbnailAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Glassmorphism overlay on hover */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4
                  bg-transparent group-hover:bg-white/20 group-hover:dark:bg-black/30
                  group-hover:backdrop-blur-sm
                  transition-all duration-300 ease-in-out"
              >
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-base font-semibold text-white drop-shadow-md">
                    {item.title}
                  </h3>
                  <span className="text-sm text-white/80 drop-shadow-md">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Always-visible title below image for accessibility */}
              <div className="p-3 bg-white/80 dark:bg-gray-900/80">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {item.title}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.category}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <Modal
            isOpen={!!selectedItem}
            onClose={handleClose}
            triggerRef={currentTriggerRef as React.RefObject<HTMLElement>}
            title={selectedItem.title}
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-primary-red/10 text-primary-red dark:bg-primary-blue/10 dark:text-primary-blue">
                {selectedItem.category}
              </span>
              <p className="text-gray-700 dark:text-gray-300">
                {selectedItem.description}
              </p>
              <a
                href={selectedItem.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                  bg-gradient-to-r from-primary-red to-primary-blue text-white
                  hover:shadow-lg hover:shadow-primary-red/30
                  transition-all duration-300
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-primary-red"
              >
                View Project
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}
