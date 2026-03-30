import Image from "next/image";
import { Category } from "@/types/categories";

type Item = {
  item: Category;
  clasName?: string;
};

export function MachineCard({ item, clasName = "" }: Item) {
  return (
    <figure
      className={`group shadow-card rounded-md flex flex-col items-center justify-center h-42 lg:h-60  hover:bg-gray-200 bg-white active:bg-orange-200 ${clasName}`}
    >
      <figcaption className="mb-2">{item.label}</figcaption>
      <Image
        src={item.image}
        width={200}
        height={600}
        alt={item.label}
        loading="eager"
        className="w-20 h-28 lg:w-30 lg:h-38 group-hover:scale-110 group-active:scale-120 transition-transform duration-300"
      />
    </figure>
  );
}
