import { sanitizeHtml } from './sanitize.js';
import { getLocalUser } from './user.js';
import { renderLogin } from './renderLogin.js';
import { initLikeHandler } from './likesHandler.js';
import { initReplyHandler } from './replyHandler.js';
import { initFormHandler } from './formHandler.js';

export function renderComments(comments) {
    const appElement = document.getElementById("app");
    const user = getLocalUser();

    const commentsHtml = comments.map((comment, index) => `
        <li class="comment" data-index="${index}">
            <div class="comment-header">
                <div>${sanitizeHtml(comment.name)}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${sanitizeHtml(comment.text)}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
                </div>
            </div>
        </li>`).join("");

    const formHtml = !user
        ? `<p class="auth-link">Чтобы добавить комментарий, <button id="auth-link-button">авторизуйтесь</button></p>`
        : `
        <div class="add-form">
            <input type="text" class="add-form-name" value="${user.name}" readonly />
            <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
            <div class="add-form-row">
                <button class="add-form-button">Написать</button>
            </div>
        </div>`;

    appElement.innerHTML = `
        <ul class="comments">${commentsHtml}</ul>
        ${formHtml}
    `;

    // Инициализация событий
    if (!user) {
        document.getElementById("auth-link-button").addEventListener("click", renderLogin);
    } else {
        initFormHandler(renderComments);
    }

    initLikeHandler(comments, renderComments);
    initReplyHandler(comments);
}