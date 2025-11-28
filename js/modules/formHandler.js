import { postComment } from "./api.js";
import { loadComments } from "./comments.js";
import { renderComments } from "./render.js";

export function initFormHandler(onCommentsUpdate) {
    const addFormElement = document.querySelector('.add-form');
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
            .then(() => loadComments())
            .then(comments => {
                onCommentsUpdate(comments);
                resetForm();
                initFormHandler(onCommentsUpdate); // Переинициализация обработчиков
            })
            .catch(error => {
                console.error('Ошибка отправки комментария:', error);
                resetForm();
                initFormHandler(onCommentsUpdate); // Переинициализация обработчиков
                alert("Ошибка отправки комментария");
            });
    });

    function resetForm() {
        addFormElement.innerHTML = `
            <input type="text" class="add-form-name" placeholder="Введите ваше имя" />
            <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
            <div class="add-form-row">
                <button class="add-form-button">Написать</button>
            </div>
        `;
    }
}