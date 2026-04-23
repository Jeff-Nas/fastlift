import Image from "next/image";
import { ModelImage } from "@/types/manuals";
import { useState } from "react";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

type ModelCardProps = {
  item: ModelImage;
  className?: string;
  active: boolean;
  onClick: () => void;
};
//card usado na exibição do modelo da máquina exibido na paǵina [slug]
export function ModelCard({
  item,
  className = "",
  active,
  onClick,
}: ModelCardProps) {
  const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);

  return (
    <button
      onClick={onClick}
      className="w-fit justify-self-center h-auto p-0 border-none bg-transparent"
    >
      <figure
        className={cn(
          "group justify-self-center rounded-md shadow-neumorphic flex flex-col items-center justify-center py-2 px-1  w-36 h-auto md:w-44 lg:w-44 hover:bg-gray-200 cursor-pointer transition-colors duration-300",
          active ? "bg-[#f7e6cd] opacity-100" : "bg-white",
          className,
        )}
      >
        {!imageIsLoaded && (
          <div className="flex flex-col items-center justify-center space-y-2 w-full px-2">
            <Skeleton className="w-16 h-20 md:w-30 md:h-38 rounded-md" />
            <Skeleton className="h-4 w-16 md:w-20 rounded" />
          </div>
        )}

        <div
          className={cn(
            "flex flex-col items-center",
            !imageIsLoaded && "hidden",
          )}
        >
          <Image
            src={item.urlPublica}
            width={200}
            height={400}
            alt={item.nome}
            unoptimized={true}
            priority
            onLoad={() => setImageIsLoaded(true)}
            className="aspect-3/4 w-16 h-20 md:w-28 md:h-32 group-hover:scale-105 group-active:scale-110 transition-transform duration-300 opacity-85"
          />
          <figcaption className="text-xs md:text-sm lg:text-base font-bold text-gray-700 text-center mt-1">
            {item.nome}
          </figcaption>
        </div>
      </figure>
    </button>
  );
}
