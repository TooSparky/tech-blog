// Updates blogs
const updateBlog = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    const id = event.target.dataset.id;

    const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to update blog post!');
    }
}

// Deletes blogs
const deleteBlog = async (event) => {
    event.preventDefault();

    const id = event.target.dataset.id;

    const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to delete blog post!');
    }
}

document.querySelector('#update-post').addEventListener('click', updateBlog);
document.querySelector('#delete-post').addEventListener('click', deleteBlog);
