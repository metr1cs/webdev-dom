export function initLikeHandler(comments, updateComments) {
    const commentFormElement = document.querySelector('.comments');

    const newElement = commentFormElement.cloneNode(true);
    commentFormElement.parentNode.replaceChild(newElement, commentFormElement);

    newElement.addEventListener('click', (event) => {
        const button = event.target.closest('.like-button');
        if (!button) return;

        event.stopPropagation();

        const index = button.dataset.index;
        const comment = comments[index];

        if (!comment) return;

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