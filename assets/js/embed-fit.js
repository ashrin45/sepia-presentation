/**
 * embed-fit.js
 * Scale les embeds inlinés pour qu'ils tiennent dans leur slot de slide,
 * sans ascenseur interne ni débordement.
 *
 * Convention HTML :
 *   <div class="embed-fit-wrapper">  ← le slot dispo dans la slide
 *     <div id="embed-XXX" class="embed-fit-content"> … contenu naturel … </div>
 *   </div>
 *
 * Le script :
 *   - prend la taille naturelle (scrollWidth/Height) du contenu
 *   - calcule le scale max qui fit dans le wrapper en gardant le ratio
 *   - applique transform: scale(s) + translate pour centrer
 *   - réagit aux resize du wrapper (ResizeObserver) et au chargement des fonts
 */
(function () {
  "use strict";

  function fitOne(wrapper) {
    const content = wrapper.querySelector(".embed-fit-content");
    if (!content) return;

    // Reset transform pour mesurer la taille naturelle (sinon scrollWidth est faussé)
    content.style.transform = "";
    content.style.transformOrigin = "top left";
    content.style.position = "absolute";
    content.style.top = "0";
    content.style.left = "0";

    const cw = wrapper.clientWidth;
    const ch = wrapper.clientHeight;
    const ew = content.scrollWidth;
    const eh = content.scrollHeight;
    if (!cw || !ch || !ew || !eh) return;

    const s = Math.min(cw / ew, ch / eh, 1);
    const tx = (cw - ew * s) / 2;
    const ty = (ch - eh * s) / 2;
    content.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
  }

  function init() {
    const wrappers = document.querySelectorAll(".embed-fit-wrapper");
    wrappers.forEach((w) => {
      // S'assure que le wrapper est positionné
      const cs = getComputedStyle(w);
      if (cs.position === "static") w.style.position = "relative";
      w.style.overflow = "hidden";

      fitOne(w);

      if ("ResizeObserver" in window) {
        new ResizeObserver(() => fitOne(w)).observe(w);
      } else {
        window.addEventListener("resize", () => fitOne(w));
      }
    });

    // Re-fit après le chargement des polices (font swap décale la taille)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => wrappers.forEach(fitOne));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
