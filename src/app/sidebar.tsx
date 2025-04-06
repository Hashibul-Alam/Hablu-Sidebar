'use client';

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import {
  AchivedIcon,
  AssignmentIcon,
  ConceptIcon,
  CourseIcon,
  DashIcon,
  PaymentsIcon,
  QuizIcon,
  SupportIcon,
  UserIcon,
} from './icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
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

     <div className='px-6'>
     <div
        className={`bg-slate-950 border-r border-gray-700 h-screen py-4  flex flex-col transition-all duration-300 fixed top-0 left-0 ${
          isOpen ? 'w-80' : 'w-24'
        }`}
      >
      
       <div className="flex items-center justify-between relative border-b border-gray-700  py-[8px] w-full">
          <Link href="/" className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            {isOpen && (
              <h1 className="text-white text-xl font-bold">Hablu-Programmer</h1>
            )}
          </Link>
          <button
            className="text-white bg-blue-600 p-2 rounded-full absolute right-0 top-0 -mr-8"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaArrowLeft
              className={`transition-transform ${!isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      

        <nav className="mt-8 flex-grow space-y-1 overflow-y-auto">
          <SidebarItem icon={<DashIcon />} label="Dashboard" href="/dashboard" />
          <SidebarItem icon={<CourseIcon />} label="Courses" href="/courses" />
          <SidebarItem icon={<ConceptIcon />} label="Conceptual" href="/conceptual" />
          <SidebarItem icon={<AchivedIcon />} label="Achievements" href="/achievements" />
          <SidebarItem icon={<AssignmentIcon />} label="Assignments" href="/assignments" />
          <SidebarItem icon={<QuizIcon />} label="Quiz" href="/quiz" />
          <SidebarItem icon={<UserIcon />} label="Users" href="/users" />
          <SidebarItem icon={<PaymentsIcon />} label="Payments" href="/payments" />
        </nav>

        <div className="border-t border-gray-700 pt-4">
          <SidebarItem icon={<SupportIcon />} label="Help Center" href="/help" />
          <div className="flex items-center gap-3 ms-2 mt-4 text-white text-lg font-medium">
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
     </div>
    </>
  );
}
