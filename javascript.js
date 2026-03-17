window.addEventListener("load", function() {
        const loader = document.getElementById("loader-wrapper");
        
        // Añadimos un pequeño retraso de 500ms para que la transición no sea brusca
        setTimeout(() => {
            loader.classList.add("loader-hidden");
        }, 500);
    });

const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        // Animación simple opcional para el botón
        menuToggle.classList.toggle('is-active');
    });

    // Cerrar menú al hacer clic en un enlace (ideal para móviles)
    document.querySelectorAll('.nav-list a').forEach(n => n.addEventListener('click', () => {
        navList.classList.remove('active');
    }));




const form = document.getElementById("contactForm");
    const status = document.getElementById("status");

    async function handleSubmit(event) {
        event.preventDefault(); // Evita que la página se recargue
        const data = new FormData(event.target);
        const button = document.getElementById("submitBtn");

        button.disabled = true;
        button.innerText = "Enviando...";

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "✅ ¡Gracias! Tu mensaje ha sido enviado.";
                status.style.color = "green";
                form.reset(); // Limpia el formulario
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "❌ Oops! Hubo un problema al enviar.";
                    }
                    status.style.color = "red";
                })
            }
        }).catch(error => {
            status.innerHTML = "❌ Hubo un error de conexión.";
            status.style.color = "red";
        }).finally(() => {
            button.disabled = false;
            button.innerText = "Enviar Solicitud";
        });
    }

    form.addEventListener("submit", handleSubmit)

