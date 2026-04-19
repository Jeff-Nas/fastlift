import { X } from "lucide-react";
import { MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  //Renamed to ClearAll to support future state extensions.
  function handleClearAll() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    //trigger to menu
    if (isMenuOpen) {
      //prevents the page from scrolling
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="font-display relative">
        <div className="flex justify-between items-center p-2 md:p-4  text-gray-800">
          <div className="md:flex gap-2 items-center ml-1.5">
            <img
              className="hidden md:flex w-12"
              src="/public/assets/img/cokeyro-logo.png"
              alt="logo"
            />
            <a href="/">
              <h1 className="text-2xl font-bold tracking-tighter">FASTLIFT</h1>
            </a>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex gap-6 font-display md:text-xl">
            {/*Links para os manuais - será modificado depois */}
            <Link href="/jlg">JLG</Link>
            <Link href="/genie">Genie</Link>
            <Link href="/skyjack">Skyjack</Link>
            <Link href="/haulotte">Haulotte</Link>
          </div>

          {/* ICONS */}
          <div className="flex gap-4 mr-2 items-center">
            {/*DEMAIS ÍCONES AQUI (user etc) */}

            {/* BOTÃO PARA ABRIR O MENU*/}
            <button
              className={`md:hidden ${isMenuOpen ? "opacity-0 invisible" : "opacity-100 visible"}`}
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* FUNDO ESCURO - OVERLAY */}
      <div
        //fills the entire screen, controls visibility, and allows you to close it by clicking outside
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => handleClearAll()}
      ></div>

      {/* Menu gaveta- lateral */}

      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white text-black z-50 shadow-xl transition-transform
      duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        //-translate-x-full: moves the menu completely to the negative X axis
      >
        {/* Cabeçalho do menu gaveta */}
        <div className="flex justify-between p-4">
          <span className="font-bold text-xl">MENU</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/*Links para os manuais - serão modificados depois */}
        <div className="flex flex-col p-4 gap-4 ml-4">
          <Link href="/jlg" className="text-lg font-medium hover:text-gray-600">
            JLG
          </Link>
          <Link
            href="/genie"
            className="text-lg font-medium hover:text-gray-600"
          >
            Genie
          </Link>
          <Link
            href="/skyjack"
            className="text-lg font-medium hover:text-gray-600"
          >
            Skyjack
          </Link>
          <Link
            href="/haulotte"
            className="text-lg font-medium hover:text-gray-600"
          >
            Haulotte
          </Link>
        </div>
      </div>
    </>
  );
}
