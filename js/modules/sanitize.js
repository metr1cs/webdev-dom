export function sanitizeHtml(htmlString) {

    if (!htmlString) {
        return '';
    }

    return htmlString
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}