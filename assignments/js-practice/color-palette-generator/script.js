const chooseFormat = document.getElementById('format');
const chooseTheme = document.getElementById('theme');
const generateBtn = document.getElementById('generate-btn');
const palette = document.getElementById('palette');

function generateRGB(theme) {
    let min = 0;
    let max = 255;

    if (theme === 'light') {
        min = 128;
        max = 256;
    } else if (theme === 'dark') {
        min = 0;
        max = 128;
    } else {
        min = 0;
        max = 255;
    }


    const r = Math.floor(Math.random() * (max - min) + min);
    const g = Math.floor(Math.random() * (max - min) + min);
    const b = Math.floor(Math.random() * (max - min) + min);

    return {r, g, b}
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function generatePalette() {
    palette.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const {r, g, b} = generateRGB(chooseTheme.value);

        let color;

        if(chooseFormat.value === 'hex') {
            color = rgbToHex(r, g, b);
        } else {
            color = `rgb(${r}, ${g}, ${b})`;
        }

        const div = document.createElement('div');
        div.classList.add('color');
        div.style.background = `rgb(${r}, ${g}, ${b})`;
        div.textContent = color;


        div.addEventListener('click', () => {
            navigator.clipboard.writeText(color)
                .then(() => {
                    const originalText = div.textContent;
                    div.textContent = 'Copied!';
                    setTimeout(() => {
                        div.textContent = originalText;
                    }, 1000);
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                }) 
        })

        palette.appendChild(div);
    }
}

generateBtn.addEventListener('click', generatePalette);

generatePalette();