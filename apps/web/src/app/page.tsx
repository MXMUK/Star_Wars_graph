'use client';

// import { useCallback, useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import type { Person } from '../types/person';
// import { getAllHeroes } from '../api/people';
// import { PersonCard } from '../components/person-card';
// import { PersonCardSkeleton } from '../components/skeletons/person-card-skeleton';
// import { Pagination } from '../components/pagination';

const Page = (): JSX.Element => {
  // const [people, setPeople] = useState<Person[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [totalPages, setTotalPages] = useState(0);
  // const searchParams = useSearchParams();

  // const loadPeople = useCallback(async () => {
  //   setIsLoading(true);

  //   try {
  //     const currentPage = Number(searchParams.get('page')) || 1;
  //     const allPeople = await getAllHeroes(`?page=${currentPage}`);

  //     setPeople(allPeople.results);
  //     setTotalPages(Math.ceil(allPeople.count / 10));
  //   } catch (err) {
  //     throw new Error(String(err));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [searchParams]);

  // useEffect(() => {
  //   void loadPeople();
  // }, [loadPeople, searchParams]);

  return (
    <div className="container flex flex-col items-center ml-auto mr-auto  p-5 gap-10">
      {/* <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5 justify-center">
        {!isLoading
          ? people.map((person) => <PersonCard key={person.id} person={person} />)
          : Array.from(Array(10).keys()).map((i) => <PersonCardSkeleton key={i} />)}
      </div>

      <Pagination totalPages={totalPages} /> */}
    </div>
  );
};

export default Page;

