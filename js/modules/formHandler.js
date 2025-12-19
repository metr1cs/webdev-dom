import { postComment } from "./api.js";
import { loadComments } from "./comments.js";

export function initFormHandler(onCommentsUpdate) {
    const addButtonElement = document.querySelector('.add-form-button');
    const addTextForm = document.querySelector('.add-form-text');

    if (!addButtonElement) return;

    const handlePost = () => {
        const text = addTextForm.value.trim();
        if (text === '') return alert('Введите текст');

        addButtonElement.disabled = true;
        addButtonElement.textContent = 'Добавление...';

        const sendRequest = () => {
            postComment({ text })
                .then(() => loadComments())
                .then(comments => {
                    onCommentsUpdate(comments);
                    addTextForm.value = '';
                })
                .catch(error => {
                    if (error.message === "Ошибка сервера") {
                        sendRequest(); // Авто-повтор
                        return;
                    }
                    alert(error.message);
                })
                .finally(() => {
                    addButtonElement.disabled = false;
                    addButtonElement.textContent = 'Написать';
                });
        };
        sendRequest();
    };

    addButtonElement.addEventListener('click', handlePost);
}