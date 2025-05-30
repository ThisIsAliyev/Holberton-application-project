document.addEventListener("DOMContentLoaded", function (event) {

  function updateLogoText() {
    const logo = document.querySelector('.logo');
    if (document.documentElement.clientWidth <= 680) {
      logo.textContent = 'A';
    } else {
      logo.textContent = 'ALIYEV.CO';
    }
  }
  updateLogoText();
  window.addEventListener("resize", updateLogoText);


  //input errors 
  const submitButton = document.querySelector('.submit');
  const emailError = document.querySelector('.email-error');
  const passwordError = document.querySelector('.password-error');

  submitButton.addEventListener('click', (event) => {
    const emailInput = document.querySelector('.email-input').value.trim();
    const passwordInput = document.querySelector('.password-input').value;

    let valid = true;

    if (emailInput === '') {
      emailError.textContent = 'Email cannot be empty!';
      emailError.style.display = 'inline-block';
      valid = false;
    } else {
      emailError.style.display = 'none';
    }

    if (passwordInput.length <= 8) {
      passwordError.textContent = 'Password must be more than 8 characters!';
      passwordError.style.display = 'inline-block';
      valid = false;
    } else {
      passwordError.style.display = 'none';
    }

    if (!valid) {
      event.preventDefault();
    }
  });









  const leftSectionClose = document.querySelector(".close-left-section");
  const leftSectionOpen = document.querySelector('.menu-logo');
  const leftSection = document.querySelector('.left-section-toggle');


  leftSectionOpen.addEventListener('click', () => {
    leftSection.classList.toggle('open');
    let isActive = leftSection.classList.contains('open');
    leftSectionFunc(isActive)
  })

  leftSectionClose.addEventListener('click', () => {
    leftSection.classList.toggle('open');
    let isActive = leftSection.classList.contains('open');
    leftSectionFunc(isActive)
  })


  function leftSectionFunc(isActive) {
    if (isActive) {
      leftSection.style.display = "flex";
      leftSection.style.transform = "translateX(0%)";
    } else {
      leftSection.style.transform = "translateX(-100%)";
    }
  }



  document.querySelector('.product-searcher').addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      window.location.href = "all-products.html";
    }
  })


  const linksContainer = document.querySelector('.links');

  function adjustLayout() {
    if (window.innerWidth <= 1330) {
      if (leftSectionOpen) leftSectionOpen.style.display = 'flex';
      linksContainer.style.display = 'none';
    } else {
      if (leftSectionOpen) leftSectionOpen.style.display = 'none';
      linksContainer.style.display = 'flex';
    }
  }


  window.addEventListener("resize", adjustLayout);
  window.addEventListener('load', adjustLayout);


  var disqus_config = function () {
    this.page.url = 'http://35.180.83.75/login-page.html';  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = 'Login'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };


  (function () {
    var d = document, s = d.createElement('script');
    s.src = 'https://aliyev-co.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
});