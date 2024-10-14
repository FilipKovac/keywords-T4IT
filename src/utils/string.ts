export const removeAccent = (str: string): string =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const normalizeString = (str: string): string =>
    removeAccent(str).toLowerCase().trim();
