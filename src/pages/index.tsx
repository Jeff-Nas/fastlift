import Link from "next/link";
import Image from "next/image";
import { Component, Wrench } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="p-4 mt-6">
        {/*Campo frase de impacto */}
        <h1 className="text-center text-5xl font-body font-bold">
          Manuais Técnicos na palma da sua mão em{" "}
          <span className="block w-fit mx-auto bg-linear-to-t from-orange-200/60 text-orange-500 from-25% to-transparent to-25% bg-no-repeat">
            10 segundos.
          </span>
        </h1>
        <p className="text-center mt-5 text-gray-700">
          Acesse os principais de máquinas PEMT de forma centralizada e
          ultraveloz. Menos tempo procurando, mais tempo resolvendo.
        </p>

        {/*Call to action */}
        <Link href={"/jlg"}>
          <button className="w-full py-3 mt-10 rounded-xl bg-orange-500 shadow-button text-white uppercase text-sm font-semibold">
            Acessar manuais agora
          </button>
        </Link>
        {/*Seção do Visualizador */}
        <div className="mt-16">
          <h2 className="text-3xl text-center font-semibold">
            Vizualizador Integrado
          </h2>
          <p className="text-center text-gray-700 mt-5 px-2">
            Diagramas de alta resolução renderizados diretamente no navegador do
            dispositivo móvel.
          </p>
          {/*Banner1 - Visualizador */}
          <Image
            src={"/images/banner/banner5.webp"}
            width={400}
            height={800}
            alt="Imagem do banner"
          />
        </div>
      </div>
      {/*Destaque para tempo de acesso ao manual */}
      <div className="flex flex-col gap-8 px-6 py-10 bg-slate-900 text-center">
        <span className="text-5xl font-bold text-orange-200">10s</span>
        <p className="uppercase text-yellow-100 text-2xl font-semibold">
          Acesso instantâneo
        </p>
        <p className="text-gray-300">
          O tempo médio que você pode levar para encontrar um manual técnico na
          plataforma.
        </p>
      </div>
      {/*Cards de funcionalidades da plataforma */}
      <div className="flex flex-col gap-5 p-6 mt-12">
        {/*Card1 */}
        <div className="flex flex-col gap-3 border p-5 rounded">
          <span className="p-3 rounded bg-gray-100 w-fit text-orange-500">
            <Component />
          </span>
          <h3 className="text-2xl font-bold">Centralização de Marcas</h3>
          <p className="text-gray-800">
            Genie, JLG, Haulotte, Skyjack. Toda a frota em um único painel de
            controle.
          </p>
        </div>
        {/*Card2 */}
        <div className="flex flex-col gap-3 border p-5 rounded">
          <span className="p-3 rounded bg-gray-100 w-fit text-orange-500">
            <Wrench />
          </span>
          <h3 className="text-2xl font-bold">Banco de Soluções</h3>
          <p className="text-gray-800">
            <span className="font-semibold">Em breve: </span>histórico de falhas
            comuns e códigos de erro mapeados para resolução imediata.
          </p>
        </div>
      </div>

      <Image
        src={"/images/banner/banner2.webp"}
        width={800}
        height={400}
        alt="Imagem do banner"
        className="h-55 object-cover mt-12"
      />
    </div>
  );
}
