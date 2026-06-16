'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiPlay, FiMaximize2 } from 'react-icons/fi';
import { content, type PortfolioItem } from '@/lib/content';
import SectionHeading from '../ui/SectionHeading';
import Modal from '../ui/Modal';

const { portfolio } = content;

export default function Portfolio() {
  const [active, setActive] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="Creative Work"
          title="There&apos;s a creative side too."
          subtitle="Outside of enterprise code, I&apos;ve produced design, motion graphics and video work — a nod to the multidisciplinary background I bring to every project."
          center
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => setActive(item)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group glow-hover relative aspect-[4/3] overflow-hidden rounded-3xl text-left"
            >
              <Image
                src={item.thumbnail}
                alt={item.thumbnailAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-white opacity-0 backdrop-blur-md transition-all duration-300 [background:var(--glass-bg-strong)] group-hover:opacity-100">
                {item.embedType === 'youtube' ? <FiPlay size={16} /> : <FiMaximize2 size={16} />}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-1)]">
                  {item.category}
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal item={active} onClose={() => setActive(null)} />
    </section>
  );
}
