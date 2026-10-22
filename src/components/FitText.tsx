"use client";

import { useLayoutEffect, useRef, useState } from "react";

// Trova il font-size più grande che fa entrare il testo nel contenitore
// (larghezza e altezza), date le proprietà di wrapping già impostate sull'elemento.
function findMaxFontSize(text: HTMLElement, maxWidth: number, maxHeight: number) {
  let low = 8;
  let high = 500;

  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    text.style.fontSize = `${mid}px`;
    const fits = text.scrollWidth <= maxWidth && text.scrollHeight <= maxHeight;
    if (fits) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  return low;
}

// Calcola il font-size più grande che fa entrare il testo nel contenitore,
// indipendentemente da quanto è lungo. Preferisce non spezzare mai le parole;
// attiva la sillabazione corretta solo se una parola sta bloccando la crescita del font.
export default function FitText({
  children,
  className,
  asHtml = false,
}: {
  children: string;
  className?: string;
  // Se true, children è HTML (es. con <span style="color:..."> per colorare singole
  // parole da WordPress) e viene renderizzato con dangerouslySetInnerHTML.
  asHtml?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => {
      const maxWidth = container.clientWidth;
      const maxHeight = container.clientHeight;

      text.style.hyphens = "none";
      text.style.overflowWrap = "normal";
      const wholeWordSize = findMaxFontSize(text, maxWidth, maxHeight);

      text.style.hyphens = "auto";
      text.style.overflowWrap = "break-word";
      const hyphenatedSize = findMaxFontSize(text, maxWidth, maxHeight);

      const useHyphenation = hyphenatedSize > wholeWordSize * 1.15;

      if (!useHyphenation) {
        text.style.hyphens = "none";
        text.style.overflowWrap = "normal";
        text.style.fontSize = `${wholeWordSize}px`;
      } else {
        text.style.fontSize = `${hyphenatedSize}px`;
      }

      setReady(true);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [children]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <h1
        ref={textRef}
        lang="it"
        className={className}
        style={{ opacity: ready ? 1 : 0, transition: "opacity 200ms ease-out" }}
        {...(asHtml
          ? { dangerouslySetInnerHTML: { __html: children } }
          : { children })}
      />
    </div>
  );
}
