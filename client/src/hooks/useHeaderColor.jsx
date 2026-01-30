//A pasta hooks guarda funções que concentram lógica complexa para que seus componentes só se preocupem em mostrar a interface.

//Hook de comportamento visual (UI behavior)
//Ele controla estado visual baseado em scroll.

import { useEffect, useState } from "react";

const useHeaderColor = () => {
const [headerColor, setHeaderColor] = useState(false)
  //to handle shadow of header
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 8) {
        setHeaderColor("#302e2e")
      } else {
        setHeaderColor("none");
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return headerColor
};

export default useHeaderColor;
