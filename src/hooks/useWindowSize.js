import React from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  function resize() {
    setTimeout(() => {
      setWindowSize(window.innerWidth);
    }, 1000);
  }

  React.useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return windowSize;
}