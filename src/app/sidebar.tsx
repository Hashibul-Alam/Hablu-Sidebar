'use client';

import { useState } from 'react';
import {
  FaHeadset,
  FaArrowLeft,
} from 'react-icons/fa';
import Image from 'next/image';
import { AchivedIcon, AssignmentIcon, ConceptIcon, CourseIcon, DashIcon, PaymentsIcon, QuizIcon, UserIcon } from './icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

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
      <Link
        href={href}
        onClick={() => setIsOpen(false)}
        className={`flex items-center gap-4 p-4 text-white rounded-md cursor-pointer transition-colors ${
          isActive ? 'bg-slate-700' : 'hover:bg-slate-500'
        }`}
      >
        <div className="text-2xl">{icon}</div>
        {isOpen && (
          <span className="text-2xl font-semibold">{label}</span>
        )}
      </Link>
    );
  };

  return (
    <div
      className={`bg-[#0B0F19] h-screen p-4 flex flex-col transition-all duration-300 fixed top-0 left-0 ${
        isOpen ? 'w-80' : 'w-24'
      }`}
    >
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          {isOpen && (
            <h1 className="text-white text-xl font-bold">Hablu-Programmer</h1>
          )}
        </div>
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
        <SidebarItem icon={<FaHeadset />} label="Help Center" href="/help" />
        <div className="flex items-center gap-2 mt-4 text-white">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
          {isOpen && <span>Sheikh Hashibub Alam</span>}
        </div>
      </div>
    </div>
  );
}
