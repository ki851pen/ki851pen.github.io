var navEle = document.getElementById("myNavbar").children;
var cap = document.getElementById("cap");

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
  getData();
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

function getData(){
  fetch('http://localhost:7071/api/HttpTrigger',{mode :'cors'})
    .then(function(response) {
      return response.json();
    }).catch(function(error) {
      console.error('Fetch Error', error)
      cap.innerHTML = `<p>can't get data</p>`;
    }).then(function(data){
      cap.innerHTML = `<div class = "box"><h2>Capcounter</h2><p>Ingesamt ${data.total} Flasche geöffnet.</p>
      <p>Heute ${data.today} Flasche geöffnet.</p><p>Letzte Stunde ${data.lasthour} Flasche geöffnet.</p>
      <p>Letzte fünf Minute ${data.fivemin} Flasche geöffnet.</p><p>Letzte Nutzung um ${data.lastuse}.</p></div>`;
      total = data.total;
    });
}

document.getElementById("post").addEventListener("click", function() {
  fetch('http://localhost:7071/api/HttpTrigger', {
    method: 'POST',
    mode: 'cors',
    body: ''
  });
  getData();
});
