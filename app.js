const pushButton = document.querySelector('.js-push-btn');
let isSubscribed = false;
let swRegistration = null;
var navEle = document.getElementById("myNavbar").children;

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("heroimg");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function showNews(){
  document.getElementById("home").style.display = "none";
  document.getElementById("news").style.display = "block";
  document.getElementsByClassName("hero")[0].innerHTML = `<img class="heroimg" src="images/news.jpg" alt="" style="display:block">`;
  navEle[1].classList.add("active");
  navEle[0].classList.remove("active");
  document.getElementById("fishbowlvideo").innerHTML = `<iframe width="100%" src="https://www.youtube.com/embed/8Q4uM9cZxVg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  document.getElementById("fishbowlimage").innerHTML = `<img src="images/news_fishbowl.png" alt="fishbowl discussion">`;
}

function showHome(){
  document.getElementById("home").style.display = "block";
  document.getElementById("news").style.display = "none";
  navEle[0].classList.add("active");
  navEle[1].classList.remove("active");
  document.getElementsByClassName("hero")[0].innerHTML = `<img class="heroimg" src="https://www.werk39.com/wp-content/uploads/180313_werk39_homepage_beyond_ps.png" alt="beyond the product">
  <img class="heroimg" src="https://www.werk39.com/wp-content/uploads/we_innovate-2.png" alt="we innovate">
  <img class="heroimg" src="https://www.werk39.com/wp-content/uploads/creative_space-2.png" alt="creative space">
  <img class="heroimg" src="https://www.werk39.com/wp-content/uploads/co_creation_and_more-2.png" alt="co-creation & more">
  <div class="button" id="leftbutton" onclick="plusDivs(-1)">&#10094;</div>
  <div class="button" id="rightbutton" onclick="plusDivs(+1)">&#10095;</div>`;
  showDivs(1);
}