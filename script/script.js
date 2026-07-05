document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(".container-main");
    const main = document.querySelector("main");
    const time = 3000;
    
    main.addEventListener("mouseover", () => {
        container.classList.add("open-container-main");
    })
    
    main.addEventListener("mouseleave", () => {
        container.classList.remove("open-container-main");
    });

    //mobile main
    main.addEventListener("touchstart", () => {
        container.classList.add("open-container-main");
    });

    main.addEventListener("touchend", () => {
        setTimeout(() => {
            container.classList.remove("open-container-main");
        }, time);
    });
})