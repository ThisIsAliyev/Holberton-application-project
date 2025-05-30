document.addEventListener("DOMContentLoaded", function (event) {
  fetch("text.json")
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector('.casual-products');
      const products = data.products;

      products.forEach(product => {
        createBox(product);
      });

      function createBox(product) {
        const LinkToProduct = document.createElement('a');
        LinkToProduct.href = 'product.html';
        LinkToProduct.classList.add('LinkToProduct');

        LinkToProduct.addEventListener('click', (event) => {
          event.preventDefault();
          localStorage.setItem('selectedProduct', JSON.stringify(product));
          window.location.href = 'product.html';
        });

        const box = document.createElement('div');
        box.classList.add('box');

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img');

        const imageUrl = product.thumbnail;
        if (imageUrl) {
          imgDiv.style.backgroundImage = `url(${imageUrl})`;
          imgDiv.style.backgroundSize = 'cover';
          imgDiv.style.backgroundPosition = 'center';
        }

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');

        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = product.title;

        const rating = document.createElement('div');
        rating.classList.add('rating');
        rating.textContent = `★ ${product.rating}`;

        const price = document.createElement('div');
        price.classList.add('price');
        price.textContent = `$${product.price}`;

        infoDiv.appendChild(title);
        infoDiv.appendChild(rating);
        infoDiv.appendChild(price);

        box.appendChild(imgDiv);
        box.appendChild(infoDiv);

        LinkToProduct.appendChild(box);
        container.appendChild(LinkToProduct);
      }

      const productSearcher = document.querySelector('.product-searcher');
      productSearcher.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          container.textContent = ''

          products.forEach(
            (product) => {
              if (product.title.toLowerCase().includes(productSearcher.value.toLowerCase())) {
                createBox(product)
              }
            }
          )
        }
      })

      const tagSet = new Set();
      data.products.forEach(product => {
        if (Array.isArray(product.tags)) {
          product.tags.forEach(tag => tagSet.add(tag));
        }
      });

      const tagArray = [...tagSet];
      const inputElement = document.querySelector('.tag-researcher');
      let selectedTags = [];

      function showMatchingTags(inputValue = '') {
        const listDiv = document.querySelector('.list');
        listDiv.textContent = '';
        let results = tagArray.filter(tag =>
          tag.toLowerCase().includes(inputValue.trim().toLowerCase()) &&
          !selectedTags.includes(tag)
        );
        results.forEach(result => createNewLine(result));

      }

      inputElement.addEventListener("input", () => {
        showMatchingTags(inputElement.value);
      });

      inputElement.addEventListener("click", () => {
        const listDiv = document.querySelector('.list');
        showMatchingTags(inputElement.value);
        if (listDiv.style.display === 'none' || listDiv.style.display === '') {
          listDiv.style.display = 'flex';
        }
      });

      document.addEventListener("click", (event) => {
        const listDiv = document.querySelector('.list');
        const inputEl = document.querySelector('.tag-researcher');
        if (!inputEl.contains(event.target) && !listDiv.contains(event.target)) {
          listDiv.style.display = 'none';
        }
      });

      function createNewLine(arrayElement) {
        const listDiv = document.querySelector('.list');
        const newDiv = document.createElement('div');
        newDiv.classList.add('label-of-list');
        newDiv.textContent = arrayElement;

        newDiv.addEventListener('click', () => {
          createSpanForTag(arrayElement);
          selectedTags.push(arrayElement);
          newDiv.remove();
        });

        listDiv.appendChild(newDiv);
      }

      function createSpanForTag(spanElement) {
        const tagArea = document.querySelector('.added-tags');
        const selectedTag = document.createElement('div');
        selectedTag.classList.add('selected-tag');

        const span = document.createElement('span');
        span.classList.add('spaninArea');
        span.textContent = spanElement;

        const removeBtn = document.createElement('span');
        removeBtn.textContent = '✕';
        removeBtn.style.marginLeft = '8px';
        removeBtn.style.cursor = 'pointer';

        removeBtn.addEventListener('click', () => {
          selectedTag.remove();
          selectedTags = selectedTags.filter(tag => tag !== spanElement);
          showMatchingTags(inputElement.value);
        });

        selectedTag.appendChild(span);
        selectedTag.appendChild(removeBtn);
        tagArea.appendChild(selectedTag);
      }
    });


  let InputMaxRangeElement = document.querySelector(".max-range");
  let InputMinRangeElement = document.querySelector(".min-range");
  let InputMaxTextElement = document.querySelector(".max-price");
  let InputMinTextElement = document.querySelector(".min-price");

  function checkRangeConsistency(changed) {
    let min = Number(InputMinRangeElement.value)
    let max = Number(InputMaxRangeElement.value)
    const mingap = 200;

    if (changed === "max" && max <= min + mingap) {
      max = min + mingap;
      InputMaxRangeElement.value = max;
      InputMaxTextElement.value = max;
    }

    if (changed === "min" && min >= max - mingap) {
      min = max - mingap;
      InputMinRangeElement.value = min;
      InputMinTextElement.value = min;
    }
  }

  InputMaxRangeElement.addEventListener("input",
    () => {
      InputMaxTextElement.value = InputMaxRangeElement.value;
      checkRangeConsistency("max")
    }
  )

  InputMaxTextElement.addEventListener("blur",
    () => {
      InputMaxRangeElement.value = InputMaxTextElement.value;
      checkRangeConsistency("max")
    }
  )

  InputMaxTextElement.addEventListener("keydown",
    (e) => {
      if (e.key === "Enter") {
        InputMaxRangeElement.value = InputMaxTextElement.value;
        checkRangeConsistency("max")
      }
    }
  )



  InputMinRangeElement.addEventListener("input",
    () => {
      InputMinTextElement.value = InputMinRangeElement.value;
      checkRangeConsistency("min")
    }
  )

  InputMinTextElement.addEventListener("blur",
    () => {
      InputMinRangeElement.value = InputMinTextElement.value;
      checkRangeConsistency("min")
    }
  )

  InputMinTextElement.addEventListener("keydown",
    (e) => {
      if (e.key === "Enter") {
        InputMinRangeElement.value = InputMinTextElement.value;
        checkRangeConsistency("min")
      }
    }
  )

  const stars = document.querySelectorAll(".stars");
  let selectedStars = 0;

  stars.forEach(star => {
    star.addEventListener("mouseover", () => {
      const nthStar = parseInt(star.id.split("-")[1]);

      stars.forEach((s, index) => {
        s.textContent = (index < nthStar) ? "★" : "☆";
      });
    });

    star.addEventListener("mouseleave", () => {
      stars.forEach((s, index) => {
        s.textContent = (index < selectedStars) ? "★" : "☆";
      });
    });

    star.addEventListener("click", () => {
      const nthStar = parseInt(star.id.split("-")[1]);
      if (nthStar === selectedStars) {
        selectedStars = 0;
      } else {
        selectedStars = nthStar;
      }

      stars.forEach((s, index) => {
        s.textContent = (index < selectedStars) ? "★" : "☆";
      });

      valueDetectOfReview(selectedStars);
    });
  });


  const review = document.querySelector('.star-value');


  function valueDetectOfReview(starNumber) {
    switch (starNumber) {
      case 0:
        review.textContent = '-';
        break;
      case 1:
        review.textContent = 'Very Poor';
        break;
      case 2:
        review.textContent = 'Poor';
        break;
      case 3:
        review.textContent = 'Average';
        break;
      case 4:
        review.textContent = 'Good';
        break;
      case 5:
        review.textContent = 'Excellent';
        break;
      default:
        break;
    }
  }


  function valueDetectOfReview(starNumber) {
    switch (starNumber) {
      case 0:
        review.textContent = '-';
        break;
      case 1:
        review.textContent = 'Very Poor';
        break;
      case 2:
        review.textContent = 'Poor';
        break;
      case 3:
        review.textContent = 'Average';
        break;
      case 4:
        review.textContent = 'Good';
        break;
      case 5:
        review.textContent = 'Excellent';
        break;
      default:
        break;
    }
  }



  let shippingArray = [];

  const shippingTags = document.querySelectorAll('.tag');

  shippingTags.forEach(tag => {
    tag.dataset.selected = "0";

    tag.addEventListener('click', () => {
      if (tag.dataset.selected === "0") {
        shippingArray.push(tag.textContent);
        tag.dataset.selected = "1";
      } else {
        shippingArray = shippingArray.filter(item => item !== tag.textContent);
        tag.dataset.selected = "0";
      }
      tagStyle(tag);
    });
  });

  function tagStyle(element) {
    if (element.dataset.selected === "1") {
      element.style.backgroundColor = 'black';
      element.style.color = 'white';
      element.style.border = '1px solid rgba(0, 0, 0, 0)';
    } else {
      element.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      element.style.color = 'black';
      element.style.border = '1px solid rgba(0, 0, 0, 0.6)';
    }
  }


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
      leftSection.style.transform = "translateX(-105%)";
    }
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

  const toggleMenuButton = document.querySelector('.filter-icon');
  const toggleCloseButton = document.querySelector(".close-toggle-icon");
  const filterFullWidthIcon = document.querySelector('.filter-symbol');
  const filtersElement = document.querySelector('.filters');
  const bodyElement = document.querySelector('body');
  const filtersContainer = document.querySelector('.filters-container');
  const buttonName = document.querySelector('.apply');
  const priceContainer = document.querySelector('.price-container');
  const linksContainer = document.querySelector('.links');

  function adjustLayout() {
    if (window.innerWidth <= 1330) {
      filtersElement.style.display = 'none';
      toggleMenuButton.style.display = 'flex';
      if (leftSectionOpen) leftSectionOpen.style.display = 'flex';
      linksContainer.style.display = 'none';
    } else {
      filtersElement.style.display = 'grid';
      toggleMenuButton.style.display = 'none';
      if (leftSectionOpen) leftSectionOpen.style.display = 'none';
      linksContainer.style.display = 'flex';
    }
  }


  window.addEventListener("resize", adjustLayout);
  window.addEventListener('load', adjustLayout);


  toggleMenuButton.addEventListener('click', () => {
    filtersElement.classList.toggle('open');
    checkFilter();
  });

  toggleCloseButton.addEventListener('click', () => {
    filtersElement.classList.toggle('open');
    checkFilter();
  });


  function checkFilter() {
    const isMobile = document.documentElement.clientWidth <= 1233;

    if (filtersElement.classList.contains('open')) {
      if (isMobile) {
        filtersElement.style.display = 'flex';
        filtersElement.style.flexDirection = 'column';
        filtersElement.style.position = 'fixed';
        filtersElement.style.top = '0';
        filtersElement.style.left = '0';
        filtersElement.style.right = '0';
        filtersElement.style.width = '100%';
        filtersElement.style.height = '100vh';
        filtersElement.style.boxSizing = 'border-box';
        filtersElement.style.justifyContent = 'start';
        filtersElement.style.paddingTop = '20px';
        filtersElement.style.paddingBottom = '200px';
        filtersElement.style.alignItems = 'center';
        filtersElement.style.overflowY = 'auto';
        filtersElement.style.zIndex = '1000';
        filtersElement.style.backgroundColor = 'white';
        filtersContainer.style.width = '80%';
        filterFullWidthIcon.style.display = 'none';
        toggleCloseButton.style.display = 'inline-block';
        bodyElement.style.overflowY = 'hidden';
        buttonName.style.padding = '40px 0px';
        priceContainer.style.width = '100%'
      } else {
        filterFullWidthIcon.style.display = 'inline-block';
        toggleCloseButton.style.display = 'none';
        filtersElement.style.position = 'static';
        filtersElement.style.display = 'grid';
        filtersElement.style.width = '24%';
        filtersElement.style.height = '1200px';
        filtersElement.style.backgroundColor = 'rgba(0,0,0,0)';
        bodyElement.style.overflowY = 'auto';
        bodyElement.style.overflowY = 'auto';
      }
    } else {
      if (isMobile) {
        filtersElement.style.display = 'none';
        filterFullWidthIcon.style.display = 'inline-block';
        toggleCloseButton.style.display = 'none';
        bodyElement.style.overflowY = 'auto';
      } else {
        filtersElement.style.position = 'static';
        filtersElement.style.display = 'grid';
        filtersElement.style.width = '24%';
        filtersElement.style.height = '1200px';
        filtersElement.style.backgroundColor = 'rgba(0,0,0,0)';
        bodyElement.style.overflowY = 'auto';
      }
    }
  }

  window.addEventListener("resize", checkFilter);
  checkFilter();


  //Disqus comments

  var disqus_config = function () {
    this.page.url = 'http://35.180.83.75/all-products.html';  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = 'AllProducts'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };


    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://aliyev-co.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
});