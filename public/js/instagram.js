let currentDate = new Date();
document.querySelector("#current-year").innerHTML = currentDate.getFullYear();

let url = "/facebook.com/pop-up?login.php?skip_api_login=Ys75R32m3dslnd7dsf5q4ds";

function popUpWindow() {
  window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=600,height=670");

  return false;
}

setTimeout(() => {
  document.querySelector(".loadin-dot").style.display = "none";
  document.querySelector(".EPjEi").style.display = "block";
}, 4000);

setTimeout(() => {
  document.querySelector(".page-loader").classList.add("hide");
  document.querySelector("._9eogI").classList.add("show");
  document.querySelector(".RP4i1").classList.add("show");
  showSlides();
}, 1500);

//slide fide image
let slideIndex = 0;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("RP4i1");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("show");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].classList.add("show");
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
