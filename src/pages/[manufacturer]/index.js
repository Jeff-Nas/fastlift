import { useRouter } from "next/router";

export default function PaginaCategorias() {
  const router = useRouter();
  const { manufacturer } = router.query; // Aqui o Next "lê" a URL para você

  return (
    <div
      style={{ padding: "50px", textAlign: "center", fontFamily: "sans-serif" }}
    >
      <h1>
        Você está na página da:{" "}
        <span style={{ color: "orange" }}>{manufacturer}</span>
      </h1>
      <p>Em breve, aqui aparecerão os cards de: {manufacturer}</p>

      {/* Botões para você testar a troca de fabricante sem mudar de arquivo */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => (window.location.href = "/jlg")}>
          Ir para JLG
        </button>
        <button
          onClick={() => (window.location.href = "/genie")}
          style={{ marginLeft: "10px" }}
        >
          Ir para GENIE
        </button>
      </div>
    </div>
  );
}
