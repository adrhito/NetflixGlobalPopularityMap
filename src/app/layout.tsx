import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Netflix Global Popularity Map',
  description: 'Discover the most popular Netflix movies and TV shows worldwide by region',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-white text-gray-900`}>
        {/* Header */}
        <header className="bg-black text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-[#e50914]">NETFLIX</div>
                <div className="text-sm font-medium text-gray-300">Global Popularity</div>
              </Link>

              <div className="flex items-center space-x-6">
                <Link
                  href="/"
                  className="text-sm hover:text-[#e50914] transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/map"
                  className="text-sm hover:text-[#e50914] transition-colors"
                >
                  Map
                </Link>
                <Link
                  href="/worldwide"
                  className="text-sm hover:text-[#e50914] transition-colors"
                >
                  Worldwide
                </Link>
                <Link
                  href="/regions"
                  className="text-sm hover:text-[#e50914] transition-colors"
                >
                  Regions
                </Link>
                <Link
                  href="/about"
                  className="text-sm hover:text-[#e50914] transition-colors"
                >
                  About
                </Link>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t border-gray-200 mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">
                Data source:{' '}
                <span className="font-medium">
                  {process.env.USE_MOCK_DATA === 'true' ? 'Mock Data' : 'TMDb API'}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                This is an educational project. Netflix is a registered trademark of Netflix, Inc.
                Not affiliated with Netflix, Inc.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
