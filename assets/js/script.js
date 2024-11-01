function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const contentContainer = document.querySelector(".content-container");

    // Alterna a expansão do sidebar
    sidebar.classList.toggle("expanded");
    contentContainer.classList.toggle("expanded");

    // Alterna a direção da seta no ícone de alternância
    const toggleIcon = document.querySelector(".toggle-item .toggle-icon");
    if (sidebar.classList.contains("expanded")) {
        toggleIcon.classList.remove("fa-chevron-right");
        toggleIcon.classList.add("fa-chevron-left");
    } else {
        toggleIcon.classList.remove("fa-chevron-left");
        toggleIcon.classList.add("fa-chevron-right");
    }

    // Alterna a visibilidade dos textos dos links
    const linkTexts = document.querySelectorAll(".link-text");
    linkTexts.forEach(text => {
        text.classList.toggle("d-none");
    });
}