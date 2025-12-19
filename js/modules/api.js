
const BASE_URL = "https://wedev-api.sky.pro/api/v1";
const PERSONAL_KEY = "mark-zabaliev";

export function getComments() {
    return fetch(`${BASE_URL}/${PERSONAL_KEY}/comments`, {
        method: "GET"
    })
        .then(response => {
            if (response.status === 500) {
                throw new Error('Ошибка сервера');
            }
            if (!response.ok) {
                throw new Error('Ошибка загрузки');
            }
            return response.json();
        });
}

export function postComment({ name, text }) {
    return fetch(`${BASE_URL}/${PERSONAL_KEY}/comments`, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            text: text,
            forceError: true,
        })
    })
        .then(response => {
            if (response.status === 400) {
                throw new Error('Плохой запрос'); // Имя или текст короче 3 символов
            }
            if (response.status === 500) {
                throw new Error('Ошибка сервера');
            }
            if (!response.ok) {
                throw new Error('Прочая ошибка');
            }
            return response.json();
        });
}