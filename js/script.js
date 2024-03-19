$(document).ready(function(){
    function addToCart(itemName, itemPrice, imageUrl, itemQuantity) {
        itemPrice = parseFloat(itemPrice);
        var item = {
            name: itemName,
            price: itemPrice,
            imageUrl: imageUrl,
            quantity: itemQuantity
        };
  
        // Retrieve existing cart items from local storage or initialize an empty array
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
        // Check if the item already exists in the cart
        var existingItem = cartItems.find(function(cartItem) {
            return cartItem.name === itemName;
        });
  
        if (existingItem) {
            // If the item already exists, increase its quantity instead of adding a new entry
            existingItem.quantity += parseInt(itemQuantity);
        } else {
            // If the item does not exist, add it to the cart
            item.quantity = parseInt(itemQuantity); // Set the quantity
            cartItems.push(item);
        }
  
        // Store the updated cart items back to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
        // Alert user that the item has been added to cart (you can remove this if desired)
        alert("Item added to cart!");
  
        // Calculate and display total price
        var totalPrice = calculateTotalPrice(cartItems);
        $('#total-price').text('₱' + totalPrice.toFixed(2));
    }
  
    // Click event handler for "Add to Cart" button
    $(".add-to-cart").click(function(){
        var itemName = $(this).closest(".card-body").find(".card-title").text();
        var itemPrice = $(this).closest(".card-body").find(".card-text").text().replace("₱", "").trim(); // Trim any leading/trailing whitespace
        var imageUrl = $(this).closest(".card").find(".card-img-top").attr("src");
        var itemQuantity = $(this).closest(".card-body").find(".quantity-input").val(); // Get the quantity from input field
        addToCart(itemName, itemPrice, imageUrl, itemQuantity);
    });
  
    // Function to calculate total price of items in the cart
    function calculateTotalPrice(cartItems) {
        var totalPrice = 0;
        cartItems.forEach(function(item) {
            totalPrice += item.price * item.quantity; // Multiply price by quantity
        });
        return totalPrice;
    }
  
    // Retrieve cart items from local storage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Display total price on the page
    var totalPrice = calculateTotalPrice(cartItems);
    $('#total-price').text('₱' + totalPrice.toFixed(2));
  });
  