// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers','ionic-toast','ionic-datepicker'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
		
    });
})
.directive('footertabs', function() { 
	var directive = {};
   
   //restrict = E, signifies that directive is Element directive
   directive.restrict = 'E';
   
   //template replaces the complete element with its text.
  // directive.template = '<div class="tabs tabs-icon-top main-div">		<a class="tab-item div-a" href="#/app/home">			<img class="div-a-img" src="img/home-footer.png" /><p class="footer-icon-title">Home</p>		</a>		<a class="tab-item div-a" href="#/app/order">			<img class="div-a-img" src="img/detail-footer.png" /><p class="footer-icon-title">Orders</p>	 		</a>		<a class="tab-item div-a" href="#/app/cart">				<img class="div-a-img" src="img/cart-2.png" /><p class="footer-icon-title">Cart</p>												<span class="badge badge-assertive ng-binding" style="right: calc(50% - 26px);background-color:#FCC000;text-align: center;padding: 2px;position: fixed;">{{cartcount}}</span>		</a>		<a class="tab-item div-a" href="#/app/CustomerProfile">				<img class="div-a-img" src="img/user.png" /><p class="footer-icon-title">Profile</p>  		</a>  <a class="tab-item div-a" href="#/app/PromocodeDisplay">				<img class="div-a-img" src="img/percentage.png" /><p class="footer-icon-title">Offers</p>  		</a>	</div>';
   
   
    directive.template = '<div class="tabs tabs-icon-top main-div">		<a class="tab-item div-a" href="#/app/mainpage">			<img class="div-a-img" src="img/home-footer.png" /><p class="footer-icon-title">Home</p>		</a>	<a class="tab-item div-a" href="#/app/CustomerProfile">				<img class="div-a-img" src="img/user.png" /><p class="footer-icon-title">Profile</p>  		</a>	 <a class="tab-item div-a" href="#/app/PromocodeDisplay">				<img class="div-a-img" src="img/percentage.png" /><p class="footer-icon-title">Offers</p>  		</a>    <a class="tab-item div-a" href="#/app/cart">				<img class="div-a-img" src="img/cart-2.png" /><p class="footer-icon-title">Cart</p>												<span class="badge badge-assertive ng-binding" style="right: calc(50% - 26px);background-color:#FCC000;text-align: center;padding: 2px;position: fixed;">{{cartcount}}</span>		</a>	    <a class="tab-item div-a" href="#/app/order">			<img class="div-a-img" src="img/detail-footer.png" /><p class="footer-icon-title">Orders</p>	 		</a>			 	</div>';
   
   return directive;
})


.service('count', function(){

    this.count = function() { 
        var cart=[];    
        if(window.localStorage['cart']!='') {
            cart=angular.fromJson(window.localStorage['cart']);
        } 
        if (window.localStorage['cart']=='') {
            window.localStorage['cart'] = cart;
        }
        return cart.length;
    }
	
    
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

   .state('login', {
        url: "/login",
        
        templateUrl: "templates/login.html",
        controller: 'login'
    })
	
	.state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html",
                controller: 'Home'
            }
        }
    })
	.state('app.useraddress', {
        url: "/useraddress",
        views: {
            'menuContent': {
                templateUrl: "templates/useraddress.html",
                controller: 'useraddress'
            }
        }
    })
    
	.state('app.productlist', {
        url: "/productlist",
        views: {
            'menuContent': {
                templateUrl: "templates/productlist.html",
                controller: 'productlist'
            }
        }
    })
    
	.state('app.cart', {
        url: "/cart",
        views: {
            'menuContent': {
                templateUrl: "templates/cart.html",
                controller: 'cart'
            }
        }
    })
	
	
	.state('login_page', {
        url: "/login_page",
				
                templateUrl: "templates/login.html",
                controller: 'login_page'
            
    })
	.state('app.register', {
        url: "/register",
        views: {
            'menuContent': {
                templateUrl: "templates/register.html",
                controller: 'register'
            }
        }
    })
	.state('app.shipping', {
        url: "/shipping",
        views: {
            'menuContent': {
                templateUrl: "templates/shipping.html",
                controller: 'shipping'
            }
        }
    })
	
	
	
	
	
	.state('app.productdetail', {
        url: "/productdetail",
        views: {
            'menuContent': {
                templateUrl: "templates/productdetail.html",
                controller: 'productdetail'
            }
        }
    })
        .state('app.subcatagory', {
            url: "/subcatagory",
            views: {
                'menuContent': {
                    templateUrl: "templates/subcatagory.html",
                    controller: 'subcatagory'
                }
            }
        })
		
		 .state('app.invoice', {
            url: "/invoice",
            views: {
                'menuContent': {
                    templateUrl: "templates/invoice.html",
                    controller: 'invoice'
                }
            }
        })
		
		 .state('app.order', {
            url: "/order",
            views: {
                'menuContent': {
                    templateUrl: "templates/order.html",
                    controller: 'order'
                }
            }
        })
		
		
		
			
		.state('app.CustomerProfile', {
        url: "/CustomerProfile",
        views: {
            'menuContent': {
                templateUrl: "templates/CustomerProfile.html",
                controller: 'CustomerProfile'
            }
        }
    })
	
	.state('app.updateprofile', {
        url: "/updateprofile",
        views: {
            'menuContent': {
                templateUrl: "templates/updateprofile.html",
                controller: 'updateprofile'
            }
        }
    })
	.state('app.changePassword', {
        url: "/changePassword",
        views: {
            'menuContent': {
                templateUrl: "templates/changePassword.html",
                controller: 'changePassword'
            }
        }
    })
	
			.state('app.ForgotPassword', {
            url: "/ForgotPassword",
            views: {
                'menuContent': {
                    templateUrl: "templates/ForgotPassword.html",
                    controller: 'ForgotPassword'
                }
            }
        })
		
	
		.state('app.PromocodeDisplay', {
        url: "/PromocodeDisplay",
        views: {
            'menuContent': {
                templateUrl: "templates/PromocodeDisplay.html",
                controller: 'PromocodeDisplay'
            }
        }
    })
	
		.state('app.AddAppoinment', {
        url: "/AddAppoinment",
        views: {
            'menuContent': {
                templateUrl: "templates/AddAppoinment.html",
                controller: 'AddAppoinment'
            }
        }
    })
		
		
		.state('app.logout', {
            url: "/logout",
            views: {
                'menuContent': {
                    templateUrl: "templates/logout.html",
                    controller: 'logout'
                }
            }
        })
		
		
		.state('app.mainpage', {
        url: "/mainpage",
        views: {
            'menuContent': {
                templateUrl: "templates/mainpage.html",
                controller: 'mainpage'
            }
        }
    })
	
	.state('app.OffersDetails', {
        url: "/OffersDetails",
        views: {
            'menuContent': {
                templateUrl: "templates/OffersDetails.html",
                controller: 'OffersDetails'
            }
        }
    })
	
	
	.state('app.ViewBookTable', {
        url: "/ViewBookTable",
        views: {
            'menuContent': {
                templateUrl: "templates/ViewBookTable.html",
                controller: 'ViewBookTable'
            }
        }
    })
	
	//Get Employee 
	.state('app.AddEmployee', {
        url: "/AddEmployee",
        views: {
            'menuContent': {
                templateUrl: "templates/AddEmployee.html",
                controller: 'AddEmployee'
            }
        }
    })
	
	//Display Employee
	.state('app.DisplayEmployee', {
        url: "/DisplayEmployee",
        views: {
            'menuContent': {
                templateUrl: "templates/DisplayEmployee.html",
                controller: 'DisplayEmployee'
            }
        }
    })
	
	// Expense
	.state('app.AddExpense', {
        url: "/AddExpense",
        views: {
            'menuContent': {
                templateUrl: "templates/AddExpense.html",
                controller: 'AddExpense'
            }
        }
    })
	
	/*Display Expense 
	.state('app.DisplayExpense', {
       url: "/DisplayExpense",
        views: {
           'menuContent': {
             templateUrl: "templates/DisplayExpense.html",
               controller: 'DisplayExpense'
            }
        }
    })*/
	
	//Display ExpenseList 
	.state('app.ExpenseList', {
        url: "/ExpenseList",
        views: {
            'menuContent': {
                templateUrl: "templates/ExpenseList.html",
                controller: 'ExpenseList'
            }
        }
    })
	
    .state('app.getlocation', {
    url: "/getlocation",
        views: {
            'menuContent': {
            templateUrl: "templates/getlocation.html",
            controller: 'getlocation'
            }
        }
    });
	

	
	
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
