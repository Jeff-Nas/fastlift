import { CATEGORIES, MANUFACTURERS } from "../../../constants/categories";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Manufacturer() {
  const router = useRouter();
  const { manufacturer } = router.query;

  const handleManufacturerChange = (selectedBrand) => {
    if (selectedBrand) {
      router.push(`/${selectedBrand}`);
    }
  };

  return (
    <div className="p-4 bg-slate-50">
      <h1 className="text-4xl text-center my-4 font-semibold text-gray-800">
        Manuais Técnicos
      </h1>

      {/* manufacturer  selection section*/}
      <div className="flex justify-center mb-8">
        <Select
          value={manufacturer || ""}
          onValueChange={handleManufacturerChange}
        >
          {/* Estilizando o botão do Select com Tailwind 4 */}
          <SelectTrigger className="w-full max-w-55 border-2 border-gray-600 rounded-lg text-base font-semibold text-slate-700">
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-gray-500">Fabricantes</SelectLabel>
              <SelectItem value="Selecionar fabricante">
                Selecionar fabricante
              </SelectItem>
              {MANUFACTURERS.map((brand, index) => (
                <SelectItem
                  key={`${brand.label}-${index}`}
                  value={brand.label}
                  className="cursor-pointer font-medium"
                >
                  {brand.label.toUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/*categories section*/}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5 lg:mx-8">
        {CATEGORIES.map((cat, index) => (
          <Link href="#" key={`${cat.slug}-${index}`}>
            <figure className="group shadow-card rounded-md flex flex-col items-center justify-center h-42 lg:h-60 hover:bg-gray-200 bg-white">
              <figcaption className="mb-2">{cat.label}</figcaption>
              <Image
                src={cat.image}
                width={200}
                height={600}
                alt={cat.label}
                className="w-20 h-28 lg:w-30 lg:h-38 group-hover:scale-110 transition-transform duration-300"
              />
            </figure>
          </Link>
        ))}
      </div>
    </div>
  );
}
