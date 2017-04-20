$(document).ready(function(){
    var draggableItems = $('.products');
    var cart = document.getElementById('cart');
    var shoppingCart = [];
    var counter = $('#count-of-items');
    var totalPrice = $('#total-price'); 
        

    function addItemToCart(item_id){
        var new_id = item_id + '-cart';
        var cart_item = $('#' + new_id);
        var products = JSON.parse(localStorage.getItem('shoppingCart'));
        console.log("cart item: ", cart_item.html());
        var list = $('#list-of-items');

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
            var products = JSON.parse(localStorage.getItem('shoppingCart'));
            for(var i = 0; i < products.length; i++){
                if(products[i].name === item_name){
                    products[i].quantity = parseInt(products[i].quantity) + 1;
                    break;
                }
            }
            

            localStorage.setItem("shoppingCart", JSON.stringify(products));
        }
            console.log(products);
            //console.log(list);
            // list.html( '<h3>' + "hello" + '</h3>');

            // for(var i = 0; i < products.length; i++){
            //     for(var prop in products[i])
            //     {
            //         console.log(products[i][prop]);
            //         console.log("prop", prop)
            //         list.html( 
            //         '<ul>' + 
            //         '<li>' + prop +":" +products[prop] +
            //          '</li>' + 
            //         '</ul>');
            //     }
            // }

            products.forEach(function(product){
            
                for(key in  product){
                    console.log("key", key);
                     //console.log(products[i][prop]);
                    //console.log("prop", prop)
                    list.html( 
                    '<ul>' + 
                    '<li>' + key +":" +product[key].name +
                     '</li>' + 
                    '</ul>');
                }
            })
    }
    
    function removeItemFromCart(item_id){
        item_id = '#' + item_id;
        // var number = $(item).find('.number').html();
        // console.log("number in removeItemFromCart: ", number);

        // if(parseInt(number.html()) > 1){
        //     number.html(number.html() - 1);
        // } else{
        //     $(item_id).remove();
        // }
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


});