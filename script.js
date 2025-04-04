const menuData = [
  {
      category: "Appetizers",
      items: [
          { name: "Mini Tacos", price: 5.00 },
          { name: "French Fries", price: 4.50 },
          { name: "Tator Kegs (Cheddar Jalapeno)", price: 6.00 },
          { name: "Tator Kegs (Cheddar Bacon)", price: 6.00 },
          { name: "Onion Chips", price: 5.00 },
          { name: "Cheese Balls", price: 5.00 },
          { name: "Spicy Cheese Balls", price: 5.00 },
          { name: "Breaded Mushrooms", price: 5.00 },
          { name: "Breaded Cauliflower", price: 5.00 },
          { name: "Cinnamon Roll", price: 3.25 }
      ]
  },
  {
      category: "Soups",
      items: [{ name: "Soup Bowl", price: 4.50 }]
  },
  {
      category: "Sandwiches",
      items: [
          { name: "Hamburgers", price: 8.00 },
          { name: "Cheeseburger", price: 8.50 },
          { name: "Double Cheeseburger", price: 13.50 },
          { name: "Bacon Cheeseburger", price: 11.00 },
          { name: "Double Bacon Cheeseburger", price: 13.50 },
          { name: "Swiss Mushroom Burger", price: 9.00 },
          { name: "Western Burger", price: 12.95 },
          { name: "Patty Melt", price: 9.00 },
          { name: "Pork Tenderloin", price: 8.00 },
          { name: "Fish Sandwich", price: 8.00 },
          { name: "Chicken Parmesan", price: 9.00 },
          { name: "Taco Burger (Seasoned Beef, Cheese Mix, Salsa, Lettuce, Tomatoes, and Sour Cream)", price: 10.95 }
      ]
  },
  {
      category: "Dinner Meals",
      items: [
          { name: "Chicken Fried Steak", price: 11.00 },
          { name: "Hamburger Steak", price: 11.00 },
          { name: "Salisbury Steak", price: 11.00 },
          { name: "Chicken Parmesan", price: 11.00 },
          { name: "Pork Tenderloin", price: 11.00 }
      ]
  },
  {
      category: "Baskets",
      items: [
          { name: "Fried Fish Basket", price: 10.00 },
          { name: "Mini Corn Dog Basket", price: 10.00 }
      ]
  },
  {
      category: "Salads",
      items: [
          { name: "Green Salad", price: 4.00 },
          { name: "Chef Salad (Chicken)", price: 9.50 },
          { name: "Chef Salad (Ham)", price: 9.50 }
      ]
  },
  {
      category: "Sides",
      items: [
          { name: "Bacon (4 Slices)", price: 5.00 },
          { name: "Sausage (2 Patties)", price: 5.00 },
          { name: "Ham (2 Slices)", price: 5.00 },
          { name: "Hashbrowns", price: 3.00 },
          { name: "Toast (2 Slices)", price: 3.00 }
      ]
  },
  {
      category: "Eggs & Toast",
      items: [
          { name: "1 Egg & Toast", price: 6.00 },
          { name: "1 Egg & Toast with Meat", price: 8.00 },
          { name: "2 Eggs & Toast", price: 7.00 },
          { name: "2 Eggs & Toast with Meat", price: 9.00 },
          { name: "Omelet Combo", price: 14.00 }
      ]
  },
  {
      category: "Drinks",
      items: [
          { name: "Soda", price: 2.00 },
          { name: "Hot Tea", price: 2.00 },
          { name: "Iced Tea", price: 2.00 },
          { name: "Lemonade", price: 2.00 },
          { name: "Milk Small", price: 1.50 },
          { name: "Milk Large", price: 2.00 },
          { name: "OJ Small", price: 1.50 },
          { name: "OJ Large", price: 2.00 }
      ]
  }
];

function renderMenu() {
  const menuContainer = document.getElementById("menu-container");
  menuData.forEach(section => {
      const sectionElement = document.createElement("section");
      sectionElement.className = "menu-section";

      const heading = document.createElement("h3");
      heading.textContent = section.category;
      sectionElement.appendChild(heading);

      const ul = document.createElement("ul");
      section.items.forEach(item => {
          const li = document.createElement("li");
          li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="btn-add-to-cart" data-name="${item.name}" data-price="${item.price}">Add</button>`;
          ul.appendChild(li);
      });

      sectionElement.appendChild(ul);
      menuContainer.appendChild(sectionElement);
  });
}

let cart = [];

function filterMenu() {
  const searchInput = document.getElementById("menu-search").value.toLowerCase();
  const menuItems = document.querySelectorAll("#menu-container li");

  menuItems.forEach(item => {
      const itemName = item.textContent.toLowerCase();
      if (itemName.includes(searchInput)) {
          item.style.display = "";
      } else {
          item.style.display = "none";
      }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();

  const searchInput = document.getElementById("menu-search");
  if (searchInput) {
      searchInput.addEventListener("input", filterMenu);
  }

  document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-add-to-cart')) {
          const name = e.target.getAttribute('data-name');
          const price = parseFloat(e.target.getAttribute('data-price'));
          const existingItem = cart.find(item => item.name === name);
          if (existingItem) {
              existingItem.quantity++;
          } else {
              cart.push({ name, price, quantity: 1 });
          }
          updateCart();
      }
  });

  const checkoutButton = document.getElementById('checkout-btn');
  if (checkoutButton) {
      checkoutButton.addEventListener('click', () => {
          if (cart.length === 0) {
              alert('Your cart is empty!');
              return;
          }

          const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
          const tax = subtotal * 0.075;
          const total = subtotal + tax;
          const orderDetails = cart.map(item => `${item.name}: ${item.quantity} x $${item.price.toFixed(2)}`).join('\n');

          const promptMessage = `Order Summary:\n${orderDetails}\n\nSubtotal: $${subtotal.toFixed(2)}\nTax: $${tax.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\nProceed to checkout?`;

          if (confirm(promptMessage)) {
              const orderForm = document.createElement("div");
              orderForm.className = "order-form";
              orderForm.innerHTML = `
                  <h3>Complete Your Order</h3>
                  <form id="orderForm" class="needs-validation" novalidate>
                      <input type="text" id="name" placeholder="Your Name" required />
                      <input type="tel" id="phone" placeholder="Your Phone (e.g., (402) 759-4144)" required />
                      <button type="submit" class="btn">Submit Order</button>
                  </form>
                  <p id="order-message" style="display: none; margin-top: 10px;"></p>
              `;
              document.body.appendChild(orderForm);

              const form = document.getElementById("orderForm");
              form.addEventListener("submit", (event) => {
                  event.preventDefault();

                  const messageElement = document.getElementById("order-message");
                  messageElement.style.display = "block";
                  messageElement.innerHTML = "<strong style='font-size: 1.5em;'>Thanks for your order, please contact the cafe at (402) 759-4144 and they will arrange a pickup time.</strong>";
                  messageElement.style.color = "#28a745";

                  cart = [];
                  updateCart();
                  form.reset();

                  setTimeout(() => orderForm.remove(), 5000);
              });
          }
      });
  }
});

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTax = document.getElementById("cart-tax");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let itemCount = 0;

  cart.forEach(item => {
      itemCount += item.quantity;
      const li = document.createElement("li");
      li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      cartItems.appendChild(li);
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.075;
  const total = subtotal + tax;

  cartSubtotal.textContent = subtotal.toFixed(2);
  cartTax.textContent = tax.toFixed(2);
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = itemCount;
}
