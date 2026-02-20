import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <p className="text-[140px] font-black text-midnight leading-none">404</p>
        <h2 className="text-3xl font-bold text-midnight mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/"
            className="bg-ruby text-white px-8 py-3 rounded-lg font-bold hover:bg-ruby/90 transition"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="border-2 border-gray-200 text-midnight px-8 py-3 rounded-lg font-bold hover:border-ruby transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
