//Clears the search input browser repopulates after clicking back button
window.onload = (e) => {
  document.querySelector("#search-input").value = "";
};

let jsonDataArray = []; // Global variable to store JSON data

async function loadAndProcessJson() {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0364/3611/5594/files/combinedThreadsFullData-Updated.json?v=1710564783"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse JSON data
    const data = await response.json();
    // Store the JSON data in the global variable
    jsonDataArray = data;
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error);
  }
}

loadAndProcessJson();

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const suggestionBox = document.getElementById("suggestion-box");

  //using regex we will only read the numeric value from the user input
  //will ignore if user enters brand name
  searchInput.addEventListener("input", async function () {
    const inputValue = this.value.trim().toLowerCase();
    if (inputValue.length >= 3) {
      let numericalValue = inputValue.match(/\d+/g);
      const suggestions = await fetchSuggestions(numericalValue);
      displaySuggestions(suggestions);
    } else {
      suggestionBox.innerHTML = ""; // Clear suggestion box if input length is less than 3
      suggestionBox.style.display = "none"; // Hide suggestion box
    }
  });

  async function fetchSuggestions(query) {
    // Simulate fetching suggestions from an API
    // Here you would typically make an API request to get suggestions based on the query
    // For demonstration purposes, we're returning a hardcoded array of suggestions
    //await loadAndProcessJson();
    const suggestions = [];
    for (const obj of jsonDataArray) {
      suggestions.push(`${obj.RobisonAnton} - Robison Anton`);
      suggestions.push(`${obj.Gunold} - Gunold`);
      suggestions.push(`${obj.Isacord} - Isacord`);
      suggestions.push(`${obj.Madeira} - Madeira`);
    }

    return suggestions.filter((item) => item.startsWith(query));
  }

  function displaySuggestions(suggestions) {
    if (suggestions.length > 0) {
      const suggestionHTML = suggestions
        .map(
          (item) =>
            `<div class="suggestion-item" threadNo="${item.split(" ")[0]}"
            brand="${item.split(" ").slice(-1)}">${item}</div>`
        )
        .join("");
      suggestionBox.innerHTML = suggestionHTML;
      suggestionBox.style.display = "block"; // Show suggestion box
    } else {
      suggestionBox.innerHTML = "No matching thread color";
      suggestionBox.style.display = "block"; // Show suggestion box with message
    }

    const suggestionItems = suggestionBox.querySelectorAll(".suggestion-item");
    suggestionItems.forEach(function (item) {
      item.addEventListener("click", function () {
        document.getElementById("search-input").value = item.textContent;
        updateDisplay(
          this.getAttribute("threadNo"),
          this.getAttribute("brand")
        );
      });
    });
  }

  function findThread(threadNo, brand) {
    let thread;

    switch (brand) {
      case "Anton":
        for (let obj of jsonDataArray) {
          if (obj.RobisonAnton == threadNo) {
            thread = obj;
          }
        }
        break;
      case "Isacord":
        for (let obj of jsonDataArray) {
          if (obj.Isacord == threadNo) {
            thread = obj;
          }
        }
        break;
      case "Madeira":
        for (let obj of jsonDataArray) {
          if (obj.Madeira == threadNo) {
            thread = obj;
          }
        }
        break;
      case "Gunold":
        for (let obj of jsonDataArray) {
          if (obj.Gunold == threadNo) {
            thread = obj;
          }
        }
        break;
    }
    for (let obj of jsonDataArray) {
      if (obj.Isacord == threadNo) {
        thread = obj;
      }
    }
    return thread;
  }

  function updateDisplay(threadNo, brand) {
    const thread = findThread(threadNo, brand);

    if (!thread) {
      console.error("thread not found");
    } else {
      let output = "";
      if (thread.RobisonAnton) {
        //output += `<a href="${thread.URL}">${thread.RobisonAnton} ${thread.RAName} - Robison Anton</br></a></br></br><div class="orderBox" id="orderBox"><label for="threadQty">Enter Quanity</label><input type="number" min="1" step="1" value=1 id="threadQty"><button class="order-btn" id="order-btn">Update Cart</button></div>`;

        output += `<div class="collection">
  <div class="loading-overlay gradient"></div>
  <ul
    id="product-grid"
    data-id="template--16537118146698__product-grid"
    class="grid product-grid grid--1-col-tablet-down grid--3-col-desktop"
  >
    <li
      class="grid__item scroll-trigger animate--slide-in"
      data-cascade=""
      style="--animation-order: 1"
    >
      <link
        href="//www.embroiderysystems.com/cdn/shop/t/7/assets/component-rating.css?v=179577762467860590411709072089"
        rel="stylesheet"
        type="text/css"
        media="all"
      />
      <link
        href="//www.embroiderysystems.com/cdn/shop/t/7/assets/component-volume-pricing.css?v=56284703641257077881709072089"
        rel="stylesheet"
        type="text/css"
        media="all"
      />
      <div class="card-wrapper product-card-wrapper underline-links-hover">
        <div
          class="card card--card card--media color-scheme-4 gradient"
          style="--ratio-percent: 129.8780487804878%"
        >
          <div
            class="card__inner ratio"
            style="--ratio-percent: 129.8780487804878%"
          >
            <div class="card__media">
              <div class="media media--transparent media--hover-effect">
                <img
                  srcset="${thread.imageSrc} 164w
                  "
                  src="${thread.imageSrc}&amp;width=533"
                  sizes="(min-width: 1200px) 267px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)"
                  alt="${thread.RobisonAnton} - ${thread.RAName}"
                  class="motion-reduce"
                  width="164"
                  height="213"
                />
              </div>
            </div>
            <div class="card__content">
              <div class="card__information">
                <h3 class="card__heading">
                  <a
                    href="${thread.URL}"
                    id="StandardCardNoMediaLink-template--16537118146698__product-grid-4829576167562"
                    class="full-unstyled-link"
                    aria-labelledby="StandardCardNoMediaLink-template--16537118146698__product-grid-4829576167562 NoMediaStandardBadge-template--16537118146698__product-grid-4829576167562"
                  >
                    ${thread.RobisonAnton} - ${thread.RAName}
                  </a>
                </h3>
              </div>
            </div>
          </div>
          <div class="card__content">
            <div class="card__information">
              <h3
                class="card__heading h5"
                id="title-template--16537118146698__product-grid-4829576167562"
              >
                <div
                  
                  id="CardLink-template--16537118146698__product-grid-4829576167562"
                  class="full-unstyled-link"
                  aria-labelledby="CardLink-template--16537118146698__product-grid-4829576167562 Badge-template--16537118146698__product-grid-4829576167562"
                >
                  ${thread.RobisonAnton} - ${thread.RAName}
                </div>
              </h3>
              <div class="card-information">
                <span class="caption-large light"></span>
                <div class="price">
                  <div class="price__container">
                    <div class="price__regular">
                      <span class="visually-hidden visually-hidden--inline"
                        >Regular price</span
                      >
                      <span class="price-item price-item--regular">
                        From $${Number(
                          thread.priceUSD /* uncomment for live site
                           *
                            parseFloat(window.Shopify.currency.rate)
                            */
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div class="price__sale">
                      <span class="visually-hidden visually-hidden--inline"
                        >Regular price</span>
                      <span class="visually-hidden visually-hidden--inline"
                        >Sale price</span
                      >
                      <span
                        class="price-item price-item--sale price-item--last"
                      >
                        From $${Number(
                          thread.priceUSD /* uncomment for live site
                           *
                            parseFloat(window.Shopify.currency.rate)
                            */
                        ).toFixed(2)}
                      </span>
                    </div>
                    <small class="unit-price caption hidden">
                      <span class="visually-hidden">Unit price</span>
                      <span class="price-item price-item--last">
                        <span></span>
                        <span aria-hidden="true">/</span>
                        <span class="visually-hidden">&nbsp;per&nbsp;</span>
                        <span> </span>
                      </span>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            
            
            <div>


          </div>

           <div class="orderBox" id="orderBox">
            <label for="threadQty">Enter Quanity</label>
            <input type="number" min="1" step="1" value=1 id="threadQty"><br>
            <div class="order-btn-div" id="order-btn-div">
              <button class="order-btn" id="order-btn">Update Cart</button>
            </div>
           </div>    

        </div>
        
      </div>
    </li>
  </ul>
</div>
`;
      }

      const threadInfoBox = document.querySelector(".threadInfo-box");
      suggestionBox.style.display = "none";
      threadInfoBox.innerHTML = output;
    }

    const orderBtn = document.querySelector(".order-btn");

    orderBtn.addEventListener("click", function (e) {
      const threadQty = document.getElementById("threadQty").value;
      updateCart(
        thread.VariantID,
        threadQty,
        thread.RobisonAnton,
        thread.RAName
      );
    });
  }

  // Hide suggestion box when clicking outside of it
  document.addEventListener("click", (event) => {
    if (!suggestionBox.contains(event.target) && event.target !== searchInput) {
      suggestionBox.style.display = "none";
    }
  });
});

function updateCart(VariantID, threadQty, RANumber, RAName) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Prepare the request
  xhr.open("POST", "/cart/add.js", true); // true for asynchronous

  // Set the request header if needed (e.g., for JSON data)
  xhr.setRequestHeader("Content-Type", "application/json");

  // Define a function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Request was successful, handle response data here
        refreshCart();
        updateCartDrawer();
        updateOrderBox(RANumber, RAName);
      } else {
        // Request failed, handle errors here
        console.error("Request failed with status:", xhr.status);
      }
    }
  };

  // Prepare the data to be sent (if any)
  //id will need to be updated dynamically for add to cart.
  var data = {
    id: VariantID,
    quantity: threadQty,
  };

  // Convert data to JSON format
  var jsonData = JSON.stringify(data);

  // Send the request with the data
  xhr.send(jsonData);
}

//Update the orderBox to let the user know the item has been added
const updateOrderBox = function (RANumber, RAName) {
  document.querySelector(
    ".orderBox"
  ).innerHTML = `<p>${RANumber} ${RAName} added to cart</p>`;
  document.querySelector("#search-input").value = "";
};

//Update the cart icon in the top right hand corner
async function refreshCart() {
  //get new cart object
  const res = await fetch("/cart.json");
  const cart = await res.json();

  //update cart count
  let cartCountBubble = document.querySelector(".cart-count-bubble");
  if (cartCountBubble == null) {
    const newBubbleNode = document.createElement("div");
    newBubbleNode.classList.add("cart-count-bubble");
    newBubbleNode.innerHTML = `<span aria-hidden="true">${cart.item_count}</span><span class="visually-hidden">${cart.item_count} items</span>`;
    document.getElementById("cart-icon-bubble").appendChild(newBubbleNode);
  } else {
    document.querySelector(
      ".cart-count-bubble"
    ).innerHTML = `<span aria-hidden="true">${cart.item_count}</span><span class="visually-hidden">${cart.item_count} items</span>`;
  }
}

async function updateCartDrawer() {
  /*
  This section is here to remove the "is-empty" class from the drawer container.
  It is added automatically if the user deletes items from the cart. If not removed,
  user cannot clear cart, add new items and have it display correctly.
  */
  const cartDrawerContainer = document.getElementsByTagName("cart-drawer");
  cartDrawerContainer[0].classList.remove("is-empty");

  const resCD = await fetch("/cart?section_id=cart-drawer");
  const textCD = await resCD.text();

  /*
  API returns new items for the cart drawer which must be inserted into the body.
  Need to isolate this from the API return value and replace the existing cartDrawer with
  the new one created in order to only update correct parts of body.
   */

  const newNode = document.createElement("div");
  newNode.innerHTML = textCD;
  const cartNode = newNode.querySelector("#CartDrawer");
  let cartDrawer = document.getElementById("CartDrawer"); // Get original Cart Drawer
  cartDrawer.innerHTML = cartNode.innerHTML; //Replace HTML of original with the HTML of new cart node

  /*
    Adding an event listener to the cart-drawer overlay so that the cart closes should a user click outside of it.
  */
  const cartDrawerOverlay = document.querySelector(".cart-drawer__overlay");

  cartDrawerOverlay.addEventListener("click", function () {
    cartDrawerContainer[0].classList.remove("animate", "active");
    document.body.classList.remove("overflow-hidden");
  });
}
