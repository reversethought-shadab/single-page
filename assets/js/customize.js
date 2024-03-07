document.addEventListener("DOMContentLoaded", function () {
  const pplrSelectItems = document.querySelectorAll(".pplr-selecter-item");
  const textarea = document.querySelector(".textarea-neon");
  const previewText = document.querySelector("#Preview-text");
  const priceValue = document.querySelector(".price-value");
  const priceItem = document.querySelector(".price-item");
  const addOnWaterproofPrice = document.querySelector(".showPrice");

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

  // Event listener for textarea input
  let firstLetterTyped = false;
  textarea.addEventListener("input", function (event) {
    const text = event.target.value;
    // console.log(text.trim().length)
    const price = calculatePrice(text.replace(/\s/g, ""));
    updatePrice(price);
    if (!firstLetterTyped && text.trim().length > 0) {
      firstLetterTyped = true;
    }

    if (text.trim().length <= 5) {
      addOnWaterproofPrice.innerHTML = "₹ 120";
    } else if (text.trim().length > 5 && text.trim().length <= 8) {
      addOnWaterproofPrice.innerHTML = "₹ 240";
    } else if (text.trim().length > 8 && text.trim().length <= 11) {
      addOnWaterproofPrice.innerHTML = "₹ 360";
    } else if (text.trim().length > 11 && text.trim().length <= 14) {
      addOnWaterproofPrice.innerHTML = "₹ 480";
    } else if (text.trim().length > 14 && text.trim().length <= 17) {
      addOnWaterproofPrice.innerHTML = "₹ 600";
    } else if (text.trim().length > 17 && text.trim().length <= 21) {
      addOnWaterproofPrice.innerHTML = "₹ 720";
    } else if (text.trim().length > 21 && text.trim().length <= 24) {
      addOnWaterproofPrice.innerHTML = "₹ 840";
    } else {
    }
  });

  const sizeSpans = document.querySelectorAll(".pplr-drop-item");

  // Function to disable a span
  function disableSpan(span) {
    span.classList.add("disabled");
    span.removeEventListener("click", spanClickHandler); // Remove the click event listener
  }

  // Function to enable a span
  function enableSpan(span) {
    span.classList.remove("disabled");
    span.addEventListener("click", spanClickHandler); // Add back the click event listener
  }

  // Handler for span click event
  function spanClickHandler(index) {
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
    sizeSpans.forEach((span, index) => {
      if (span.classList.contains("active")) {
        activeIndex = index;
      }
    });

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

      if (activeIndex >= 0 && index > activeIndex) {
        totalPrice += priceIncrement * (index - activeIndex);
      }
    }
    updatePrice(totalPrice);
  }

  sizeSpans.forEach((span, index) => {
    // Add the click event listener
    span.addEventListener("click", spanClickHandler);
  });

  const checkboxClick = document.querySelectorAll(".pplrcheckbox");
  // Function to check if all checkboxes are unchecked
  function allCheckboxesUnchecked(activeIndex) {
    for (let i = activeIndex + 1; i < sizeSpans.length; i++) {
      if (!sizeSpans[i].classList.contains("disabled")) {
        return false;
      }
    }
    return true;
  }

  checkboxClick.forEach((checkbox, index) => {
    checkbox.addEventListener("change", function (e) {
      const checked = this.checked;
      const activeSpan = document.querySelector(".pplr-drop-item.active");
      const activeIndex = Array.from(sizeSpans).indexOf(activeSpan);

      if (checked && allCheckboxesUnchecked()) {
        for (let i = activeIndex + 1; i < sizeSpans.length; i++) {
          disableSpan(sizeSpans[i]);
        }
      } else if (!checked && allCheckboxesUnchecked()) {
        for (let i = activeIndex + 1; i < sizeSpans.length; i++) {
          enableSpan(sizeSpans[i]);
        }
      } else {
      }

      //   if (!checked && allCheckboxesUnchecked()) {
      //     for (let i = activeIndex + 1; i < sizeSpans.length; i++) {
      //         enableSpan(sizeSpans[i]);
      //     }
      // } else if (checked && allCheckboxesUnchecked()) {
      //     for (let i = activeIndex + 1; i < sizeSpans.length; i++) {
      //         disableSpan(sizeSpans[i]);
      //     }
      // }
      // else{
      //   disableSpan(sizeSpans[i]);
      // }
      let updatedTotalPrice = document.querySelector(".price-item").innerHTML;
      let updatedTotalPriceWithoutSign = Number(
        updatedTotalPrice.replace(/[^0-9]/g, "")
      );
      let checkboxId = this.id;
      //selected size
      const selectedFontSize = document.querySelector(
        ".pplr-drop-item.active"
      ).id;
      console.log(selectedFontSize);

      if (e.currentTarget.checked) {
        switch (e.currentTarget.id) {
          case "waterproof":
            if (selectedFontSize === "second") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign + 240
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign + 240);
              addOnWaterproofPrice.innerHTML = "₹240";
            } else if (selectedFontSize === "third") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign + 360
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign + 360);
            } else if (selectedFontSize === "fourth") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign + 480
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign + 480);
            } else if (selectedFontSize === "fifth") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign + 600
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign + 600);
            } else if (selectedFontSize === "sixth") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign + 720
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign + 720);
            } else if (selectedFontSize === "seventh") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign + 840
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign + 840);
            } else {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign + 120
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign + 120);
              addOnWaterproofPrice.innerHTML = "₹120";
            }
            // console.log("Water Proof Print", (updatedTotalPriceWithoutSign + 120));
            // document.querySelector(".price-item").innerHTML = "₹" + (updatedTotalPriceWithoutSign + 120);
            break;
          case "remotecontrol":
            console.log(
              "Remote Control Print",
              updatedTotalPriceWithoutSign + 1200
            );
            document.querySelector(".price-item").innerHTML =
              "₹" + (updatedTotalPriceWithoutSign + 1200);
            break;
          case "appcontrol":
            console.log(
              "App Control Print",
              updatedTotalPriceWithoutSign + 800
            );
            document.querySelector(".price-item").innerHTML =
              "₹" + (updatedTotalPriceWithoutSign + 800);
            break;
        }
      } else {
        switch (e.currentTarget.id) {
          case "waterproof":
            if (selectedFontSize === "second") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign - 240
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign - 240);
            } else if (selectedFontSize === "third") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign - 360
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign - 360);
            } else if (selectedFontSize === "fourth") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign - 480
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign - 480);
            } else if (selectedFontSize === "fifth") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign - 600
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign - 600);
            } else if (selectedFontSize === "sixth") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign - 720
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign - 720);
            } else if (selectedFontSize === "seventh") {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign - 840
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign - 840);
            } else {
              console.log(
                "Water Proof Print",
                updatedTotalPriceWithoutSign + 120
              );
              document.querySelector(".price-item").innerHTML =
                "₹" + (updatedTotalPriceWithoutSign - 120);
            }
            // document.querySelector(".price-item").innerHTML = "₹" + (updatedTotalPriceWithoutSign - 120);
            break;
          case "remotecontrol":
            document.querySelector(".price-item").innerHTML =
              "₹" + (updatedTotalPriceWithoutSign - 1200);
            break;
          case "appcontrol":
            document.querySelector(".price-item").innerHTML =
              "₹" + (updatedTotalPriceWithoutSign - 800);
            break;
        }
      }
    });
  });

  function updatePriceOnCheck() {
    const basePrice = getBasePrice();
    const increment = getIncrement();
    const totalPrice = basePrice + increment;

    updatePrice(totalPrice);
  }

  function getBasePrice() {
    const textarea = document.querySelector(".textarea-neon");
    return calculatePrice(textarea.value.replace(/\s/g, ""));
  }

  function getIncrement() {
    const activeSpan = document.querySelector(".pplr-drop-item.active");
    const activeId = activeSpan ? activeSpan.id : "";
    const waterproofCheckbox = document.querySelector("#waterproof");
    const checkboxValue = waterproofCheckbox.checked
      ? parseInt(waterproofCheckbox.value)
      : 0;

    switch (activeId) {
      case "first":
        return checkboxValue + 120;
      case "second":
        return checkboxValue + 240;
      case "third":
        return checkboxValue + 360;
      case "fourth":
        return checkboxValue + 480;
      case "fifth":
        return checkboxValue + 600;
      case "sixth":
        return checkboxValue + 720;
      case "seventh":
        return checkboxValue + 840;
      default:
        return checkboxValue;
    }
  }

  // document.addEventListener("DOMContentLoaded", function () {
  //   const checkboxes = document.querySelectorAll("#waterproof");
  //   checkboxes.forEach(function (checkbox) {
  //     checkbox.addEventListener("change", updatePriceOnCheck);
  //   });
  //   updatePriceOnCheck();
  // });

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
      const unwantedElements = previewClone.querySelectorAll(
        " .slider-controls button"
      );
      unwantedElements.forEach((element) => element.remove());
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
    const unwantedElements = previewClone.querySelectorAll(".slider-controls ");
    unwantedElements.forEach((element) => element.remove());
    // previewClone.querySelector(".image-container").remove();
    previewClone.classList.remove("preview-full");
    previewClone.style.height = "180px";
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
