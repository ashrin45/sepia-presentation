/* ============================================================
   Inkdrop+ navigation : onglets sticky horizontaux en haut
   - Auto-detection des <section data-short> (ou .section h2)
   - Scroll spy
   - Underline rouge brique qui glisse
   - Smooth scroll au click
   - Recentre automatiquement l'onglet actif (scroll horizontal)

   Inclure ce script dans chaque module. Aucun HTML à ajouter,
   la barre est construite à la volée et insérée en début de body.
   ============================================================ */
(function() {
    'use strict';

    function init() {
        const sections = Array.from(document.querySelectorAll('section.section, section[data-short]'))
            .filter(s => s.id || s.dataset.short || s.querySelector('h2'));

        if (sections.length < 2) return; // pas la peine pour un module avec une seule section

        // Garantir un id sur chaque section (utilise pour le scroll spy + ancres)
        sections.forEach((s, i) => {
            if (!s.id) s.id = 's' + (i + 1);
        });

        // Construction de la barre
        const bar = document.createElement('div');
        bar.className = 'tabs-bar';
        bar.innerHTML =
            '<div class="tabs-bar-inner">' +
                '<div class="tabs-list" role="tablist">' +
                    '<span class="tab-underline"></span>' +
                '</div>' +
            '</div>';
        document.body.insertBefore(bar, document.body.firstChild);

        // Si une .nav-bar sticky existe deja, on positionne la tabs-bar dessous
        const navBar = document.querySelector('.nav-bar');
        function syncTopOffset() {
            if (navBar) {
                bar.style.top = navBar.offsetHeight + 'px';
            }
        }
        syncTopOffset();
        window.addEventListener('resize', syncTopOffset);

        const list = bar.querySelector('.tabs-list');
        const underline = bar.querySelector('.tab-underline');

        // Build des liens
        sections.forEach((sec, i) => {
            const a = document.createElement('a');
            a.href = '#' + sec.id;
            a.className = 'tab-link';
            a.dataset.target = sec.id;
            const num = String(i + 1).padStart(2, '0');
            const short = sec.dataset.short || shortFromHeading(sec);
            a.innerHTML = '<span class="tab-num">' + num + '</span>' +
                          '<span class="tab-label">' + short + '</span>';
            list.insertBefore(a, underline);
        });

        // Smooth scroll sur click
        list.addEventListener('click', (e) => {
            const link = e.target.closest('.tab-link');
            if (!link) return;
            e.preventDefault();
            const target = document.getElementById(link.dataset.target);
            if (!target) return;
            const navH = navBar ? navBar.offsetHeight : 0;
            const offset = navH + bar.offsetHeight + 16;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        });

        // Reveal apres le header
        const header = document.querySelector('.course-header, header.course-header, header');
        const headerBottom = header ? header.offsetTop + header.offsetHeight : 200;

        function update() {
            const scrollY = window.scrollY;
            const stuck = scrollY > headerBottom - 40;
            bar.classList.toggle('visible', stuck);

            // Active section (top of viewport + buffer)
            const navH = navBar ? navBar.offsetHeight : 0;
            const probe = scrollY + navH + bar.offsetHeight + 80;
            let active = sections[0];
            for (const s of sections) {
                if (s.offsetTop <= probe) active = s;
            }

            const links = list.querySelectorAll('.tab-link');
            let activeLink = null;
            links.forEach(l => {
                const isActive = l.dataset.target === active.id;
                l.classList.toggle('active', isActive);
                if (isActive) activeLink = l;
            });

            if (activeLink) {
                underline.style.left = activeLink.offsetLeft + 'px';
                underline.style.width = activeLink.offsetWidth + 'px';
                if (stuck) {
                    const tabCenter = activeLink.offsetLeft + activeLink.offsetWidth / 2;
                    const target = tabCenter - list.clientWidth / 2;
                    list.scrollTo({ left: target, behavior: 'smooth' });
                }
            }
        }
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
    }

    function shortFromHeading(sec) {
        const h2 = sec.querySelector('h2');
        if (!h2) return 'Section';
        let txt = h2.textContent.trim();
        // Enlever le prefixe "13.2 -" / "1.1 :" / "X -"
        txt = txt.replace(/^\s*\d+(\.\d+)?\s*[-:]\s*/, '');
        // Tronquer si trop long
        if (txt.length > 22) txt = txt.slice(0, 20).trim() + '...';
        return txt;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
