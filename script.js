/**
 * Sisters Cafe Website JavaScript
 * Enhanced with dynamic features and improved user experience
 */

// Initialize cart array
let cart = [];

// Use menuData from menu-data.js or fallback to default
let menuItems = [];

// Initialize menuItems from menuData when available
function initializeMenu() {
  console.log('Initializing menu data');
  
  try {
    // First try to access window.menuData
    if (window.menuData && Array.isArray(window.menuData)) {
      console.log('Found menuData in window object');
      menuItems = window.menuData;
    } 
    // Then try to access global menuData variable
    else if (typeof menuData !== 'undefined' && Array.isArray(menuData)) {
      console.log('Found menuData in global scope');
      menuItems = menuData;
    } 
    // Fallback to hardcoded data
    else {
      console.warn('Using hardcoded fallback menu data');
      menuItems = [
        {
          category: "Appetizers",
          items: [
            { name: "Mini Tacos", price: 5.00 },
            { name: "French Fries", price: 4.50 },
            { name: "Onion Rings", price: 5.50 }
          ]
        },
        {
          category: "Sandwiches",
          items: [
            { name: "Hamburger", price: 8.00 },
            { name: "Cheeseburger", price: 8.50 }
          ]
        }
      ];
    }
  } catch (error) {
    console.error('Error initializing menu:', error);
    menuItems = [
      {
        category: "Appetizers",
        items: [
          { name: "Mini Tacos", price: 5.00 },
          { name: "French Fries", price: 4.50 }
        ]
      }
    ];
  }
  
  console.log('Final menuItems:', menuItems);
}

// Today's date for dynamic content
const today = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDay = days[today.getDay()];

// Site configuration
const siteConfig = {
  name: "Sisters Cafe",
  phone: "(402) 759-4144",
  email: "sisterscafe806@gmail.com",
  address: "310 S 13th St, Geneva, NE 68361",
  hours: {
    Monday: "7AM–2PM",
    Tuesday: "7AM–2PM",
    Wednesday: "7AM–2PM",
    Thursday: "7AM–2PM",
    Friday: "7AM–2PM",
    Saturday: "7AM–2PM",
    Sunday: "Closed"
  },
  socialMedia: {
    facebook: "https://www.facebook.com/profile.php?id=61573728355131",
    medium: "https://medium.com/@sisterscafe806"
  },
  specials: {
    Monday: { name: "Meatloaf Monday", price: 10.95 },
    Tuesday: { name: "Taco Tuesday", price: 9.95 },
    Wednesday: { name: "Chicken Fried Steak", price: 11.00 },
    Thursday: { name: "Hot Beef Sandwich", price: 11.00 },
    Friday: { name: "Fish Fry Friday", price: 10.00 },
    Saturday: { name: "Breakfast Special", price: 8.95 },
    Sunday: { name: "Closed", price: 0 }
  }
};

// Log initialization
console.log('Sisters Cafe website initialized');
console.log('Menu data loaded:', menuItems);

// Function to render the menu
function renderMenu(filteredCategory = 'all') {
  console.log('Rendering menu with filter:', filteredCategory);
  const menuContainer = document.getElementById("menu-container");
  
  if (!menuContainer) {
    console.error('Menu container not found!');
    return;
  }
  
  // Clear the container
  menuContainer.innerHTML = '';
  
  // Check if menuItems exists and has items
  if (!menuItems || menuItems.length === 0) {
    console.error('No menu data available!');
    menuContainer.innerHTML = '<p>Sorry, menu data could not be loaded. Please try again later.</p>';
    return;
  }
  
  // Loop through each menu section
  menuItems.forEach(section => {
    // Skip this section if filtering is active and this isn't the selected category
    if (filteredCategory !== 'all' && section.category !== filteredCategory) return;
    
    const sectionElement = document.createElement("section");
    sectionElement.className = "menu-section";
    sectionElement.setAttribute('data-category', section.category);

    const heading = document.createElement("h3");
    heading.textContent = section.category;
    sectionElement.appendChild(heading);

    const ul = document.createElement("ul");
    section.items.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <span class="item-name">${item.name}</span>
          <span class="item-price">${item.price.toFixed(2)}</span>
        </div>
        <div>
          <button class="btn-add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
        </div>
      `;
      ul.appendChild(li);
    });

    sectionElement.appendChild(ul);
    menuContainer.appendChild(sectionElement);
  });
  
  console.log('Menu rendering complete');
}

// Function to filter menu items based on search input
function filterMenu() {
  const searchInput = document.getElementById("menu-search").value.toLowerCase();
  const menuItems = document.querySelectorAll("#menu-container li");

  menuItems.forEach(item => {
    const itemName = item.querySelector('.item-name').textContent.toLowerCase();
    if (itemName.includes(searchInput)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

// Function to filter menu by category
function filterByCategory() {
  const categoryFilter = document.getElementById("category-filter");
  if (categoryFilter) {
    const selectedCategory = categoryFilter.value;
    console.log('Filtering menu by category:', selectedCategory);
    renderMenu(selectedCategory);
  } else {
    console.error('Category filter element not found');
  }
}

// Function to update the cart display
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTax = document.getElementById("cart-tax");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  if (!cartItems || !cartSubtotal || !cartTax || !cartTotal || !cartCount) return;

  cartItems.innerHTML = "";
  let itemCount = 0;

  cart.forEach((item, index) => {
    itemCount += item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>
      <button class="btn-remove-item" data-index="${index}" style="background: none; border: none; color: #dc3545; cursor: pointer;">✕</button>
    `;
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
// Function to format order summary
function formatOrderSummary(cart) {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.075;
  const total = subtotal + tax;
  
  const itemsList = cart.map(item => `${item.name}: ${item.quantity} x ${item.price.toFixed(2)} = ${(item.price * item.quantity).toFixed(2)}`);
  
  return {
    items: itemsList.join('\n'),
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2)
  };
}

// Function to calculate meal total
function calculateMealTotal() {
  const peopleCount = parseInt(document.getElementById('people-count').value) || 1;
  const avgMealCost = parseFloat(document.getElementById('avg-meal-cost').value) || 0;
  const tipPercentage = parseFloat(document.getElementById('tip-percentage').value) || 0;
  
  // Calculate values
  const subtotal = peopleCount * avgMealCost;
  const tax = subtotal * 0.075; // 7.5% tax
  const tip = subtotal * (tipPercentage / 100);
  const total = subtotal + tax + tip;
  const perPerson = total / peopleCount;
  
  // Update display
  document.getElementById('calc-subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('calc-tax').textContent = tax.toFixed(2);
  document.getElementById('calc-tip').textContent = tip.toFixed(2);
  document.getElementById('calc-total').textContent = total.toFixed(2);
  document.getElementById('calc-per-person').textContent = perPerson.toFixed(2);
  
  document.getElementById('calculation-result').style.display = 'block';
}

// Function to send email via EmailJS
function sendNotification(type, contact, orderDetails) {
  // Only send email if type is 'Email'
  if (type !== 'Email' || !contact || contact === "Not provided") {
    return Promise.resolve(false);
  }

  // Check if EmailJS is loaded
  if (typeof emailjs === 'undefined') {
    console.error('EmailJS is not loaded');
    return Promise.reject('EmailJS not available');
  }

  // Configure EmailJS (replace with your own service and template IDs)
  emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS User ID

  // Prepare email parameters
  const templateParams = {
    to_email: contact,
    from_name: "Sisters Cafe",
    order_number: orderDetails.orderNumber,
    customer_name: orderDetails.name,
    order_items: orderDetails.items,
    order_subtotal: `${orderDetails.subtotal}`,
    order_tax: `${orderDetails.tax}`,
    order_total: `${orderDetails.total}`,
    pickup_time: orderDetails.pickupTime,
    special_instructions: orderDetails.specialInstructions || "None"
  };

  // Send email
  return emailjs.send(
    "YOUR_SERVICE_ID",  // Replace with your EmailJS Service ID
    "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
    templateParams
  ).then((response) => {
    console.log('Email sent successfully:', response);
    return true;
  }).catch((error) => {
    console.error('Failed to send email:', error);
    return false;
  });
}
// Function to calculate meal total
function calculateMealTotal() {
  const peopleCount = parseInt(document.getElementById('people-count').value) || 1;
  const avgMealCost = parseFloat(document.getElementById('avg-meal-cost').value) || 0;
  const tipPercentage = parseInt(document.getElementById('tip-percentage').value) || 0;
  
  const subtotal = peopleCount * avgMealCost;
  const tax = subtotal * 0.075;
  const tip = subtotal * (tipPercentage / 100);
  const total = subtotal + tax + tip;
  const perPerson = total / peopleCount;
  
  document.getElementById('calc-subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('calc-tax').textContent = tax.toFixed(2);
  document.getElementById('calc-tip').textContent = tip.toFixed(2);
  document.getElementById('calc-total').textContent = total.toFixed(2);
  document.getElementById('calc-per-person').textContent = perPerson.toFixed(2);
  
  document.getElementById('calculation-result').style.display = 'block';
}

/**
 * UI Enhancement Functions
 */

// Toggle mobile menu
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  
  if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburgerIcon.classList.remove('active');
  } else {
    navLinks.classList.add('active');
    hamburgerIcon.classList.add('active');
  }
}

// Update current day's hours in hero section
function updateTodayHours() {
  const heroHours = document.querySelector('.hero-hours p');
  if (heroHours) {
    heroHours.innerHTML = `<i class="far fa-clock"></i> <strong>Open Today:</strong> ${siteConfig.hours[currentDay]}`;
  }
}

// Handle announcement banner close
function setupAnnouncementBanner() {
  const banner = document.getElementById('announcement-banner');
  const closeButton = document.querySelector('.close-banner');
  
  if (banner && closeButton) {
    closeButton.addEventListener('click', () => {
      banner.style.display = 'none';
      // Save to localStorage to remember user closed it
      localStorage.setItem('bannerClosed', 'true');
    });
    
    // Check if user previously closed the banner
    if (localStorage.getItem('bannerClosed') === 'true') {
      banner.style.display = 'none';
    }
  }
}

// Testimonial slider functionality
function setupTestimonialSlider() {
  const slider = document.getElementById('testimonials-slider');
  const prevButton = document.getElementById('prev-testimonial');
  const nextButton = document.getElementById('next-testimonial');
  
  if (slider && prevButton && nextButton) {
    let currentSlide = 0;
    const slides = slider.querySelectorAll('.testimonial');
    const totalSlides = slides.length;
    
    // Hide all slides except the first one
    slides.forEach((slide, index) => {
      if (index !== 0) slide.style.display = 'none';
    });
    
    // Function to show a specific slide
    function showSlide(index) {
      slides.forEach(slide => slide.style.display = 'none');
      slides[index].style.display = 'block';
      slides[index].classList.add('fadeIn');
    }
    
    // Event listeners for navigation buttons
    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    });
    
    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    });
    
    // Auto-rotate slides every 5 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }, 5000);
  }
}

// Scroll to top button functionality
function setupScrollToTop() {
  const scrollButton = document.getElementById('scrollToTop');
  
  if (scrollButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
      } else {
        scrollButton.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Update dynamic content based on current day
function updateDynamicContent() {
  // Update special of the day
  const specialCards = document.querySelectorAll('.special-card');
  if (specialCards.length > 0) {
    const todaySpecial = siteConfig.specials[currentDay];
    if (todaySpecial && todaySpecial.name !== "Closed") {
      const firstSpecialCard = specialCards[0];
      const badge = firstSpecialCard.querySelector('.special-badge');
      const title = firstSpecialCard.querySelector('h3');
      const price = firstSpecialCard.querySelector('.special-price');
      
      if (badge) badge.textContent = "Today's Special";
      if (title) title.textContent = todaySpecial.name;
      if (price) price.textContent = `$${todaySpecial.price.toFixed(2)}`;
    }
  }
}

// Add animation to elements when they come into view
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.menu-section, .gallery-item, .testimonial');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slideUp');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Show toast notification
function showToast(message, type = 'info') {
  // Remove any existing toasts
  const existingToasts = document.querySelectorAll('.toast-notification');
  existingToasts.forEach(toast => {
    toast.remove();
  });
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  
  // Set icon based on type
  let icon = 'info-circle';
  if (type === 'success') icon = 'check-circle';
  if (type === 'warning') icon = 'exclamation-triangle';
  if (type === 'error') icon = 'times-circle';
  
  toast.innerHTML = `
    <div class="toast-icon"><i class="fas fa-${icon}"></i></div>
    <div class="toast-message">${message}</div>
    <button class="toast-close"><i class="fas fa-times"></i></button>
  `;
  
  // Add to document
  document.body.appendChild(toast);
  
  // Add close button functionality
  const closeButton = toast.querySelector('.toast-close');
  closeButton.addEventListener('click', () => {
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      toast.remove();
    }, 300);
  });
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
  
  // Animate in
  setTimeout(() => {
    toast.classList.add('toast-visible');
  }, 10);
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log('DOM fully loaded');
  
  // Set up mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Update today's hours
  updateTodayHours();
  
  // Set up announcement banner
  setupAnnouncementBanner();
  
  // Set up testimonial slider
  setupTestimonialSlider();
  
  // Set up scroll to top button
  setupScrollToTop();
  
  // Update dynamic content
  updateDynamicContent();
  
  // Set up scroll animations
  setupScrollAnimations();
  
  // Initialize menu data
  initializeMenu();
  
  // Listen for menu data loaded event
  document.addEventListener('menuDataLoaded', (event) => {
    console.log('Menu data loaded event received:', event.detail);
    menuItems = event.detail;
    
    // Render menu if we're on the menu page
    const menuContainer = document.getElementById("menu-container");
    if (menuContainer) {
      console.log('Menu container found, rendering menu with event data');
      renderMenu();
    }
  });
  
  // Initialize menu if we're on the menu page
  const menuContainer = document.getElementById("menu-container");
  if (menuContainer) {
    console.log('Menu container found, rendering menu');
    renderMenu();

    // Set up search functionality
    const searchInput = document.getElementById("menu-search");
    if (searchInput) {
      searchInput.addEventListener("input", filterMenu);
    }
    
    // Set up category filter
    const categoryFilter = document.getElementById("category-filter");
    if (categoryFilter) {
      categoryFilter.addEventListener("change", filterByCategory);
    }
    
    // Set up meal calculator
    const calculateButton = document.getElementById('calculate-btn');
    if (calculateButton) {
      calculateButton.addEventListener('click', calculateMealTotal);
    }
  } else {
    console.warn('Menu container not found on this page');
  }

  // Handle adding items to cart - works on any page with cart functionality
  document.addEventListener('click', (e) => {
    // Add to cart button
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
      
      // Show a toast notification
      showToast(`${name} added to cart!`, 'success');
    }
    
    // Remove item from cart button
    if (e.target.classList.contains('btn-remove-item')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      cart.splice(index, 1);
      updateCart();
      showToast('Item removed from cart', 'info');
    }
  });
  
  // Clear cart button
  const clearCartButton = document.getElementById('clear-cart-btn');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      if (cart.length === 0) return;
      
      if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCart();
        showToast('Cart cleared', 'info');
      }
    });
  }
  
  // Handle checkout button - only on menu page
  const checkoutButton = document.getElementById('checkout-btn');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
      }

      // Show checkout form
      const checkoutForm = document.getElementById('checkout-form');
      if (checkoutForm) {
        checkoutForm.style.display = 'block';
        
        // Scroll to checkout form
        checkoutForm.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Handle notification type change
  const notificationRadios = document.querySelectorAll('input[name="notification-type"]');
  if (notificationRadios.length > 0) {
    notificationRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        const emailField = document.getElementById('email-field');
        const phoneField = document.getElementById('phone-field');
        
        if (this.value === 'Email') {
          emailField.style.display = 'block';
          phoneField.style.display = 'none';
        } else if (this.value === 'SMS') {
          emailField.style.display = 'none';
          phoneField.style.display = 'block';
        } else {
          emailField.style.display = 'none';
          phoneField.style.display = 'none';
        }
      });
    });
  }
  
  // Handle order form submission
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('customer-name').value;
      const pickupTime = document.getElementById('pickup-time').value;
      const specialInstructions = document.getElementById('special-instructions').value;
      const notificationType = document.querySelector('input[name="notification-type"]:checked').value;
      let contactInfo = "Not provided";
      
      if (notificationType === 'Email') {
        contactInfo = document.getElementById('customer-email').value;
      } else if (notificationType === 'SMS') {
        contactInfo = document.getElementById('customer-phone').value;
      }
      
      // Generate order number
      const orderNumber = 'SC-' + Math.floor(Math.random() * 10000);
      
      // Format order summary
      const orderSummary = formatOrderSummary(cart);
      
      // Show confirmation
      document.getElementById('checkout-form').style.display = 'none';
      document.getElementById('order-confirmation').style.display = 'block';
      document.getElementById('order-number').textContent = orderNumber;
      document.getElementById('confirm-pickup-time').textContent = pickupTime;
      
      // Send notification if applicable
      if (notificationType === 'Email') {
        sendNotification('Email', contactInfo, {
          orderNumber,
          name,
          items: orderSummary.items,
          subtotal: orderSummary.subtotal,
          tax: orderSummary.tax,
          total: orderSummary.total,
          pickupTime,
          specialInstructions
        });
      }
      
      // Clear cart
      cart = [];
      updateCart();
      
      // Scroll to confirmation
      document.getElementById('order-confirmation').scrollIntoView({ behavior: 'smooth' });
    });
  }
});
          const name = document.getElementById("name").value;
          const phone = document.getElementById("phone").value;
          const email = document.getElementById("email").value || "Not provided";
          const pickupTime = document.getElementById("pickup-time").value;
          const specialInstructions = document.getElementById("special-instructions").value || "None";
          const notifyByText = document.getElementById("notify-text").checked;
          const notifyByEmail = document.getElementById("notify-email").checked;
          
          // In a real application, you would send this data to a server
          console.log("Order submitted:", {
            name,
            phone,
            email,
            pickupTime,
            specialInstructions,
            notifyByText,
            notifyByEmail,
            cart
          });
          
          // Prepare order details for notifications
          const orderSummary = formatOrderSummary(cart);
          const orderDetails = {
            name,
            phone,
            email,
            pickupTime,
            specialInstructions,
            items: orderSummary.items,
            subtotal: orderSummary.subtotal,
            tax: orderSummary.tax,
            total: orderSummary.total,
            orderNumber: Math.floor(Math.random() * 10000).toString().padStart(4, '0')
          };
          
          // Hide the form elements immediately
          form.style.display = "none";
          
          // Get message element
          const messageElement = document.getElementById("order-message");
          
          // Show loading indicator while sending notifications
          messageElement.style.display = "block";
          messageElement.innerHTML = `
            <div class="order-confirmation" style="text-align: center;">
              <p><i>Processing your order...</i></p>
              <div class="loading-spinner"></div>
            </div>
          `;
          
          // Send notifications based on user preferences
          const notifications = [];
          if (notifyByText) {
            notifications.push(sendNotification('SMS', phone, orderDetails));
          }
          if (notifyByEmail && email !== "Not provided") {
            notifications.push(sendNotification('Email', email, orderDetails));
          }
          
          // Wait for all notifications to complete
          Promise.all(notifications).then(() => {
            console.log('All notifications sent successfully');
            
            // Update confirmation message
            messageElement.innerHTML = `
              <div class="order-confirmation">
                <h4>Thank you for your order, ${name}!</h4>
                <p>Your order has been received. <strong>Please call the cafe at (402) 759-4144 to confirm your pickup time.</strong></p>
                ${notifyByText ? '<p>We will send a text confirmation to your phone number.</p>' : ''}
                ${notifyByEmail && email !== "Not provided" ? '<p>We will send an email confirmation to ' + email + '.</p>' : ''}
                <p>Order reference: <span class="order-reference">#${orderDetails.orderNumber}</span></p>
                <p style="font-size: 0.9em; margin-top: 15px;">If you don't receive your notification within a few minutes, please check your spam folder or contact us directly.</p>
              </div>
            `;
          }).catch(error => {
            console.error('Error sending notifications:', error);
            
            // Show error message
            messageElement.innerHTML = `
              <div class="order-confirmation" style="border-left-color: #dc3545;">
                <h4 style="color: #dc3545;">Order Received</h4>
                <p>Your order has been received, but we couldn't send the notification. <strong>Please call the cafe at (402) 759-4144 to confirm your pickup time.</strong></p>
                <p>Order reference: <span class="order-reference">#${orderDetails.orderNumber}</span></p>
              </div>
            `;
          });

          // Clear the cart
          cart = [];
          updateCart();
          
          // Remove the form after 15 seconds
          setTimeout(() => orderForm.remove(), 15000);
        });
      }
    });
  }
  
  // Handle clear cart button - only on menu page
  const clearCartButton = document.getElementById('clear-cart-btn');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is already empty!');
        return;
      }
      
      if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCart();
      }
    });
  }
  
  // Handle meal calculator - only on menu page
  const calculateButton = document.getElementById('calculate-btn');
  if (calculateButton) {
    calculateButton.addEventListener('click', calculateMealTotal);
  }
});