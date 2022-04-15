const createFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value;

    if (title && content) {
        const response = await fetch('/api/article', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            localStorage.setItem('toast', 'Created article.');
            document.location.replace('/dashboard');
        } else {
            localStorage.setItem('toast', 'Failed to create article.');
            toastIt(true);
        }
    }
};

document
    .querySelector('.create-form')
    .addEventListener('submit', createFormHandler);