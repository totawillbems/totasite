// Social Network Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Sample posts data
    const posts = [
        {
            id: 1,
            author: "طوطا",
            avatar: "assets/images/profile.jpg",
            time: "منذ ساعتين",
            content: "أعمل حالياً على مشروع لعبة جديدة بإستخدام Unity. هل من اقتراحات لتجربة اللاعب؟",
            image: "assets/images/game-dev.jpg",
            likes: 24,
            comments: 8,
            shares: 3
        },
        {
            id: 2,
            author: "طوطا",
            avatar: "assets/images/profile.jpg",
            time: "منذ يوم",
            content: "تم إطلاق النسخة الجديدة من موقعي الشخصي! زوروه وأخبروني برأيكم.",
            image: null,
            likes: 42,
            comments: 15,
            shares: 7
        }
    ];

    // Render posts
    const postsContainer = document.getElementById('posts-container');
    
    function renderPosts() {
        postsContainer.innerHTML = '';
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post card';
            postElement.innerHTML = `
                <div class="post-header">
                    <img src="${post.avatar}" alt="صورة ${post.author}" class="post-avatar">
                    <div>
                        <div class="post-author">${post.author}</div>
                        <div class="post-time">${post.time}</div>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
                ${post.image ? `<img src="${post.image}" alt="صورة المنشور" class="post-image">` : ''}
                <div class="post-actions">
                    <span class="post-action"><i class="fas fa-heart"></i> ${post.likes}</span>
                    <span class="post-action"><i class="fas fa-comment"></i> ${post.comments}</span>
                    <span class="post-action"><i class="fas fa-share"></i> ${post.shares}</span>
                </div>
            `;
            
            postsContainer.appendChild(postElement);
        });
    }

    // Initialize
    renderPosts();

    // Post creation functionality
    const postInput = document.querySelector('.post-input');
    const publishBtn = document.querySelector('.publish-btn');
    
    publishBtn.addEventListener('click', () => {
        const content = postInput.value.trim();
        
        if (content) {
            const newPost = {
                id: posts.length + 1,
                author: "طوطا",
                avatar: "assets/images/profile.jpg",
                time: "الآن",
                content: content,
                image: null,
                likes: 0,
                comments: 0,
                shares: 0
            };
            
            posts.unshift(newPost);
            renderPosts();
            postInput.value = '';
        }
    });
});
