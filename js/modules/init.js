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
    }

    function showLoading() {
        commentsElement.innerHTML = '<div class="loading">Комментарии загружаются...</div>';
    }

    function showError() {
        commentsElement.innerHTML = '<div class="error">Не удалось загрузить комментарии</div>';
    }

    showLoading();
    loadComments()
        .then(comments => {
            updateComments(comments);
            initLikeHandler(currentComments, updateComments);
            initReplyHandler(currentComments);
        })
        .catch(showError);

    initFormHandler(updateComments);
}