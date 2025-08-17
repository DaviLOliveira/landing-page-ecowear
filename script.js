class MobileNavbar {

    /**
     * @param {string} mobileMenu 
     * @param {string} navList - O seletor CSS para a lista <ul> de links.
     * @param {string} navLinks - O seletor CSS para cada item <li> da lista.
     */
    constructor(mobileMenu, navList, navLinks) {
        // Encontra o elemento do ícone do menu no HTML e o armazena.
        this.mobileMenu = document.querySelector(mobileMenu);
        // Encontra a lista de links no HTML e a armazena.
        this.navList = document.querySelector(navList);
        // Encontra TODOS os itens da lista de links e os armazena como uma lista de elementos.
        this.navLinks = document.querySelectorAll(navLinks);
        // Define o nome da classe CSS que será usada para ativar/desativar os efeitos.
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Este método anima a entrada dos links, um após o outro,
     * criando um efeito de cascata.
     */
    animateLinks() {
        // Percorre cada link da lista de links.
        this.navLinks.forEach((link, index) => {
            // Verifica se o link já tem uma animação aplicada.
            // Se tiver (?), a animação é removida (para o menu fechar).
            // Se não tiver (:), a animação é adicionada.
            // O cálculo (index / 7 + 0.3) cria um pequeno atraso (delay) diferente
            // para cada link, baseado em sua posição na lista (o 'index').
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
        });
    }

    /**
     * Este método é chamado toda vez que o ícone do menu é clicado.
     */
    handleClick() {
        // Adiciona ou remove a classe 'active' da lista de links (<ul>).
        // Isso faz o menu aparecer ou desaparecer, conforme definido no CSS.
        this.navList.classList.toggle(this.activeClass);
        // Adiciona ou remove a classe 'active' no ícone do menu.
        // Isso faz o ícone se transformar em um 'X', conforme definido no CSS.
        this.mobileMenu.classList.toggle(this.activeClass);
        // Chama o método para animar os links.
        this.animateLinks();
    }

    /**
     * Adiciona o "ouvinte" de evento de clique ao ícone do menu.
     */
    addClickEvent() {
        // Diz ao navegador: "quando o elemento 'mobileMenu' for clicado,
        // execute o método 'handleClick'".
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

   
    init() {
        // Verifica se o elemento do menu realmente existe na página antes de adicionar o evento.
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        // Retornar 'this' é uma boa prática que permite encadear métodos.
        return this;
    }
}

// Aqui, nós criamos um objeto real (uma "instância") a partir da classe MobileNavbar.
const mobileNavbar = new MobileNavbar(
    ".mobile-menu", // Passando o seletor do ícone
    ".nav-list",    // Passando o seletor da lista
    ".nav-list li", // Passando o seletor dos itens da lista
);

mobileNavbar.init();

const observer = new IntersectionObserver((entries) => {
    // 'entries' é uma lista de todos os elementos que o observador está vigiando.
    entries.forEach((entry) => {
        // A propriedade 'isIntersecting' é 'true' se o elemento estiver visível na tela.
        if (entry.isIntersecting) {
            
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
// Pede ao nosso 'observer' para começar a "vigiar" cada um dos elementos encontrados.
hiddenElements.forEach((el) => observer.observe(el));