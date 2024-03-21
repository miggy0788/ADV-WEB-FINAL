$(document).ready(function () {
  function addToCart(itemName, itemPrice, imageUrl, itemQuantity) {
    itemPrice = parseFloat(itemPrice);
    var item = {
      name: itemName,
      price: itemPrice,
      imageUrl: imageUrl,
      quantity: itemQuantity,
    };
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var existingItem = cartItems.find(function (cartItem) {
      return cartItem.name === itemName;
    });
    if (existingItem) {
      existingItem.quantity += parseInt(itemQuantity);
    } else {
      item.quantity = parseInt(itemQuantity);
      cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("Item added to cart!");
    var totalPrice = calculateTotalPrice(cartItems);
    $("#total-price").text("₱" + totalPrice.toFixed(2));
  }
  $(".add-to-cart").click(function () {
    var itemName = $(this).closest(".card-body").find(".card-title").text();
    var itemPrice = $(this)
      .closest(".card-body")
      .find(".card-text")
      .text()
      .replace("₱", "")
      .trim();
    var imageUrl = $(this).closest(".card").find(".card-img-top").attr("src");
    var itemQuantity = $(this)
      .closest(".card-body")
      .find(".quantity-input")
      .val();
    addToCart(itemName, itemPrice, imageUrl, itemQuantity);
  });

  function calculateTotalPrice(cartItems) {
    var totalPrice = 0;
    cartItems.forEach(function (item) {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  }

  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var totalPrice = calculateTotalPrice(cartItems);
  $("#total-price").text("₱" + totalPrice.toFixed(2));
});
