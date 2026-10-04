// ======================================
// CONFIGURAÇÃO DO WHATSAPP
// ======================================

// COLOQUE SEU NÚMERO AQUI
// Exemplo Brasil:
// 5551999999999

const whatsappNumber = "51997498815";


// ======================================
// VARIÁVEIS
// ======================================

const modal = document.getElementById("modal");
const selectedSite = document.getElementById("selectedSite");
const menuToggle = document.querySelector(".mobile-menu-toggle");
const nav = document.getElementById("main-nav");
const orderForm = document.getElementById("orderForm");
const formStatus = document.getElementById("formStatus");

let currentSite = "Site personalizado";
let currentPrice = "Sob consulta";


// ======================================
// MENU MOBILE
// ======================================

if (menuToggle && nav) {

    menuToggle.addEventListener("click", function() {
        const isOpen = nav.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
            nav.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        });
    });
}


// ======================================
// ABRIR MODAL
// ======================================

function openModal(site, price) {

    currentSite = site;
    currentPrice = price;

    selectedSite.innerText =
        `${site} — ${price}`;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


// ======================================
// FECHAR MODAL
// ======================================

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";
}


// ======================================
// FECHAR CLICANDO FORA
// ======================================

modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        closeModal();

    }

});


// ======================================
// FORMULÁRIO
// ======================================

if (orderForm) {

    orderForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const details = document.getElementById("details").value.trim();

        if (!name || !contact || !details) {
            formStatus.textContent = "Preencha nome, contato e detalhes do projeto antes de enviar.";
            formStatus.classList.add("visible", "error");
            return;
        }

        const message =
`Olá! Vim pelo site da RKZ WEB.

Quero contratar:

Site: ${currentSite}
Valor: ${currentPrice}

Meu nome: ${name}

Meu contato:
${contact}

Sobre o projeto:
${details}

Gostaria de receber mais informações.`;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        formStatus.textContent = "Pedido pronto! Você será redirecionado para o WhatsApp.";
        formStatus.classList.remove("error");
        formStatus.classList.add("visible");

        window.open(url, "_blank");

        orderForm.reset();

        setTimeout(function() {
            closeModal();
            formStatus.classList.remove("visible");
            formStatus.textContent = "";
        }, 500);

    });
}


// ======================================
// BOTÃO DE CONTATO
// ======================================

function openContact() {

    const message =
        "Olá! Vim pelo site da RKZ WEB e gostaria de criar um site.";

    const url =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}


// ======================================
// ESC - FECHAR MODAL
// ======================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeModal();

    }

});