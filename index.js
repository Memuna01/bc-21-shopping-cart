$(document).ready(function(){
    var draggableItems = $('.products');
    var cart = document.getElementById('cart');
    var shoppingCart = [];
    var counter = $('#count-of-items');
    var totalPrice = $('#total-price'); 
    var list = $('#list-of-items');


    (function displayCartItems(){
        var products = JSON.parse(localStorage.getItem('shoppingCart'));
        if(products) {
            var items ="";
            for (var i = 0; i < products.length; i++){
                items += products[i]["name"] + ":" + products[i]["quantity"];
                items += "<br>";
            }
            list.html(items);
        }
    })();

    function addItemToCart(item_id){
        var new_id = item_id + '-cart';
        var cart_item = $('#' + new_id);
        var products = JSON.parse(localStorage.getItem('shoppingCart'));
        console.log("cart item: ", cart_item.html());

        //checking if item is already in the cart
        if(cart_item.html() === undefined){
            //item is not in the cart, add item
            var storeItem = document.getElementById(item_id).cloneNode(true);

            storeItem.id = new_id;

            $('#target').append(storeItem);
            $('#' + new_id + '.number').html('1');

            counter.html(parseInt(counter.html()) + 1);
            totalPrice.html(parseFloat(totalPrice.html()) + parseFloat($(storeItem).find('.product-price').html())); 

            storeItem.addEventListener('dragend', dragleave_handler);

            console.log("storeItem: ", storeItem);
            var item_name = $(storeItem).find('.title-of-product').html();
            console.log("item_name: ", item_name);

            var product = { "name": item_name, "quantity": 1 };

            shoppingCart.push(product);

            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

        } else{
            //item is in cart, update item
            var storeItem = document.getElementById(item_id).cloneNode(true);

            counter.html(parseInt(counter.html()) + 1);
            console.log("counter if item in cart: ", counter.html());

            
            console.log("total price if item is in cart: ", totalPrice.html());

            totalPrice.html(parseFloat(totalPrice.html()) + parseFloat($(storeItem).find('.product-price').html())); 
            console.log("total price if item is in cart: ", totalPrice.html());

            var item_name = $(storeItem).find('.title-of-product').html();
            var update_cart = JSON.parse(localStorage.getItem('shoppingCart'));
            for(var i = 0; i < update_cart.length; i++){
                if(update_cart[i].name === item_name){
                    update_cart[i].quantity = parseInt(update_cart[i].quantity) + 1;
                    break;
                }
            }
            

            localStorage.setItem("shoppingCart", JSON.stringify(update_cart));
        }
    }
    
    function removeItemFromCart(item_id){
        item_id = '#' + item_id;
    }

    //drag and drop event handlers
    function dragstart_handler(event) {
        console.log("dragStart");
        event.dataTransfer.setData("itemId", event.target.id);
        //ev.dataTransfer.dropEffect = "copy";
    }

    function dragover_handler(event) {
        //to enable elements accept drop events, I prevent 
        // default event behavior of dragover and dragenter
        event.preventDefault();
        console.log('dragover_handler');
    }
    function allowDrop(event) {
        event.preventDefault();
    }

    function drop_handler(event) {
        event.preventDefault();

        var event_id = event.dataTransfer.getData('itemId');
        if(event_id === '') return;

        addItemToCart(event_id);
        console.log("dropped: " + event_id);
    }

    function dragOut(event){
        if (event.dataTransfer.dropEffect === 'none') {
            removeItemFromCart(event.target.id);
        }
    }
 
    function dragleave_handler(event){
        // $('.cart-container').removeClass('drag-enter');
    }

     //add event listener to shopping cart

    for(var i = 0; i < draggableItems.length; i++){
        draggableItems[i].addEventListener('dragstart', dragstart_handler);
    }

    //add event listeners to cart
    cart.addEventListener('dragover', dragover_handler);
    cart.addEventListener('dragover', allowDrop);
    cart.addEventListener('drop', drop_handler);
    cart.addEventListener('dragleave', dragleave_handler);

    function showByCategory(id){
        var active_class = $('.active');
        var slice_clicked_class = id.slice(8);
        var clicked_class = $('.' + slice_clicked_class);
        //console.log("clicked class slice: ", $(clicked_class));

        $('.products-list a').removeClass('active');
        clicked_class.addClass('active');
         $('.products').hide();
        clicked_class.show();

        // console.log(id)
        // $('.category').hide();
        // if($('#' + id.slice(8)) === $('#' + id + "."));
  }

    //Show shop items by categories
   $('.products-list a').on('click', function(event){
       showByCategory(event.target.id);
       //console.log("event slice", (event.target.id).slice(8));
  });


});