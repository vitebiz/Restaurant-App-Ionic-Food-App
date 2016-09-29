(function () {
    'use strict';

angular.module('vitebizFMS', ['ionic','ionic-toast','ngCordova','tabSlideBox'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	  
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider

  // setup an abstract state for the tabs directive
  /*   .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  }) */
	.state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

  // Each tab has its own nav history stack:
	.state('login', {
        url: "/login",
                templateUrl: "templates/login.html",
                controller: 'AppCtrl'
    })
	.state('app.UserSignup', {
		url: "/UserSignup",
			views: {
			'menuContent': {
				templateUrl: "templates/UserSignup.html",
				controller: 'UserSignup'
			}
		}
	})
	 .state('app.UserLogo', {
             url: "/UserLogo",
             views: {
                 'menuContent': {
                 templateUrl: "templates/UserLogo.html",
                 controller: 'UserLogo'
                 }
             }
         })
	 .state('app.currencyCtrl', {
		url: "/currencyCtrl",
		views: {
			'menuContent': {
				templateUrl: "templates/currency.html",
				controller: 'currencyCtrl'
			}
		}
	})
	.state('app.search', {
        url: "/search",
        views: {
            'menuContent': {
                templateUrl: "templates/search.html",
                controller: 'Home'
            }
        }
    })
	.state('app.playlist', {
            url: "/playlist",
            views: {
                'menuContent': {
                    templateUrl: "templates/playlist.html",
                    controller: 'logout'
                }
            }
    })
	.state('app.playlists', {
          url: "/playlists",
          views: {
              'menuContent': {
                  templateUrl: "templates/playlists.html",
                  controller: 'PlaylistsCtrl'
              }
          }
    })
	 .state('app.addnewcustomer', {
        url: "/addnewcustomer",
        views: {
            'menuContent': {
                templateUrl: "templates/addnewcustomer.html",
                controller: 'addnewcustomer'
            }
        }
    })
	 .state('app.browse', {
        url: "/browse",
        views: {
            'menuContent': {
                templateUrl: "templates/browse.html",
                controller: 'dtlcustomer'
            }
        }
    })
	.state('app.EditCustomer', {
        url: "/EditCustomer",
        views: {
            'menuContent': {
                templateUrl: "templates/EditCustomer.html",
                controller: 'dtlEditCustomer'
            }
        }
    })
	.state('app.ShowCategory', {
		    url: "/ShowCategory",
		    views: {
		        'menuContent': {
		            templateUrl: "templates/ShowCategory.html",
		            controller: 'ShowCategory'
		        }
		    }
	})

	.state('app.AddCategory', {
		    url: "/AddCategory",
		    views: {
		        'menuContent': {
		            templateUrl: "templates/AddCategory.html",
		            controller: 'AddCategory'
		        }
		    }
	})
	.state('app.EditCategory', {
		    url: "/EditCategory",
		    views: {
		        'menuContent': {
		            templateUrl: "templates/EditCategory.html",
		            controller: 'EditCategory'
		        }
		    }
	})
	.state('app.ShowProduct', {
        url: "/ShowProduct",
        views: {
            'menuContent': {
                templateUrl: "templates/ShowProduct.html",
                controller: 'ShowProduct'
            }
        }
    })
	.state('app.addProducts', {
        url: "/addProducts",
        views: {
            'menuContent': {
                templateUrl: "templates/addProducts.html",
                controller: 'addProducts'
            }
        }
    })
	.state('app.productquotationlist', {
		url: "/productquotationlist",
		views: {
		    'menuContent': {
		        templateUrl: "templates/productquotationlist.html",
		        controller: 'productquotationlist'
		    }
		}
	})
	.state('app.productquotation', {
            url: "/productquotation",
            views: {
                'menuContent': {
                    templateUrl: "templates/productquotation.html",
                    controller: 'productquotationCtrl'
                }
            }
    })
	.state('app.productInvoiceslist', {
		    url: "/productInvoiceslist",
		    views: {
		        'menuContent': {
		            templateUrl: "templates/productInvoiceslist.html",
		            controller: 'productInvoiceslist'
		        }
		    }
	})
	.state('app.TakePaymentCustomerList', {
	    url: "/TakePaymentCustomerList",
	    views: {
	        'menuContent': {
	            templateUrl: "templates/TakePaymentCustomerList.html",
	            controller: 'TakePaymentCustomerList'
	        }
	    }
	})
	.state('app.TakePaymentInvoicedetail', {
	url: "/TakePaymentInvoicedetail",
	    views: {
	        'menuContent': {
	        templateUrl: "templates/TakePaymentInvoicedetail.html",
	        controller: 'TakePaymentInvoicedetail'
	        }
	    }
	})
	
	.state('app.TakePayment', {
	 url: "/TakePayment",
	    views: {
	        'menuContent': {
	        templateUrl: "templates/TakePayment.html",
	        controller: 'TakePayment'
	        }
	    }
	})
	.state('app.CreateCustomerReturn', {
	    url: "/CreateCustomerReturn",
	    views: {
	        'menuContent': {
	            templateUrl: "templates/CreateCustomerReturn.html",
	            controller: 'CreateCustomerReturn'
	        }
	    }
	})
	.state('app.EditProduct', {
        url: "/EditProduct",
        views: {
            'menuContent': {
                templateUrl: "templates/EditProduct.html",
                controller: 'EditProduct'
            }
        }
    })
	
	.state('app.ProductDetails', {
        url: "/ProductDetails",
        views: {
            'menuContent': {
                templateUrl: "templates/ProductDetails.html",
                controller: 'ProductDetails'
            }
        }
    })
	.state('app.productpurchasequotationdetail', {
		    url: "/productpurchasequotationdetail",
		    views: {
		        'menuContent': {
		            templateUrl: "templates/productpurchasequotationdetail.html",
		            controller: 'productpurchasequotationdetail'

		        }
		    }
	})
	.state('app.EditQutation', {
		url: "/EditQutation",
		views: {
			'menuContent': {
				templateUrl: "templates/EditQutation.html",
				controller: 'EditQutationDetails'
			}
		}
	})
	.state('app.productInvoice', {
            url: "/productInvoice",
            views: {
                'menuContent': {
                    templateUrl: "templates/productInvoice.html",
                    controller: 'productInvoice'
                }
            }
    })
	.state('app.productpurchaseInvoicedetail', {
		    url: "/productpurchaseInvoicedetail",
		    views: {
		        'menuContent': {
		            templateUrl: "templates/productpurchaseInvoicedetail.html",
		            controller: 'productpurchaseInvoicedetail'

		        }
		    }
	})
		.state('app.EditInvoice', {
		    url: "/EditInvoice",
		    views: {
		        'menuContent': {
		            templateUrl: "templates/EditInvoice.html",
		            controller: 'EditInvoice'
		        }
		    }
	})
	.state('app.AddTax', {
		    url: "/AddTax",
		    views: {
		        'menuContent': {
		            templateUrl: "templates/AddTax.html",
		            controller: 'AddTax'
		        }
		    }
	})
	
	.state('app.ViewTax', {
		    url: "/ViewTax",
		    views: {
		        'menuContent': {
		            templateUrl: "templates/ViewTax.html",
		            controller: 'ViewTax'
		        }
		    }
	})
	
	.state('app.EditTax', {
		    url: "/EditTax",
		    views: {
		        'menuContent': {
		            templateUrl: "templates/EditTax.html",
		            controller: 'EditTax'
		        }
		    }
	})
	.state('app.InvoiceDashboard', {
		    url: "/InvoiceDashboard",
		    views: {
		        'menuContent': {
		            templateUrl: "templates/InvoiceDashboard.html",
		            controller: 'InvoiceDashboard'
		        }
		    }
	})
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
}());