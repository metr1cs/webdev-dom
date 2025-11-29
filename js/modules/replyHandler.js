
export function initReplyHandler(comments) {
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