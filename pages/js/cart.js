<script>		
				
			

				
				$(".add-to-cart").click(function(event){
					event.preventDefault(); //Wont jump to Top of page On click
					var name = $(this).attr("data-name");
					var price = Number($(this).attr("data-price"));
					
					shoppingCart.addItemToCart(name,price,1);
					displayCart();
				});
				
				$("#clear-cart").click(function(event){
					shoppingCart.clearCart();
					displayCart();
				});
				
				
				
				
				
				function displayCart() {
					//console.log("***Display Cart*** ");
					
					var cartArray = shoppingCart.listCart();
					//console.log("***Display Cart*** :"+cartArray.length);
					
					var output = "";
					for(var i in cartArray) {
						output += "<tr >"+"<td>"
							+cartArray[i].name+"</td>"+"<td>"
							+" <button class='subtract-item' data-name='"
							+cartArray[i].name+"'>-</button>"+"</td>"+"<td>"
							+" "+cartArray[i].count+"</td>"+"<td>"
							+" <button class ='plus-item' data-name='"
							+cartArray[i].name+"'>+</button>"+"</td>"+"<td>"
							+" x "+cartArray[i].price+"</td>"+"<td>"
							+" = "+" &#x20b9; "+cartArray[i].total+"</td>"+"<td>"
							//+" <button class='subtract-item' data-name='"
							//+cartArray[i].name+"'>-</button>"
							//+" <button class ='plus-item' data-name='"
							//+cartArray[i].name+"'>+</button>"
							+" <button class ='delete-item' data-name='"
							+cartArray[i].name+"'>x</button>"+"</td>"
							+"</tr>";
					}
					$("#show-cart").html(output);
					$("#total-cart").html(shoppingCart.totalCart());
					
				}
				
				$("#show-cart").on("click",".delete-item", function(event){
						var name = $(this).attr("data-name");
						shoppingCart.removeItemFromCartAll(name);
						displayCart();
				});
				
				$("#show-cart").on("click",".subtract-item", function(event){
						var name = $(this).attr("data-name");
						shoppingCart.removeItemFromCart(name);
						displayCart();
				});
				
				$("#show-cart").on("click",".plus-item", function(event){
						var name = $(this).attr("data-name");
						shoppingCart.addItemToCart(name,0,1);
						displayCart();
				});
				
				
				
			
				
				
				//*************************************************
				//Shopping Cart Func
				
				//OBJ IN ARR ( Possible ), But Cart should be Empty Initially
				//name price cart
				//var cart = [{name:"brush",price:1.99,count:3},{name:"brush2",price:1.99,count:8}];
				
				//var cart = []; //Empty Cart
				
				
				
				/*
					// {name:"Brush",price:1.99,count:1}
					//Creating Obj
					var brush = new Item("Brush",1.99,1);
					
					//console.log(a);
					
					//ADD TO CART
					cart.push(new Item("Apple",2.13,1));
					cart.push(brush);
					
					//PRINT CART
					for(var i=0;i<cart.length;i++){
						console.log(cart[i]);
					}
				*/
				
				//**********************************************************************
				//	Shopping Cart Functions
				
				//Converting Shopping Cart in Single Obj
				var shoppingCart = {};
				shoppingCart.cart = []; //cart now belongs to shoppingCart
				
				//Func To Genertae Obj
				shoppingCart.Item = function(name,price,count) {
					this.name = name
					this.price = price
					this.count = count
				};
				
				//addItemToCart
				shoppingCart.addItemToCart = function(name,price,count){
					//Count of Item of same Name
					for(var i in this.cart) {
						if(this.cart[i].name === name) {
							this.cart[i].count += count ;
							this.saveCart(); //Save before return
							return;
						}
					}
					//Add New Item
					var item = new this.Item(name,price,count);
					this.cart.push(item);
					this.saveCart();
				};
				
				/*
					//Test Cart
					addItemToCart("Apple",1.22,1);
					addItemToCart("Orange",3.55,4);
					addItemToCart("Apple",1.22,3);
					addItemToCart("Kuchu",100.22,5);
					addItemToCart("Shoe",10.72,3);
					
					console.log(cart);
					console.log(cart[0]);
					console.log(cart[1]);
					//console.log(cart[0].name);
				*/
				
				//  a = 3 	-> Assignment op
				// 	"3" == 3  ->	true
				//	"3" === 3 	->   false
				
				//removeItemFromCart, Remove one item
				shoppingCart.removeItemFromCart = function(name){
					for(var i in this.cart) {
						if(this.cart[i].name === name) {
							this.cart[i].count-- ;
							//Remove Item Name from Cart, The Item, No. of Item
							if(this.cart[i].count === 0) {
								this.cart.splice(i, 1);
							}
							break;
						}
					}
					this.saveCart();
				};
				
				/*
					//Test Cart
					console.log(cart[0].count);
					
					removeItemFromCart("Apple");
					removeItemFromCart("Apple");
					removeItemFromCart("Apple");
					removeItemFromCart("Apple");
					//removeItemFromCart("Apple");
					//removeItemFromCart("Apple");
					
					console.log(cart[0].count);
					console.log(cart);
				*/
				
				//	removeItemFromCartAll(name) //Removes all item name
				shoppingCart.removeItemFromCartAll = function(name){
					for(var i in this.cart) {
						if(this.cart[i].name === name){
							this.cart.splice(i,1);
							break;
						}
					}
					this.saveCart();
				};
				
				/*
					//Test Cart
					addItemToCart("Apple",1.22,1);
					addItemToCart("Orange",3.55,4);
					addItemToCart("Apple",1.22,3);
					addItemToCart("Kuchu",100.22,10);
					
					console.log(cart.length);
					console.log(cart);
					
					removeItemFromCartAll("Apple");
					
					console.log(cart.length);
					console.log(cart);
				*/	
				
				//	clearCart()
				shoppingCart.clearCart = function() {
					this.cart = [];
					this.saveCart();
				};
				
				/*
					clearCart();
					console.log(cart);
				*/
				
				//	countCart()	-> return total Count
				shoppingCart.countCart = function(){
					var totalCount = 0;
					for(var i in cart) {
						totalCount += this.cart[i].count;
					}
					return totalCount;
				};
				
				//Print Total Item in Cart
				//console.log(countCart());
				
				//	totalCart()	->	return total cost
				
				shoppingCart.totalCart = function() {
					var totalCost = 0;
					for(var i in this.cart) {
						totalCost += this.cart[i].price * this.cart[i].count;
					}
					return totalCost.toFixed(2);
				};
				
				//Print Total of Cart
				//console.log(totalCart());
				
				
				
				//	listCart()	->	array of Item ( CopyCart)
				shoppingCart.listCart = function(){
					var cartCopy = [];
					for(var i in this.cart) {
						var item = this.cart[i];
						var itemCopy = {};
						for(var p in item) {
							itemCopy[p] = item[p] ;
						}
						itemCopy.total = (item.price * item.count).toFixed(2) ;
						cartCopy.push(itemCopy);
					}
					return cartCopy;
					//return cart;
					//return cart.slice();
				};
				
				/*
					//PrintCopyCart Test
					var array = listCart();
					array[0].name = "Mistake";
					console.log( array);
				*/
				
				/*
					var a = ["A","B","C"];
					var b = a; //Doesnot create copy ,Instead give Refernece to Original Copy(Same Address)
					b.push("D");
					// a & b have same content
					console.log(a);
					console.log(b);
				*/	
				/*
					//COPY ARR -> slice()
					var a = ["A","B","C"];
					//Easy Way to Copy Array is Slice
					var b = a.slice();
					b.push("D");
					// a & b have different content
					console.log(a);
					console.log(b);
				*/
				/*
					var a = {age:22,name:"kuchu"}
					var b = a;
					b.name = "chugu";
					//Prints chugu in both
					console.log(a);
					console.log(b);
				*/
				
				//	saveCart() --> to local Storage
				shoppingCart.saveCart = function(){
					localStorage.setItem("shoppingCart",JSON.stringify(this.cart)); //Convert Cart into JSON String
				};
				
				/*
					localStorage.setItem("age", "50");
					localStorage.setItem("username", "Kuchua");
				*/
				
				//	loadCart()  --> From local Storage
				shoppingCart.loadCart = function(){
					this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
				};
				
				shoppingCart.loadCart();
				displayCart(); // Display After Load
				
				var array = shoppingCart.listCart();
				//console.log("---------------------");
				console.log(array);
				
				function checkout() {
					
					if(shoppingCart.totalCart() < 200){
						//print min order is 200
						document.getElementById("minord").innerHTML = "min order is 200";
					}
					else{
						location.href = "#check";
					}
					
				
				}
				  
		</script>