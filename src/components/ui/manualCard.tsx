import Link from "next/link";
import { ArrowDownToLineIcon, ArrowRight, FileText } from "lucide-react";

interface ManualCardProps {
  machine?: string;
  description: string;
  pdfUrl: string;
}

export function ManualCard({ machine, description, pdfUrl }: ManualCardProps) {
  return (
    <div className="w-full h-full bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col transition-all hover:shadow-md hover:border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b border-gray-100 rounded-t-lg">
        <div className="flex items-center gap-2 text-gray-800">
          <FileText size={18} className="text-orange-500" />
          <p className="font-semibold text-sm uppercase tracking-wide">
            {machine}
          </p>
        </div>

        {/* Badge PDF */}
        <span className="bg-gray-200 text-gray-600 px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm tracking-wider">
          PDF
        </span>
      </div>

      {/* Content - Espaçamento melhorado para leitura */}
      <div className="p-4 grow">
        <p className="text-gray-600 text-sm md:text-base leading-relaxed wrap-break-words">
          {description.replace(/-/g, " ")}
        </p>
      </div>

      {/* Call to action*/}
      <div className="flex justify-between items-center px-4 py-3 border-t border-gray-50 gap-3">
        {/* Ação Secundária (Outline/Neutro) */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 justify-center items-center gap-2 px-3 py-2 text-xs md:py-3 md:text-sm  font-semibold text-gray-600 border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <ArrowDownToLineIcon className="w-4 h-4 md:w-5 md:h-5" />
          BAIXAR
        </a>

        {/* Ação Primária (Cor principal destacada) */}
        <Link
          href={{
            pathname: "/visualizador",
            query: { pdfUrl },
          }}
          className="flex flex-1 justify-center items-center gap-2 px-3 py-2 text-xs md:py-3 md:text-sm font-bold bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors shadow-sm"
        >
          ABRIR MANUAL
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
