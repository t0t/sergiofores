// SLIDER https://www.w3schools.com/w3css/w3css_slideshow.asp
let slideIndex = [1, 1, 1, 1];
let slideId = [
  "slider1",
  "slider2",
  "slider3",
  "slider4"
]

// showDivs(1, 0);
// showDivs(1, 1);
// showDivs(1, 2);
// showDivs(1, 3);

export function plusDivs(n, no) {
  showDivs(slideIndex[no] += n, no);
}

export function showDivs(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);

  if (n > x.length) { slideIndex[no] = 1 }
  if (n < 1) { slideIndex[no] = x.length }

  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  x[slideIndex[no] - 1].style.display = "block";

}