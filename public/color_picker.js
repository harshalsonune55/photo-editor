
// const canvas = document.getElementById('colorWheel');
// const ctx = canvas.getContext('2d');
// const colorDisplay = document.getElementById('colorDisplay');
// const hexInput = document.getElementById('hexInput');

// function drawColorWheel() {
//     const radius = canvas.width / 2;
//     const centerX = radius;
//     const centerY = radius;
//     const imageData = ctx.createImageData(canvas.width, canvas.height);

//     for (let x = 0; x < canvas.width; x++) {
//         for (let y = 0; y < canvas.height; y++) {
//             const dx = x - centerX;
//             const dy = y - centerY;
//             const distance = Math.sqrt(dx * dx + dy * dy);
//             if (distance <= radius) {
//                 const angle = Math.atan2(dy, dx);
//                 const hue = (angle + Math.PI) / (2 * Math.PI);
//                 const saturation = distance / radius;
//                 const rgb = hslToRgb(hue, saturation, 0.5);
//                 const index = (y * canvas.width + x) * 4;
//                 imageData.data[index] = rgb[0];
//                 imageData.data[index + 1] = rgb[1];
//                 imageData.data[index + 2] = rgb[2];
//                 imageData.data[index + 3] = 255;
//             }
//         }
//     }
//     ctx.putImageData(imageData, 0, 0);
// }

// function hslToRgb(h, s, l) {
//     let r, g, b;
//     if (s === 0) {
//         r = g = b = l;
//     } else {
//         const hue2rgb = (p, q, t) => {
//             if (t < 0) t += 1;
//             if (t > 1) t -= 1;
//             if (t < 1/6) return p + (q - p) * 6 * t;
//             if (t < 1/2) return q;
//             if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
//             return p;
//         };
//         const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//         const p = 2 * l - q;
//         r = hue2rgb(p, q, h + 1/3);
//         g = hue2rgb(p, q, h);
//         b = hue2rgb(p, q, h - 1/3);
//     }
//     return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
// }

// function rgbToHex(r, g, b) {
//     return '#' + [r, g, b].map(x => {
//         const hex = x.toString(16);
//         return hex.length === 1 ? '0' + hex : hex;
//     }).join('');
// }

// function updateColor(x, y) {
//     const rect = canvas.getBoundingClientRect();
//     const px = x - rect.left;
//     const py = y - rect.top;
//     const data = ctx.getImageData(px, py, 1, 1).data;
//     if (data[3] !== 0) { // Ensure pixel is not transparent
//         const hex = rgbToHex(data[0], data[1], data[2]);
//         colorDisplay.style.backgroundColor = hex;
//         hexInput.value = hex.toUpperCase();
//     }
// }

// canvas.addEventListener('click', (e) => {
//     updateColor(e.clientX, e.clientY);
// });

// hexInput.addEventListener('input', () => {
//     const hex = hexInput.value;
//     if (/^#[0-9A-F]{6}$/i.test(hex)) {
//         colorDisplay.style.backgroundColor = hex;
//     }
// });

// // Initialize
// drawColorWheel();
// hexInput.value = '#FFFFFF';
// colorDisplay.style.backgroundColor = '#FFFFFF';


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorWheel = document.getElementById('colorWheel');
const colorWheelCtx = colorWheel.getContext('2d');
const colorDisplay = document.getElementById('colorDisplay');
const hexInput = document.getElementById('hexInput');
const saturation = document.getElementById('saturation');
const lightShadow = document.getElementById('light_shadow');
const brightness = document.getElementById('Brightness');
const ambiance = document.getElementById('Ambiance');
const warmth = document.getElementById('Warmth');
let img = new Image();
img.crossOrigin = "Anonymous";

// Load image (replace with your lis.adr value)
const imageUrl = '<%= typeof lis !== "undefined" ? lis.adr : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" %>';
img.src = imageUrl;
img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    applyEffect();
};
img.onerror = function() {
    console.error('Failed to load image. Ensure the URL is valid and CORS-enabled.');
};

// Draw color wheel
function drawColorWheel() {
    const radius = colorWheel.width / 2;
    const centerX = radius;
    const centerY = radius;
    const imageData = colorWheelCtx.createImageData(colorWheel.width, colorWheel.height);

    for (let x = 0; x < colorWheel.width; x++) {
        for (let y = 0; y < colorWheel.height; y++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= radius) {
                const angle = Math.atan2(dy, dx);
                const hue = (angle + Math.PI) / (2 * Math.PI);
                const saturation = distance / radius;
                const rgb = hslToRgb(hue, saturation, 0.5);
                const index = (y * colorWheel.width + x) * 4;
                imageData.data[index] = rgb[0];
                imageData.data[index + 1] = rgb[1];
                imageData.data[index + 2] = rgb[2];
                imageData.data[index + 3] = 255;
            }
        }
    }
    colorWheelCtx.putImageData(imageData, 0, 0);
}

function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function applyEffect() {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const hex = hexInput.value || '#FFFFFF';
    const [rTint, gTint, bTint] = hexToRgb(hex);
    const sat = parseFloat(saturation.value) / 100;
    const bright = parseFloat(brightness.value) / 100;
    const warm = parseFloat(warmth.value) / 100;
    const light = parseFloat(lightShadow.value) / 100;
    const amb = parseFloat(ambiance.value) / 100;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Convert to HSL for easier manipulation
        const hsl = rgbToHsl(r, g, b);
        let [h, s, l] = hsl;

        // Apply saturation
        s = Math.min(1, Math.max(0, s + sat * 0.5));

        // Apply brightness
        l = Math.min(1, Math.max(0, l + bright * 0.5));

        // Apply warmth (shift toward red if positive, blue if negative)
        if (warm !== 0) {
            const rgbWarm = hslToRgb(h, s, l);
            r = rgbWarm[0] + (warm > 0 ? warm * 50 : 0);
            g = rgbWarm[1];
            b = rgbWarm[2] + (warm < 0 ? -warm * 50 : 0);
            [h, s, l] = rgbToHsl(Math.min(255, r), Math.min(255, g), Math.min(255, b));
        }

        // Apply light/shadow
        l = Math.min(1, Math.max(0, l + light * 0.2));

        // Apply ambiance (tint toward selected color)
        const rgb = hslToRgb(h, s, l);
        r = rgb[0] * (1 - amb) + rTint * amb;
        g = rgb[1] * (1 - amb) + gTint * amb;
        b = rgb[2] * (1 - amb) + bTint * amb;

        data[i] = Math.min(255, Math.max(0, r));
        data[i + 1] = Math.min(255, Math.max(0, g));
        data[i + 2] = Math.min(255, Math.max(0, b));
    }

    ctx.putImageData(imageData, 0, 0);
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

function updateColor(x, y) {
    const rect = colorWheel.getBoundingClientRect();
    const px = x - rect.left;
    const py = y - rect.top;
    const data = colorWheelCtx.getImageData(px, py, 1, 1).data;
    if (data[3] !== 0) {
        const hex = rgbToHex(data[0], data[1], data[2]);
        colorDisplay.style.backgroundColor = hex;
        hexInput.value = hex.toUpperCase();
        applyEffect();
    }
}

colorWheel.addEventListener('click', (e) => {
    updateColor(e.clientX, e.clientY);
});

hexInput.addEventListener('input', () => {
    const hex = hexInput.value;
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
        colorDisplay.style.backgroundColor = hex;
        applyEffect();
    }
});

[saturation, lightShadow, brightness, ambiance, warmth].forEach(input => {
    input.addEventListener('input', applyEffect);
});

// Initialize
drawColorWheel();
hexInput.value = '#FFFFFF';
colorDisplay.style.backgroundColor = '#FFFFFF';