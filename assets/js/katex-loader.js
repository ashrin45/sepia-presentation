// assets/js/katex-loader.js
// Charge KaTeX (CSS + JS + auto-render) depuis CDN et active le rendu LaTeX
// dans toute la page. Delimiteurs supportes : $...$ inline, $$...$$ display,
// \(...\) inline, \[...\] display.
//
// Usage : ajouter <script src="../../../assets/js/katex-loader.js"></script>
// (ajuster le chemin relatif selon la profondeur du module) avant la fermeture
// du body, ou en defer dans le head.

(function() {
    'use strict';
    const KATEX_VERSION = '0.16.11';
    const CDN = 'https://cdn.jsdelivr.net/npm/katex@' + KATEX_VERSION + '/dist';

    // 1. CSS
    if (!document.querySelector('link[data-katex]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CDN + '/katex.min.css';
        link.crossOrigin = 'anonymous';
        link.setAttribute('data-katex', 'css');
        document.head.appendChild(link);
    }

    function loadScript(src, onload) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.crossOrigin = 'anonymous';
            s.defer = true;
            s.onload = () => { if (onload) onload(); resolve(); };
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    function render() {
        if (window.renderMathInElement) {
            window.renderMathInElement(document.body, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '\\[', right: '\\]', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false}
                ],
                throwOnError: false,
                errorColor: '#ef4444',
                strict: 'ignore'
            });
        }
    }

    // 2. KaTeX core puis auto-render, puis on rend
    loadScript(CDN + '/katex.min.js')
        .then(() => loadScript(CDN + '/contrib/auto-render.min.js'))
        .then(() => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', render);
            } else {
                render();
            }
        })
        .catch(err => console.error('[katex-loader] echec du chargement KaTeX :', err));
})();
