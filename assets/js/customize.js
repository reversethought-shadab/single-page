document.addEventListener("DOMContentLoaded", function () {
  const pplrSelectItems = document.querySelectorAll(".pplr-selecter-item");
  const textarea = document.querySelector(".textarea-neon");
  const previewText = document.querySelector("#Preview-text");
  const priceValue = document.querySelector(".price-value");
  const priceItem = document.querySelector(".price-item");

  function updatePrice(price) {
    if (priceValue && priceItem) {
      if (price === 0) {
        priceValue.textContent = "₹00";
        priceItem.textContent = "₹00";
      } else {
        priceValue.textContent = "₹" + price;
        priceItem.textContent = "₹" + price;
      }
    } else {
      console.error("Price elements not found in the DOM.");
    }
    // Update price in the cart
    const cartPrice = document.querySelector(".cart-price");
    if (cartPrice) {
      if (price === 0) {
        cartPrice.textContent = "₹00";
      } else {
        cartPrice.textContent = "₹" + price;
      }
    } else {
      console.error("Cart price element not found in the DOM.");
    }
    const totalPrice = document.querySelector(".total-price");
    if (totalPrice) {
      if (price === 0) {
        totalPrice.textContent = "₹00";
      } else {
        totalPrice.textContent = "₹" + price;
      }
    } else {
      console.error("Cart price element not found in the DOM.");
    }
  }
  // Function to calculate the price based on the input length
  function calculatePrice(text) {
    const length = text.trim().length;

    const priceTiers = [
      { length: 0, price: 1200 },
      { length: 5, price: 1200 },
      { length: 8, price: 1500 },
      { length: 11, price: 1800 },
      { length: 14, price: 2100 },
      { length: 17, price: 2400 },
      { length: 21, price: 2700 },
      { length: 24, price: 3000 },
      { length: 27, price: 3300 },
      { length: 30, price: 3600 },
      { length: 33, price: 3900 },
      { length: 36, price: 4200 },
      { length: 39, price: 4500 },
      { length: 42, price: 4800 },
      { length: 45, price: 5100 },
      { length: 48, price: 5400 },
      { length: 51, price: 5700 },
      { length: 54, price: 6000 },
      { length: 57, price: 6300 },
      { length: 60, price: 6600 },
      // Add more tiers as needed
    ];
    if (length === 0) {
      return 0;
    }
    // Find the matching price tier for the current length
    const matchingTier = priceTiers.find((tier) => length <= tier.length);

    return matchingTier.price;
  }

  // Event listener for size selection

  // Event listener for textarea input
  let firstLetterTyped = false;
  textarea.addEventListener("input", function (event) {
    const text = event.target.value;
    const price = calculatePrice(text.replace(/\s/g, ""));
    updatePrice(price);
    if (!firstLetterTyped && text.trim().length > 0) {
      firstLetterTyped = true;
    }
  });
  const sizeSpans = document.querySelectorAll(".pplr-drop-item");

  sizeSpans.forEach((span, index) => {
    span.addEventListener("click", function () {
      // Get the id of the clicked span
      const clickedId = this.id;

      // Remove 'active' class from all spans
      sizeSpans.forEach((span) => span.classList.remove("active"));

      // Add 'active' class to the clicked span
      this.classList.add("active");

      // Calculate the base price based on the text area value
      const text = textarea.value;
      const basePrice = calculatePrice(text.replace(/\s/g, ""));

      // Initialize the price increment
      let activeIndex = -1;
      sizeSpans.forEach((span, idx) => {
        if (span.classList.contains("active")) {
          activeIndex = idx;
        }
      });
      sizeSpans.forEach((span) => span.classList.remove("active"));

      // Add 'active' class to the clicked span
      this.classList.add("active");
      let priceIncrement = 0;

      // Determine the price increment based on the clicked span
      switch (clickedId) {
        case "first":
          priceIncrement = 0;
          break;
        case "second":
          priceIncrement = 300;
          break;
        case "third":
          priceIncrement = 900;
          break;
        case "fourth":
          priceIncrement = 1500;
          break;
        case "fifth":
          priceIncrement = 2100;
          break;
        case "sixth":
          priceIncrement = 2700;
          break;
        case "seventh":
          priceIncrement = 3300;
          break;
        default:
          priceIncrement = 0;
          break;
      }

      // Calculate the total price
      let totalPrice = basePrice;
      if (basePrice >= 1200) {
        totalPrice += priceIncrement;

        // Apply additional increments for spans after the active span
        if (activeIndex >= 0 && index > activeIndex) {
          totalPrice += priceIncrement * (index - activeIndex);
        }
      }

      // Update the price value with the new total price
      updatePrice(totalPrice);
    });
  });
  // Add event listeners to the checkboxes
  function updatePriceOnCheck(checkbox) {
    // Get the base price
    const text = textarea.value; // Assuming 'textarea' is defined elsewhere
    const basePrice = calculatePrice(text.replace(/\s/g, ""));

    // Get the increment based on the number of checkboxes checked
    let increment = 0;
    const checkedCheckboxes = document.querySelectorAll(
      ".pplrcheckbox:checked"
    );
    const numChecked = checkedCheckboxes.length;

    // Calculate the increment based on the number of checked checkboxes
    switch (numChecked) {
      case 1:
        increment = 120;
        break;
      case 2:
        increment = 240;
        break;
      case 3:
        increment = 360;
        break;
      case 4:
        increment = 480;
        break;
      case 5:
        increment = 600;
        break;
      case 6:
        increment = 720;
        break;
      case 7:
        increment = 840;
        break;
      default:
        increment = 0;
        break;
    }

    // Calculate the total price
    const totalPrice = basePrice + increment;

    // Update the price value with the new total price
    updatePrice(totalPrice); // Assuming 'updatePrice' is defined elsewhere
  }
  const checkbox = document.querySelector(".pplrcheckbox");

  checkbox.addEventListener("change", function () {
    // Call the updatePriceOnCheck function when the checkbox state changes
    updatePriceOnCheck(this);
  });

  // fonts preview
  function applyFont(selectedFont) {
    textarea.style.fontFamily = selectedFont;
    textarea.style.fontSize = "18px";
    previewText.style.fontFamily = selectedFont;
    previewText.style.fontSize = "55px";
  }

  function handleFontItemClick(item) {
    pplrSelectItems.forEach((item) => item.classList.remove("selected-font"));

    item.classList.add("selected-font");

    const selectedFont = item.style.fontFamily;
    if (!selectedFont || !isValidFont(selectedFont)) {
      console.error("Invalid font family:", selectedFont);
      return;
    }
    applyFont(selectedFont);
  }
  function isValidFont(font) {
    return font !== "Comic Sans MS";
  }
  pplrSelectItems.forEach((item) => {
    item.addEventListener("click", () => {
      handleFontItemClick(item);
    });
  });

  textarea.addEventListener("input", () => {
    previewText.textContent = textarea.value;
  });

  function activateColor(event) {
    const selectedColorPallet = event.target;
    if (selectedColorPallet.classList.contains("color-pallet")) {
      document.querySelectorAll(".color-pallet").forEach(function (element) {
        element.classList.remove("active");
      });
      selectedColorPallet.classList.add("active");
      const selectedColor = selectedColorPallet.getAttribute("data-color");

      const neonTextElement = document.querySelector(".neonText");
      const previewTextElement = document.getElementById("Preview-text");

      if (neonTextElement) {
        neonTextElement.style.textShadow = `
                0 0 5px ${selectedColor},
                0 0 10px ${selectedColor},
                0 0 15px ${selectedColor},
                0 0 20px ${selectedColor},
                0 0 25px ${selectedColor},
                0 0 30px ${selectedColor},
                0 0 35px ${selectedColor},
                0 0 40px ${selectedColor}
            `;
      } else {
        console.error("Element with class 'neonText' not found.");
      }

      if (previewTextElement) {
        previewTextElement.style.color = selectedColor;
      } else {
        console.error("Element with ID 'Preview-text' not found.");
      }
    }
  }

  document.querySelectorAll(".color-pallet").forEach((item) => {
    item.addEventListener("click", (event) => {
      activateColor(event);
    });
  });
  // cart showen ---------------------
  $(document).ready(function ($) {
    var $body = $("body");

    $(".cart-button, .close-button,  #sidebar-cart-curtain").click(function (
      e
    ) {
      e.preventDefault();

      $body.toggleClass("show-sidebar-cart");

      if ($("#sidebar-cart-curtain").is(":visible")) {
        $("#sidebar-cart-curtain").fadeOut(500);
      } else {
        // Show the curtain
        $("#sidebar-cart-curtain").fadeIn(500);
      }
    });
  });
  // ============== modal ===============
  //  ================================
  function showPreview() {
    const previewFull = document.querySelector(".preview-full");
    const modalBody = document.querySelector(".modal-body");

    if (previewFull && modalBody) {
      const previewClone = previewFull.cloneNode(true);
      modalBody.innerHTML = "";
      modalBody.appendChild(previewClone);
    }
  }
  const outputButton = document.getElementById("output");
  if (outputButton) {
    outputButton.addEventListener("click", showPreview);
  }
  // Function to add item to cart
  function addToCart() {
    const previewFull = document.querySelector(".preview-full");
    if (!previewFull) {
      console.error("Preview full element not found.");
      return;
    }
    const cartItem = document.querySelector("#cart-item");
    if (!cartItem) {
      console.error("Cart item element not found.");
      return;
    }
    const previewClone = previewFull.cloneNode(true);
    previewClone.classList.remove("preview-full");
    previewClone.style.height = "200px";
    previewClone.style.width = "250px";
    cartItem.innerHTML = "";
    cartItem.appendChild(previewClone);

    updateEmptyCartMessage();
  }
  function updateEmptyCartMessage() {
    const cartItem = document.querySelector("#cart-item");
    const emptyCartMessage = document.getElementById("empty-cart-message");

    if (!cartItem || !emptyCartMessage) {
      console.error("Cart item or empty cart message not found.");
      return;
    }
    if (!cartItem.innerHTML.trim()) {
      emptyCartMessage.classList.remove("d-none");
    } else {
      emptyCartMessage.classList.add("d-none");
    }
  }
  const addToCartButton = document.getElementById("add-cart-btn");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", addToCart);
  }
  function removeCartItem(event) {
    const cartItem = event.target.closest(".product");
    if (!cartItem) {
      console.error("Cart item not found.");
      return;
    }
    cartItem.remove();
  }
  // Add event listener to each remove button
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
  function updateEmptyCartMessage() {
    const cartItems = document.querySelectorAll("#sidebar-cart .product");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    if (cartItems.length === 0) {
      emptyCartMessage.classList.remove("d-none");
    } else {
      emptyCartMessage.classList.add("d-none");
    }
  }
  updateEmptyCartMessage();
});
