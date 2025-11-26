export function sanitizeHtml(htmlString) {
    if (typeof htmlString !== 'string') {
        return '';
    }

    return htmlString
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}