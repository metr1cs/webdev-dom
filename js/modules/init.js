import { loadComments, setupReplyToComment } from "./comments.js";
import { initFormHandler } from "./formHandler.js";
import { renderComments } from "./render.js";

export function initApp() {
    const commentsElement = document.querySelector('.comments');
    let currentComments = [];

    function updateComments(comments) {
        currentComments = comments;
        renderComments(comments);
        setupReplyToComment(comments);
    }

    function showLoading() {
        commentsElement.innerHTML = '<div class="loading">Комментарии загружаются...</div>';
    }

    function showError() {
        commentsElement.innerHTML = '<div class="error">Не удалось загрузить комментарии</div>';
    }

    // Загрузка комментариев
    showLoading();
    loadComments()
        .then(comments => {
            updateComments(comments);
        })
        .catch(error => {
            showError();
        });

    // Инициализация формы
    initFormHandler(updateComments);
}