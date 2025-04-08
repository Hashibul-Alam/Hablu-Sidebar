'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  AchivedIcon,
  AssignmentIcon,
  ConceptIcon,
  CourseIcon,
  DashIcon,
  MenuIcon,
  PaymentsIcon,
  QuizIcon,
  SupportIcon,
  UserIcon,
} from '../../icon/icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from './header/header';

export default function SidebarLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const [tooltip, setTooltip] = useState<{ text: string; top: number; left: number } | null>(null);

  const handleMouseEnter = (e: React.MouseEvent, text: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      text,
      top: rect.top - 12,
      left: rect.left + rect.width / 2,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const SidebarItem = ({
    icon,
    label,
    href,
  }: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }) => {
    const isActive = pathname === href;

    return (
      <div className="relative group">
        <Link
          href={href}
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-4 p-4 text-white rounded-md cursor-pointer transition-colors ${
            isActive ? 'bg-slate-700 ' : 'hover:bg-slate-500'
          }`}
          onMouseEnter={(e) => {
            if (!isOpen) handleMouseEnter(e, label);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="text-2xl">{icon}</div>
          {isOpen && <span className="text-2xl font-semibold">{label}</span>}
        </Link>
      </div>
    );
  };

  return (
    <>
      {!isOpen && tooltip && (
        <div
          className="fixed z-50 px-3 py-1 text-[9px] text-white bg-slate-900 rounded-md shadow-lg transform -translate-x-1/2 -translate-y-full animate-fade-in"
          style={{
            top: tooltip.top,
            left: tooltip.left,
          }}
        >
          <div className="relative">
            {tooltip.text}
            <div className="absolute left-1/2 top-full -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 right-0 h-20 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 flex items-center px-6 z-40">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button
              className="text-white p-2 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon className={`transition-transform ${!isOpen ? 'rotate-180' : ''}`} />
            </button>
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-white text-xl font-bold">Hablu-Programmer</h1>
          </div>
          <Header />
        </div>
      </div>

      <div
        className={`fixed top-16 left-0 bottom-0 bg-slate-950/80 backdrop-blur-sm border-r border-slate-800 flex flex-col transition-all duration-300 ${
          isOpen ? 'w-80' : 'w-24'
        }`}
      >
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <nav className="space-y-1">
            <SidebarItem icon={<DashIcon />} label="Dashboard" href="/dashboard" />
            <SidebarItem icon={<CourseIcon />} label="Courses" href="/courses" />
            <SidebarItem icon={<ConceptIcon />} label="Conceptual" href="/conceptual" />
            <SidebarItem icon={<AchivedIcon />} label="Achievements" href="/achievements" />
            <SidebarItem icon={<AssignmentIcon />} label="Assignments" href="/assignments" />
            <SidebarItem icon={<QuizIcon />} label="Quiz" href="/quiz" />
            <SidebarItem icon={<UserIcon />} label="Users" href="/users" />
            <SidebarItem icon={<PaymentsIcon />} label="Payments" href="/payments" />
          </nav>
        </div>

        <div className="border-t border-gray-700 px-4 py-4">
          <SidebarItem icon={<SupportIcon />} label="Help Center" href="/help" />
          <div className="flex items-center gap-3 mt-4 ms-1.5 text-white text-lg font-medium">
            <Image
              src="/profile.jpg"
              alt="Profile"
              width={28}
              height={28}
              className="rounded-full"
            />
            {isOpen && <span>Sheikh Hashibub Alam</span>}
          </div>
        </div>
      </div>
    </>
  );
}
