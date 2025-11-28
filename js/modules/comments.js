import { getComments } from "./api.js";
import { formatDate } from "./formatDate.js";

export function loadComments() {
    return getComments()
        .then((responseData) => {
            const comments = responseData.comments.map(apiComment => {
                let name = 'Аноним';
                if (apiComment.author) {
                    name = typeof apiComment.author === 'string'
                        ? apiComment.author
                        : apiComment.author.name || 'Аноним';
                } else if (apiComment.name) {
                    name = apiComment.name;
                }

                return {
                    name: name,
                    date: formatDate(apiComment.date || apiComment.createdAt || new Date()),
                    text: apiComment.text || apiComment.content || '',
                    likes: apiComment.likes || 0,
                    isLiked: false
                };
            });
            return comments;
        })
        .catch(error => {
            console.error('Ошибка загрузки комментариев:', error);
            return [];
        });
}

export function setupReplyToComment(comments) {
    const addTextForm = document.querySelector('.add-form-text');
    const commentElements = document.querySelectorAll('.comment');

    commentElements.forEach((commentElement, index) => {
        commentElement.addEventListener('click', (ev) => {
            if (!ev.target.closest('.like-button')) {
                const comment = comments[index];
                addTextForm.value = `> ${comment.text}\n${comment.name}, `;
            }
        });
    });
}