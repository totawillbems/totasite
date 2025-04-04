// Matrix background effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters - taken from the Matrix code rain
const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";

// Set font size
const fontSize = 14;

// Calculate columns
const columns = canvas.width / fontSize;

// Create drops array
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
}

// Draw function
function draw() {
    // Black background with opacity
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set font and color
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';
    
    // Loop over drops
    for (let i = 0; i < drops.length; i++) {
        // Get random character
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset drop at random intervals
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        // Move drop down
        drops[i]++;
    }
}

// Animation loop
setInterval(draw, 33);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Recalculate columns
    const newColumns = canvas.width / fontSize;
    // Adjust drops array
    if (newColumns > drops.length) {
        // Add new columns
        for (let i = drops.length; i < newColumns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
        }
    } else if (newColumns < drops.length) {
        // Remove extra columns
        drops.length = newColumns;
    }
});