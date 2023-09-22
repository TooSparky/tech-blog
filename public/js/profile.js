// Comment btn
const commentHandler = async (event) => {
    event.preventDefault();

    const id = event.target.dataset.id;
    console.log(id);
    
    const response = await fetch(`/api/blogs/comments/${id}`, {
        method: 'POST'
    });

    if (response.ok) {
        document.location.replace('/comments');
    } else {
        alert('Failed to comment on blog post!');
    }
}

document.querySelector('#comment-post').addEventListener('click', commentHandler);
