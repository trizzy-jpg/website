// Sanftes Scrollen für Navigationslinks
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Aktualisiere aktiven Navigationslink beim Scrollen
window.addEventListener('scroll', () => {
    let aktuell = '';
    
    document.querySelectorAll('section').forEach(section => {
        const bereichOben = section.offsetTop;
        const bereichHöhe = section.clientHeight;
        if (pageYOffset >= bereichOben - 200) {
            aktuell = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === aktuell) {
            link.classList.add('active');
        }
    });
});

// Verarbeite Kontaktformular-Übermittlung
const kontaktFormular = document.getElementById('contactForm');
if (kontaktFormular) {
    kontaktFormular.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const nachricht = document.getElementById('message').value;
        
        // Validiere Formular
        if (!name || !email || !nachricht) {
            alert('Bitte alle Felder ausfüllen!');
            return;
        }
        
        // Hier würdest du normalerweise die Daten an einen Server senden
        console.log('Formular eingereicht:', { name, email, nachricht });
        
        // Zeige Erfolgsmeldung
        alert('Danke für deine Nachricht! Ich werde mich bald bei dir melden.');
        
        // Setze Formular zurück
        kontaktFormular.reset();
    });
}

// Füge Scroll-Animation für Elemente hinzu
const beobachterOptionen = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const beobachter = new IntersectionObserver(function(einträge) {
    einträge.forEach(eintrag => {
        if (eintrag.isIntersecting) {
            eintrag.target.style.opacity = '1';
            eintrag.target.style.transform = 'translateY(0)';
        }
    });
}, beobachterOptionen);

// Beobachte alle Dienstleistungskarten
document.querySelectorAll('.service-card').forEach(karte => {
    karte.style.opacity = '0';
    karte.style.transform = 'translateY(20px)';
    karte.style.transition = 'all 0.6s ease';
    beobachter.observe(karte);
});