// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo/logo-icon.svg';
import DropdownUser from './DropdownUser';
import LibrarySwitcher from './LibrarySwitcher';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-50 flex w-full bg-white drop-shadow-md dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-md md:px-6 2xl:px-11">

        {/* Hamburger + Logo (mobile) */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!sidebarOpen && '!w-full delay-300'}`}></span>
                <span className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && 'delay-400 !w-full'}`}></span>
                <span className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && '!w-full delay-500'}`}></span>
              </span>
            </span>
          </button>

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={Logo} alt="Logo" className="h-8 w-8" />
          </Link>
        </div>

        {/* Desktop search or placeholder */}
        <div className="hidden sm:block">
          <form action="#" method="POST">
            <div className="relative">
              {/* Puedes agregar un input de búsqueda aquí si quieres */}
            </div>
          </form>
        </div>

        {/* User Area + Library Switcher */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* Library Switcher */}
          <LibrarySwitcher />
          {/* Dropdown usuario */}
          <DropdownUser />
        </div>

      </div>
    </header>
  );
};

export default Header;
