import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            TaskZen
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Simplify your day. Achieve more with less stress.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href="/login"
            className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started
          </Link>
          <Link
            href="/register"
            className="inline-flex justify-center items-center px-8 py-3 border border-gray-300 dark:border-gray-700 text-lg font-medium rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:shadow-md"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}
