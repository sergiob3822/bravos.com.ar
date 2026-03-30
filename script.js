// Configuración de Supabase
// Para desarrollo local: reemplaza los valores de abajo con tus credenciales
// En Vercel: usa Variables de Entorno (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
const SUPABASE_URL = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_URL) || 'TU_SUPABASE_URL_AQUI';
const SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) || 'TU_SUPABASE_ANON_KEY_AQUI';

const projects = []; // Agregá tus proyectos aquí

document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    initializeForm();
});

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = projects.map(project => `
        <article class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">Ver proyecto →</a>` : ''}
            </div>
        </article>
    `).join('');
}

async function initializeForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    if (SUPABASE_URL === 'TU_SUPABASE_URL_AQUI' || SUPABASE_ANON_KEY === 'TU_SUPABASE_ANON_KEY_AQUI') {
        console.warn('Supabase no configurado');
        return;
    }

    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        form.addEventListener('submit', async function(e) {
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
                const { error } = await supabase
                    .from('contacts')
                    .insert([data]);

                if (error) throw error;

                showStatus(statusDiv, '¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
                form.reset();
            } catch (error) {
                console.error('Error:', error);
                showStatus(statusDiv, 'Hubo un error al enviar el mensaje. Por favor, intentá de nuevo.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar mensaje';
            }
        });
    } catch (error) {
        console.error('Error cargando Supabase:', error);
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        if (href === '#') {
            // Scroll al inicio de la página
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
