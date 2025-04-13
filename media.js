// Media data - replace with your actual media files
const mediaData = {
    videos: [
        {
            title: "مشروع اللعبة",
            description: "عرض لمشروع اللعبة الجديدة",
            thumbnail: "assets/images/game-thumbnail.jpg",
            url: "assets/videos/game-demo.mp4"
        },
        {
            title: "برمجة مباشرة",
            description: "جلسة برمجة مباشرة",
            thumbnail: "assets/images/coding-thumbnail.jpg",
            url: "assets/videos/live-coding.mp4"
        }
    ],
    images: [
        {
            title: "تصميم ثلاثي الأبعاد",
            description: "أحدث أعمال التصميم ثلاثي الأبعاد",
            thumbnail: "assets/images/3d-design.jpg",
            url: "assets/images/3d-design-full.jpg"
        },
        {
            title: "واجهة المستخدم",
            description: "تصميم واجهة مستخدم جديدة",
            thumbnail: "assets/images/ui-design.jpg",
            url: "assets/images/ui-design-full.jpg"
        }
    ],
    files: [
        {
            title: "السيرة الذاتية",
            description: "سيرتي الذاتية بصيغة PDF",
            thumbnail: "assets/images/pdf-icon.png",
            url: "assets/files/cv.pdf"
        },
        {
            title: "عرض تقديمي",
            description: "عرض تقديمي عن أعمالي",
            thumbnail: "assets/images/ppt-icon.png",
            url: "assets/files/presentation.pptx"
        }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderMedia('videos', 'videos-container');
    renderMedia('images', 'images-container');
    renderMedia('files', 'files-container');
    
    setupModal();
});

// Render media cards
function renderMedia(type, containerId) {
    const container = document.getElementById(containerId);
    
    mediaData[type].forEach(item => {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.onclick = () => openModal(item, type);
        
        card.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" class="media-thumbnail">
            <div class="media-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Modal functionality
function setupModal() {
    const modal = document.getElementById('media-modal');
    const closeBtn = document.querySelector('.close-btn');
    const downloadBtn = document.getElementById('download-btn');
    
    closeBtn.onclick = function() {
        modal.style.display = "none";
        const video = document.getElementById('modal-video');
        if (video) video.pause();
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            const video = document.getElementById('modal-video');
            if (video) video.pause();
        }
    }
    
    downloadBtn.onclick = function(e) {
        e.preventDefault();
        window.location.href = e.target.parentElement.getAttribute('data-url');
    }
}

function openModal(item, type) {
    const modal = document.getElementById('media-modal');
    const modalTitle = document.getElementById('media-title');
    const modalDesc = document.getElementById('media-description');
    const downloadBtn = document.getElementById('download-btn');
    
    // Hide all media elements first
    document.querySelectorAll('.modal-media').forEach(el => {
        el.style.display = 'none';
    });
    
    // Set common info
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.description;
    downloadBtn.setAttribute('data-url', item.url);
    downloadBtn.setAttribute('download', item.url.split('/').pop());
    
    // Show appropriate media
    if (type === 'videos') {
        const video = document.getElementById('modal-video');
        video.src = item.url;
        video.style.display = 'block';
        video.controls = true;
    } else if (type === 'images') {
        const image = document.getElementById('modal-image');
        image.src = item.url;
        image.style.display = 'block';
    } else if (type === 'files') {
        const file = document.getElementById('modal-file');
        file.src = item.url;
        file.style.display = 'block';
        file.style.width = '100%';
        file.style.height = '70vh';
    }
    
    modal.style.display = "block";
}
