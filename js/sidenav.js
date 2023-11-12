export function openNav() {
  document.getElementById("mySidenav").style.width = "50vw";
  // document.getElementById("theSite").style.marginRight = "75vw";
  document.getElementById("maincontent").style.opacity = "0.3";
  document.getElementById("maincontent").style.mixBlendMode = "luminosity";
  document.body.style.overflow = "hidden";
}

export function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  // document.getElementById("theSite").style.marginRight= "0";
  document.getElementById("maincontent").style.opacity= "inherit";
  document.getElementById("maincontent").style.mixBlendMode = "inherit";
  document.body.style.overflow = "inherit";
}
