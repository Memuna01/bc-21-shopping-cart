$(document).ready(function(){
    var draggableItems = $('.products');
    var cart = document.getElementById('cart');
    var shoppingCart = [];
    var counter = $('#count-of-items');
    var totalPrice = $('#total-price'); 
    var list = $('#list-of-items');
    var products = JSON.parse(localStorage.getItem('shoppingCart'));
    var productData = [];

    (function updateProductsData(){
        var sum_counter = 0;
        var price_counter = 0;
        if(products.length){
            for(var i = 0; i < products.length; i++){
                sum_counter += parseInt(products[i]["quantity"]);
                price_counter += parseInt(products[i]["price"]);
            }

            products_data = {"sum_counter": sum_counter, "price_counter": price_counter };
            productData.push(products_data);

            localStorage.setItem("productData", JSON.stringify(productData));
         }
    })();

    (function updateProductsData(){
        var parsedProductData = JSON.parse(localStorage.getItem('productData'));

        if(parsedProductData){
            for(var i = 0; i < parsedProductData.length; i++){
                counter.html(parsedProductData[i]["sum_counter"]);
                totalPrice.html(parsedProductData[i]["price_counter"]);
            }
        }
    })();

    (function displayCartItems(){
        var products = JSON.parse(localStorage.getItem('shoppingCart'));
        if(products) {
            var items ="Item" + "&emsp;&emsp;&emsp;&emsp;&emsp;" + "Quantity of item" + "<br>";
            for (var i = 0; i < products.length; i++){
                if(products[i]["name"] === undefined && products[i]["quantity"] === undefined){
                    continue;
                } else{
                    items += products[i]["name"] + ":" 
                    + "&emsp;&emsp;&emsp;&emsp;&emsp;" + products[i]["quantity"]; 

                    items += "<br><br>";
                }   
            }

            items += `Want to delete an item?<br>
            <input type="text" id="delete-item" name="" value="" placeholder="Title Case e.g Blue Grecian ">
            <input id="delete-item-button" type="button" name="" value="Delete Item">`;
            list.html(items);
        }
    })();

    console.log(list.html());
   
    function delete_product_item(){
        var delete_item = $('#delete-item').val();
        for(var i = 0; i < products.length; i++){
            if(delete_item === products[i]["name"]){
                if(products[i]["quantity"] > 1){
                    products[i]["quantity"] -= 1;
                }else{
                    delete products[i]["name"];
                    delete products[i]["quantity"];
                }
            }
        }

        localStorage.setItem("shoppingCart", JSON.stringify(products));
     }

    function addItemToCart(item_id){
        var new_id = item_id + '-cart';
        var cart_item = $('#' + new_id);
        var products = "";
        console.log("cart item: ", cart_item.html());

        //checking if item is already in the cart
        if(cart_item.html() === undefined){
            //item is not in the cart, add item
            var storeItem = document.getElementById(item_id).cloneNode(true);

            storeItem.id = new_id;

            $('#target').append(storeItem);
            $('#' + new_id + '.number').html('1');
            //$(storeItem + "img").style.visibility = "hidden";

            // counter.html(parseInt(counter.html()) + 1);
            totalPrice.html(parseFloat(totalPrice.html()) + parseFloat($(storeItem).find('.product-price').html())); 

            storeItem.addEventListener('dragend', dragleave_handler);

            console.log("storeItem: ", storeItem);
            var item_name = $(storeItem).find('.title-of-product').html();
            console.log("item_name: ", item_name);
            var price = $(storeItem).find('.product-price').html();
            var product = { "id": 1, "name": item_name, "price": price, "quantity": 1 };

            shoppingCart.push(product);

            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
            var products = JSON.parse(localStorage.getItem('shoppingCart'));
            var sum_count = 0;
            if(products.length){
                console.log("product length: ", products.length);
                console.log("products available");
                for(var i = 0; i < products.length; i++){
                    sum_count += products[i]["quantity"];
                }

                sum_count += 1;
                counter.html(sum_count);
            }else{
                for(var i = 0; i < products.length; i++){
                    sum_count += products[i]["quantity"];
                }
                counter.html(sum_count);
            }

        } else{
            //item is in cart, update item
            var storeItem = document.getElementById(item_id).cloneNode(true);

            // counter.html(parseInt(counter.html()) + 1);
            // console.log("counter if item in cart: ", counter.html());

            
            // console.log("total price if item is in cart: ", totalPrice.html());

            // totalPrice.html(parseFloat(totalPrice.html()) + parseFloat($(storeItem).find('.product-price').html())); 
            // console.log("total price if item is in cart: ", totalPrice.html());

            var item_name = $(storeItem).find('.title-of-product').html();
            var update_cart = JSON.parse(localStorage.getItem('shoppingCart'));
            var products = JSON.parse(localStorage.getItem('shoppingCart'));
            var sum_count = 0;
            if(products){
                console.log("products available...again");
                for(var i = 0; i < products.length; i++){
                    sum_count += products[i]["quantity"];
                }

                sum_count += 1;
            }

            counter.html(sum_count);
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

     //add event listener to all shop products

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

        $('.products-list a').removeClass('active');
        clicked_class.addClass('active');
         $('.products').hide();
        clicked_class.show();
  }

    //Show shop items by categories
   $('.products-list a').on('click', function(event){
       showByCategory(event.target.id);
       //console.log("event slice", (event.target.id).slice(8));
  });

  //delete item from cart
   $('#delete-item-button').on('click', function(){
       delete_product_item();

       console.log("delete button working");
  });


});