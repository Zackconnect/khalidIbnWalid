(function () {
    'use strict';

    const DATABASE_NAME = 'khalid-ibn-walid-founder-media';
    const STORE_NAME = 'media';
    const ALLOWED_TYPES = new Set([
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'video/mp4',
        'video/webm',
        'video/ogg'
    ]);
    let databasePromise;

    function openDatabase() {
        if (!('indexedDB' in window)) {
            return Promise.reject(new Error('This browser does not support local media storage.'));
        }

        if (!databasePromise) {
            databasePromise = new Promise((resolve, reject) => {
                const request = window.indexedDB.open(DATABASE_NAME, 1);
                request.onupgradeneeded = () => {
                    if (!request.result.objectStoreNames.contains(STORE_NAME)) {
                        request.result.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    }
                };
                request.onsuccess = () => {
                    request.result.onversionchange = () => request.result.close();
                    resolve(request.result);
                };
                request.onerror = () => reject(request.error || new Error('Unable to open local media storage.'));
                request.onblocked = () => reject(new Error('Local media storage is blocked by another open page. Close older site tabs and try again.'));
            }).catch((error) => {
                databasePromise = null;
                throw error;
            });
        }

        return databasePromise;
    }

    async function getAll() {
        const database = await openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(STORE_NAME, 'readonly');
            const request = transaction.objectStore(STORE_NAME).getAll();
            request.onsuccess = () => resolve(request.result.sort((a, b) => b.createdAt - a.createdAt));
            request.onerror = () => reject(request.error || new Error('Unable to load founder media.'));
            transaction.onerror = () => reject(transaction.error || new Error('Unable to load founder media.'));
        });
    }

    async function save(item) {
        if (!item || !item.id || !(item.blob instanceof Blob) || !ALLOWED_TYPES.has(item.mimeType)) {
            throw new Error('Choose a supported photo or video file.');
        }

        const database = await openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(STORE_NAME, 'readwrite');
            transaction.objectStore(STORE_NAME).put(item);
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error || new Error('Unable to save founder media.'));
            transaction.onabort = () => reject(transaction.error || new Error('Saving founder media was cancelled.'));
        });
    }

    async function remove(id) {
        const database = await openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(STORE_NAME, 'readwrite');
            transaction.objectStore(STORE_NAME).delete(id);
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error || new Error('Unable to delete founder media.'));
            transaction.onabort = () => reject(transaction.error || new Error('Deleting founder media was cancelled.'));
        });
    }

    function isSupportedType(type) {
        return ALLOWED_TYPES.has(type);
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

    window.KWFounderMedia = { escapeHtml, getAll, isSupportedType, remove, save };
})();
