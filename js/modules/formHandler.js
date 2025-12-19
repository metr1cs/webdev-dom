
import { postComment } from "./api.js";
import { loadComments } from "./comments.js";

export function initFormHandler(onCommentsUpdate) {
    const addButtonElement = document.querySelector('.add-form-button');
    const addNameForm = document.querySelector('.add-form-name');
    const addTextForm = document.querySelector('.add-form-text');

    function handlePostClick() {
        const name = addNameForm.value.trim();
        const text = addTextForm.value.trim();

        if (name === '' || text === '') {
            alert('Не все поля заполнены');
            return;
        }

        addButtonElement.disabled = true;
        addButtonElement.textContent = 'Добавление...';

        const sendComment = () => {
            postComment({ name, text })
                .then(() => loadComments())
                .then(comments => {
                    onCommentsUpdate(comments);
                    addNameForm.value = '';
                    addTextForm.value = '';
                })
                .catch(error => {
                    // 1. Авто-ретрай при 500 ошибке (Доп. задание)
                    if (error.message === "Ошибка сервера") {
                        console.warn("Сервер упал, пробую еще раз...");
                        sendComment();
                        return;
                    }

                    // 2. Обработка 400 ошибки (Короткий текст/имя)
                    if (error.message === "Плохой запрос") {
                        alert("Имя и комментарий должны быть не короче 3-х символов");
                    }
                    // 3. Обработка отсутствия интернета
                    else if (error.message === "Failed to fetch" || error.message.includes("network")) {
                        alert("Кажется, у вас пропал интернет. Попробуйте позже.");
                    }
                    // 4. Остальные ошибки
                    else {
                        alert("Произошла ошибка: " + error.message);
                    }
                })
                .finally(() => {
                    addButtonElement.disabled = false;
                    addButtonElement.textContent = 'Написать';
                });
        };

        sendComment();
    }

    addButtonElement.addEventListener('click', handlePostClick);
}