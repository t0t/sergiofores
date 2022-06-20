var slideIndex = 1;
showSlide(slideIndex);
function openLightbox() {
    document.getElementById("Lightbox").style.display = "grid";
}
function closeLightbox() {
    document.getElementById("Lightbox").style.display = "none";
}
function changeSlide(n) {
    showSlide(slideIndex += n);
}
function toSlide(n) {
    showSlide(slideIndex = n);
}
function showSlide(n) {
    const slides = document.getElementsByClassName("slide");
    let modalPreviews = document.getElementsByClassName("modal-preview");
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    for(let i = 0; i < slides.length; i++)slides[i].style.display = "none";
    for(let i1 = 0; i1 < modalPreviews.length; i1++)modalPreviews[i1].className = modalPreviews[i1].className.replace(" active", "");
    slides[slideIndex - 1].style.display = "grid";
    modalPreviews[slideIndex - 1].className += " active";
}

//# sourceMappingURL=obra.bc3b2048.js.map
