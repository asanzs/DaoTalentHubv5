'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("APP ERROR CAUGHT:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6 flex-col">
      <h2 className="text-3xl font-bold text-red-500 mb-4">Something went wrong!</h2>
      <pre className="bg-red-950 text-red-200 p-6 rounded-xl overflow-auto max-w-full">
        {error.message}
        <br />
        {error.stack}
      </pre>
      <button
        className="mt-6 px-6 py-2 bg-white text-black font-bold rounded-full"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
