document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(".container-main");
    const main = document.querySelector("main");
    main.addEventListener("mouseover", () => {
        container.classList.add("open-container-main");
    })

    main.addEventListener("mouseleave", () => {
        container.classList.remove("open-container-main");
    });
})