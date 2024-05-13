import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import type { FC } from 'react';

interface Props {
  totalPages: number;
}

export const Pagination: FC<Props> = ({ totalPages }): JSX.Element => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isNext, setIsNext] = useState(true);
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleNextPage = (): void => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      router.push(createPageURL(nextPage));
    }

    setIsNext(true);
  };

  const handlePreviousPage = (): void => {
    const previousPage = currentPage - 1;
    if (previousPage >= 1) {
      router.push(createPageURL(previousPage));
    }

    setIsNext(false);
  };

  const variants = {
    initial: isNext
      ? {
          x: '-50%',
          y: '-100%',
          opacity: 0,
        }
      : {
          x: '-50%',
          y: '100%',
          opacity: 0,
        },
    target: isNext
      ? {
          x: '-50%',
          y: '0%',
          opacity: 1,
        }
      : {
          x: '-50%',
          y: '0%',
          opacity: 1,
        },
    exit: isNext
      ? {
          x: '-50%',
          y: '100%',
          opacity: 0,
        }
      : {
          x: '-50%',
          y: '-100%',
          opacity: 0,
        },
  };

  return (
    <div className="flex items-center gap-14 relative">
      <button
        className="size-8 rounded-full relative p-0.5 group"
        onClick={handlePreviousPage}
        type="button">
        <div className="bg-neon-gradient absolute inset-0 rounded-full blur-sm group-hover:blur-0 transition-all" />

        <div className="relative size-full bg-black flex justify-center items-center rounded-full">
          {'<'}
        </div>
      </button>

      <AnimatePresence>
        <motion.div
          animate="target"
          className="text-lg font-bold absolute left-1/2"
          exit="exit"
          initial="initial"
          key={currentPage}
          variants={variants}>
          {currentPage}
        </motion.div>
      </AnimatePresence>

      <button
        className="size-8 rounded-full relative p-0.5 group"
        onClick={handleNextPage}
        type="button">
        <div className="bg-neon-gradient absolute inset-0 rounded-full blur-sm group-hover:blur-0 transition-all" />

        <div className="relative size-full bg-black flex justify-center items-center rounded-full">
          {'>'}
        </div>
      </button>
    </div>
  );
};
