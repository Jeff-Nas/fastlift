import Link from "next/link";
import Image from "next/image";
import { Component, Wrench } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  motion,
  Variants,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "motion/react";
import { DonationButton } from "@/components/features/donation/donationButton";

// Variáveis para o efeito cascata (stagger) dos cards
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.6 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Home() {
  // Setup do Contador de 0 a 10
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      // Duração de 1.5 segundos para a contagem
      animate(count, 10, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, count]);

  return (
    <div className="flex flex-col">
      <div className="p-4 mt-6">
        {/*Campo frase de impacto */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-5xl font-body font-bold mt-10"
        >
          Manuais Técnicos na palma da sua mão em{" "}
          <span className="block w-fit mx-auto bg-linear-to-t from-orange-200/60 text-orange-500 from-25% to-transparent to-25% bg-no-repeat">
            10 segundos.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-5 text-gray-700"
        >
          Acesse os principais de máquinas PEMT de forma centralizada e
          ultraveloz. Menos tempo procurando, mais tempo resolvendo.
        </motion.p>

        {/*Call to action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href={"/jlg"}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.93 }}
              className="block w-full py-3 mt-10 mx-auto md:w-1/2 lg:w-1/4 rounded-xl bg-orange-500 shadow-button text-white uppercase text-sm font-semibold"
            >
              Acessar manuais agora
            </motion.button>
          </Link>
        </motion.div>
        {/*Seção de Imagem do Visualizador */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-25"
        >
          <h2 className="text-3xl lg:text-4xl text-center font-semibold font-header">
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
            className="mx-auto h-auto lg:w-130"
          />
        </motion.div>
      </div>
      {/*Destaque para tempo de acesso ao manual com contador */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-8 px-6 py-10 mt-10 bg-slate-900 text-center"
      >
        <div ref={countRef} className="text-5xl font-bold text-orange-200">
          <motion.span>{rounded}</motion.span>s
        </div>
        <p className="uppercase text-yellow-100 text-2xl font-semibold">
          Acesso instantâneo
        </p>
        <p className="text-gray-300">
          O tempo médio que você pode levar para encontrar um manual técnico na
          plataforma.
        </p>
      </motion.div>
      {/* Cards de funcionalidades - Animação Individual por Scroll */}
      <div className="flex flex-col lg:flex-row gap-10 p-6 mt-12 mx-auto">
        {/* Card 1 - Efeito scroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} // amount: 0.3 exige que 30% do card esteja na tela
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3 border p-5 rounded max-w-100"
        >
          <span className="p-3 rounded bg-gray-100 w-fit text-orange-500">
            <Component />
          </span>
          <h3 className="text-2xl font-bold">Centralização de Marcas</h3>
          <p className="text-gray-800">
            Genie, JLG, Haulotte, Skyjack. Toda a frota em um único painel de
            controle.
          </p>
        </motion.div>

        {/* Card 2 - Efeito com scroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3 border p-5 rounded max-w-100"
        >
          <span className="p-3 rounded bg-gray-100 w-fit text-orange-500">
            <Wrench />
          </span>
          <h3 className="text-2xl font-bold">Banco de Soluções</h3>
          <p className="text-gray-800">
            <span className="font-semibold">Em breve: </span>histórico de falhas
            comuns e códigos de erro mapeados para resolução imediata.
          </p>
        </motion.div>
      </div>

      {/* Banner - mecânico - Revelação suave */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={"/images/banner/banner2.webp"}
          width={800}
          height={400}
          alt="Mecânico utilizando o sistema FastLift"
          className="h-55 md:h-100 object-cover mt-12 mx-auto mb-16"
        />
      </motion.div>

      <div className="mx-auto">
        <DonationButton />
      </div>
    </div>
  );
}
