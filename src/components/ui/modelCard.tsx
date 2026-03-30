import Image from "next/image";
import { ModelImage } from "@/types/manuals";

type Item = {
  item: ModelImage;
  className?: string;
};

export function ModelCard({ item, className = "" }: Item) {
  return (
    <figure
      className={`group bg-slate-50 justify-self-center shadow-neumorphic rounded-md flex flex-col items-center justify-center py-2 h-auto w-30 md:w-44 lg:w-40  hover:bg-gray-200 cursor-pointer active:bg-orange-200 ${className}`}
    >
      <Image
        src={item.urlPublica}
        width={200}
        height={400}
        alt={item.nome}
        unoptimized={true}
        priority
        className="w-16 h-20 md:w-30 md:h-38 group-hover:scale-105 group-active:scale-110 transition-transform duration-300 opacity-85"
      />
      <figcaption className="text-sm md:text-2xl text-center">
        {item.nome}
      </figcaption>
    </figure>
  );
}
