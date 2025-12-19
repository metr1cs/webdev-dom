import { getToken } from "./user.js";

const BASE_URL = "https://wedev-api.sky.pro/api/v2/mark-zabaliev/comments";
const AUTH_URL = "https://wedev-api.sky.pro/api/user";

export function getComments() {
    return fetch(BASE_URL, { method: "GET" })
        .then(response => {
            if (response.status === 500) throw new Error('Ошибка сервера');
            return response.json();
        });
}

export function postComment({ text }) {
    return fetch(BASE_URL, {
        method: "POST",
        headers: { Authorization: getToken() },
        body: JSON.stringify({ text, forceError: false })
    }).then(response => {
        if (response.status === 401) throw new Error('Необходимо авторизоваться');
        if (response.status === 400) throw new Error('Минимум 3 символа');
        if (response.status === 500) throw new Error('Ошибка сервера');
        return response.json();
    });
}

export function loginUser({ login, password }) {
    return fetch(`${AUTH_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ login, password })
    }).then(res => {
        if (res.status === 400) throw new Error('Неверный логин или пароль');
        return res.json();
    });
}