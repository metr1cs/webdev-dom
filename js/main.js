import { renderComments } from "./modules/render.js";
import { getComments, postComment } from "./modules/api.js";

const addButtonElement = document.querySelector('.add-form-button');
const addNameForm = document.querySelector('.add-form-name');
const addTextForm = document.querySelector('.add-form-text');

export let comments = [];

function loadCommentsFromApi() {
    return getComments()
        .then((responseData) => {
            comments = responseData.comments.map(apiComment => ({
                name: apiComment.author || apiComment.name || 'Аноним',
                date: apiComment.date || apiComment.createdAt || new Date().toLocaleString(),
                text: apiComment.text || apiComment.content || '',
                likes: apiComment.likes || 0,
                isLiked: false
            }));
            return comments;
        })
        .catch(error => {
            alert("Не удалось загрузить комментарии");
            return [];
        });
}

loadCommentsFromApi().then(loadedComments => {
    comments = loadedComments;
    renderComments(comments, addTextForm);
});

function addFormComment() {
    addButtonElement.addEventListener('click', function (ev) {
        if (addNameForm.value === '' || addTextForm.value === '') {
            alert('Не все поля заполнены');
            return;
        }

        addButtonElement.disabled = true;
        addButtonElement.textContent = 'Отправка...';

        postComment({
            name: addNameForm.value,
            text: addTextForm.value
        })
            .then(() => {
                return getComments();
            })
            .then(responseData => {
                comments = responseData.comments.map(apiComment => ({
                    name: apiComment.author || apiComment.name || 'Аноним',
                    date: apiComment.date || apiComment.createdAt || new Date().toLocaleString(),
                    text: apiComment.text || apiComment.content || '',
                    likes: apiComment.likes || 0,
                    isLiked: false
                }));

                renderComments(comments, addTextForm);
                addNameForm.value = '';
                addTextForm.value = '';
            })
            .catch(error => {
                alert("Ошибка отправки комментария: " + error.message);
            })
            .finally(() => {
                addButtonElement.disabled = false;
                addButtonElement.textContent = 'Написать';
            });
    });
}

addFormComment();