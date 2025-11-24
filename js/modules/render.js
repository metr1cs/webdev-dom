
import { sanitizeHtml } from './sanitize.js';

export function renderComments(comments, addTextForm) {
    const commentFormElement = document.querySelector('.comments');
    commentFormElement.innerHTML = '';


    comments.forEach(comment => {
        const newCommentElement = document.createElement('li');
        newCommentElement.classList.add('comment');
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
                    <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
                </div>
            </div>
        `;
        commentFormElement.appendChild(newCommentElement);
    });

    const likeButtonsElement = document.querySelectorAll('.like-button');
    likeButtonsElement.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (comments[index].isLiked === false) {
                comments[index].isLiked = true;
                comments[index].likes += 1;
            } else {
                comments[index].isLiked = false;
                comments[index].likes -= 1;
            }
            renderComments(comments, addTextForm);
        });
    });

    const commentElements = document.querySelectorAll('.comment');
    commentElements.forEach((commentElement, index) => {
        commentElement.addEventListener('click', (ev) => {
            if (!ev.target.closest('.like-button')) {
                const comment = comments[index];
                addTextForm.value = `${comment.name}: ${comment.text}`;
            }
        });
    });
}