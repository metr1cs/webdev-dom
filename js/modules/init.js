// init.js (ИСПРАВЛЕНО)

import { loadComments } from "./comments.js";
import { initFormHandler } from "./formHandler.js";
import { renderComments } from "./render.js";
import { initLikeHandler } from './likesHandler.js';
import { initReplyHandler } from './replyHandler.js';


export function initApp() {
    const commentsElement = document.querySelector('.comments');
    let currentComments = [];

    function updateComments(comments) {
        currentComments = comments;
        renderComments(comments);

        initLikeHandler(currentComments, updateComments);
        initReplyHandler(currentComments);
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
        .then(updateComments)
        .catch(showError);

    // Инициализация формы
    initFormHandler(updateComments);
}