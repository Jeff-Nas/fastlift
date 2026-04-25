import Head from "next/head";

interface OpenGraphProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const OpenGraph = ({
  title = "Título Padrão do Projeto",
  description = "Descrição padrão do seu sistema de manutenção.",
  url = "https://fastlift.com.br",
  image = "https://fastlift.com.br/images/logos/social-logo.webp", // URL absoluta
}: OpenGraphProps) => {
  return (
    <Head>
      {/* Primário */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default OpenGraph;
