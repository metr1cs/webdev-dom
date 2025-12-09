export function initReplyHandler(comments) {
    const addTextForm = document.querySelector('.add-form-text');
    const commentsContainer = document.querySelector('.comments'); // Находим родительский контейнер

    // Используем делегирование событий на контейнере
    commentsContainer.addEventListener('click', (ev) => {
        const commentElement = ev.target.closest('.comment');

        // Проверяем, что клик был по комментарию, но не по кнопке лайка
        if (commentElement && !ev.target.closest('.like-button')) {
            // Получаем индекс из data-атрибута элемента (он задается в render.js)
            const index = parseInt(commentElement.dataset.index);
            const comment = comments[index];

            const sanitizedText = comment.text.replace(/\n/g, ' '); // Заменяем переносы строки на пробелы
            addTextForm.value = `> ${sanitizedText}\n${comment.name}, `;
        }
    });

}