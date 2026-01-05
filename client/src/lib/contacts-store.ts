export type ProjectContact = {
    id: string;
    projectId: string;
    name: string;
    description: string;
    phone: string;
};

const STORAGE_KEY = "project_contacts_v1";

function loadAll(): ProjectContact[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed;
    } catch {
        return [];
    }
}

function saveAll(contacts: ProjectContact[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

export function getContactsByProject(projectId: string): ProjectContact[] {
    return loadAll().filter((c) => c.projectId === projectId);
}

export function upsertContact(contact: ProjectContact) {
    const all = loadAll();
    const idx = all.findIndex((c) => c.id === contact.id);
    if (idx === -1) {
        all.unshift(contact);
    } else {
        all[idx] = contact;
    }
    saveAll(all);
}

export function deleteContact(contactId: string) {
    const all = loadAll();
    const next = all.filter((c) => c.id !== contactId);
    saveAll(next);
}
