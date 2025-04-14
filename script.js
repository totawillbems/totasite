// Matrix background effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Enhanced character set with Arabic added
const matrixChars = "ضصثقفغعهخحجدشسيبلاتنمكطئءؤرلاىةوزظذ" + // Arabic
                   "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" + // Japanese
                   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" + // English
                   "123456789@#$%^&*()*&^%"; // Numbers and symbols

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
    ctx.fillStyle = '#00ff41'; // Classic Matrix green
    ctx.font = fontSize + 'px "Courier New", "MS Gothic", "Arial Unicode MS", monospace';
    
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
        
        // Random speed variation
        if (Math.random() > 0.95) {
            drops[i] += Math.floor(Math.random() * 3);
        }
    }
}

// Animation loop
setInterval(draw, 33);

// Enhanced window resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Calculate new column count
    const newColumns = Math.floor(canvas.width / fontSize);
    const currentColumns = drops.length;
    
    // Adjust drops array
    if (newColumns > currentColumns) {
        // Add new columns with random positions
        for (let i = currentColumns; i < newColumns; i++) {
            drops[i] = Math.floor(Math.random() * -canvas.height / fontSize); // Start above viewport
        }
    } else if (newColumns < currentColumns) {
        // Remove extra columns
        drops.length = newColumns;
    }
});

// Add RTL support for Arabic characters
function isArabicChar(char) {
    return char >= '\u0600' && char <= '\u06FF';
}

// Modified draw function with RTL support
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px "Courier New", "MS Gothic", "Arial Unicode MS", monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const char = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        
        // Save context for RTL characters
        ctx.save();
        
        if (isArabicChar(char)) {
            ctx.textAlign = 'right';
            ctx.fillText(char, (i + 1) * fontSize, drops[i] * fontSize);
        } else {
            ctx.textAlign = 'left';
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        }
        
        ctx.restore();
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
        
        // Add occasional speed bursts
        if (Math.random() > 0.97) {
            drops[i] += Math.floor(Math.random() * 2);
        }
    }
}
