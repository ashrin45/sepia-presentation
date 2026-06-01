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
 *   - calcule le scale qui fit dans le wrapper en gardant le ratio
 *   - applique ce scale via `zoom` (et NON `transform: scale`)
 *   - centre l'embed dans le slot via flexbox
 *   - réagit aux resize du wrapper (ResizeObserver) et au chargement des fonts
 *
 * Pourquoi `zoom` et pas `transform: scale()` ?
 *   `transform` promeut l'embed sur sa propre couche de compositing GPU.
 *   Le deck (<deck-stage>) applique déjà un scale global pour adapter le slide
 *   1920×1080 au viewport ; la couche de l'embed n'est alors PAS re-rastérisée
 *   à la résolution finale → texte et images flous. `zoom` fait un vrai
 *   re-layout/re-raster : l'embed reste net à n'importe quel facteur du deck.
 *
 * Pas de plafond à 1 : on autorise l'agrandissement pour remplir le slot
 * (sinon un embed plus petit que son slot resterait à sa taille native).
 */
(function () {
  "use strict";

  function fitOne(wrapper) {
    const content = wrapper.querySelector(".embed-fit-content");
    if (!content) return;

    // Reset pour mesurer la taille naturelle. `width: max-content` force la
    // largeur intrinsèque du contenu : sans ça, en flux flex, le content
    // s'étirerait à la largeur du wrapper et le ratio serait faussé.
    content.style.zoom = "";
    content.style.width = "max-content";
    content.style.maxWidth = "none";

    const cw = wrapper.clientWidth;
    const ch = wrapper.clientHeight;
    const ew = content.scrollWidth;
    const eh = content.scrollHeight;
    if (!cw || !ch || !ew || !eh) return;

    const s = Math.min(cw / ew, ch / eh);
    content.style.zoom = s;
  }

  function init() {
    const wrappers = document.querySelectorAll(".embed-fit-wrapper");
    wrappers.forEach((w) => {
      // S'assure que le wrapper est positionné et centre son contenu
      const cs = getComputedStyle(w);
      if (cs.position === "static") w.style.position = "relative";
      w.style.overflow = "hidden";
      w.style.display = "flex";
      w.style.alignItems = "center";
      w.style.justifyContent = "center";

      fitOne(w);

      if ("ResizeObserver" in window) {
        // Observe le wrapper (taille pilotée par le slot, pas par l'embed) :
        // changer le zoom de l'embed ne retrigge donc pas l'observer.
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
