// Guest Posts System using localStorage
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const postInput = document.getElementById('post-content');
    const publishBtn = document.getElementById('publish-post');
    const addImageBtn = document.getElementById('add-image');
    const imageUpload = document.getElementById('image-upload');
    const postsFeed = document.getElementById('posts-feed');

    // Load existing posts
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    renderPosts();

    // Publish new post
    publishBtn.addEventListener('click', () => {
        const content = postInput.value.trim();
        if (content) {
            const newPost = {
                id: Date.now(),
                author: "زائر",
                content: content,
                image: null,
                timestamp: new Date().toLocaleString('ar-EG'),
                likes: 0
            };
            
            posts.unshift(newPost);
            savePosts();
            renderPosts();
            postInput.value = '';
        }
    });

    // Image upload
    addImageBtn.addEventListener('click', () => imageUpload.click());
    
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newPost = {
                    id: Date.now(),
                    author: "زائر",
                    content: postInput.value.trim(),
                    image: event.target.result,
                    timestamp: new Date().toLocaleString('ar-EG'),
                    likes: 0
                };
                
                posts.unshift(newPost);
                savePosts();
                renderPosts();
                postInput.value = '';
                imageUpload.value = '';
            };
            reader.readAsDataURL(file);
        }
    });

    // Render all posts
    function renderPosts() {
        postsFeed.innerHTML = posts.map(post => `
            <div class="post card" data-id="${post.id}">
                <div class="post-header">
                    <img src="assets/profile.jpg" alt="صورة ${post.author}" class="post-avatar">
                    <div>
                        <div class="post-author">${post.author}</div>
                        <div class="post-time">${post.timestamp}</div>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
                ${post.image ? `<img src="${post.image}" alt="صورة المنشور" class="post-image">` : ''}
                <div class="post-actions">
                    <button class="like-btn" data-id="${post.id}">
                        <i class="far fa-heart"></i> ${post.likes}
                    </button>
                </div>
            </div>
        `).join('');

        // Add like button events
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const postId = parseInt(btn.dataset.id);
                const post = posts.find(p => p.id === postId);
                if (post) {
                    post.likes++;
                    savePosts();
                    btn.innerHTML = `<i class="far fa-heart"></i> ${post.likes}`;
                }
            });
        });
    }

    function savePosts() {
        localStorage.setItem('posts', JSON.stringify(posts));
    }
});
