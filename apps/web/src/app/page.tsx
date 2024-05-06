'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Person } from '../types/person';
import { getAll } from '../api/people';
import { PersonCard } from '../components/person-card';

export default function Page(): JSX.Element {
  const [people, setPeople] = useState<Person[]>([]);

  const loadPeople = useCallback(async () => {
    try {
      const allPeople = await getAll();

      setPeople(allPeople.results);
    } catch (err) {
      throw new Error(String(err));
    }
  }, []);

  useEffect(() => {
    void loadPeople();
  }, [loadPeople]);

  return (
    <main className="">
      {people.length
        ? people.map((person) => (
            <div key={person.id}>
              <PersonCard person={person} />
            </div>
          ))
        : 'loading'}
    </main>
  );
}

