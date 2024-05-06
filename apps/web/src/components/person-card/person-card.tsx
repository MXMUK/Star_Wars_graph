import type { FC } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import type { Person } from '../../types/person';

interface Props {
  person: Person;
}

export const PersonCard: FC<Props> = ({ person }) => {
  const { name, gender, homeworld } = person;
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{
        delay: 0.5,
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
      }}>
      PersonCard
    </motion.div>
  );
};
