// Matrix Animation with Arabic Characters
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Arabic characters for the animation
const arabicChars = "ضصثقفغعهخحجدشسيبلاتنمكطئءؤرلاىةوزظذ";
const chars = arabicChars.split('');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px 'Courier New', monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Animation loop
setInterval(draw, 33);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
