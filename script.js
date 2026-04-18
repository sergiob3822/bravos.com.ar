/* =============================================================
 * CodeNTools — bravos.com.ar
 * Vanilla JS: Supabase REST contact form, galleries, lightbox,
 * background canvas network, scroll progress, typing rotator,
 * stats counter, mobile drawer, floating labels, scroll reveal.
 * ============================================================= */

const SUPABASE_URL =
    (typeof window !== 'undefined' &&
        window.__SUPABASE &&
        typeof window.__SUPABASE.url === 'string' &&
        window.__SUPABASE.url.trim()) ||
    (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_URL) ||
    'https://dzxfguflubuzwwrurouh.supabase.co';
const SUPABASE_ANON_KEY =
    (typeof window !== 'undefined' &&
        window.__SUPABASE &&
        typeof window.__SUPABASE.anonKey === 'string' &&
        window.__SUPABASE.anonKey.trim()) ||
    (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
    'TU_SUPABASE_ANON_KEY_AQUI';

const CONTACT_TABLE = 'contacts';

const REDUCED_MOTION =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const DEFAULT_PROJECT_IMAGE =
    'data:image/svg+xml,' +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="#111916" width="600" height="400"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#34d399" font-family="ui-monospace,monospace" font-size="18">imagen</text></svg>'
    );

const TAG_HINTS = {
    Python: 'Lenguaje multiparadigma; muy usado en automatización, datos, APIs y scripting.',
    'C#': 'Lenguaje de Microsoft orientado a objetos para .NET: apps de escritorio, web y servicios.',
    'C++': 'Lenguaje de sistemas y alto rendimiento; usado en motores, sistemas embebidos y software crítico.',
    JavaScript: 'Lenguaje del navegador y de Node.js; impulsa interfaces y backends con un solo ecosistema.',
    TypeScript: 'JavaScript con tipos estáticos; mejora mantenibilidad en proyectos grandes.',
    'Net 8': 'Plataforma actual de .NET para ejecutar apps multiplataforma y APIs de alto rendimiento.',
    'Net 10': 'Versión moderna de .NET con mejoras de rendimiento, AOT y soporte multiplataforma.',
    '.NET': 'Ecosistema Microsoft (runtime, librerías) para construir apps y servicios en varios lenguajes.',
    PostgreSQL: 'Base de datos relacional open source; soporta SQL avanzado, JSON y alta integridad de datos.',
    MySQL: 'Base de datos relacional muy popular en web; buena para lecturas rápidas y despliegues típicos.',
    MongoDB: 'Base de datos orientada a documentos (NoSQL); flexible para datos semiestructurados.',
    Docker: 'Contenedores para empaquetar y desplegar apps con el mismo entorno en cualquier máquina.',
    Kubernetes: 'Orquestación de contenedores a escala: despliegue, balanceo y recuperación automática.',
    Django: 'Framework web Python “batteries included”: ORM, admin, auth y buenas prácticas integradas.',
    Flask: 'Microframework web en Python; ligero y flexible para APIs y servicios pequeños.',
    FastAPI: 'Framework Python moderno para APIs asíncronas, con validación y documentación automática.',
    Tkinter: 'Toolkit estándar de Python para interfaces gráficas de escritorio multiplataforma.',
    PyTorch: 'Biblioteca de aprendizaje profundo; muy usada en investigación y modelos con tensores.',
    React: 'Biblioteca de Facebook para interfaces declarativas; se basa en componentes y un DOM virtual.',
    'Vue.js': 'Framework progresivo para SPAs; curva de aprendizaje suave y ecosistema maduro.',
    'Node.js': 'Runtime de JavaScript en servidor; ideal para APIs, tiempo real y herramientas JS full-stack.',
    Redis: 'Almacén en memoria; usado como caché, colas y datos de sesión de muy baja latencia.',
    GraphQL: 'Lenguaje de consulta para APIs: el cliente pide exactamente los campos que necesita.',
    'REST API': 'Estilo de API HTTP con recursos y verbos (GET/POST); el estándar más extendido en la web.',
    Git: 'Sistema de control de versiones distribuido; base de flujos de trabajo y colaboración en código.',
    Linux: 'Kernel y entornos tipo Unix; base de servidores, embebidos y mucha infraestructura cloud.',
    AWS: 'Nube de Amazon: cómputo, almacenamiento y servicios gestionados bajo demanda.',
    Azure: 'Nube de Microsoft; integración fuerte con .NET, Active Directory y herramientas empresariales.',
    Tailwind: 'Framework CSS utility-first; estilos rápidos componiendo clases en el HTML.',
    Supabase: 'Backend como servicio: PostgreSQL, auth y APIs auto-generadas al estilo Firebase open source.',
    Stripe: 'Pasarela de pagos online; maneja suscripciones, facturas y cumplimiento PCI.',
    'Evolution API': 'API para integrar WhatsApp en flujos propios; suele usarse con instancias y webhooks.',
    Chatwoot: 'Plataforma open source de atención al cliente y buzón omnicanal (chat, redes, etc.).',
    Ollama: 'Ejecuta modelos de lenguaje localmente; útil para IA privada sin depender solo de la nube.',
    OCR: 'Reconocimiento óptico de caracteres: extrae texto de imágenes o PDFs escaneados.',
    'ISO 27001': 'Norma para implementar un sistema de gestión de seguridad de la información (ISMS).',
    'ISO 27002': 'Catálogo de controles de seguridad (accesos, registro, continuidad, etc.) alineado al 27001.',
    Meta: 'APIs y productos de Meta: integración con WhatsApp Business, anuncios y mensajería.',
    Twilio: 'Plataforma en la nube para SMS, voz, video y WhatsApp mediante APIs.',
    SQL: 'Lenguaje declarativo para consultar y gestionar datos en bases relacionales.',
    HTML: 'Lenguaje de marcado para estructurar contenido en la web.',
    CSS: 'Hojas de estilo para diseño visual, layout y temas responsive.'
};

function getTagHint(tag) {
    const t = String(tag).trim();
    if (TAG_HINTS[t]) return TAG_HINTS[t];
    const lower = t.toLowerCase();
    const keys = Object.keys(TAG_HINTS);
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].toLowerCase() === lower) return TAG_HINTS[keys[i]];
    }
    return '';
}

function renderTagSpan(tag) {
    const label = escapeHtml(tag);
    const hint = getTagHint(tag);
    if (!hint) {
        return '<span class="tag">' + label + '</span>';
    }
    const hintAttr = escapeHtml(hint);
    const ariaLabel = escapeHtml(tag.trim() + ': ' + hint);
    return (
        '<span class="tag tag--has-hint" data-tooltip="' +
        hintAttr +
        '" aria-label="' +
        ariaLabel +
        '">' +
        label +
        '</span>'
    );
}

const projects = [
    {
        id: 1,
        title: 'Panel CRM (Fase beta)',
        description:
            'Panel de gestión para vincular múltiples numeros SIMS de whatsapp e incluso múltiples cunetas API (META | Twilio). El panel se distribuye en diversos menús para tener control total sobre los clientes, las cuentas y los empleados que utilizan el CRM. El panel cuenta con IA de ollama integrado para corregir mensajes. El dashboard acumula métricas de cantidad de clientes, chats atendidos, números cambiados (por si se dan de baja), etc.; El sistema posee un OCR de reconocimiento de imágenes y pdf´s de transferencias para evitar fraudes. El buzón de mensajes y la vinculación de dispositivos se realizó a través de Evolution API y Chatwoot.',
        images: [
            'https://dzxfguflubuzwwrurouh.supabase.co/storage/v1/object/public/project-images/CRM_Proyect/crm-dashboards.png',
            'https://dzxfguflubuzwwrurouh.supabase.co/storage/v1/object/public/project-images/CRM_Proyect/crm-chat.png',
            'https://dzxfguflubuzwwrurouh.supabase.co/storage/v1/object/public/project-images/CRM_Proyect/crm-agregar_sim.png'
        ],
        tags: ['C#', 'Net 8', 'PostgreSQL', 'Docker', 'Python'],
        link: 'https://github.com/sergiob3822/bravos.com.ar'
    },
    {
        id: 2,
        title: 'Trading Bot',
        description:
            'Bot de trading con interfaz en C# y lógica en python. Utiliza una red neuronal que es entrenada en el período de backtesting con ayuda de la Inteligencia Artificial y estrategias (SMC, Fibo, EMA y más lógicas) que se encargan de darle contexto y posibilidad de calibrar métricas a la red neuronal. El backtest se realiza generalmente cada 1 semana y logra un PF de 1.65, maxDD 15% y Winrate de 69%. El bot está en fase de entrenamiento pero ya logra buenos resultados.',
        images: [
            'https://dzxfguflubuzwwrurouh.supabase.co/storage/v1/object/public/project-images/Trading_Bot/cnf-dashboard.png',
            'https://dzxfguflubuzwwrurouh.supabase.co/storage/v1/object/public/project-images/Trading_Bot/cnf-trading.png',
            'https://dzxfguflubuzwwrurouh.supabase.co/storage/v1/object/public/project-images/Trading_Bot/cnf-backtest.png',
            'https://dzxfguflubuzwwrurouh.supabase.co/storage/v1/object/public/project-images/Trading_Bot/cnf-config.png'
        ],
        tags: ['C#', 'Net 10', 'PostgreSQL', 'Python'],
        link: 'https://github.com/sergiob3822/bravos.com.ar'
    }
];

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeImageUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (trimmed.startsWith('data:image/')) {
        return trimmed.length <= 120000 ? trimmed : '';
    }
    try {
        const parsed = new URL(trimmed);
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.href;
    } catch {
        return '';
    }
    return '';
}

function getProjectImageUrls(project) {
    const out = [];
    const maxImages = 12;
    if (Array.isArray(project.images) && project.images.length > 0) {
        for (let i = 0; i < project.images.length && out.length < maxImages; i++) {
            const s = sanitizeImageUrl(project.images[i]);
            if (s) out.push(s);
        }
    }
    if (out.length === 0 && project.image) {
        const s = sanitizeImageUrl(project.image);
        if (s) out.push(s);
    }
    if (out.length === 0) {
        out.push(DEFAULT_PROJECT_IMAGE);
    }
    return out;
}

function renderProjectMedia(titleEscaped, urls, projectIndex) {
    if (urls.length === 1) {
        return (
            '<div class="project-media-wrap">' +
            '<img src="' +
            escapeHtml(urls[0]) +
            '" alt="' +
            titleEscaped +
            '" class="project-image" loading="lazy" decoding="async">' +
            '</div>'
        );
    }
    const total = urls.length;
    const firstAlt = titleEscaped + ' — 1/' + total;
    return (
        '<div class="project-media-wrap project-media-wrap--gallery">' +
        '<div class="project-gallery" data-project-index="' +
        projectIndex +
        '" data-current-index="0" tabindex="0" role="region" aria-label="Galería del proyecto">' +
        '<div class="project-gallery-frame">' +
        '<img class="project-gallery-view" src="' +
        escapeHtml(urls[0]) +
        '" alt="' +
        firstAlt +
        '" loading="lazy" decoding="async">' +
        '<div class="project-gallery-zones">' +
        '<button type="button" class="project-gallery-zone project-gallery-zone--prev" aria-label="Imagen anterior"></button>' +
        '<button type="button" class="project-gallery-zone project-gallery-zone--next" aria-label="Imagen siguiente"></button>' +
        '</div>' +
        '<span class="project-gallery-counter" aria-live="polite">1/' +
        total +
        '</span>' +
        '</div></div></div>'
    );
}

function galleryStep(projectIndex, direction) {
    const project = projects[projectIndex];
    if (!project) return;
    const urls = getProjectImageUrls(project);
    if (urls.length < 2) return;
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    const gallery = grid.querySelector('.project-gallery[data-project-index="' + projectIndex + '"]');
    if (!gallery) return;
    let current = parseInt(gallery.dataset.currentIndex || '0', 10);
    if (direction < 0) {
        current = (current - 1 + urls.length) % urls.length;
    } else {
        current = (current + 1) % urls.length;
    }
    gallery.dataset.currentIndex = String(current);
    const img = gallery.querySelector('.project-gallery-view');
    const counter = gallery.querySelector('.project-gallery-counter');
    const titleEscaped = escapeHtml(project.title);
    if (img) {
        img.src = urls[current];
        img.alt = titleEscaped + ' — ' + (current + 1) + '/' + urls.length;
    }
    if (counter) {
        counter.textContent = current + 1 + '/' + urls.length;
    }
}

function initProjectDescriptionToggles(grid) {
    if (!grid) return;
    const blocks = grid.querySelectorAll('.project-description-block');
    blocks.forEach(function (block) {
        const p = block.querySelector('.project-description');
        const btn = block.querySelector('.project-description-toggle');
        if (!p || !btn) return;
        block.classList.add('is-collapsed');
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                if (p.scrollHeight > p.clientHeight + 2) {
                    btn.hidden = false;
                    btn.setAttribute('aria-expanded', 'false');
                } else {
                    block.classList.remove('is-collapsed');
                    btn.hidden = true;
                }
            });
        });
    });
}

function initProjectDescriptionUI() {
    const grid = document.getElementById('projects-grid');
    if (!grid || grid.dataset.descriptionUiInit === '1') return;
    grid.dataset.descriptionUiInit = '1';
    grid.addEventListener('click', function (e) {
        const btn = e.target.closest('.project-description-toggle');
        if (!btn || btn.hidden) return;
        e.preventDefault();
        const block = btn.closest('.project-description-block');
        if (!block) return;
        block.classList.toggle('is-collapsed');
        const collapsed = block.classList.contains('is-collapsed');
        btn.textContent = collapsed ? 'Ver más' : 'Ver menos';
        btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    });
}

function initProjectGalleries() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.addEventListener('click', function (e) {
        const zone = e.target.closest('.project-gallery-zone');
        if (!zone) return;
        e.preventDefault();
        const gallery = zone.closest('.project-gallery');
        if (!gallery) return;
        const projectIndex = parseInt(gallery.dataset.projectIndex, 10);
        if (Number.isNaN(projectIndex)) return;
        const dir = zone.classList.contains('project-gallery-zone--prev') ? -1 : 1;
        galleryStep(projectIndex, dir);
    });
    grid.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        const gallery = e.target.closest('.project-gallery');
        if (!gallery || !grid.contains(gallery)) return;
        e.preventDefault();
        const projectIndex = parseInt(gallery.dataset.projectIndex, 10);
        if (Number.isNaN(projectIndex)) return;
        const dir = e.key === 'ArrowLeft' ? -1 : 1;
        galleryStep(projectIndex, dir);
    });
}

const lightboxState = { projectIndex: 0, imageIndex: 0, urls: [] };
let lightboxReturnFocus = null;

function getLightboxElements() {
    const root = document.getElementById('project-lightbox');
    if (!root) return null;
    return {
        root: root,
        backdrop: root.querySelector('[data-lightbox-close]'),
        img: root.querySelector('.project-lightbox-img'),
        prev: root.querySelector('.project-lightbox-nav--prev'),
        next: root.querySelector('.project-lightbox-nav--next'),
        counter: root.querySelector('.project-lightbox-counter'),
        title: root.querySelector('.project-lightbox-heading'),
        closeBtn: root.querySelector('.project-lightbox-close')
    };
}

function updateLightboxView() {
    const el = getLightboxElements();
    if (!el) return;
    const project = projects[lightboxState.projectIndex];
    const urls = lightboxState.urls;
    if (!project || urls.length === 0) return;
    const total = urls.length;
    const idx = Math.max(0, Math.min(lightboxState.imageIndex, total - 1));
    lightboxState.imageIndex = idx;
    const url = urls[idx];
    el.img.src = url;
    el.img.alt = String(project.title) + ' — ' + (idx + 1) + '/' + total;
    el.counter.textContent = idx + 1 + '/' + total;
    el.title.textContent = project.title;
    const single = total < 2;
    el.prev.hidden = single;
    el.next.hidden = single;
}

function openProjectLightbox(projectIndex) {
    const project = projects[projectIndex];
    if (!project) return;
    const urls = getProjectImageUrls(project);
    if (urls.length === 0) return;
    const el = getLightboxElements();
    if (!el) return;
    let startIndex = 0;
    const grid = document.getElementById('projects-grid');
    const gallery =
        grid && grid.querySelector('.project-gallery[data-project-index="' + projectIndex + '"]');
    if (gallery) {
        const ci = parseInt(gallery.dataset.currentIndex || '0', 10);
        if (!Number.isNaN(ci) && ci >= 0 && ci < urls.length) {
            startIndex = ci;
        }
    }
    lightboxState.projectIndex = projectIndex;
    lightboxState.imageIndex = startIndex;
    lightboxState.urls = urls;
    lightboxReturnFocus = document.activeElement;
    el.root.hidden = false;
    el.root.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    updateLightboxView();
    el.closeBtn.focus();
}

function lightboxStep(dir) {
    const urls = lightboxState.urls;
    if (urls.length < 2) return;
    let idx = lightboxState.imageIndex + dir;
    if (idx < 0) idx = urls.length - 1;
    else if (idx >= urls.length) idx = 0;
    lightboxState.imageIndex = idx;
    updateLightboxView();
}

function closeProjectLightbox() {
    const el = getLightboxElements();
    if (!el) return;
    el.root.hidden = true;
    el.root.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    el.img.removeAttribute('src');
    el.img.alt = '';
    const ref = lightboxReturnFocus;
    lightboxReturnFocus = null;
    if (ref && typeof ref.focus === 'function') {
        try { ref.focus(); } catch {}
    }
}

function initProjectLightbox() {
    const grid = document.getElementById('projects-grid');
    const el = getLightboxElements();
    if (!grid || !el || el.root.dataset.lightboxBound === '1') return;
    el.root.dataset.lightboxBound = '1';
    grid.addEventListener('click', function (e) {
        const btn = e.target.closest('.project-lightbox-open');
        if (!btn) return;
        e.preventDefault();
        const idx = parseInt(btn.dataset.projectIndex, 10);
        if (Number.isNaN(idx)) return;
        openProjectLightbox(idx);
    });
    el.backdrop.addEventListener('click', closeProjectLightbox);
    el.closeBtn.addEventListener('click', closeProjectLightbox);
    el.prev.addEventListener('click', function () { lightboxStep(-1); });
    el.next.addEventListener('click', function () { lightboxStep(1); });
    document.addEventListener('keydown', function (e) {
        const root = document.getElementById('project-lightbox');
        if (!root || root.hidden) return;
        if (e.key === 'Escape') { e.preventDefault(); closeProjectLightbox(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); lightboxStep(-1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); lightboxStep(1); }
    });
}

/* ========== SCROLL REVEAL ========== */
function bindScrollReveal() {
    if (REDUCED_MOTION) {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.remove('reveal--suppress');
            el.classList.add('is-visible');
        });
        return;
    }
    if (!window.__scrollRevealIo) {
        window.__scrollRevealIo = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('reveal--suppress');
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
        );
    }
    document.querySelectorAll('.reveal').forEach(function (el) {
        window.__scrollRevealIo.observe(el);
    });
}

/* ========== HEADER SCROLLED ========== */
function initHeaderScrolled() {
    const header = document.getElementById('site-header');
    if (!header) return;
    const handle = function () {
        if (window.scrollY > 8) header.classList.add('is-scrolled');
        else header.classList.remove('is-scrolled');
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
}

/* ========== SCROLL PROGRESS ========== */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;
    let ticking = false;
    const update = function () {
        const h = document.documentElement;
        const scrolled = h.scrollTop || document.body.scrollTop;
        const max = (h.scrollHeight - h.clientHeight) || 1;
        const pct = Math.min(100, Math.max(0, (scrolled / max) * 100));
        bar.style.width = pct + '%';
        ticking = false;
    };
    update();
    window.addEventListener(
        'scroll',
        function () {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        },
        { passive: true }
    );
    window.addEventListener('resize', update);
}

/* ========== TYPING ROTATOR ========== */
function initTypingRotator() {
    const target = document.getElementById('typing-target');
    if (!target) return;
    const phrases = [
        'dotnet run --project crm',
        'python automate.py --bot whatsapp',
        'docker compose up -d',
        'audit --iso 27001 --scope core',
        'train --strategy SMC --epochs 50'
    ];
    if (REDUCED_MOTION) {
        target.textContent = phrases[0];
        return;
    }
    let pi = 0, ci = 0, deleting = false;
    function tick() {
        const phrase = phrases[pi];
        if (!deleting) {
            ci++;
            target.textContent = phrase.slice(0, ci);
            if (ci >= phrase.length) {
                deleting = true;
                setTimeout(tick, 1700);
                return;
            }
            setTimeout(tick, 55 + Math.random() * 40);
        } else {
            ci--;
            target.textContent = phrase.slice(0, ci);
            if (ci <= 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
                setTimeout(tick, 250);
                return;
            }
            setTimeout(tick, 30);
        }
    }
    setTimeout(tick, 600);
}

/* ========== STATS COUNTER ========== */
function initStatsCounter() {
    const nodes = document.querySelectorAll('[data-counter]');
    if (!nodes.length) return;
    if (REDUCED_MOTION) {
        nodes.forEach(function (el) {
            const target = parseFloat(el.dataset.counter);
            const suffix = el.dataset.suffix || '';
            el.textContent = String(target) + suffix;
        });
        return;
    }
    const animate = function (el) {
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        function step(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.round(target * eased);
            el.textContent = value + suffix;
            if (t < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = '1';
                    animate(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );
    nodes.forEach(function (n) { io.observe(n); });
}

/* ========== MOBILE DRAWER ========== */
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const drawer = document.getElementById('mobile-drawer');
    if (!toggle || !drawer) return;

    const open = function () {
        drawer.hidden = false;
        drawer.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(function () { drawer.classList.add('is-open'); });
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        const firstLink = drawer.querySelector('a, button');
        if (firstLink) setTimeout(function () { firstLink.focus(); }, 250);
    };
    const close = function () {
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        setTimeout(function () {
            drawer.hidden = true;
            drawer.setAttribute('aria-hidden', 'true');
        }, 350);
        toggle.focus();
    };

    toggle.addEventListener('click', function () {
        if (drawer.classList.contains('is-open')) close();
        else open();
    });
    drawer.addEventListener('click', function (e) {
        if (e.target.matches('[data-drawer-close]') || e.target.closest('[data-drawer-close]')) {
            close();
        }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });
    window.addEventListener('resize', function () {
        if (window.innerWidth > 900 && drawer.classList.contains('is-open')) close();
    });
}

/* ========== FLOATING LABELS COUNTER ========== */
function initFormCounter() {
    const ta = document.getElementById('message');
    const counter = document.getElementById('message-counter');
    if (!ta || !counter) return;
    const update = function () {
        counter.textContent = (ta.value.length || 0) + ' / ' + (ta.maxLength || 8000);
    };
    ta.addEventListener('input', update);
    update();
}

/* ========== BACKGROUND CANVAS NETWORK ========== */
function initBgNetwork() {
    const canvas = document.getElementById('bg-network');
    if (!canvas || REDUCED_MOTION) {
        if (canvas) canvas.style.display = 'none';
        return;
    }
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let nodes = [];
    let mouse = { x: -9999, y: -9999, active: false };
    let rafId = 0;
    let running = true;

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 28 : 52;
    const MAX_DIST = isMobile ? 130 : 170;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeNodes() {
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: 1 + Math.random() * 1.4
            });
        }
    }

    function step() {
        if (!running) return;
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < -10) n.x = w + 10;
            if (n.x > w + 10) n.x = -10;
            if (n.y < -10) n.y = h + 10;
            if (n.y > h + 10) n.y = -10;

            if (mouse.active) {
                const dx = n.x - mouse.x;
                const dy = n.y - mouse.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < 16000) {
                    const f = (1 - d2 / 16000) * 0.04;
                    n.x += dx * f;
                    n.y += dy * f;
                }
            }
        }

        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            for (let j = i + 1; j < nodes.length; j++) {
                const b = nodes[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < MAX_DIST) {
                    const alpha = (1 - d / MAX_DIST) * 0.35;
                    ctx.strokeStyle = 'rgba(52, 211, 153,' + alpha.toFixed(3) + ')';
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            ctx.fillStyle = 'rgba(110, 231, 183, 0.85)';
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fill();
        }

        rafId = requestAnimationFrame(step);
    }

    function start() {
        if (running) return;
        running = true;
        step();
    }
    function stop() {
        running = false;
        cancelAnimationFrame(rafId);
    }

    resize();
    makeNodes();
    step();

    let resizeT;
    window.addEventListener('resize', function () {
        clearTimeout(resizeT);
        resizeT = setTimeout(function () {
            resize();
            makeNodes();
        }, 150);
    });

    window.addEventListener(
        'pointermove',
        function (e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        },
        { passive: true }
    );
    window.addEventListener('pointerleave', function () { mouse.active = false; });
    window.addEventListener('blur', function () { mouse.active = false; });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop();
        else start();
    });
}

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded', function () {
    bindScrollReveal();
    initProjectDescriptionUI();
    renderProjects();
    bindScrollReveal();
    initProjectGalleries();
    initProjectLightbox();
    initializeForm();
    initHeaderScrolled();
    initScrollProgress();
    initTypingRotator();
    initStatsCounter();
    initMobileMenu();
    initFormCounter();
    initBgNetwork();
});

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = projects
        .map(function (project, projectIndex) {
            const title = escapeHtml(project.title);
            const description = escapeHtml(project.description);
            const imageUrls = getProjectImageUrls(project);
            const mediaHtml = renderProjectMedia(title, imageUrls, projectIndex);
            const tagsHtml = (project.tags || []).map(renderTagSpan).join('');
            const lightboxBtn =
                '<button type="button" class="project-lightbox-open" data-project-index="' +
                projectIndex +
                '" aria-haspopup="dialog" aria-controls="project-lightbox">Ver imágenes</button>';
            return (
                '<article class="project-card reveal" style="--reveal-delay:' +
                projectIndex * 65 +
                'ms">' +
                mediaHtml +
                '<div class="project-info">' +
                '<h3 class="project-title">' +
                title +
                '</h3>' +
                '<div class="project-description-block">' +
                '<p class="project-description">' +
                description +
                '</p>' +
                '<button type="button" class="project-description-toggle" hidden aria-expanded="false">Ver más</button>' +
                '</div>' +
                '<div class="project-tags">' +
                tagsHtml +
                '</div>' +
                lightboxBtn +
                '</div>' +
                '</article>'
            );
        })
        .join('');
    initProjectDescriptionToggles(grid);
}

function initializeForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const btnLabel = submitBtn ? submitBtn.querySelector('span') : null;
        const statusDiv = document.getElementById('form-status');

        if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'TU_SUPABASE_ANON_KEY_AQUI') {
            showStatus(
                statusDiv,
                'Falta la clave pública de Supabase en index.html (anonKey).',
                'error'
            );
            return;
        }

        const formData = new FormData(form);
        const firstName = String(formData.get('firstName') || '').trim();
        const lastName = String(formData.get('lastName') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const phoneRaw = formData.get('phone');
        const phone = phoneRaw && String(phoneRaw).trim() ? String(phoneRaw).trim() : null;
        const message = String(formData.get('message') || '').trim();

        if (!firstName || !lastName || !email || !message) {
            showStatus(statusDiv, 'Por favor, completá todos los campos requeridos.', 'error');
            return;
        }

        const row = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            message: message,
            created_at: new Date().toISOString()
        };

        const baseUrl = String(SUPABASE_URL || '').replace(/\/+$/, '');
        const insertUrl = baseUrl + '/rest/v1/' + encodeURIComponent(CONTACT_TABLE);

        submitBtn.disabled = true;
        if (btnLabel) btnLabel.textContent = 'Enviando...';
        showStatus(statusDiv, '', 'hidden');

        try {
            const res = await fetch(insertUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
                    Prefer: 'return=minimal'
                },
                body: JSON.stringify([row])
            });

            if (!res.ok) {
                const detail = await res.text();
                console.error('Contacto REST:', res.status, detail);
                throw new Error(detail || String(res.status));
            }

            showStatus(statusDiv, '¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
            form.reset();
            const counter = document.getElementById('message-counter');
            if (counter) counter.textContent = '0 / 8000';
        } catch (err) {
            console.error('Supabase contacts:', err);
            showStatus(
                statusDiv,
                'No se pudo guardar el mensaje. Revisá la consola (F12) y las políticas RLS de la tabla contacts.',
                'error'
            );
        } finally {
            submitBtn.disabled = false;
            if (btnLabel) btnLabel.textContent = 'Enviar mensaje';
        }
    });
}

function showStatus(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = 'form-status';
    if (type === 'success') {
        element.classList.add('success');
        element.style.display = 'block';
    } else if (type === 'error') {
        element.classList.add('error');
        element.style.display = 'block';
    } else if (type === 'hidden') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}

/* Smooth-scroll para links internos (header offset ya gestionado por scroll-padding-top) */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: REDUCED_MOTION ? 'auto' : 'smooth', block: 'start' });
    });
});
