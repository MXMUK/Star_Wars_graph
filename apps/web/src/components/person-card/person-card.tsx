import type { FC } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Person } from '../../types/person';
import user from '../../../public/user.svg';

interface Props {
  person: Person;
}

export const PersonCard: FC<Props> = ({ person }): JSX.Element => {
  const { name, birth_year } = person;

  return (
    <Link className="flex" href={`/hero/${person.id}`}>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="w-32 min-h-60 bg-neon-gradient rounded-xl p-0.5 relative cursor-pointer"
        initial={{ opacity: 0, scale: 0.7 }}
        whileHover={{ scale: 1.1 }}>
        <div className="absolute inset-0 bg-neon-gradient rounded-xl blur-sm animate-pulse" />

        <div className="relative size-full bg-black rounded-xl p-4 flex flex-col justify-between">
          <Image alt="user icon" priority src={user} />

          <div className="text-center font-bold text-sm">{name}</div>

          <div className="text-xxs text-neonPurple">
            Was born in <br /> {birth_year}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
