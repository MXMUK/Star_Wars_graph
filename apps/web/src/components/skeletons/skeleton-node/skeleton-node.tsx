import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export const SkeletonNode = memo(function CustomNode(): JSX.Element {
  return (
    <div className="w-40 h-[60px] bg-slate-700 rounded-xl p-0.5 relative animate-pulse">
      <div className="absolute inset-0 bg-slate-700 rounded-xl blur-sm animate-pulse" />

      <div className="relative size-full bg-black rounded-xl p-4 flex flex-col justify-between" />
      <Handle className="opacity-0" position={Position.Top} type="target" />
      <Handle className="opacity-0" position={Position.Bottom} type="source" />
    </div>
  );
});
