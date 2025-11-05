const topBar = document.getElementById('topBar');
const secondaryButtons = document.querySelectorAll('.secondary');
const menuButtons = document.querySelectorAll('.menu-item');
const menuDetails = document.querySelectorAll('.menu-detail .detail');
const moodRange = document.getElementById('moodRange');
const moodLabels = document.querySelectorAll('.moods span');
const cellarDetail = document.getElementById('cellarDetail');

const moodSelections = [
    {
        title: 'Spumante Ribelle',
        description: 'Metodo Classico aus der Franciacorta mit Noten von Yuzu und geröstetem Brioche. Perfekt zum Aperitivo.'
    },
    {
        title: 'Brunello Riserva 2015',
        description: 'Sangiovese Grosso mit seidigen Tanninen, tabakig-würziger Länge und einem Hauch von schwarzer Kirsche.'
    },
    {
        title: 'Etna Bianco Contrada',
        description: 'Carricante von vulkanischen Lagen – rauchig, salzig, meditativ. Ideal für kontemplative Momente.'
    },
    {
        title: 'Amaro Notturno',
        description: 'Hausgemachter Amaro mit Orangenblüte, Myrte und geröstetem Kakao. Für lange Nächte an der Bar.'
    }
];

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        topBar.classList.add('scrolled');
    } else {
        topBar.classList.remove('scrolled');
    }
});

secondaryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.scroll;
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dish = button.dataset.dish;
        menuButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        menuDetails.forEach(detail => {
            detail.classList.toggle('hidden', detail.dataset.detail !== dish);
        });
    });
});

if (moodRange) {
    moodRange.addEventListener('input', (event) => {
        const index = Number(event.target.value);
        updateMood(index);
    });
}

moodLabels.forEach(label => {
    label.addEventListener('click', () => {
        const index = Number(label.dataset.index);
        moodRange.value = index;
        updateMood(index);
    });
});

function updateMood(index) {
    const selection = moodSelections[index];
    moodLabels.forEach(label => {
        label.classList.toggle('active', Number(label.dataset.index) === index);
    });
    cellarDetail.classList.add('changing');
    setTimeout(() => {
        cellarDetail.innerHTML = `
            <h3>${selection.title}</h3>
            <p>${selection.description}</p>
        `;
        cellarDetail.classList.remove('changing');
    }, 180);
}

const animatedCards = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

animatedCards.forEach(card => observer.observe(card));
