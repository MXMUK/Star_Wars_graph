import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface Props {
  data: {
    label: string
  };
}

export const CustomNode = memo(function CustomNode({ data }: Props): JSX.Element {
  return (
    <div className="w-40 bg-neon-gradient rounded-xl p-0.5 relative">
      <div className="absolute inset-0 bg-neon-gradient rounded-xl blur-sm animate-pulse" />

      <div className="relative size-full bg-black rounded-xl p-4 flex flex-col justify-between text-center">
        {data.label}
      </div>
      <Handle className="opacity-0" position={Position.Top} type="target" />
      <Handle className="opacity-0" position={Position.Bottom} type="source" />
    </div>
  );
});
