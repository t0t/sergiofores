function load() {
  // svg animacion metodo
  const coverSVG = document.querySelector("svg#coversvg");
  const elementos = document.querySelectorAll(".elemento");

  const metodoSVG = document.querySelector("svg#metodosvg");
  const svgBtns = document.querySelectorAll(".clickableItem");
  const svgTxts = document.querySelectorAll(".txt");

  if (coverSVG) {
    elementos.forEach(elemento => {
      elemento.addEventListener("click", (e) => {
        let numeroRandom = Math.ceil(Math.floor(Math.random() * 9));
        let txt = elemento.nextElementSibling;

        txt.setAttribute("x", numeroRandom);
        txt.setAttribute("y", numeroRandom);

        let contenidoTexto = txt.innerHTML;
        console.log("el contenido del texto adyacente es: ", contenidoTexto);
        console.log(e.target.attributes);
        console.log(e.target.attributes.r.value = numeroRandom);
      })

    });

  }
  if (metodoSVG) {

  //   var onresize = function() {
  //     metodoSVG.style.width = window.innerWidth;
  //     // metodoSVG.style.height = window.innerHeight;
  //     // width = document.body.clientWidth;
  //     // height = document.body.clientHeight;
  //  }
  //  window.addEventListener("resize", onresize);


    svgBtns.forEach((svgBtn, idx) => {
      svgBtn.addEventListener("click", () => {
        ToggleActive(svgBtn, idx);
      });
    });

    function ToggleActive(el, index) {
      el.classList.add("txt--active");
      svgTxts[index].style.display = "block";
      svgBtns.forEach((svgBtn, idx) => {
        if (idx !== index) {
          svgTxts[idx].style.display = "none";
          svgBtn.classList.remove("txt--active");
        }
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", load, false);
