// Social Posts System
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const postInput = document.getElementById('post-content');
    const publishBtn = document.getElementById('publish-btn');
    const addImageBtn = document.getElementById('add-image');
    const imageUpload = document.getElementById('image-upload');
    const postsFeed = document.getElementById('posts-feed');
    
    // Sample initial posts (replace with localStorage in final version)
    let posts = [
        {
            id: 1,
            author: "طوطا",
            avatar: "assets/images/profile.jpg",
            content: "مرحباً بالجميع في شبكتي الاجتماعية! يمكنكم نشر ما تريدون هنا.",
            image: null,
            timestamp: new Date().toLocaleString('ar-EG'),
            likes: 42,
            isLiked: false
        }
    ];
    
    // Render all posts
    function renderPosts() {
        postsFeed.innerHTML = posts.map(post => `
            <div class="post" data-id="${post.id}">
                <div class="post-header">
                    <img src="${post.avatar}" alt="صورة ${post.author}" class="post-avatar">
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
                    <button class="like-btn ${post.isLiked ? 'liked' : ''}" data-id="${post.id}">
                        <i class="fas fa-heart"></i> ${post.likes}
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to like buttons
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const postId = parseInt(btn.dataset.id);
                const post = posts.find(p => p.id === postId);
                if (post) {
                    post.isLiked = !post.isLiked;
                    post.likes += post.isLiked ? 1 : -1;
                    btn.classList.toggle('liked');
                    btn.innerHTML = `<i class="fas fa-heart"></i> ${post.likes}`;
                    // In a real app, save to localStorage here
                }
            });
        });
    }
    
    // Publish new post
    function publishPost(content, image = null) {
        const newPost = {
            id: Date.now(),
            author: "زائر",
            avatar: "assets/images/profile.jpg",
            content: content,
            image: image,
            timestamp: new Date().toLocaleString('ar-EG'),
            likes: 0,
            isLiked: false
        };
        
        posts.unshift(newPost);
        renderPosts();
        // In a real app: localStorage.setItem('posts', JSON.stringify(posts));
    }
    
    // Event Listeners
    publishBtn.addEventListener('click', () => {
        const content = postInput.value.trim();
        if (content) {
            publishPost(content);
            postInput.value = '';
        }
    });
    
    addImageBtn.addEventListener('click', () => imageUpload.click());
    
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                publishPost(postInput.value.trim(), event.target.result);
                postInput.value = '';
                imageUpload.value = '';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Allow Enter key to submit
    postInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            publishBtn.click();
        }
    });
    
    // Initial render
    renderPosts();
});
