import { CATEGORIES, MANUFACTURERS } from "../../../constants/categories";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function Manufacturer() {
  const router = useRouter();
  return (
    <div className="p-4 bg-slate-50">
      <h1 className="text-4xl text-center my-4 font-semibold text-gray-800">
        Manuais Técnicos
      </h1>
      {/*secção de categorias*/}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5 lg:mx-8">
        {CATEGORIES.map((cat, index) => (
          <Link href="#" key={`${cat.slug}-${index}`}>
            <figure className="group shadow-card rounded-md flex flex-col items-center justify-center h-42 lg:h-60 hover:bg-gray-200 bg-white">
              <figcaption className="mb-2">{cat.label}</figcaption>
              <Image
                src={cat.image}
                width={200}
                height={600}
                className="w-20 h-28 lg:w-30 lg:h-38 group-hover:scale-110 transition-transform duration-300"
              />
            </figure>
          </Link>
        ))}
      </div>
    </div>
  );
}
