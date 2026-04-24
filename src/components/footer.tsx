import Link from "next/link";
import { Copyright, Mail, ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-10 px-6 border-t border-slate-900">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Logo e Slogan */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            FAST<span className="text-orange-500">LIFT</span>
          </h2>
          <p className="text-sm mt-2 font-medium text-slate-400 italic">
            "Elevando a manutenção com tecnologia e agilidade"
          </p>
        </div>

        {/* Links Rápidos (Placeholders) - a adaptar */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8 text-xs uppercase tracking-widest font-semibold">
          <Link
            href="/jlg"
            className="hover:text-orange-500 transition-colors flex items-center gap-1"
          >
            <ShieldCheck size={14} />
            Privacidade
          </Link>
          <Link
            href="/jlg"
            className="hover:text-orange-500 transition-colors flex items-center gap-1"
          >
            <Mail size={14} />
            Suporte
          </Link>
        </nav>

        {/* Linha divisória */}
        <div className="w-full h-px bg-slate-800 mb-8 max-w-sm"></div>

        {/* Copyright e frase final */}
        <div className="flex flex-col items-center text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1">
            <Copyright size={12} />
            <span>2025 FastLift Industrial.</span>
          </div>
          <p className="font-light tracking-wide">
            Desenvolvido para máxima performance em campo.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
