import { CATEGORIES, MANUFACTURERS } from "../../../constants/categories";
import { Category, Builder } from "@/types/categories";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { RotateCw } from "lucide-react";
import { MachineCard } from "@/components/ui/machineCard";
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
  const manufacturer = router.query.manufacturer as string;
  const manuafacturersList = MANUFACTURERS as Builder[];
  const categoriesList = CATEGORIES as Category[];

  const currrentBrand = manuafacturersList.find(
    (brand) => brand.label === manufacturer,
  );

  {
    /*The  onValueChange passes the string value*/
  }
  const handleManufacturerChange = (selectedBrand: string) => {
    selectedBrand ? router.push(`/${selectedBrand}`) : router.push("/jlg");
  };

  return (
    <div className="p-4 bg-stone-50">
      <div className="flex flex-col items-center mb-2 h-37.5">
        <h1 className="text-4xl text-center my-4 font-semibold text-gray-800">
          Manuais Técnicos
        </h1>

        {/* Image of manufacturer */}
        {currrentBrand ? (
          <Image
            className="w-40 h-11 lg:w-60 lg:h-16 animate-fade-in"
            src={currrentBrand.image}
            width={200}
            height={10}
            alt={currrentBrand.label}
          />
        ) : (
          <div className="flex flex-col items-center gap-1">
            <RotateCw size={33} className="text-blue-400 animate-spin" />
            <span className="text-gray-600 font-light">
              ...buscando fabricante
            </span>
          </div>
        )}
      </div>

      {/* manufacturer  selection section - shadcn ui*/}
      <div className="flex justify-center mb-8">
        <Select
          value={manufacturer || ""}
          onValueChange={handleManufacturerChange}
        >
          <SelectTrigger className="w-full max-w-55 border-2 border-gray-600 rounded-lg text-base font-semibold text-slate-700">
            <SelectValue placeholder="Selecionar fabricante" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-gray-500">Fabricantes</SelectLabel>

              {manuafacturersList.map((brand, index) => (
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
        {categoriesList.map((cat, index) => (
          <Link
            href={`/${manufacturer}/${cat.slug}`}
            key={`${cat.slug}-${index}`}
          >
            <MachineCard item={cat} />
          </Link>
        ))}
      </div>
    </div>
  );
}
