import { PropsWithChildren } from 'react';

export default function HexBackground({ children }: PropsWithChildren) {
  return (
    <div className="hex-bg rounded-xl2 mx-4 md:mx-auto max-w-6xl p-6 md:p-12 mt-2">
      {children}
    </div>
  );
}
