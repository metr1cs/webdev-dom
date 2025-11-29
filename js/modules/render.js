import { sanitizeHtml } from './sanitize.js';

export function renderComments(comments) {
    const commentFormElement = document.querySelector('.comments');
    const addTextForm = document.querySelector('.add-form-text');
    commentFormElement.innerHTML = '';

    comments.forEach((comment, index) => {
        const newCommentElement = document.createElement('li');
        newCommentElement.classList.add('comment');

        newCommentElement.dataset.index = index;

        newCommentElement.innerHTML = `
            <div class="comment-header">
                <div>${sanitizeHtml(comment.name)}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">
                    ${sanitizeHtml(comment.text)}
                </div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
                </div>
            </div>
        `;
        commentFormElement.appendChild(newCommentElement);
    });
}