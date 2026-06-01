/* ============================================================
   Inkdrop+ effects
   - Custom cursor (point qui suit, mix-blend-mode: difference)
   - Tilt 3D micro (sur [data-tilt])
   - Magnetic buttons (sur [data-magnetic])

   Inclus dans tous les modules. Auto-init au DOMContentLoaded.
   ============================================================ */
(function() {
    'use strict';

    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
        return; // pas d'effets souris sur tactile
    }

    function init() {
        initCursor();
        initTilt();
        initMagnetic();
    }

    /* ---- Custom cursor : tracking direct, pas de rAF infini ---- */
    function initCursor() {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);

        const HOVER_SEL = 'a, button, [data-magnetic], [data-tilt], input[type=range], label, .tab-link';
        let isHovering = false;
        let raf = 0;
        let tx = 0, ty = 0;

        function frame() {
            raf = 0;
            dot.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0) translate(-50%,-50%)';
        }

        document.addEventListener('mousemove', (e) => {
            tx = e.clientX;
            ty = e.clientY;
            if (!raf) raf = requestAnimationFrame(frame);
            // hover state via closest, ne flicker pas car on ne touche la classe
            // que si l'etat change vraiment
            const should = !!e.target.closest(HOVER_SEL);
            if (should !== isHovering) {
                isHovering = should;
                dot.classList.toggle('hover', should);
            }
        }, { passive: true });

        document.addEventListener('mouseenter', () => dot.classList.add('visible'));
        document.addEventListener('mouseleave', () => dot.classList.remove('visible'));
    }

    /* ---- Tilt 3D micro (throttle rAF) ---- */
    function initTilt() {
        const targets = document.querySelectorAll('[data-tilt]');
        targets.forEach(el => {
            el.style.transformStyle = 'preserve-3d';
            el.style.willChange = 'transform';
            const max = parseFloat(el.dataset.tilt) || 4;
            let raf = 0, ev = null;
            el.addEventListener('mousemove', (e) => {
                ev = e;
                if (raf) return;
                raf = requestAnimationFrame(() => {
                    raf = 0;
                    const r = el.getBoundingClientRect();
                    const cx = (ev.clientX - r.left) / r.width - 0.5;
                    const cy = (ev.clientY - r.top) / r.height - 0.5;
                    el.style.transform = 'perspective(900px) rotateX(' + (-cy * max) + 'deg) rotateY(' + (cx * max) + 'deg)';
                });
            }, { passive: true });
            el.addEventListener('mouseleave', () => {
                if (raf) { cancelAnimationFrame(raf); raf = 0; }
                el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
            });
        });
    }

    /* ---- Magnetic (throttle rAF) ---- */
    function initMagnetic() {
        const targets = document.querySelectorAll('[data-magnetic]');
        targets.forEach(el => {
            const strength = parseFloat(el.dataset.magnetic) || 0.3;
            el.style.willChange = 'transform';
            let raf = 0, ev = null;
            el.addEventListener('mousemove', (e) => {
                ev = e;
                if (raf) return;
                raf = requestAnimationFrame(() => {
                    raf = 0;
                    const r = el.getBoundingClientRect();
                    const dx = (ev.clientX - (r.left + r.width / 2)) * strength;
                    const dy = (ev.clientY - (r.top + r.height / 2)) * strength;
                    el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
                });
            }, { passive: true });
            el.addEventListener('mouseleave', () => {
                if (raf) { cancelAnimationFrame(raf); raf = 0; }
                el.style.transform = 'translate(0,0)';
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
