import { postComment } from "./api.js";
import { loadComments } from "./comments.js";

export function initFormHandler(onCommentsUpdate) {
    const addFormElement = document.querySelector('.add-form');
    const addButtonElement = document.querySelector('.add-form-button');
    const addNameForm = document.querySelector('.add-form-name');
    const addTextForm = document.querySelector('.add-form-text');

    addButtonElement.addEventListener('click', function () {
        const name = addNameForm.value.trim();
        const text = addTextForm.value.trim();

        if (name === '' || text === '') {
            alert('Не все поля заполнены');
            return;
        }

        addButtonElement.disabled = true;
        addButtonElement.textContent = 'Добавление...';

        postComment({ name, text })
            .then(() => loadComments())
            .then(comments => {
                onCommentsUpdate(comments);
                // Очищаем поля
                addNameForm.value = '';
                addTextForm.value = '';
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert("Ошибка отправки комментария");
            })
            .finally(() => {
                // Возвращаем кнопку в рабочее состояние в любом случае
                addButtonElement.disabled = false;
                addButtonElement.textContent = 'Написать';
            });
    });
}