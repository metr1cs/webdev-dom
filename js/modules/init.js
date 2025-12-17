import { loadComments } from "./comments.js";
import { initFormHandler } from "./formHandler.js";
import { renderComments } from "./render.js";
import { initLikeHandler } from './likesHandler.js';
import { initReplyHandler } from './replyHandler.js';

export function initApp() {
    const commentsElement = document.querySelector('.comments');

    function showLoading() {
        commentsElement.innerHTML = '<div class="loading">Комментарии загружаются...</div>';
    }

    showLoading();
    loadComments()
        .then(comments => {
            renderComments(comments);
        })
        .catch(() => {
            commentsElement.innerHTML = '<div class="error">Не удалось загрузить комментарии</div>';
        });

    initFormHandler(renderComments);
}