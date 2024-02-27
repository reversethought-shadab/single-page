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

    // Define price tiers and corresponding prices
    const priceTiers = [
      { length: 0, price: 1200 }, // Up to 0 characters (base price)
      { length: 5, price: 1500 }, // Up to 5 characters
      { length: 8, price: 1800 }, // Up to 8 characters
      { length: 11, price: 2100 }, // Up to 11 characters
      { length: 14, price: 2400 }, // Up to 14 characters
      { length: 17, price: 2700 }, // Up to 17 characters
      { length: 21, price: 3000 }, // Up to 21 characters
      { length: 24, price: 3300 }, // Up to 24 characters

      // Add more tiers as needed
    ];
    if (length === 0) {
      return 0;
    }
    // Find the matching price tier for the current length
    const matchingTier = priceTiers.find((tier) => length <= tier.length);

    // Return the price from the matching tier
    return matchingTier.price;
  }

  // Event listener for textarea input
  let firstLetterTyped = false;
  textarea.addEventListener("input", function (event) {
    const text = event.target.value;
    const price = calculatePrice(text);

    // Call the updatePrice function to update the price
    updatePrice(price);
  });

  function applyFont(selectedFont) {
    textarea.style.fontFamily = selectedFont;
    textarea.style.fontSize = "16px";
    previewText.style.fontFamily = selectedFont;
    previewText.style.fontSize = "40px";
  }

  function handleFontItemClick(item) {
    pplrSelectItems.forEach((item) => item.classList.remove("selected-font"));

    item.classList.add("selected-font");

    const selectedFont = item.style.fontFamily;

    applyFont(selectedFont);
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
                0 0 7px ${selectedColor},
                0 0 10px ${selectedColor},
                0 0 2px ${selectedColor},
                0 0 21px ${selectedColor},
                0 0 22px ${selectedColor},
                0 0 2px ${selectedColor},
                0 0 12px ${selectedColor},
                0 0 11px ${selectedColor}
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
    // Declare the body variable
    var $body = $("body");

    // Function that shows and hides the sidebar cart
    $(".cart-button, .close-button,  #sidebar-cart-curtain").click(function (
      e
    ) {
      e.preventDefault();

      // Add the show-sidebar-cart class to the body tag
      $body.toggleClass("show-sidebar-cart");

      // Check if the sidebar curtain is visible
      if ($("#sidebar-cart-curtain").is(":visible")) {
        // Hide the curtain
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
      // Clone the content of .preview-full
      const previewClone = previewFull.cloneNode(true);

      // Clear the modal-body content
      modalBody.innerHTML = "";

      // Append the cloned preview to the modal-body
      modalBody.appendChild(previewClone);
    }
  }

  const outputButton = document.getElementById("output");
  if (outputButton) {
    outputButton.addEventListener("click", showPreview);
  }

  // cart function

  // Function to add item to cart
  function addToCart() {
    // Check if the preview-full element exists
    const previewFull = document.querySelector(".preview-full");
    if (!previewFull) {
      console.error("Preview full element not found.");
      return;
    }

    // Select the cart item element where the product will be added
    const cartItem = document.querySelector("#cart-item");
    if (!cartItem) {
      console.error("Cart item element not found.");
      return;
    }

    // Clone the preview-full element
    const previewClone = previewFull.cloneNode(true);

    // Remove unnecessary styles from the cloned element
    previewClone.classList.remove("preview-full");
    previewClone.style.height = "200px";
    previewClone.style.width = "250px";

    // Clear the existing content inside the cart item
    cartItem.innerHTML = "";

    // Append the cloned preview-full element to the cart item
    cartItem.appendChild(previewClone);

    // Update empty cart message
    updateEmptyCartMessage();
  }

  // Function to display empty cart message
  function updateEmptyCartMessage() {
    const cartItem = document.querySelector("#cart-item");
    const emptyCartMessage = document.getElementById("empty-cart-message");

    if (!cartItem || !emptyCartMessage) {
      console.error("Cart item or empty cart message not found.");
      return;
    }

    // If cart item is empty, display the empty cart message
    if (!cartItem.innerHTML.trim()) {
      emptyCartMessage.classList.remove("d-none");
    } else {
      emptyCartMessage.classList.add("d-none");
    }
  }

  // Add event listener to the add to cart button
  const addToCartButton = document.getElementById("add-cart-btn");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", addToCart);
  }
  // Function to remove a cart item
  function removeCartItem(event) {
    // Get the parent cart item element
    const cartItem = event.target.closest(".product");
    if (!cartItem) {
      console.error("Cart item not found.");
      return;
    }

    // Remove the cart item from the DOM
    cartItem.remove();
  }

  // Add event listener to each remove button
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
  // Function to update the visibility of the empty cart message
  function updateEmptyCartMessage() {
    const cartItems = document.querySelectorAll("#sidebar-cart .product");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    if (cartItems.length === 0) {
      emptyCartMessage.classList.remove("d-none");
    } else {
      emptyCartMessage.classList.add("d-none");
    }
  }

  // Call the function initially to set the initial visibility
  updateEmptyCartMessage();
});
