document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            photoItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        photoItems.forEach(item => {
            const tags = item.getAttribute('data-tags').toLowerCase();
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('.photo-date').textContent.toLowerCase();
            
            if (tags.includes(searchTerm) || title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Modal functionality
    const photoThumbnails = document.querySelectorAll('.photo-thumbnail');
    const photoModals = document.querySelectorAll('.photo-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    photoThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            photoModals[index].style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            photoModals[index].style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    photoModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Keyboard navigation for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.photo-modal').forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
});
