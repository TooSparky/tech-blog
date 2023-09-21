// Create btn
const newFormHandler = async (event) => {

    const response = await fetch(`/api/blogs`, {
        method: 'POST',
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to create new blog post!');
    }
};

// Delete btn
const deleteFormHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
    }

    const response = await fetch(`/api/blogs${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to delete blog post!');
    }
};

// Update btn
const updateFormHandler = async (event) => {
    const update = document.getElementById('update-post');
    if (update.hasAttribute('name')) {
        const id = update.hasAttribute('name');
    }

    const response = await fetch(`/api/blogs${id}`, {
        method: 'PUT',
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to update blog post!');
    }
}

// Comment btn
const commentHandler = async (event) => {
    const comment = document.getElementById('comment-post');
    if (comment.hasAttribute('name')) {
        const id = comment.hasAttribute('name');
    }
    
    const response = await fetch(`/api/blogs${id}`, {
        method: 'POST'
    });

    if (response.ok) {
        document.location.replace('/comments');
    } else {
        alert('Failed to comment on blog post!');
    }
}

// const dashboardHide = async (event) => {
//     event.preventDefault();

//     const hideNewButton = document.querySelector('.hide');
//     hideNewButton.classList.remove('show');
//     hideNewButton.classList.add('secret');
// }

// const dashboardShow = async (event) => {
//     event.preventDefault();

//     const showNewButtons = document.querySelector('.visible');
//     showNewButtons.classList.remove('secret');
//     showNewButtons.classList.add('show');
// }

document.querySelector('#create-post').addEventListener('click', newFormHandler);
document.querySelector('#delete-post').addEventListener('click', deleteFormHandler);
document.querySelector('#update-post').addEventListener('click', updateFormHandler);
// document.querySelector('.hide').addEventListener('click', dashboardHide);
// document.querySelector('.visible').addEventListener('click', dashboardShow);
