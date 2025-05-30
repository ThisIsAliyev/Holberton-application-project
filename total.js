
document.addEventListener("DOMContentLoaded", function(event) {
const imageContainers = document.querySelectorAll('.product-preview');

imageContainers.forEach(container => {
    const backgroundImage = container.querySelector('.background-image');
    const descriptionContainer = container.querySelector('.description');
    const movedIcon = container.querySelector('.movedIcon');

    function checkForBlur(e) {
        const isOver = container.contains(e.target);

        if (isOver) {
            descriptionContainer.style.marginBottom = '0';
            descriptionContainer.style.transition = '.3s';
            backgroundImage.style.filter = 'blur(10px)';
            backgroundImage.style.transform = 'scale(1.2)';
            backgroundImage.style.transition = '.3s';
            movedIcon.style.marginTop = '0px';
            movedIcon.style.transition = '.3s';
        } else {
            descriptionContainer.style.marginBottom = '-500px';
            backgroundImage.style.filter = 'blur(0)';
            backgroundImage.style.transform = 'scale(1)';
            movedIcon.style.marginTop = '-300px';
        }
    }

    document.addEventListener("mousemove", checkForBlur);
});

function updateLogoText() {
    const logo = document.querySelector('.logo');
    if (document.documentElement.clientWidth <= 700) {
      logo.textContent = 'A';
    } else {
      logo.textContent = 'ALIYEV.CO';
    }
  }
  updateLogoText();
  window.addEventListener("resize", updateLogoText);


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
    if(isActive) {
      leftSection.style.display = "flex";
      leftSection.style.transform = "translateX(0%)";
    } else {
      leftSection.style.transform = "translateX(-105%)";
    }
  } 



    document.querySelector('.product-searcher').addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
        window.location.href = "all-products.html";
    }
  });


const linksContainer = document.querySelector('.links'); //


function adjustLayout() {
  if (window.innerWidth <= 1330) {
    if (leftSectionOpen) leftSectionOpen.style.display = 'flex';
    linksContainer.style.display = 'none';
  } else {
    if (leftSectionOpen) leftSectionOpen.style.display = 'none';
    linksContainer.style.display = 'flex';
  }
}


window.addEventListener("resize",adjustLayout);
window.addEventListener('load', adjustLayout);


var disqus_config = function () {
        // Replace PAGE_URL with your page's canonical URL variable
        this.page.url = 'http://35.180.83.75';  
        
        // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        this.page.identifier = 'Index'; 
    };

(function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://aliyev-co.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
});