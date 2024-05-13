import React from 'react';

export const PersonCardSkeleton = (): JSX.Element => {
  return (
    <div className=" w-32 h-60 bg-slate-700 rounded-xl p-0.5 relative animate-pulse">
      <div className="absolute inset-0 bg-bg-slate-700 rounded-xl blur-sm" />

      <div className="relative size-full bg-black rounded-xl p-4 flex flex-col justify-between">
        <div className="rounded-full bg-slate-700 size-[92px]"/>

        <div className="h-4 bg-slate-700 rounded-full"/>

        <div className="h-2 w-8 bg-slate-700 rounded" />
      </div>
    </div>
  );
};
