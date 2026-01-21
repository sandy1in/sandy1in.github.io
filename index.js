const menuBtn = document.querySelector('#menu-btn');
const header = document.querySelector('header');
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-toggle i');
const scrollTopBtn = document.querySelector('.top');

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header .navbar a');
const tiltCards = document.querySelectorAll('.tilt-effect');
const typedText = document.querySelector('.typed-text');


menuBtn?.addEventListener('click', () => {
    menuBtn.classList.toggle('fa-times');
    header.classList.toggle('active');
});


const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    themeIcon?.classList.replace(
        savedTheme === 'light' ? 'fa-moon' : 'fa-sun',
        savedTheme === 'light' ? 'fa-sun' : 'fa-moon'
    );
}

themeToggle?.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    themeIcon?.classList.replace(
        newTheme === 'light' ? 'fa-moon' : 'fa-sun',
        newTheme === 'light' ? 'fa-sun' : 'fa-moon'
    );
});


window.addEventListener('scroll', () => {
    menuBtn?.classList.remove('fa-times');
    header?.classList.remove('active');

    scrollTopBtn.style.display = window.scrollY > 500 ? 'block' : 'none';

    let currentY = window.scrollY;

    sections.forEach(section => {
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (currentY >= offset && currentY < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            document
                .querySelector(`header .navbar a[href*="${id}"]`)
                ?.classList.add('active');
        }
    });
});

const words = [
    "Robust Backends.",
    "GenAI Solutions.",
    "Secure APIs.",
    "Cloud Systems."
];

let wordIndex = 0;
let typingTimeout;

function typeWriter() {
    if (!typedText) return;

    const letters = words[wordIndex].split("");
    typedText.textContent = "";

    function type() {
        if (letters.length) {
            typedText.textContent += letters.shift();
            typingTimeout = setTimeout(type, 100);
        } else {
            setTimeout(deleteText, 2000);
        }
    }
    type();
}

function deleteText() {
    if (!typedText) return;

    let text = typedText.textContent;

    function erase() {
        if (text.length) {
            text = text.slice(0, -1);
            typedText.textContent = text;
            typingTimeout = setTimeout(erase, 50);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            typeWriter();
        }
    }
    erase();
}

window.addEventListener('load', () => {
    clearTimeout(typingTimeout);
    typeWriter();
});


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

//tilt effe
if (tiltCards.length) {
    document.addEventListener('mousemove', e => {
        tiltCards.forEach(card => {
            const rect = card.getBoundingClientRect();

            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;

                card.style.transform =
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            } else {
                card.style.transform =
                    'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            }
        });
    });
}
