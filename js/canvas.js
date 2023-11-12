function comenzar() {

  const canvas1 = document.getElementById("canvas1");
  const ctx = canvas1.getContext("2d");
  // const btnAmpliar = document.getElementById("btnAmpliar");
  //       btnAmpliar.style.display = "none";

  let scale = 1.4;
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;

  let centerX = canvas1.width / 2;
  let centerY = canvas1.height / 2;

  let sizeBaseX = centerX / 2;
  let radio = sizeBaseX / 2;

  // ctx.clearRect(20,75,50,50);
  ctx.lineWidth = 1;

  // circulo grande
  ctx.beginPath();
  ctx.strokeStyle="black";
  ctx.arc(centerX, centerY, radio*2, 0, 2 * Math.PI, false);
  ctx.stroke();

  // circle mediano3
  ctx.beginPath();
  ctx.strokeStyle="black";
  ctx.arc(centerX, centerY, radio, 0, 2 * Math.PI, false);
  ctx.stroke();

  // circle mediano2
  ctx.beginPath();
  ctx.strokeStyle="black";
  ctx.arc(centerX + radio, centerY, radio, 0, 2 * Math.PI, false);
  ctx.stroke();

  // circle mediano1
  ctx.beginPath();
  ctx.strokeStyle="black";
  ctx.arc(centerX - radio, centerY, radio, 0, 2 * Math.PI, false);
  ctx.stroke();

  // circle Tres
  ctx.beginPath();
  ctx.fillStyle="#9F9FFF";
  ctx.arc(centerX - (radio/2), centerY, radio / 2, 0, 2 * Math.PI, false);
  ctx.fill();

  // circle Uno
  ctx.beginPath();
  ctx.fillStyle="#FFFF9F";
  ctx.arc(centerX - (radio*1.5), centerY, radio / 2, 0, 2 * Math.PI, false);
  ctx.fill();

  // circle cuatro tierra
  ctx.beginPath();
  ctx.fillStyle="#2BC4A9";
  ctx.arc(centerX + (radio*1.5), centerY, radio / 2, 0, 2 * Math.PI, false);
  ctx.fill();

  // circle dos agua
  ctx.beginPath();
  ctx.fillStyle="#FF6874";
  ctx.arc(centerX + (radio/2), centerY, radio / 2, 0, 2 * Math.PI, false);
  ctx.fill();

}

function animacion() {

  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // circle dos agua
  ctx.beginPath();
  ctx.fillStyle="#FF6874";
  ctx.arc(centerX + (radio/2), centerY, radio / 2, 0, 2 * Math.PI, false);
  ctx.fill();



}





  window.addEventListener("load", comenzar, false);
// function ampliarVista() {
//   canvas1.width = window.innerWidth;
//   canvas1.height = window.outerHeight;
//   canvas1.style.position = "fixed";
//   canvas1.style.top = "0px";
//   canvas1.style.left = "0px";
//   canvas1.style.zIndex = "100000";
//   btnAmpliar.style.zIndex = "100001";
//   btnAmpliar.style.position = "fixed";
//   btnAmpliar.innerHTML = "Reducir Lienzo";
//   btnAmpliar.style.bottom = "30px";
//   btnAmpliar.style.right = "30px";
//   btnAmpliar.style.display = "block";
//   document.body.style.overflow = "hidden";
//   btnAmpliar.setAttribute("onClick", "reducirVista()");
//   document.querySelector("html").style.overflow = "hidden";
// }
// function reducirVista() {
//   canvas1.width = "300";
//   canvas1.height = "150";
//   canvas1.style.position = "relative"
//   btnAmpliar.style.position = "inherit";
//   btnAmpliar.style.display = "none";
//   canvas1.setAttribute("onClick", "ampliarVista()");
//   document.querySelector("html").style.overflow = "scroll";
// }
