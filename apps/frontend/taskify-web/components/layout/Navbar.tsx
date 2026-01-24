import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Avatar } from '../ui/Avatar';
import { ThemeToggle } from '../ui/ThemeToggle';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="flex h-14 items-center justify-between border-b border-border bg-card px-4 shadow-sm">
      {/* Left: Logo & Nav Links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white font-bold">
            T
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Taskify</span>
        </Link>

        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
          <Link href="/user/john" className="hover:text-primary">Dashboard</Link>
          <Link href="/recent" className="hover:text-primary">Recent</Link>
          <Link href="/starred" className="hover:text-primary">Starred</Link>
          <Link href="/templates" className="hover:text-primary">Templates</Link>
        </div>

        <Button variant="primary" size="sm" className="hidden md:flex">Create</Button>
      </div>

      {/* Right: Search & Profile */}
      <div className="flex items-center gap-4">
        <div className="w-64 hidden md:block">
          <Input
            placeholder="Search..."
            leftIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>}
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 text-gray-500">
          <button className="hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          </button>
          <button className="hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          </button>
          <ThemeToggle />
        </div>

        {/* Profile */}
        <Avatar fallback="BM" className="cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all" />
      </div>
    </nav>
  );
};
