import { renderComments } from "./modules/render.js";

const addButtonElement = document.querySelector('.add-form-button');
const addNameForm = document.querySelector('.add-form-name');
const addTextForm = document.querySelector('.add-form-text');

export let comments = [
    {
        name: "Глеб Фокин",
        date: "12.02.22 12:18",
        text: "Это будет первый комментарий на этой странице",
        likes: 3,
        isLiked: false
    },
    {
        name: "Варвара Н.",
        date: "13.02.22 19:22",
        text: "Мне нравится как оформлена эта страница! ❤",
        likes: 3,
        isLiked: true
    },
];

renderComments(comments, addTextForm);

function addFormComment() {
    addButtonElement.addEventListener('click', function (ev) {
        if (addNameForm.value === '' || addTextForm.value === '') {
            alert('Не все поля заполнены');
            return;
        }

        comments.push({
            name: addNameForm.value,
            date: new Date().toLocaleString(),
            text: addTextForm.value,
            likes: 0,
            isLiked: false
        });

        addNameForm.value = '';
        addTextForm.value = '';
        renderComments(comments, addTextForm);
    });
}

addFormComment();