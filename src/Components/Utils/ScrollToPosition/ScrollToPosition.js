const scrollToPosition = (position) => {
    window.scrollTo({
        top: position,
        behavior: "smooth"
    });
}

const scrollToPrevAccordeon = (index, offset) => {
    let scrollTarget = 0;

    if (index !== 0) {
        scrollTarget = document.getElementById('project-' + (index - 1)).offsetTop + offset;
    }

    scrollToPosition(scrollTarget);
}

export { scrollToPosition, scrollToPrevAccordeon };