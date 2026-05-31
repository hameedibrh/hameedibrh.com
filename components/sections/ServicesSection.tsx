'use client';

import React from 'react';
import {
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaPalette,
  FaLightbulb,
  FaVideo,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

import { GlassCard } from '@/components/ui/GlassCard';
import type { ServiceItem } from '@/lib/types';

const serviceIconMap: Record<string, IconType> = {
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaPalette,
  FaLightbulb,
  FaVideo,
};

interface ServicesSectionProps {
  services: ServiceItem[];
}

/**
 * Services section with responsive GlassCard grid.
 * Each card has an icon, title, and description.
 * Hover: lift + colored box-shadow glow.
 * Hidden if zero service entries.
 */
export function ServicesSection({ services }: ServicesSectionProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section id="services" aria-label="Services" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Services
        </h2>

        {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <GlassCard
                key={service.title}
                hover
                className="flex flex-col items-center text-center"
              >
                {Icon && (
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary-red/10 dark:bg-primary-blue/10 mb-4">
                    <Icon
                      size={28}
                      className="text-primary-red dark:text-primary-blue"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
