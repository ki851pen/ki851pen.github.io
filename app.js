const pushButton = document.querySelector('.js-push-btn');
const applicationServerPublicKey = 'BFPaBx-KOaqCSAUy13jLO-YD95PUh0wVEbOzHRa2eVrYk6EJfns4vQ212lIm_bjdJ-7MwQwVL6ylBmI7ZSWoV5M';
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
  document.getElementById("hero").src = "images/slider1.png";
}

window.addEventListener('load', async e => {
  if('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
  
    navigator.serviceWorker.register('sw.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);
  
      swRegistration = swReg;
      initializeUI();
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }
});

function initializeUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}

function updateSubscriptionOnServer(subscription) {
  console.log(JSON.stringify(subscription));
  // TODO: Send subscription to application server
}