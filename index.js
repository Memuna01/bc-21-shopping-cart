$(document).ready(function(){
    var draggableItems = $('.products');
    var cart = document.getElementById('cart');
    var shoppingCart = [];

    function addItemToCart(item_id){
        var new_id = item_id + '-cart';
        var cart_item = $('#' + new_id);

        if(cart_item.html() === undefined){
            var storeItem = document.getElementById(item_id).cloneNode(true);

            storeItem.id = new_id;

            $('#target').append(storeItem);
            $('#' + new_id + '.number').html('1');

            storeItem.addEventListener('dragend', dragleave_handler);
        } else{
            var number = $('#' + new_id + '.number');
            number.html(parseInt(number.html()) + 1);
        }

        console.log(number);
    }
    
    function removeItemFromCart(item_id){
        item_id = '#' + item_id;
        var number = $(item_id).find('.number');

        if(parseInt(number.html()) > 1){
            number.html(number.html() - 1);
        } else{
            $(item_id).remove();
        }
    }

    //drag and drop event handlers
    function dragstart_handler(ev) {
        console.log("dragStart");
        ev.dataTransfer.setData("itemId", this.id);
        //ev.dataTransfer.dropEffect = "copy";
    }

    function dragOut(ev){
        if (ev.dataTransfer.dropEffect === 'none') {
            removeItemFromCart(this.id);
        }
    }
    function dragover_handler(ev) {
        ev.preventDefault();
        // $('cart-container').addClass('drag-enter');
        //ev.preventDefault();
        // Set the dropEffect to move
         //ev.dataTransfer.dropEffect = "move";
        console.log('dragover_handler');
    }
    function allowDrop(ev) {
        ev.preventDefault();
    }
    function drop_handler(ev) {
        ev.preventDefault();
        // $('.cart-container').removeClass('drag-enter');

        var ev_id = ev.dataTransfer.getData('itemId');
        if(ev_id === '') return;

        addItemToCart(ev_id);
        console.log("dropped" + ev_id);
        // // Get the id of the target and add the moved element to the target's DOM
        // var data = ev.dataTransfer.getData("text/html");
        // console.log(data);
        // var nodeCopy = document.getElementById(data).cloneNode(true);
        // nodeCopy.id = "newId" + "-" + data;
        // console.log(nodeCopy.id);
        // ev.target.appendChild(nodeCopy);
        // $('div.cart-image').replaceWith('nodecopy.cart-image');
    }

    function dragleave_handler(ev){
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