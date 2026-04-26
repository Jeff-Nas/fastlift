import { useState } from "react";
import Image from "next/image";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export function DonationButton() {
  const [copied, setCopied] = useState<boolean>(false);
  const pixKey: string = "ad3c6f1f-964e-46f1-b0ab-fa67a1f38a54";

  const handleCopy = async () => {
    try {
      navigator.clipboard.writeText(pixKey);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (erro) {
      console.log("Erro ao copiar", erro);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        {/*Botão padrão para abrir o Dialogue */}
        <button className="flex items-center gap-3 py-2 px-3 border border-taupe-700 text-taupe-700 rounded-xl uppercase">
          <Coffee />
          <span>Apoiar cotinuidade do projeto</span>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apoie o FastLift</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Se essa ferramenta te ajuda no dia a dia, você pode contribuir para
          manter e evoluir o projeto.
        </p>

        <div className="flex justify-center my-4">
          <Image
            src="/images/donation/qrcode-pix.jpeg"
            alt="QR Code Pix"
            width={160}
            height={160}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            value={pixKey}
            readOnly
            className="flex-1 text-sm px-3 py-2 border rounded-md"
          />
          <Button onClick={handleCopy} size="sm">
            {copied ? "Copiado" : "Copiar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
