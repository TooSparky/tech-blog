const blogFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

const updateBlog = async (event) => {
    event.preventDefault();

    const update = document.getElementById('update-post');

    const response = await fetch(`/api/blogs${id}`, {
        method: 'PUT',
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to update blog post!');
    }
}

document.querySelector('.dashboard-post').addEventListener('submit', blogFormHandler);
