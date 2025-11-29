export function initLikeHandler(comments, updateComments) {
    const commentFormElement = document.querySelector('.comments');

    commentFormElement.addEventListener('click', (event) => {
        const button = event.target.closest('.like-button');
        if (!button) return; // Если кликнули не на кнопку

        event.stopPropagation();

        const index = parseInt(button.dataset.index);
        const comment = comments[index];

        if (comment.isLiked) {
            comment.isLiked = false;
            comment.likes -= 1;
        } else {
            comment.isLiked = true;
            comment.likes += 1;
        }

        updateComments(comments);
    });
}