// Simple menu rendering script
document.addEventListener('DOMContentLoaded', function() {
  console.log('Menu script loaded');
  
  // Initialize cart
  let cart = [];
  
  // Function to update cart display
  function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');
    
    // Sticky elements
    const stickyCartCount = document.getElementById('sticky-cart-count');
    const stickyCartSubtotal = document.getElementById('sticky-cart-subtotal');
    const stickyCartTax = document.getElementById('sticky-cart-tax');
    const stickyCartTotal = document.getElementById('sticky-cart-total');
    const stickyOrderSummary = document.getElementById('order-summary-sticky');
    
    if (!cartItems || !cartCount || !cartSubtotal || !cartTax || !cartTotal) {
      console.error('Cart elements not found');
      return;
    }
    
    // Clear cart items
    cartItems.innerHTML = '';
    
    // Calculate totals
    let subtotal = 0;
    let itemCount = 0;
    
    cart.forEach((item, index) => {
      // Create cart item element
      const li = document.createElement('li');
      
      const itemInfo = document.createElement('div');
      itemInfo.innerHTML = `<strong>${item.name}</strong> x ${item.quantity} @ $${item.price.toFixed(2)}`;
      
      const itemTotal = document.createElement('div');
      itemTotal.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
      
      const removeButton = document.createElement('button');
      removeButton.className = 'btn-remove-item';
      removeButton.setAttribute('data-index', index);
      removeButton.innerHTML = '<i class="fas fa-times"></i>';
      
      li.appendChild(itemInfo);
      li.appendChild(itemTotal);
      li.appendChild(removeButton);
      
      cartItems.appendChild(li);
      
      // Update totals
      subtotal += item.price * item.quantity;
      itemCount += item.quantity;
    });
    
    // Calculate tax and total
    const taxRate = 0.075; // 7.5%
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    // Update display
    cartCount.textContent = itemCount;
    cartSubtotal.textContent = subtotal.toFixed(2);
    cartTax.textContent = tax.toFixed(2);
    cartTotal.textContent = total.toFixed(2);
    
    // Update sticky display if elements exist
    if (stickyCartCount) stickyCartCount.textContent = itemCount;
    if (stickyCartSubtotal) stickyCartSubtotal.textContent = subtotal.toFixed(2);
    if (stickyCartTax) stickyCartTax.textContent = tax.toFixed(2);
    if (stickyCartTotal) stickyCartTotal.textContent = total.toFixed(2);
    
    // Show/hide sticky order summary
    if (stickyOrderSummary) {
      if (itemCount > 0) {
        stickyOrderSummary.style.transform = 'translateY(0)';
        stickyOrderSummary.style.boxShadow = '0 -4px 10px rgba(0,0,0,0.2)';
      } else {
        stickyOrderSummary.style.transform = 'translateY(100%)';
      }
    }
  }
  
  // Get menu data from menu-data.js
  const menuData = window.menuData || [];
  console.log('Menu data:', menuData);
  
  // Function to render menu
  function renderMenu(filterCategory = 'all') {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) {
      console.error('Menu container not found');
      return;
    }
    
    // Clear existing content
    menuContainer.innerHTML = '';
    
    // Filter menu data based on category
    const filteredData = filterCategory === 'all' 
      ? menuData 
      : menuData.filter(category => category.category === filterCategory);
    
    // Render each category
    filteredData.forEach(category => {
      const categorySection = document.createElement('div');
      categorySection.className = 'menu-category';
      
      const categoryHeader = document.createElement('h3');
      categoryHeader.textContent = category.category;
      categorySection.appendChild(categoryHeader);
      
      const itemsContainer = document.createElement('div');
      itemsContainer.className = 'menu-items';
      
      // Render each item in the category
      category.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        
        const itemName = document.createElement('span');
        itemName.className = 'item-name';
        itemName.textContent = item.name;
        
        const itemPrice = document.createElement('span');
        itemPrice.className = 'item-price';
        itemPrice.textContent = `$${item.price.toFixed(2)}`;
        
        const addButton = document.createElement('button');
        addButton.className = 'btn btn-sm btn-add-to-cart';
        addButton.setAttribute('data-name', item.name);
        addButton.setAttribute('data-price', item.price);
        
        // Create ripple effect element
        const rippleElement = document.createElement('span');
        rippleElement.className = 'btn-feedback';
        
        // Create button content
        const buttonContent = document.createElement('span');
        buttonContent.innerHTML = '<i class="fas fa-plus"></i> Add';
        
        addButton.appendChild(rippleElement);
        addButton.appendChild(buttonContent);
        
        itemElement.appendChild(itemName);
        itemElement.appendChild(itemPrice);
        itemElement.appendChild(addButton);
        
        itemsContainer.appendChild(itemElement);
      });
      
      categorySection.appendChild(itemsContainer);
      menuContainer.appendChild(categorySection);
    });
  }
  
  // Set up category filter
  const categoryFilter = document.getElementById('category-filter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
      renderMenu(this.value);
    });
  }
  
  // Set up search functionality
  const searchInput = document.getElementById('menu-search');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      // If search term is empty, just render the menu normally
      if (!searchTerm) {
        renderMenu(categoryFilter ? categoryFilter.value : 'all');
        return;
      }
      
      // Filter menu items based on search term
      const menuContainer = document.getElementById('menu-container');
      if (!menuContainer) return;
      
      menuContainer.innerHTML = '';
      
      // Create search results section
      const searchResults = document.createElement('div');
      searchResults.className = 'menu-category';
      
      const searchHeader = document.createElement('h3');
      searchHeader.textContent = 'Search Results';
      searchResults.appendChild(searchHeader);
      
      const resultsContainer = document.createElement('div');
      resultsContainer.className = 'menu-items';
      
      // Search through all items
      let resultsFound = false;
      
      menuData.forEach(category => {
        category.items.forEach(item => {
          if (item.name.toLowerCase().includes(searchTerm)) {
            resultsFound = true;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            
            const itemName = document.createElement('span');
            itemName.className = 'item-name';
            itemName.textContent = `${item.name} (${category.category})`;
            
            const itemPrice = document.createElement('span');
            itemPrice.className = 'item-price';
            itemPrice.textContent = `$${item.price.toFixed(2)}`;
            
            const addButton = document.createElement('button');
            addButton.className = 'btn btn-sm btn-add-to-cart';
            addButton.setAttribute('data-name', item.name);
            addButton.setAttribute('data-price', item.price);
            addButton.innerHTML = '<i class="fas fa-plus"></i> Add';
            
            itemElement.appendChild(itemName);
            itemElement.appendChild(itemPrice);
            itemElement.appendChild(addButton);
            
            resultsContainer.appendChild(itemElement);
          }
        });
      });
      
      if (!resultsFound) {
        const noResults = document.createElement('p');
        noResults.textContent = 'No items found matching your search.';
        resultsContainer.appendChild(noResults);
      }
      
      searchResults.appendChild(resultsContainer);
      menuContainer.appendChild(searchResults);
    });
  }
  
  // Initial render
  setTimeout(() => {
    console.log('Initial menu render');
    renderMenu();
    
    // Set up sticky order summary buttons
    const stickyCheckoutBtn = document.getElementById('sticky-checkout-btn');
    const stickyViewCartBtn = document.getElementById('sticky-view-cart-btn');
    
    if (stickyCheckoutBtn) {
      stickyCheckoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
          alert('Your cart is empty!');
          return;
        }
        
        // Use the same checkout logic as the main checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
          checkoutBtn.click();
        }
      });
    }
    
    if (stickyViewCartBtn) {
      stickyViewCartBtn.addEventListener('click', function() {
        // Scroll to the cart section
        const cartSection = document.querySelector('.menu-section');
        if (cartSection) {
          cartSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, 100);
  
  // Set up event listeners for cart functionality
  document.addEventListener('click', function(e) {
    // Add to cart button
    if (e.target.classList.contains('btn-add-to-cart') || e.target.parentElement.classList.contains('btn-add-to-cart') || e.target.parentElement.parentElement.classList.contains('btn-add-to-cart')) {
      // Find the actual button element
      let button;
      if (e.target.classList.contains('btn-add-to-cart')) {
        button = e.target;
      } else if (e.target.parentElement.classList.contains('btn-add-to-cart')) {
        button = e.target.parentElement;
      } else {
        button = e.target.parentElement.parentElement;
      }
      
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));
      
      // Add visual feedback
      button.classList.add('clicked');
      button.classList.add('added');
      
      // Change button text temporarily
      const buttonContent = button.querySelector('span:not(.btn-feedback)');
      const originalHTML = buttonContent.innerHTML;
      buttonContent.innerHTML = '<i class="fas fa-check"></i> Added';
      
      // Reset button after animation
      setTimeout(() => {
        button.classList.remove('clicked');
        setTimeout(() => {
          buttonContent.innerHTML = originalHTML;
          button.classList.remove('added');
        }, 1000);
      }, 600);
      
      // Add to cart
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }
      
      // Update cart display
      updateCart();
      
      // Scroll to order summary if not visible
      const orderSection = document.querySelector('.menu-section');
      const rect = orderSection.getBoundingClientRect();
      const isVisible = (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
      
      if (!isVisible) {
        // Add a floating notification
        const notification = document.createElement('div');
        notification.className = 'floating-notification';
        notification.innerHTML = `
          <div class="notification-content">
            <i class="fas fa-shopping-cart"></i>
            <span>${name} added to cart</span>
          </div>
        `;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
          notification.classList.add('show');
          setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
              document.body.removeChild(notification);
            }, 300);
          }, 2000);
        }, 10);
      }
    }
    
    // Remove from cart button
    if (e.target.classList.contains('btn-remove-item') || e.target.parentElement.classList.contains('btn-remove-item')) {
      const button = e.target.classList.contains('btn-remove-item') ? e.target : e.target.parentElement;
      const index = parseInt(button.getAttribute('data-index'));
      
      // Remove from cart
      cart.splice(index, 1);
      
      // Update cart display
      updateCart();
    }
  });
  
  // Set up clear cart button
  const clearCartBtn = document.getElementById('clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', function() {
      if (cart.length === 0) return;
      
      if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCart();
      }
    });
  }
  
  // Modal functionality
  const modal = document.getElementById('checkout-modal');
  const confirmationModal = document.getElementById('confirmation-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const cancelOrderBtn = document.getElementById('cancel-order');
  const callNowBtn = document.getElementById('call-now');
  const submitOrderBtn = document.getElementById('submit-order');
  const pickupOptionBtn = document.getElementById('pickup-option');
  const phoneOptionBtn = document.getElementById('phone-option');
  const onlineOrderForm = document.getElementById('online-order-form');
  const callInMessage = document.getElementById('call-in-message');
  const pickupTimeSelect = document.getElementById('pickup-time');
  const customTimeContainer = document.getElementById('custom-time-container');
  const customPickupTime = document.getElementById('custom-pickup-time');
  const closeConfirmationBtn = document.getElementById('close-confirmation');
  const closeConfirmationXBtn = document.getElementById('close-confirmation');
  
  // Function to open checkout modal
  function openModal() {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      
      // Default to pickup option
      if (pickupOptionBtn) {
        pickupOptionBtn.classList.add('active');
        phoneOptionBtn.classList.remove('active');
        onlineOrderForm.style.display = 'block';
        callInMessage.style.display = 'none';
        callNowBtn.style.display = 'none';
        submitOrderBtn.style.display = 'block';
      }
    }
  }
  
  // Function to close checkout modal
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }
  
  // Function to open confirmation modal
  function openConfirmationModal() {
    if (confirmationModal) {
      confirmationModal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  }
  
  // Function to close confirmation modal
  function closeConfirmationModal() {
    if (confirmationModal) {
      confirmationModal.style.display = 'none';
      document.body.style.overflow = ''; // Restore scrolling
      
      // Clear the cart after successful order
      cart = [];
      updateCart();
    }
  }
  
  // Set up modal event listeners
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  if (cancelOrderBtn) {
    cancelOrderBtn.addEventListener('click', closeModal);
  }
  
  if (callNowBtn) {
    callNowBtn.addEventListener('click', function() {
      window.location.href = 'tel:4027594144';
    });
  }
  
  // Handle order type selection
  if (pickupOptionBtn && phoneOptionBtn) {
    pickupOptionBtn.addEventListener('click', function() {
      pickupOptionBtn.classList.add('active');
      phoneOptionBtn.classList.remove('active');
      onlineOrderForm.style.display = 'block';
      callInMessage.style.display = 'none';
      callNowBtn.style.display = 'none';
      submitOrderBtn.style.display = 'block';
    });
    
    phoneOptionBtn.addEventListener('click', function() {
      phoneOptionBtn.classList.add('active');
      pickupOptionBtn.classList.remove('active');
      onlineOrderForm.style.display = 'none';
      callInMessage.style.display = 'block';
      callNowBtn.style.display = 'block';
      submitOrderBtn.style.display = 'none';
    });
  }
  
  // Handle custom pickup time
  if (pickupTimeSelect) {
    pickupTimeSelect.addEventListener('change', function() {
      if (this.value === 'custom') {
        customTimeContainer.style.display = 'block';
        customPickupTime.required = true;
      } else {
        customTimeContainer.style.display = 'none';
        customPickupTime.required = false;
      }
    });
  }
  
  // Handle confirmation modal close
  if (closeConfirmationBtn) {
    closeConfirmationBtn.addEventListener('click', closeConfirmationModal);
  }
  
  if (closeConfirmationXBtn) {
    closeConfirmationXBtn.addEventListener('click', closeConfirmationModal);
  }
  
  // Close modal when clicking outside the modal content
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Close confirmation modal when clicking outside
  if (confirmationModal) {
    confirmationModal.addEventListener('click', function(e) {
      if (e.target === confirmationModal) {
        closeConfirmationModal();
      }
    });
  }
  
  // Close modals with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('active')) {
        closeModal();
      }
      if (confirmationModal && confirmationModal.style.display === 'flex') {
        closeConfirmationModal();
      }
    }
  });
  
  // Set up checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      
      // Calculate totals
      let subtotal = 0;
      const orderItemsContainer = document.getElementById('modal-order-items');
      
      // Clear previous items
      if (orderItemsContainer) {
        orderItemsContainer.innerHTML = '';
        
        // Add each item to the modal
        cart.forEach(item => {
          const itemTotal = item.price * item.quantity;
          subtotal += itemTotal;
          
          const orderItem = document.createElement('div');
          orderItem.className = 'order-item';
          orderItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${itemTotal.toFixed(2)}</span>
          `;
          
          orderItemsContainer.appendChild(orderItem);
        });
      }
      
      // Calculate tax and total
      const taxRate = 0.075; // 7.5% for Geneva
      const tax = subtotal * taxRate;
      const total = subtotal + tax;
      
      // Update modal with totals
      document.getElementById('modal-subtotal').textContent = `$${subtotal.toFixed(2)}`;
      document.getElementById('modal-tax').textContent = `$${tax.toFixed(2)}`;
      document.getElementById('modal-total').textContent = `$${total.toFixed(2)}`;
      
      // Open the modal
      openModal();
    });
  }
  
  // Handle order submission
  if (submitOrderBtn) {
    submitOrderBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Validate form
      const customerName = document.getElementById('customer-name').value.trim();
      const customerPhone = document.getElementById('customer-phone').value.trim();
      const pickupTime = document.getElementById('pickup-time').value;
      const orderNotes = document.getElementById('order-notes').value.trim();
      
      // Basic validation
      if (!customerName) {
        alert('Please enter your name');
        return;
      }
      
      if (!customerPhone) {
        alert('Please enter your phone number');
        return;
      }
      
      if (!pickupTime) {
        alert('Please select a pickup time');
        return;
      }
      
      if (pickupTime === 'custom' && !document.getElementById('custom-pickup-time').value) {
        alert('Please specify a pickup time');
        return;
      }
      
      // Get formatted pickup time
      let formattedPickupTime;
      if (pickupTime === 'asap') {
        formattedPickupTime = 'As soon as possible';
      } else if (pickupTime === 'custom') {
        formattedPickupTime = document.getElementById('custom-pickup-time').value;
      } else {
        const timeMap = {
          '15min': '15 minutes',
          '30min': '30 minutes',
          '45min': '45 minutes',
          '60min': '1 hour'
        };
        formattedPickupTime = timeMap[pickupTime] || pickupTime;
      }
      
      // Calculate order total
      let subtotal = 0;
      cart.forEach(item => {
        subtotal += item.price * item.quantity;
      });
      
      const taxRate = 0.075;
      const tax = subtotal * taxRate;
      const total = subtotal + tax;
      
      // Generate order number (timestamp-based)
      const orderNumber = 'SC' + Date.now().toString().slice(-6);
      
      // Prepare order data
      const orderData = {
        orderNumber: orderNumber,
        customerName: customerName,
        customerPhone: customerPhone,
        pickupTime: formattedPickupTime,
        orderNotes: orderNotes,
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity
        })),
        subtotal: subtotal,
        tax: tax,
        total: total,
        orderDate: new Date().toISOString()
      };
      
      // In a real implementation, you would send this data to your server
      // For now, we'll simulate a successful order submission
      console.log('Order submitted:', orderData);
      
      // Send order to email service
      sendOrderEmail(orderData);
      
      // Update confirmation modal with order details
      document.getElementById('order-number').textContent = orderNumber;
      document.getElementById('conf-name').textContent = customerName;
      document.getElementById('conf-time').textContent = formattedPickupTime;
      document.getElementById('conf-total').textContent = `$${total.toFixed(2)}`;
      
      // Close checkout modal and open confirmation
      closeModal();
      openConfirmationModal();
    });
  }
  
  // Function to send order email
  function sendOrderEmail(orderData) {
    // Format the order items for email
    let itemsHtml = '';
    orderData.items.forEach(item => {
      itemsHtml += `${item.name} x ${item.quantity} - $${item.total.toFixed(2)}<br>`;
    });
    
    // Format the email body
    const emailBody = `
      <h2>New Online Order #${orderData.orderNumber}</h2>
      <p><strong>Customer:</strong> ${orderData.customerName}</p>
      <p><strong>Phone:</strong> ${orderData.customerPhone}</p>
      <p><strong>Pickup Time:</strong> ${orderData.pickupTime}</p>
      <p><strong>Order Notes:</strong> ${orderData.orderNotes || 'None'}</p>
      <h3>Order Items:</h3>
      <p>${itemsHtml}</p>
      <p><strong>Subtotal:</strong> $${orderData.subtotal.toFixed(2)}</p>
      <p><strong>Tax (7.5%):</strong> $${orderData.tax.toFixed(2)}</p>
      <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
      <p>Order placed on: ${new Date().toLocaleString()}</p>
    `;
    
    // In a production environment, you would send this to your server
    // For now, we'll use a simple mailto link as a fallback
    // This will open the user's email client with the order details
    
    // Create a hidden link to trigger the email
    const emailLink = document.createElement('a');
    emailLink.style.display = 'none';
    emailLink.href = `mailto:sisterscafe806@gmail.com?subject=New Online Order #${orderData.orderNumber}&body=${encodeURIComponent('New order received. Please check your admin panel.')}`;
    document.body.appendChild(emailLink);
    emailLink.click();
    document.body.removeChild(emailLink);
    
    // In a real implementation, you would use a server-side API to send the email
    // For example:
    // fetch('/api/send-order', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(orderData)
    // })
    // .then(response => response.json())
    // .then(data => console.log('Order email sent:', data))
    // .catch(error => console.error('Error sending order:', error));
  }
  
  // Set up order calculator
  const calculateBtn = document.getElementById('calculate-btn');
  const useCartTotalBtn = document.getElementById('use-cart-total-btn');
  
  // Function to update calculator results
  function updateCalculatorResults(subtotal, peopleCount, tipPercentage) {
    const tax = subtotal * 0.075; // 7.5% tax
    const tip = subtotal * (tipPercentage / 100);
    const total = subtotal + tax + tip;
    const perPerson = total / peopleCount;
    
    document.getElementById('calc-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('calc-tax').textContent = tax.toFixed(2);
    document.getElementById('calc-tip').textContent = tip.toFixed(2);
    document.getElementById('calc-total').textContent = total.toFixed(2);
    document.getElementById('calc-per-person').textContent = perPerson.toFixed(2);
  }
  
  // Calculate button event listener
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      const peopleCount = parseFloat(document.getElementById('people-count').value) || 1;
      const avgMealCost = parseFloat(document.getElementById('avg-meal-cost').value) || 10;
      const tipPercentage = parseFloat(document.getElementById('tip-percentage').value) || 15;
      
      const subtotal = peopleCount * avgMealCost;
      updateCalculatorResults(subtotal, peopleCount, tipPercentage);
      
      // Scroll to results if not visible
      const calculatorResult = document.getElementById('calculation-result');
      calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  
  // Use Cart Total button event listener
  if (useCartTotalBtn) {
    useCartTotalBtn.addEventListener('click', function() {
      // Calculate current cart subtotal
      let subtotal = 0;
      cart.forEach(item => {
        subtotal += item.price * item.quantity;
      });
      
      if (subtotal === 0) {
        alert('Your cart is empty! Add some items first.');
        return;
      }
      
      // Update the average meal cost input with the cart subtotal
      const peopleCount = parseFloat(document.getElementById('people-count').value) || 1;
      const tipPercentage = parseFloat(document.getElementById('tip-percentage').value) || 15;
      
      // Update the average meal cost field with the cart subtotal divided by people
      document.getElementById('avg-meal-cost').value = (subtotal / peopleCount).toFixed(2);
      
      // Update calculator results
      updateCalculatorResults(subtotal, peopleCount, tipPercentage);
      
      // Scroll to results if not visible
      const calculatorResult = document.getElementById('calculation-result');
      calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  
  // Add a link to the calculator in the sticky footer
  const stickyCalculateBtn = document.createElement('button');
  stickyCalculateBtn.className = 'btn';
  stickyCalculateBtn.style.backgroundColor = '#8b2c00';
  stickyCalculateBtn.style.color = 'white';
  stickyCalculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculator';
  
  stickyCalculateBtn.addEventListener('click', function() {
    const calculatorSection = document.querySelector('.calculator-section');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Add the calculator button to the sticky footer
  const orderSummaryActions = document.querySelector('.order-summary-actions');
  if (orderSummaryActions) {
    orderSummaryActions.appendChild(stickyCalculateBtn);
  }
});