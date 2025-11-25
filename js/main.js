import { renderComments } from "./modules/render.js";
import { getComments, postComment } from "./modules/api.js";

const addFormElement = document.querySelector('.add-form');
const commentsElement = document.querySelector('.comments');

export let comments = [];

// Функция для форматирования даты
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function loadCommentsFromApi() {
    commentsElement.innerHTML = '<div class="loading">Комментарии загружаются...</div>';

    return getComments()
        .then((responseData) => {
            comments = responseData.comments.map(apiComment => {
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
            commentsElement.innerHTML = '<div class="error">Не удалось загрузить комментарии</div>';
            return [];
        });
}

function setupReplyToComment() {
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

function addFormComment() {
    const addButtonElement = document.querySelector('.add-form-button');
    const addNameForm = document.querySelector('.add-form-name');
    const addTextForm = document.querySelector('.add-form-text');

    addButtonElement.addEventListener('click', function () {
        if (addNameForm.value.trim() === '' || addTextForm.value.trim() === '') {
            alert('Не все поля заполнены');
            return;
        }

        addFormElement.innerHTML = '<div class="form-loading">Комментарий добавляется...</div>';

        postComment({
            name: addNameForm.value,
            text: addTextForm.value
        })
            .then(() => {
                return getComments();
            })
            .then(responseData => {
                comments = responseData.comments.map(apiComment => {
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

                renderComments(comments);

                addFormElement.innerHTML = `
                    <input type="text" class="add-form-name" placeholder="Введите ваше имя" />
                    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
                    <div class="add-form-row">
                        <button class="add-form-button">Написать</button>
                    </div>
                `;

                addFormComment();
            })
            .catch(error => {
                addFormElement.innerHTML = `
                    <input type="text" class="add-form-name" placeholder="Введите ваше имя" />
                    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
                    <div class="add-form-row">
                        <button class="add-form-button">Написать</button>
                    </div>
                `;
                alert("Ошибка отправки комментария");
                addFormComment();
            });
    });
}

function initApp() {
    loadCommentsFromApi()
        .then(loadedComments => {
            comments = loadedComments;
            renderComments(comments);
        });

    addFormComment();
}

initApp();