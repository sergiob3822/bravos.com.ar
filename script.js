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

const projects = [];

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeHttpUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (trimmed === '' || trimmed === '#') return '';
    try {
        const parsed = new URL(trimmed);
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.href;
    } catch {
        return '';
    }
    return '';
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

document.addEventListener('DOMContentLoaded', function () {
    renderProjects();
    initializeForm();
});

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = projects
        .map(function (project) {
            const title = escapeHtml(project.title);
            const description = escapeHtml(project.description);
            const imageSrc = sanitizeImageUrl(project.image) || DEFAULT_PROJECT_IMAGE;
            const tagsHtml = (project.tags || [])
                .map(function (tag) {
                    return '<span class="tag">' + escapeHtml(tag) + '</span>';
                })
                .join('');
            const safeLink = sanitizeHttpUrl(project.link);
            const linkHtml = safeLink
                ? '<a href="' +
                  escapeHtml(safeLink) +
                  '" target="_blank" rel="noopener noreferrer" class="project-link">Ver proyecto →</a>'
                : '';
            return (
                '<article class="project-card">' +
                '<img src="' +
                escapeHtml(imageSrc) +
                '" alt="' +
                title +
                '" class="project-image" loading="lazy" decoding="async">' +
                '<div class="project-info">' +
                '<h3 class="project-title">' +
                title +
                '</h3>' +
                '<p class="project-description">' +
                description +
                '</p>' +
                '<div class="project-tags">' +
                tagsHtml +
                '</div>' +
                linkHtml +
                '</div>' +
                '</article>'
            );
        })
        .join('');
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
