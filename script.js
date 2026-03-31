const SUPABASE_URL =
    (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_URL) ||
    'TU_SUPABASE_URL_AQUI';
const SUPABASE_ANON_KEY =
    (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
    'TU_SUPABASE_ANON_KEY_AQUI';

const DEFAULT_PROJECT_IMAGE =
    'data:image/svg+xml,' +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="#111916" width="600" height="400"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#34d399" font-family="ui-monospace,monospace" font-size="18">imagen</text></svg>'
    );

const TAG_HINTS = {
    Python:
        'Lenguaje multiparadigma; muy usado en automatización, datos, APIs y scripting.',
    'C#':
        'Lenguaje de Microsoft orientado a objetos para .NET: apps de escritorio, web y servicios.',
    'C++':
        'Lenguaje de sistemas y alto rendimiento; usado en motores, sistemas embebidos y software crítico.',
    JavaScript:
        'Lenguaje del navegador y de Node.js; impulsa interfaces y backends con un solo ecosistema.',
    TypeScript:
        'JavaScript con tipos estáticos; mejora mantenibilidad en proyectos grandes.',
    'Net 8':
        'Plataforma actual de .NET para ejecutar apps multiplataforma y APIs de alto rendimiento.',
    '.NET':
        'Ecosistema Microsoft (runtime, librerías) para construir apps y servicios en varios lenguajes.',
    PostgreSQL:
        'Base de datos relacional open source; soporta SQL avanzado, JSON y alta integridad de datos.',
    MySQL:
        'Base de datos relacional muy popular en web; buena para lecturas rápidas y despliegues típicos.',
    MongoDB:
        'Base de datos orientada a documentos (NoSQL); flexible para datos semiestructurados.',
    Docker:
        'Contenedores para empaquetar y desplegar apps con el mismo entorno en cualquier máquina.',
    Kubernetes:
        'Orquestación de contenedores a escala: despliegue, balanceo y recuperación automática.',
    Django:
        'Framework web Python “batteries included”: ORM, admin, auth y buenas prácticas integradas.',
    Flask:
        'Microframework web en Python; ligero y flexible para APIs y servicios pequeños.',
    FastAPI:
        'Framework Python moderno para APIs asíncronas, con validación y documentación automática.',
    Tkinter:
        'Toolkit estándar de Python para interfaces gráficas de escritorio multiplataforma.',
    PyTorch:
        'Biblioteca de aprendizaje profundo; muy usada en investigación y modelos con tensores.',
    React:
        'Biblioteca de Facebook para interfaces declarativas; se basa en componentes y un DOM virtual.',
    'Vue.js':
        'Framework progresivo para SPAs; curva de aprendizaje suave y ecosistema maduro.',
    'Node.js':
        'Runtime de JavaScript en servidor; ideal para APIs, tiempo real y herramientas JS full-stack.',
    Redis:
        'Almacén en memoria; usado como caché, colas y datos de sesión de muy baja latencia.',
    GraphQL:
        'Lenguaje de consulta para APIs: el cliente pide exactamente los campos que necesita.',
    'REST API':
        'Estilo de API HTTP con recursos y verbos (GET/POST); el estándar más extendido en la web.',
    Git:
        'Sistema de control de versiones distribuido; base de flujos de trabajo y colaboración en código.',
    Linux:
        'Kernel y entornos tipo Unix; base de servidores, embebidos y mucha infraestructura cloud.',
    AWS:
        'Nube de Amazon: cómputo, almacenamiento y servicios gestionados bajo demanda.',
    Azure:
        'Nube de Microsoft; integración fuerte con .NET, Active Directory y herramientas empresariales.',
    Tailwind:
        'Framework CSS utility-first; estilos rápidos componiendo clases en el HTML.',
    Supabase:
        'Backend como servicio: PostgreSQL, auth y APIs auto-generadas al estilo Firebase open source.',
    Stripe:
        'Pasarela de pagos online; maneja suscripciones, facturas y cumplimiento PCI.',
    'Evolution API':
        'API para integrar WhatsApp en flujos propios; suele usarse con instancias y webhooks.',
    Chatwoot:
        'Plataforma open source de atención al cliente y buzón omnicanal (chat, redes, etc.).',
    Ollama:
        'Ejecuta modelos de lenguaje localmente; útil para IA privada sin depender solo de la nube.',
    OCR:
        'Reconocimiento óptico de caracteres: extrae texto de imágenes o PDFs escaneados.',
    'ISO 27001':
        'Norma para implementar un sistema de gestión de seguridad de la información (ISMS).',
    'ISO 27002':
        'Catálogo de controles de seguridad (accesos, registro, continuidad, etc.) alineado al 27001.',
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

const lightboxState = {
    projectIndex: 0,
    imageIndex: 0,
    urls: []
};

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
        try {
            ref.focus();
        } catch {
        }
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
    el.backdrop.addEventListener('click', function () {
        closeProjectLightbox();
    });
    el.closeBtn.addEventListener('click', function () {
        closeProjectLightbox();
    });
    el.prev.addEventListener('click', function () {
        lightboxStep(-1);
    });
    el.next.addEventListener('click', function () {
        lightboxStep(1);
    });
    document.addEventListener('keydown', function (e) {
        const root = document.getElementById('project-lightbox');
        if (!root || root.hidden) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            closeProjectLightbox();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            lightboxStep(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            lightboxStep(1);
        }
    });
}

function bindScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
                    } else {
                        entry.target.classList.add('reveal--suppress');
                        entry.target.classList.remove('is-visible');
                        requestAnimationFrame(function () {
                            entry.target.classList.remove('reveal--suppress');
                        });
                    }
                });
            },
            { rootMargin: '0px', threshold: 0.05 }
        );
    }
    document.querySelectorAll('.reveal').forEach(function (el) {
        window.__scrollRevealIo.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    bindScrollReveal();
    initProjectDescriptionUI();
    renderProjects();
    bindScrollReveal();
    initProjectGalleries();
    initProjectLightbox();
    initializeForm();
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

async function initializeForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    if (SUPABASE_URL === 'TU_SUPABASE_URL_AQUI' || SUPABASE_ANON_KEY === 'TU_SUPABASE_ANON_KEY_AQUI') {
        return;
    }

    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector('.btn-submit');
            const statusDiv = document.getElementById('form-status');
            const formData = new FormData(form);
            const data = {
                first_name: formData.get('firstName'),
                last_name: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone') || null,
                message: formData.get('message'),
                created_at: new Date().toISOString()
            };

            if (!data.first_name || !data.last_name || !data.email || !data.message) {
                showStatus(statusDiv, 'Por favor, completá todos los campos requeridos.', 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            showStatus(statusDiv, '', 'hidden');

            try {
                const { error } = await supabase.from('contacts').insert([data]);

                if (error) throw error;

                showStatus(statusDiv, '¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
                form.reset();
            } catch {
                showStatus(
                    statusDiv,
                    'Hubo un error al enviar el mensaje. Por favor, intentá de nuevo.',
                    'error'
                );
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar mensaje';
            }
        });
    } catch {
        return;
    }
}

function showStatus(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = 'form-status';
    if (type === 'success') {
        element.classList.add('success');
    } else if (type === 'error') {
        element.classList.add('error');
    } else if (type === 'hidden') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        if (href === '#') {
            window.scrollTo(0, 0);
        } else {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'auto',
                    block: 'start'
                });
            }
        }
    });
});
