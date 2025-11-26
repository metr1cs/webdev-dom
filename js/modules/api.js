const BASE_URL = "https://wedev-api.sky.pro/api/v1";
const PERSONAL_KEY = "mark-zabaliev";

export function getComments() {
    return fetch(`${BASE_URL}/${PERSONAL_KEY}/comments`, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки комментариев');
            }
            return response.json();
        });
}

export function postComment({ name, text }) {
    return fetch(`${BASE_URL}/${PERSONAL_KEY}/comments`, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            text: text
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка отправки комментария');
            }
            return response.json();
        });

}