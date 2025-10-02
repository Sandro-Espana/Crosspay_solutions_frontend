import { PropsWithChildren } from 'react';

export default function HexBackground({ children }: PropsWithChildren) {
  return (
    <div className="hex-bg rounded-xl2 my-6 mx-auto hex-bg rounded-xl2 mt-12 mx-auto max-w-6xl p-6 md:p-12max-w-6xl p-6 md:p-12">
      {children}
    </div>
  );
}
