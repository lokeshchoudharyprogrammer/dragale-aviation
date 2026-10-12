'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { CircleX } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  img: string;
  bio: string;
}

interface TeamModalProps {
  selectedMember: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  badgeVariants?: Variants;
}

const TeamModal: React.FC<TeamModalProps> = ({
  selectedMember,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedMember && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            (lastElement as HTMLElement)?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            (firstElement as HTMLElement)?.focus();
          }
        }
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      (firstElement as HTMLElement)?.focus();

      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedMember, onClose]);
  return (
    <AnimatePresence>
      {isOpen && selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex justify-center items-center z-50 p-4 bg-gray-900/60 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-labelledby="team-member-name"
          aria-modal="true"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="bg-white p-8 sm:p-16 max-w-4xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Close modal"
            >
              <CircleX size={32} strokeWidth={1} />
            </motion.button>

            <div className="flex flex-col sm:flex-row gap-12">
              {/* Image */}
              <div className="w-48 h-48 relative rounded-2xl overflow-hidden flex-shrink-0 mx-auto sm:mx-0 shadow-md">
                <Image
                  src={selectedMember?.img}
                  alt={`${selectedMember?.name}, ${selectedMember?.role}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3
                  id="team-member-name"
                  className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 uppercase"
                >
                  {selectedMember?.name}
                </h3>
                <span className="block mt-4 text-xs font-bold tracking-widest uppercase text-gray-500">
                  {selectedMember?.role}
                </span>

                {/* Biography */}
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-3">
                    Biography
                  </span>
                  <div className="text-base sm:text-lg font-light leading-relaxed text-gray-600 whitespace-pre-line">
                    {selectedMember?.bio?.trim()}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamModal;
