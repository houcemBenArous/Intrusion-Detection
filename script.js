document.addEventListener('DOMContentLoaded', function() {
    // Activer le scrollspy de Bootstrap
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar-example'
    });

    // Créer le graphique des IPs avec Chart.js
    const ctx = document.getElementById('ipChart').getContext('2d');
    const ipChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['45.123.45.67', '192.168.1.25'],
            datasets: [{
                label: 'Nombre de requêtes',
                data: [3, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Nombre de requêtes par adresse IP'
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            return context.label === '45.123.45.67' ? 'Activité suspecte !' : 'Activité normale';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        drawBorder: false,
                        color: 'rgba(200, 200, 200, 0.2)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Effets de survol pour les blocs de code et les sections
    document.querySelectorAll('.code-block, .terminal').forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        });
        block.style.opacity = '0.9';
    });

    // Simulation d'alertes en temps réel
    const simulateButton = document.getElementById('simulateAlert');
    const terminalOutput = document.getElementById('terminalOutput');
    let alertCount = 0;

    if (simulateButton) {
        simulateButton.addEventListener('click', function() {
            alertCount++;
            const now = new Date().toLocaleString();
            const ips = ['45.123.45.67', '198.51.100.123', '203.0.113.42'];
            const randomIP = ips[Math.floor(Math.random() * ips.length)];
            const paths = ['/admin', '/wp-admin', '/admin/login.php', '/administrator', '/panel/admin'];
            const randomPath = paths[Math.floor(Math.random() * paths.length)];
            
            terminalOutput.classList.add('alert-animation');
            
            const alertHTML = `<div class="alert-entry">[+] Surveillance en temps réel: web_server.log</div>
<div class="alert-entry alert-danger">[ALERTE] ${now} - Accès admin détecté!</div>
<div class="alert-entry">IP: ${randomIP} | Log: ${randomIP} - - [${now.split(',')[0]}:${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)} +0100] "GET ${randomPath} HTTP/1.1" 403 278 "-" "Mozilla/5.0"</div>`;
            
            terminalOutput.innerHTML = alertHTML;
            
            setTimeout(() => {
                terminalOutput.classList.remove('alert-animation');
            }, 1500);
        });
    }

    // Animation au défilement pour les sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.partie').forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });

    // Ajouter des effets de transition
    document.querySelectorAll('.partie').forEach(section => {
        section.style.transition = 'opacity 0.5s ease-in-out';
        section.style.opacity = '1';
    });

    // Animation des liens de navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 