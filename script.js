const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

const raindrops = [];
const numDrops = 200;

for (let i = 0; i < numDrops; i++) {
    // Sorteia x entre 0 e width + área extra à direita, para cobrir o canto inferior direito
    raindrops.push({
        x: Math.random() * (width + 100),
        y: Math.random() * height,
        length: 10 + Math.random() * 20,
        speed: 1, // velocidade menor
        opacity: 0.5 + Math.random() * 0.4,
        drift: - Math.random() * 0.5 // drift negativo para inverter o lado
    });
}

let rainInterval;
let raining = true;

window.startRain = function() {
    raining = true;
    drawRain();
};

window.stopRain = function() {
    raining = false;
};

function drawRain() {
    if (!raining) return;
    ctx.clearRect(0, 0, width, height);
    for (let drop of raindrops) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${drop.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.drift * drop.length / 5, drop.y + drop.length);
        ctx.stroke();

        drop.x += drop.drift;
        drop.y += drop.speed;
        // Reinicia se sair pela esquerda ou pelo fundo
        if (drop.y > height || drop.x < -100) {
            drop.y = -drop.length;
            drop.x = Math.random() * (width + 100);
        }
    }
    requestAnimationFrame(drawRain);
}

// Inicie a chuva ao carregar
window.startRain();

// Deixe o canvas fixo e atrás de todo o conteúdo
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 0;

// Scrollspy para destacar ícone ativo na barra lateral
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.sidebar ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});