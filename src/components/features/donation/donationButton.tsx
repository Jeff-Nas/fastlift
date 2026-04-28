import { useState } from "react";
import Image from "next/image";
import { Coffee } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

//==ATENÇÃO: usar dynamic import ===
//garante que esse componente está sendo renderizado só no client
//evita usar ele direto em _document.tsx

export default function DonationButton() {
  const [copied, setCopied] = useState<boolean>(false);
  const pixKey: string = "ad3c6f1f-964e-46f1-b0ab-fa67a1f38a54";

  const handleCopy = async () => {
    try {
      navigator.clipboard.writeText(pixKey);
      setCopied(true);

      setTimeout(() => setCopied(false), 2500);
    } catch (erro) {
      console.log("Erro ao copiar", erro);
    }
  };

  return (
    <Dialog>
      {/*Aqui pode quebrar a aplicação se não usar aschild - o componente cria um botão por cima de outro*/}
      <DialogTrigger asChild>
        {/*Botão padrão para abrir o Dialogue */}
        <ShinyButton
          // 1. Personalização do componente
          className="flex items-center gap-3 py-2 px-3 border border-amber-950/80 text-amber-950/80 text-sm font-semibold rounded-md uppercase transition-all"
          // 2. Opcional: Ajuste a cor do brilho para combinar com o tom de Amber
        >
          <div className="flex items-center gap-3">
            <Coffee size={24} weight="fill" />
            <span>Apoiar continuidade do projeto</span>
          </div>
        </ShinyButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-header text-xl">
            Apoie o FastLift
          </DialogTitle>
        </DialogHeader>
        <hr />

        <p className="text-base text-gray-700 mx-2">
          Se essa ferramenta te ajuda no dia a dia, você pode contribuir para
          manter e evoluir o projeto.
        </p>

        <div className="flex justify-center my-4">
          <Image
            src="/images/donation/qr-code-pix.webp"
            alt="QR Code Pix"
            width={180}
            height={180}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            value={pixKey}
            readOnly
            className="flex-1 text-sm px-3 py-2 border rounded-md"
          />
          <Button onClick={handleCopy} size="sm" className="min-w-22.5">
            {copied ? "Copiado" : "Copiar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
