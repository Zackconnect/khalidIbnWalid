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
    searchInput.addEventListener('input', renderRecords);
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

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        navItems.forEach((node) => node.classList.remove('active'));
        item.classList.add('active');
    });
});

renderRecords();
