import { loadComments } from "./comments.js";
import { renderComments } from "./render.js";

export function initApp() {
    const appElement = document.getElementById("app");
    if (!appElement) return;

    appElement.innerHTML = "Загрузка комментариев...";

    loadComments().then(comments => {
        renderComments(comments);
    });
}