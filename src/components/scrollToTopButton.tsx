import { useState, useEffect } from "react";
import { ArrowBigUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setISVisible] = useState<boolean>(false);

  // Threshold (limiar): Exibe o botão se descer mais de 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setISVisible(true);
      } else {
        setISVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    //Limpeza quando componente for desmotado
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  //função para retornar ao topo da paǵina
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed right-5 bottom-5 bg-orange-400 text-white shadow-lg p-3 rounded-full transition-opacity duration-300
    ${isVisible ? "opacity-80" : "opacity-0 pointer-events-none"}
    `}
      aria-label="Voltar ao topo"
      onClick={scrollToTop}
    >
      <ArrowBigUp size={24} />
    </button>
  );
}
