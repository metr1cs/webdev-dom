import {renderComments} from "./render";
import {comments} from "../main";

export function initApp() {
    loadCommentsFromApi()
        .then(loadedComments => {
            comments = loadedComments;
            renderComments(comments);
        });

    addFormComment();
}

initApp();