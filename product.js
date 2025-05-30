document.addEventListener("DOMContentLoaded", function (event) {

  const imageContainer = document.querySelector('.image-container');
  const productTitle = document.querySelector('.product-title');
  const rating = document.querySelector('.rating');
  const productPrice = document.querySelector('.product-price');
  const productDescription = document.querySelector('.product-description');
  const deliveryInformation = document.querySelector('.delivery-information')

  const selectedProduct = localStorage.getItem('selectedProduct');

  if (selectedProduct) {
    const product = JSON.parse(selectedProduct); 
    document.title = product.title;

    productTitle.textContent = product.title;
    productPrice.textContent = `$${product.price}`;

    const imageUrl = product.images;
    if (imageUrl) {
      imageContainer.style.backgroundImage = `url(${imageUrl})`;
    }

    rating.textContent = `★ ${product.rating}`;
    deliveryInformation.textContent = product.shippingInformation;
    productDescription.textContent = product.description;

    


  } else {
    console.log("No product found in localStorage");
  }

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


  document.querySelector('.product-searcher').addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      window.location.href = "all-products.html";
    }
  })


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


  //Click to scale image:
  imageContainer.addEventListener('click', () => {
    imageContainer.classList.toggle('zoom');

    if(imageContainer.classList.contains('zoom')) {
      imageContainer.style.position = 'fixed';
      imageContainer.style.left = '0';
      imageContainer.style.right = '0';
      imageContainer.style.top = '0';
      imageContainer.style.bottom = '0';
    } else {
      imageContainer.style.position = 'static';
    }
  })


    var disqus_config = function () {
    this.page.url = 'http://35.180.83.75/product.html';  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = 'Product'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };


  (function () {
    var d = document, s = d.createElement('script');
    s.src = 'https://aliyev-co.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
});