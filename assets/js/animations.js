// UF - Usul al-Fiqh helpers (Canvas, animations, palette)

const UF = {
    // ---- Color palette ----
    colors: {
        source:     '#0F766E',
        mujtahid:   '#6D28D9',
        mecanisme:  '#B45309',
        hukm:       '#1E40AF',
        divergence: '#BE185D',
        citation:   '#D14545',
        ink:        '#1A1814',
        muted:      '#6B6358',
        line:       '#C9C2B6',
        wash:       '#F4F1E8',
    },

    // ---- Canvas setup ----
    setupCanvas(canvasId, width, height) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);
        return { canvas, ctx, width, height };
    },

    // ---- Drawing primitives ----
    drawNeuron(ctx, x, y, radius, options) {
        options = options || {};
        const fill = options.fill !== undefined ? options.fill : 'rgba(244, 241, 232, 0.06)';
        const stroke = options.stroke !== undefined ? options.stroke : this.colors.source;
        const lineWidth = options.lineWidth !== undefined ? options.lineWidth : 2;
        const label = options.label || '';
        const glow = options.glow || false;
        const pulsePhase = options.pulsePhase || 0;

        ctx.save();

        if (glow) {
            ctx.shadowColor = this.colors.source;
            ctx.shadowBlur = 15 + Math.sin(pulsePhase) * 5;
        }

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        ctx.restore();

        if (label) {
            ctx.fillStyle = this.colors.ink;
            ctx.font = '500 13px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x, y);
        }
    },

    drawConnection(ctx, x1, y1, x2, y2, weight, options) {
        weight = weight !== undefined ? weight : 1;
        options = options || {};
        const animated = options.animated || false;
        const phase = options.phase || 0;
        const showWeight = options.showWeight || false;
        const isPositive = weight >= 0;
        const absWeight = Math.abs(weight);
        const alpha = 0.2 + absWeight * 0.8;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        const color = isPositive ? this.colors.source : this.colors.divergence;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1 + absWeight * 3;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (animated) {
            const progress = (phase % 1);
            const px = x1 + (x2 - x1) * progress;
            const py = y1 + (y2 - y1) * progress;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }

        if (showWeight) {
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2 - 10;
            ctx.fillStyle = this.colors.muted;
            ctx.font = '11px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(weight.toFixed(2), mx, my);
        }

        ctx.restore();
    },

    // ---- Activation functions ----
    activations: {
        sigmoid: function(x) { return 1 / (1 + Math.exp(-x)); },
        relu: function(x) { return Math.max(0, x); },
        tanh: function(x) { return Math.tanh(x); },
        leakyRelu: function(x) { return x > 0 ? x : 0.01 * x; },
        gelu: function(x) { return 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x * x * x))); },
        silu: function(x) { return x / (1 + Math.exp(-x)); },
    },

    // ---- Graph drawing ----
    drawGraph(ctx, x, y, w, h, fn, options) {
        options = options || {};
        const xRange = options.xRange || [-6, 6];
        const yRange = options.yRange || [-1.5, 1.5];
        const color = options.color || this.colors.source;
        const gridColor = options.gridColor || this.colors.line;
        const markerX = options.markerX !== undefined ? options.markerX : null;
        const label = options.label || '';

        const mapX = function(val) { return x + ((val - xRange[0]) / (xRange[1] - xRange[0])) * w; };
        const mapY = function(val) { return y + h - ((val - yRange[0]) / (yRange[1] - yRange[0])) * h; };

        ctx.save();

        // Grid
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 4]);

        // Horizontal zero line
        const zeroY = mapY(0);
        ctx.beginPath();
        ctx.moveTo(x, zeroY);
        ctx.lineTo(x + w, zeroY);
        ctx.stroke();

        // Vertical zero line
        const zeroX = mapX(0);
        ctx.beginPath();
        ctx.moveTo(zeroX, y);
        ctx.lineTo(zeroX, y + h);
        ctx.stroke();

        ctx.setLineDash([]);

        // Axes labels
        ctx.fillStyle = this.colors.muted;
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(xRange[0], mapX(xRange[0]), zeroY + 16);
        ctx.fillText(xRange[1], mapX(xRange[1]), zeroY + 16);
        ctx.textAlign = 'right';
        ctx.fillText(yRange[1], zeroX - 8, mapY(yRange[1]) + 4);

        // Function curve
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        const steps = 200;
        for (let i = 0; i <= steps; i++) {
            const xVal = xRange[0] + (i / steps) * (xRange[1] - xRange[0]);
            const yVal = fn(xVal);
            const px = mapX(xVal);
            const py = mapY(yVal);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Marker
        if (markerX !== null) {
            const markerY = fn(markerX);
            const px = mapX(markerX);
            const py = mapY(markerY);

            // Vertical dashed line
            ctx.setLineDash([3, 3]);
            ctx.strokeStyle = this.colors.muted;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(px, zeroY);
            ctx.lineTo(px, py);
            ctx.stroke();
            ctx.setLineDash([]);

            // Dot
            ctx.beginPath();
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = this.colors.wash;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Value label
            ctx.fillStyle = this.colors.ink;
            ctx.font = '500 12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('f(' + markerX.toFixed(1) + ') = ' + markerY.toFixed(3), px, py - 14);
        }

        // Title
        if (label) {
            ctx.fillStyle = this.colors.ink;
            ctx.font = '600 14px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(label, x + w / 2, y - 8);
        }

        ctx.restore();
    },

    // ---- Animation loop helper ----
    animate(callback) {
        let running = true;
        let lastTime = 0;

        function loop(time) {
            if (!running) return;
            const dt = (time - lastTime) / 1000;
            lastTime = time;
            callback(dt, time / 1000);
            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
        return { stop: function() { running = false; } };
    }
};

/**
 * Dessine un noeud-concept cadre avec etiquette.
 * Utilise pour les arbres et hierarchies (objet d'etude, sources, etc.).
 */
UF.drawConceptNode = function(ctx, x, y, w, h, label, opts) {
    opts = opts || {};
    const color = opts.color || UF.colors.ink;
    const radius = opts.radius || 8;

    ctx.save();
    ctx.fillStyle = opts.fill || 'rgba(244, 241, 232, 0.95)';
    ctx.strokeStyle = color;
    ctx.lineWidth = opts.lineWidth || 1.5;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.font = (opts.fontSize || 14) + 'px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x + w / 2, y + h / 2);

    ctx.restore();
};

/**
 * Dessine une arete (ligne droite ou courbe) entre deux noeuds.
 */
UF.drawTreeEdge = function(ctx, x1, y1, x2, y2, opts) {
    opts = opts || {};
    ctx.save();
    ctx.strokeStyle = opts.color || UF.colors.line;
    ctx.lineWidth = opts.lineWidth || 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    if (opts.curved) {
        const mx = (x1 + x2) / 2;
        ctx.bezierCurveTo(mx, y1, mx, y2, x2, y2);
    } else {
        ctx.lineTo(x2, y2);
    }
    ctx.stroke();
    ctx.restore();
};

window.UF = UF;
