(function () {
    const STORAGE_KEY = 'khalid-ibn-walid-gallery';
    const categories = {
        campus: 'Campus Life',
        activities: 'Student Activities',
        events: 'Events & Celebrations'
    };

    const defaultItems = [
        { id: 'campus-1', title: 'Main Campus Building', category: 'campus', icon: '🏫' },
        { id: 'campus-2', title: 'Library & Resource Center', category: 'campus', icon: '📚' },
        { id: 'campus-3', title: 'Science Laboratory', category: 'campus', icon: '🔬' },
        { id: 'campus-4', title: 'Computer Lab', category: 'campus', icon: '💻' },
        { id: 'campus-5', title: 'Campus Mosque', category: 'campus', icon: '🕌' },
        { id: 'campus-6', title: 'Classroom Activities', category: 'campus', icon: '🎒' },
        { id: 'campus-7', title: 'Sports & Recreation', category: 'campus', icon: '⚽' },
        { id: 'campus-8', title: 'Quran Recitation', category: 'campus', icon: '📖' },
        { id: 'activity-1', title: 'Cultural Activities', category: 'activities', icon: '🎭' },
        { id: 'activity-2', title: 'Academic Competitions', category: 'activities', icon: '🧠' },
        { id: 'activity-3', title: 'Field Trips', category: 'activities', icon: '🌱' },
        { id: 'activity-4', title: 'Community Service', category: 'activities', icon: '🤝' },
        { id: 'event-1', title: 'Graduation Ceremony', category: 'events', icon: '🎓' },
        { id: 'event-2', title: 'Eid Celebrations', category: 'events', icon: '🌙' },
        { id: 'event-3', title: 'Awards Ceremony', category: 'events', icon: '🏆' },
        { id: 'event-4', title: 'Quran Competition', category: 'events', icon: '📚' }
    ];

    function loadItems() {
        try {
            const saved = window.localStorage.getItem(STORAGE_KEY);
            if (saved === null) {
                return defaultItems.map((item) => ({ ...item }));
            }

            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : defaultItems.map((item) => ({ ...item }));
        } catch (error) {
            return defaultItems.map((item) => ({ ...item }));
        }
    }

    function saveItems(items) {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            return true;
        } catch (error) {
            return false;
        }
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, (character) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[character]);
    }

    function isSafeImageSource(source) {
        if (typeof source !== 'string' || !source) {
            return false;
        }

        if (/^data:image\/(?:jpeg|png|webp|gif);base64,/i.test(source)) {
            return true;
        }

        try {
            const url = new URL(source, window.location.href);
            return url.protocol === 'https:' || url.protocol === 'http:';
        } catch (error) {
            return false;
        }
    }

    function renderPublicGallery() {
        const grids = document.querySelectorAll('[data-gallery-grid]');
        if (!grids.length) {
            return;
        }

        const items = loadItems();
        grids.forEach((grid) => {
            const category = grid.dataset.galleryGrid;
            const categoryItems = items.filter((item) => item.category === category);

            if (!categoryItems.length) {
                grid.innerHTML = '<p class="gallery-empty">No gallery items have been added here yet.</p>';
                return;
            }

            grid.innerHTML = categoryItems.map((item, index) => {
                const visual = isSafeImageSource(item.image)
                    ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">`
                    : `<div class="gallery-placeholder tone-${index % 4}" aria-hidden="true">${escapeHtml(item.icon || '✦')}</div>`;

                return `
                    <article class="gallery-item">
                        ${visual}
                        <div class="gallery-caption">${escapeHtml(item.title)}</div>
                    </article>
                `;
            }).join('');
        });
    }

    window.KWGallery = {
        categories,
        defaultItems,
        escapeHtml,
        isSafeImageSource,
        loadItems,
        renderPublicGallery,
        saveItems
    };

    renderPublicGallery();
    window.addEventListener('storage', (event) => {
        if (event.key === STORAGE_KEY) {
            renderPublicGallery();
        }
    });
})();
