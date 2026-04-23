import { CATEGORIES, MANUFACTURERS } from "../../../constants/categories";
import { Category, Builder } from "@/types/categories";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { RotateCw } from "lucide-react";
import { CategoryCard } from "@/components/ui/categoryCard";
import { AnimatePresence, motion } from "motion/react";
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

  //Função pa inserir o nome do fabricante na URL
  const handleManufacturerChange = (selectedBrand: string) => {
    selectedBrand ? router.push(`/${selectedBrand}`) : router.push("/jlg");
  };

  return (
    <div className="p-4 bg-stone-50">
      {/*altura fixa para imagem não empurrar o container: h-34 */}
      <div className="flex flex-col items-center h-34">
        <h1 className="text-2xl font-header text-center my-4 font-semibold text-gray-800">
          Manuais Técnicos
        </h1>

        {/* Imagem do fabricante - verifica se currentBrand existe*/}
        {currrentBrand ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currrentBrand?.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                className="w-40 h-11 lg:w-60 lg:h-16 animate-fade-in"
                src={currrentBrand.image}
                width={200}
                height={10}
                alt={currrentBrand.label}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <RotateCw size={33} className="text-blue-400 animate-spin" />
            <span className="text-gray-600 font-light">
              ...buscando fabricante
            </span>
          </div>
        )}
      </div>
      <hr className="mb-2" />

      {/* manufacturer  selection section - shadcn ui*/}
      <div className="flex flex-col items-center justify-center mb-8 gap-1">
        <p className="text-gray-600">Selecione um fabricante</p>
        {/*O valor do select já é passado automaticaente pelo componente */}
        <Select
          value={manufacturer || "jlg"}
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

      {/*categories section com motion para fade - grid of cards*/}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5 lg:mx-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={manufacturer}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5 col-span-full"
            //col-span-full foi aplicado para o motion.div ocupar a grid toda e
            // as classes da grid foram repetidas nele para os cards se manterem alinhados.
          >
            {categoriesList.map((cat, index) => (
              <Link
                href={`/${manufacturer}/${cat.slug}`}
                key={`${cat.slug}-${index}`}
              >
                <CategoryCard item={cat} />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
