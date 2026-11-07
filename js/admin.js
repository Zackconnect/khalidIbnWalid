const STORAGE_KEY = 'khalid-ibn-walid-crm-records';

const defaultRecords = [
    { id: '1', name: 'Abdul Rahman', program: 'Primary', status: 'Accepted', fee: 3450, owner: 'H. Mumin' },
    { id: '2', name: 'Naima Yusuf', program: 'JHS', status: 'Interview', fee: 2900, owner: 'A. Ibrahim' },
    { id: '3', name: 'Abdullah Ali', program: 'SHS', status: 'Application', fee: 4200, owner: 'S. Salisu' },
    { id: '4', name: 'Fatima Sule', program: 'Arabic', status: 'Active', fee: 1800, owner: 'H. Mumin' },
    { id: '5', name: 'Omar Nuhu', program: 'KG', status: 'Pending', fee: 2250, owner: 'R. Momoh' }
];

const searchInput = document.querySelector('[data-search]');
const statusFilter = document.querySelector('[data-status-filter]');
const tableBody = document.querySelector('[data-table-body]');
const addRecordButton = document.querySelector('[data-add-record]');
const recordModal = document.querySelector('[data-record-modal]');
const recordForm = document.querySelector('[data-record-form]');
const recordIdInput = document.querySelector('[data-record-id]');
const formTitle = document.querySelector('#record-form-title');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const navItems = document.querySelectorAll('.nav-item');

let records = loadRecords();

function loadRecords() {
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            return [...defaultRecords];
        }

        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length ? parsed : [...defaultRecords];
    } catch (error) {
        return [...defaultRecords];
    }
}

function persistRecords() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function getStatusClass(status) {
    const map = {
        Accepted: 'success',
        Active: 'success',
        Interview: 'pending',
        Application: 'review',
        Pending: 'warning'
    };

    return map[status] || 'pending';
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

function renderRecords() {
    if (!tableBody) {
        return;
    }

    const term = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const filter = statusFilter ? statusFilter.value : 'all';

    const filteredRecords = records.filter((record) => {
        const matchesStatus = filter === 'all' || record.status === filter;
        const matchesText = !term || [record.name, record.program, record.owner, record.status]
            .join(' ')
            .toLowerCase()
            .includes(term);

        return matchesStatus && matchesText;
    });

    if (!filteredRecords.length) {
        tableBody.innerHTML = '<tr><td colspan="6" class="empty-state">No records match your search.</td></tr>';
        return;
    }

    tableBody.innerHTML = filteredRecords.map((record) => `
        <tr>
            <td>${escapeHtml(record.name)}</td>
            <td>${escapeHtml(record.program)}</td>
            <td><span class="tag ${getStatusClass(record.status)}">${escapeHtml(record.status)}</span></td>
            <td>${formatCurrency(record.fee)}</td>
            <td>${escapeHtml(record.owner)}</td>
            <td>
                <div class="table-actions">
                    <button class="table-action edit" type="button" data-action="edit" data-id="${escapeHtml(record.id)}">Edit</button>
                    <button class="table-action delete" type="button" data-action="delete" data-id="${escapeHtml(record.id)}">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

const SUBMISSIONS_STORAGE_KEY = 'khalid-ibn-walid-submissions';
const submissionsBody = document.querySelector('[data-submissions-body]');
const submissionFilter = document.querySelector('[data-submission-filter-select]');
const submissionCount = document.querySelector('[data-submission-count]');
const submissionsMessage = document.querySelector('[data-submissions-message]');
let submissions = loadSubmissions();

function loadSubmissions() {
    try {
        const saved = window.localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
        if (!saved) {
            return [];
        }

        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) {
            throw new Error('Stored submissions are not in the expected format.');
        }

        return parsed;
    } catch (error) {
        console.error('Unable to load website submissions.', error);
        return [];
    }
}

function persistSubmissions() {
    try {
        window.localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions));
        return true;
    } catch (error) {
        console.error('Unable to save website submissions.', error);
        return false;
    }
}

function setSubmissionsMessage(message) {
    if (submissionsMessage) {
        submissionsMessage.textContent = message;
    }
}

function submissionTypeLabel(type) {
    const labels = {
        message: 'Message',
        donation: 'Donation request',
        zakat: 'Zakat request',
        qurbani: 'Layyah request',
        admission: 'Admission'
    };

    return labels[type] || 'Website request';
}

function submissionName(submission) {
    const data = submission.data || {};
    return data.contactName || data.donorName || data.zakatName || data.qurbaniName
        || data.firstName && `${data.firstName} ${data.lastName || ''}`.trim()
        || data.parentName
        || 'Website visitor';
}

function submissionContact(submission) {
    const data = submission.data || {};
    const email = data.contactEmail || data.donorEmail || data.zakatEmail || data.qurbaniEmail || data.email || '';
    const phone = data.contactPhone || data.donorPhone || data.zakatPhone || data.qurbaniPhone || data.phone || '';
    return [email, phone].filter(Boolean).join(' · ') || 'No contact provided';
}

function submissionSummary(submission) {
    const data = submission.data || {};
    if (submission.type === 'message') {
        return data.contactSubject || 'General inquiry';
    }
    if (submission.type === 'admission') {
        return data.programme || 'Admission application';
    }
    if (submission.type === 'qurbani') {
        return `${data.quantity || 1} × ${data.animalType || 'Animal'} · ${formatCurrency(Number(data.amount) || 0)}`;
    }
    if (submission.type === 'zakat') {
        return `${data.zakatType || 'Zakat'} · ${formatCurrency(Number(data.zakatAmount) || 0)}`;
    }
    if (submission.type === 'donation') {
        return `${data.donationType || 'Donation'} · ${formatCurrency(Number(data.amount) || 0)}`;
    }
    return 'Website submission';
}

function submissionDetails(data) {
    const entries = Object.entries(data || {}).filter(([, value]) => value !== '' && value !== null && value !== undefined);
    if (!entries.length) {
        return '<p>No additional details.</p>';
    }

    return `<dl class="submission-details">${entries.map(([key, value]) => `
        <div><dt>${escapeHtml(key.replace(/([A-Z])/g, ' $1'))}</dt><dd>${escapeHtml(value === 'on' ? 'Yes' : value)}</dd></div>
    `).join('')}</dl>`;
}

function matchesSubmissionFilter(type, filter) {
    if (filter === 'all') return true;
    if (filter === 'donations') return type === 'donation' || type === 'zakat';
    if (filter === 'finance') return type === 'donation' || type === 'zakat' || type === 'qurbani';
    return type === filter;
}

function renderSubmissions() {
    if (!submissionsBody) {
        return;
    }

    const term = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const filter = submissionFilter ? submissionFilter.value : 'all';
    const visibleSubmissions = submissions.filter((submission) => {
        const searchableText = [
            submissionTypeLabel(submission.type),
            submissionName(submission),
            submissionContact(submission),
            submissionSummary(submission),
            JSON.stringify(submission.data || {})
        ].join(' ').toLowerCase();

        return matchesSubmissionFilter(submission.type, filter) && (!term || searchableText.includes(term));
    });

    const newCount = submissions.filter((submission) => submission.status === 'New').length;
    if (submissionCount) {
        submissionCount.textContent = `${submissions.length} submissions · ${newCount} new`;
    }

    if (!visibleSubmissions.length) {
        submissionsBody.innerHTML = '<tr><td colspan="6" class="empty-state">No website submissions yet. New form entries will appear here.</td></tr>';
        return;
    }

    submissionsBody.innerHTML = visibleSubmissions.map((submission) => {
        const detailsId = `submission-details-${escapeHtml(submission.id)}`;
        const submittedAt = new Date(submission.submittedAt);
        const dateLabel = Number.isNaN(submittedAt.getTime())
            ? 'Unknown date'
            : submittedAt.toLocaleString();
        const status = submission.status === 'Reviewed' ? 'Reviewed' : 'New';

        return `
            <tr>
                <td><span class="tag ${status === 'New' ? 'warning' : 'success'}">${escapeHtml(submissionTypeLabel(submission.type))}</span></td>
                <td><strong>${escapeHtml(submissionName(submission))}</strong><small class="submission-contact">${escapeHtml(submissionContact(submission))}</small></td>
                <td>${escapeHtml(submissionSummary(submission))}</td>
                <td>${escapeHtml(dateLabel)}</td>
                <td><span class="tag ${status === 'New' ? 'warning' : 'success'}">${status}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="table-action edit" type="button" data-submission-action="details" data-id="${escapeHtml(submission.id)}" aria-expanded="false" aria-controls="${detailsId}">Details</button>
                        <button class="table-action" type="button" data-submission-action="toggle-status" data-id="${escapeHtml(submission.id)}">${status === 'New' ? 'Review' : 'Mark new'}</button>
                        <button class="table-action delete" type="button" data-submission-action="delete" data-id="${escapeHtml(submission.id)}">Delete</button>
                    </div>
                </td>
            </tr>
            <tr id="${detailsId}" class="submission-details-row" hidden>
                <td colspan="6">${submissionDetails(submission.data)}</td>
            </tr>
        `;
    }).join('');
}

function closeModal() {
    if (!recordModal) {
        return;
    }

    recordModal.classList.remove('is-open');
    recordModal.setAttribute('aria-hidden', 'true');
    recordForm.reset();
    recordIdInput.value = '';
    formTitle.textContent = 'Manage applicant';
}

function openModal(record = null) {
    if (!recordModal || !recordForm) {
        return;
    }

    const nameField = recordForm.querySelector('[name="name"]');
    const programField = recordForm.querySelector('[name="program"]');
    const statusField = recordForm.querySelector('[name="status"]');
    const feeField = recordForm.querySelector('[name="fee"]');
    const ownerField = recordForm.querySelector('[name="owner"]');

    recordForm.reset();

    if (record) {
        formTitle.textContent = 'Edit applicant';
        recordIdInput.value = record.id;
        nameField.value = record.name;
        programField.value = record.program;
        statusField.value = record.status;
        feeField.value = record.fee;
        ownerField.value = record.owner;
    } else {
        formTitle.textContent = 'Add new applicant';
        recordIdInput.value = '';
    }

    recordModal.classList.add('is-open');
    recordModal.setAttribute('aria-hidden', 'false');
    nameField.focus();
}

function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(recordForm);
    const record = {
        id: formData.get('id') || createRecordId(),
        name: String(formData.get('name') || '').trim(),
        program: String(formData.get('program') || '').trim(),
        status: String(formData.get('status') || 'Pending').trim(),
        fee: Number(formData.get('fee') || 0),
        owner: String(formData.get('owner') || '').trim()
    };

    if (!record.name || !record.program || !record.owner || record.fee < 0) {
        return;
    }

    const exists = records.some((item) => item.id === record.id);
    if (exists) {
        records = records.map((item) => (item.id === record.id ? record : item));
    } else {
        records.unshift(record);
    }

    persistRecords();
    renderRecords();
    closeModal();
}

function createRecordId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return window.crypto.randomUUID();
    }

    return `record-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

if (searchInput) {
    searchInput.addEventListener('input', () => {
        renderRecords();
        renderSubmissions();
    });
}

if (statusFilter) {
    statusFilter.addEventListener('change', renderRecords);
}

if (addRecordButton) {
    addRecordButton.addEventListener('click', () => openModal());
}

if (tableBody) {
    tableBody.addEventListener('click', (event) => {
        const button = event.target.closest('[data-action]');
        if (!button) {
            return;
        }

        const recordId = button.dataset.id;
        const record = records.find((item) => item.id === recordId);
        if (!record) {
            return;
        }

        if (button.dataset.action === 'edit') {
            openModal(record);
            return;
        }

        if (button.dataset.action === 'delete') {
            const confirmed = window.confirm(`Delete ${record.name} from the applicant list?`);
            if (!confirmed) {
                return;
            }

            records = records.filter((item) => item.id !== recordId);
            persistRecords();
            renderRecords();
        }
    });
}

if (recordForm) {
    recordForm.addEventListener('submit', handleFormSubmit);
}

closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
});

if (recordModal) {
    recordModal.addEventListener('click', (event) => {
        if (event.target === recordModal || event.target.classList.contains('record-modal__backdrop')) {
            closeModal();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && recordModal && recordModal.classList.contains('is-open')) {
        closeModal();
    }
});

const galleryApi = window.KWGallery;
const galleryManagerGrid = document.querySelector('[data-gallery-manager-grid]');
const galleryMessage = document.querySelector('[data-gallery-message]');
const galleryModal = document.querySelector('[data-gallery-modal]');
const galleryForm = document.querySelector('[data-gallery-form]');
const galleryAddButton = document.querySelector('[data-add-gallery-item]');
const galleryCloseButtons = document.querySelectorAll('[data-close-gallery-modal]');
const galleryFormError = document.querySelector('[data-gallery-form-error]');
const galleryFormTitle = document.querySelector('#gallery-form-title');
let galleryItems = galleryApi ? galleryApi.loadItems() : [];

function setGalleryMessage(message, isError = false) {
    if (!galleryMessage) {
        return;
    }

    galleryMessage.textContent = message;
    galleryMessage.classList.toggle('is-error', isError);
}

function renderGalleryManager() {
    if (!galleryApi || !galleryManagerGrid) {
        return;
    }

    if (!galleryItems.length) {
        galleryManagerGrid.innerHTML = '<p class="gallery-manager__empty">Your gallery is empty. Add an image to start building it.</p>';
        return;
    }

    galleryManagerGrid.innerHTML = galleryItems.map((item, index) => {
        const preview = galleryApi.isSafeImageSource(item.image)
            ? `<img src="${galleryApi.escapeHtml(item.image)}" alt="">`
            : galleryApi.escapeHtml(item.icon || '✦');

        return `
            <article class="gallery-admin-card">
                <div class="gallery-admin-card__image">${preview}</div>
                <div class="gallery-admin-card__content">
                    <h3 class="gallery-admin-card__title">${galleryApi.escapeHtml(item.title)}</h3>
                    <span class="gallery-admin-card__category">${galleryApi.escapeHtml(galleryApi.categories[item.category] || 'Gallery')}</span>
                    <div class="gallery-admin-card__actions">
                        <button class="table-action edit" type="button" data-gallery-action="edit" data-id="${galleryApi.escapeHtml(item.id)}">Edit</button>
                        <button class="table-action delete" type="button" data-gallery-action="delete" data-id="${galleryApi.escapeHtml(item.id)}">Delete</button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function openGalleryModal(item = null) {
    if (!galleryForm || !galleryModal) {
        return;
    }

    galleryForm.reset();
    galleryFormError.textContent = '';
    galleryForm.querySelector('[name="id"]').value = item ? item.id : '';
    galleryForm.querySelector('[name="currentImage"]').value = item ? item.image || '' : '';
    galleryForm.querySelector('[name="title"]').value = item ? item.title : '';
    galleryForm.querySelector('[name="category"]').value = item ? item.category : 'campus';
    galleryForm.querySelector('[name="icon"]').value = item ? item.icon || '✦' : '✦';
    galleryForm.querySelector('[name="imageUrl"]').value = item && item.image && !item.image.startsWith('data:')
        ? item.image
        : '';
    galleryFormTitle.textContent = item ? 'Edit gallery item' : 'Add gallery image';
    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');
    galleryForm.querySelector('[name="title"]').focus();
}

function closeGalleryModal() {
    if (!galleryModal || !galleryForm) {
        return;
    }

    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
    galleryForm.reset();
    galleryFormError.textContent = '';
}

function resizeGalleryImage(file) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject(new Error('Choose a valid image file.'));
            return;
        }

        if (file.size > 4 * 1024 * 1024) {
            reject(new Error('Choose an image smaller than 4 MB.'));
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        const image = new Image();
        image.onload = () => {
            const maxDimension = 1440;
            const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
            canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
            canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(objectUrl);
            resolve(canvas.toDataURL('image/jpeg', 0.78));
        };
        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('This image could not be opened. Try another file.'));
        };
        image.src = objectUrl;
    });
}

async function handleGalleryFormSubmit(event) {
    event.preventDefault();
    galleryFormError.textContent = '';

    const formData = new FormData(galleryForm);
    const id = String(formData.get('id') || createRecordId());
    const currentItem = galleryItems.find((item) => item.id === id);
    const imageFile = galleryForm.querySelector('[name="imageFile"]').files[0];
    const imageUrl = String(formData.get('imageUrl') || '').trim();
    let image = String(formData.get('currentImage') || '');

    try {
        if (formData.get('removeImage')) {
            image = '';
        } else if (imageFile) {
            image = await resizeGalleryImage(imageFile);
        } else if (imageUrl) {
            image = imageUrl;
        }

        if (image && !galleryApi.isSafeImageSource(image)) {
            throw new Error('Use an HTTP or HTTPS image URL, or upload an image file.');
        }

        const item = {
            id,
            title: String(formData.get('title') || '').trim(),
            category: String(formData.get('category') || ''),
            icon: String(formData.get('icon') || '✦').trim() || '✦',
            image
        };

        if (!item.title || !galleryApi.categories[item.category]) {
            throw new Error('Enter a title and select a valid gallery section.');
        }

        const nextItems = currentItem
            ? galleryItems.map((existing) => existing.id === id ? item : existing)
            : [item, ...galleryItems];

        if (!galleryApi.saveItems(nextItems)) {
            throw new Error('The gallery could not be saved in this browser. Remove a large image or use a smaller one and try again.');
        }

        galleryItems = nextItems;
        renderGalleryManager();
        setGalleryMessage(`${item.title} saved. It will appear on the public gallery page in this browser.`);
        closeGalleryModal();
    } catch (error) {
        galleryFormError.textContent = error.message || 'The gallery item could not be saved.';
    }
}

if (galleryAddButton) {
    galleryAddButton.addEventListener('click', () => openGalleryModal());
}

if (galleryManagerGrid) {
    galleryManagerGrid.addEventListener('click', (event) => {
        const button = event.target.closest('[data-gallery-action]');
        if (!button) {
            return;
        }

        const item = galleryItems.find((entry) => entry.id === button.dataset.id);
        if (!item) {
            return;
        }

        if (button.dataset.galleryAction === 'edit') {
            openGalleryModal(item);
            return;
        }

        if (button.dataset.galleryAction === 'delete' && window.confirm(`Delete "${item.title}" from the gallery?`)) {
            const nextItems = galleryItems.filter((entry) => entry.id !== item.id);
            if (!galleryApi.saveItems(nextItems)) {
                setGalleryMessage('The gallery could not be saved in this browser. Try removing a large image first.', true);
                return;
            }

            galleryItems = nextItems;
            renderGalleryManager();
            setGalleryMessage(`"${item.title}" was deleted from the gallery.`);
        }
    });
}

if (galleryForm) {
    galleryForm.addEventListener('submit', handleGalleryFormSubmit);
}

galleryCloseButtons.forEach((button) => button.addEventListener('click', closeGalleryModal));

if (galleryModal) {
    galleryModal.addEventListener('click', (event) => {
        if (event.target === galleryModal || event.target.classList.contains('record-modal__backdrop')) {
            closeGalleryModal();
        }
    });
}

window.addEventListener('storage', (event) => {
    if (event.key === 'khalid-ibn-walid-gallery' && galleryApi) {
        galleryItems = galleryApi.loadItems();
        renderGalleryManager();
    }

    if (event.key === SUBMISSIONS_STORAGE_KEY) {
        submissions = loadSubmissions();
        renderSubmissions();
    }
});

if (submissionFilter) {
    submissionFilter.addEventListener('change', renderSubmissions);
}

if (submissionsBody) {
    submissionsBody.addEventListener('click', (event) => {
        const button = event.target.closest('[data-submission-action]');
        if (!button) {
            return;
        }

        const submission = submissions.find((item) => item.id === button.dataset.id);
        if (!submission) {
            return;
        }

        if (button.dataset.submissionAction === 'details') {
            const detailsRow = document.getElementById(button.getAttribute('aria-controls'));
            if (detailsRow) {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', String(!isExpanded));
                detailsRow.hidden = isExpanded;
            }
            return;
        }

        if (button.dataset.submissionAction === 'toggle-status') {
            const previousStatus = submission.status;
            submission.status = previousStatus === 'New' ? 'Reviewed' : 'New';
            if (!persistSubmissions()) {
                submission.status = previousStatus;
                setSubmissionsMessage('Could not update the submission in browser storage.');
                return;
            }
            setSubmissionsMessage('');
            renderSubmissions();
            return;
        }

        if (button.dataset.submissionAction === 'delete'
            && window.confirm(`Delete this ${submissionTypeLabel(submission.type).toLowerCase()} from the inbox?`)) {
            const previousSubmissions = submissions;
            submissions = submissions.filter((item) => item.id !== submission.id);
            if (!persistSubmissions()) {
                submissions = previousSubmissions;
                renderSubmissions();
                setSubmissionsMessage('Could not delete the submission from browser storage.');
                return;
            }
            setSubmissionsMessage('');
            renderSubmissions();
        }
    });
}

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        navItems.forEach((node) => node.classList.remove('active'));
        item.classList.add('active');

        if (item.dataset.submissionFilter && submissionFilter) {
            submissionFilter.value = item.dataset.submissionFilter;
            renderSubmissions();
        }

        const targetId = item.dataset.navTarget;
        if (targetId) {
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

renderRecords();
renderGalleryManager();
renderSubmissions();
