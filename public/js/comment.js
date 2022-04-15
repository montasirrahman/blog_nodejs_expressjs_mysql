const commentFormHandler = async (event) => {
    event.preventDefault();
    const content = document.querySelector('#comment').value;
    const article_id = parseInt(document.querySelector('#article_id').value);

    if (content) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                content,
                article_id
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            localStorage.setItem('toast', 'Added comment.');
            document.location.reload();
        } else {
            localStorage.setItem('toast', 'Failed to add comment.');
            toastIt(true);
        }
    }
};

document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);