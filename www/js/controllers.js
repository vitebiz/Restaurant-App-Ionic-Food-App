angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http) {
    // Form data for the login modal
	if(Boolean(window.localStorage['store']) == true){
		var dataLogo = JSON.parse(window.localStorage['store']);
		$scope.Logo= dataLogo.cLogo;
		//console.log(dataLogo.cLogo);
		$scope.imgpath = window.localStorage['imgpath'];
		$scope.homeHeader = "<img width='10%' class='header-align' src='"+$scope.imgpath+dataLogo.cLogo+"' alt='Logo'>";
	}
	
	if(window.localStorage['cart'] == null) {
		window.localStorage['cart']="";
	}
	
})

.controller('logout', function ($scope, $http) {

	//window.localStorage.clear();
	window.localStorage.removeItem('CustomerEmailId');
    window.localStorage.removeItem('LoginId');
	window.localStorage.removeItem('UserName');
	window.localStorage.removeItem('nCustomerId');
	
	
	window.location = "#/login";

})

.controller('first', function ($scope, $http) {

    $timeout( function(){ window.location = "#/app/home"; }, 3000);
  
})

.controller('useraddress', function ($scope, $http,$location,$ionicLoading,ionicToast) {

    $scope.address=true; 
  	
  	$scope.addshow=function(){
		$scope.show=false; 
		$scope.address=true; 	
	}
	$scope.otheraddshow=function(){
		$scope.show=true; 
		$scope.address=false; 
	}
})

.controller('login', function ($scope, $http,$location,$ionicLoading,ionicToast) {
	
	
	//if(Boolean(window.localStorage['CustomerId']))
		
	window.localStorage['UserId']=4;
	window.localStorage['path']="http://www.vite.biz/fms/webservices/";
	window.localStorage['imgpath']="http://www.vite.biz/FMS/";
	
	var path = window.localStorage['path'];
	var UserId = window.localStorage['UserId'];
	
	$scope.imgpath = window.localStorage['imgpath'];
	
	if(Boolean(window.localStorage['nCustomerId']) == true){
		window.location ="#/app/mainpage";
	}
	
	$ionicLoading.show({
		content: 'Loading..',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 0,
		showDelay: 0
	});
	
	var UserLogo = path+"Login.asmx/UserInformation?nUserId="+UserId;
	
	$http.get(UserLogo).then(function (respUser) {
	
		$scope.Logo= respUser.data[0].cLogo;
		$scope.cStoreName= respUser.data[0].cStoreName;
		$scope.cCurrency= respUser.data[0].cCurrency;
	    window.localStorage['StoreName']=$scope.cStoreName;
		window.localStorage['store'] = JSON.stringify(respUser.data[0]);
		$ionicLoading.hide();
		
	}, function (err) {
		console.error('ERR', err);
		$ionicLoading.hide();
	})
	
	$scope.login = {};
	
	$scope.loginUser = function() {
		
		var email = $scope.login.email;
        var pass = $scope.login.pass;
		
		if(Boolean(email) == true && Boolean(pass) == true){
			
			$ionicLoading.show({
				content: 'Loading..',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 0,
				showDelay: 0
			});
			
			var loginurl = path+"Login.asmx/LogIn_User?cUserName=" + email + "&cPassword=" + pass+"&UserId="+UserId;
			
			$http.get(loginurl).then(function (resp) {
				//console.log(resp);
				$ionicLoading.hide();
				
				if(resp['data'][0]['Success'] == '0'){
					
					ionicToast.show('Please enter valid username and password', 'middle', false, 2500);
					$ionicLoading.hide();
					
				} else {
					
					ionicToast.show('Welcome', 'middle', false, 2500);
					window.localStorage['nCustomerId'] = resp.data[0].nCustomerId;	
					var nCustomerId = resp.data[0].nCustomerId;
					//alert(nCustomerId);
					$ionicLoading.hide();
					
					var cartUser = path+"Cart.asmx/SelectAllCartProductByCustomer?intUserId=" + UserId+"&nCustomerId="+nCustomerId;
					
					$http.get(cartUser).then(function (respCart) {
					
						$ionicLoading.hide();
						
					}, function (err) {
						console.error('ERR', err);
						$ionicLoading.hide();
					})
					
					window.location = "#/app/mainpage";
				}
				
			}, function (err) {
				console.error('ERR', err);
				$ionicLoading.hide();
			})
		} else {
			ionicToast.show('Please enter email and password', 'middle', false, 2500);
		}
	}
	
})

.controller('mainpage', function ($scope, $http,$location,$ionicLoading,ionicToast,count) {

    var path = window.localStorage['path'];
	var UserId = window.localStorage['UserId'];
	$scope.imgpath = window.localStorage['imgpath'];
	
    var BackGroundImageurl = path+"slider.asmx/SelectAllSlider?UserId=" + UserId;
	
	$ionicLoading.show({
		content: 'Loading..',
		animation: 'fade-in',
		showBackdrop: false,
		maxWidth: 0,
		showDelay: 0
	});
	
    $http.get(BackGroundImageurl).then(function (resp) {
        
        $scope.SliderImage = resp.data;
		//window.localStorage['categories'] = JSON.stringify(resp.data);
		$ionicLoading.hide();
		
    }, function (err) {
        console.error('ERR', err);
		$ionicLoading.hide();
    })
})

.controller('Home', function ($scope, $http,$location,$ionicLoading,ionicToast,count) {
	
	$scope.count=count.count();
	
	$scope.goToCart = function(){
		window.location="#/app/cart";
	}	
	
	var path = window.localStorage['path'];
	var UserId = window.localStorage['UserId'];
	$scope.imgpath = window.localStorage['imgpath'];
	
	var Categoryurl = path+"Category.asmx/SelectAllCategory?UserId=" + UserId;
	
	$ionicLoading.show({
		content: 'Loading..',
		animation: 'fade-in',
		showBackdrop: false,
		maxWidth: 0,
		showDelay: 0
	});
	
    $http.get(Categoryurl).then(function (resp) {
        
        $scope.categories = resp.data;
		window.localStorage['categories'] = JSON.stringify(resp.data);
		$ionicLoading.hide();
		
    }, function (err) {
        console.error('ERR', err);
		$ionicLoading.hide();
    })
})

.controller('subcatagory', function ($scope, $http,$location,$ionicLoading,ionicToast,count) {	

    $scope.count=count.count();
	var path = window.localStorage['path'];
	var UserId = window.localStorage['UserId'];
	$scope.imgpath = window.localStorage['imgpath'];
	
	$scope.goToCart = function(){
		window.location="#/app/cart";
	}
	
	var catId = $location.search().categoryId;

	if(catId==null) {
		catId=window.localStorage['categoryId'];
	} else {
		window.localStorage['categoryId']=catId;
	}
	
	var categoryData = JSON.parse(window.localStorage['categories']);
	
	for(var catLoop=0; catLoop<categoryData.length; catLoop++){
		//console.log(categoryData[catLoop]);
		if(catId == categoryData[catLoop].intCategoryId){
			$scope.category = categoryData[catLoop];
		}
	}
	
	var subCategory = path+"Category.asmx/SelectAllCategoryforParentId?UserId="  + UserId + "&nParentId=" + catId;
	
	$http.get(subCategory).then(function (subCatResp) {
        
        $scope.subCategories = subCatResp.data;
		window.localStorage['subCategories']=JSON.stringify(subCatResp.data);
		//console.log(subCatResp);	
		if(subCatResp['data'][0]['Success'] == '0'){
			
			$ionicLoading.show({
				content: 'Loading..',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 0,
				showDelay: 0
			}); 
			
			var getProducts = path+"Product.asmx/SelectAllProductByCategory?nUserId="+ UserId + "&nCategoryId=" + catId;
				
				$http.get(getProducts).then(function (productResponse) {
					
					if(productResponse.data[0]['Success'] != 0){
						$ionicLoading.hide();
						window.location = "#/app/productlist?id=" + catId;
					} else {
						$scope.notFound = true;
					} 										
				}, function (err) {
					console.error('ERR', err);
					$ionicLoading.hide();
				})
		}
		$ionicLoading.hide();
		
    }, function (err) {
        console.error('ERR', err);
		$ionicLoading.hide();
    })
})


.controller('productlist', function ($scope, $http,$location,$ionicLoading,ionicToast,count) {
	
	$scope.count=count.count();
	if(window.localStorage['sizes'] != ''){
		localStorage.removeItem("sizes");
	} 	
	
	if(window.localStorage['types'] != ''){
		localStorage.removeItem("types");
	}
	
	if(window.localStorage['colors'] != ''){
		localStorage.removeItem("colors");
	} 
		
	if(window.localStorage['foodtypes'] != ''){
		localStorage.removeItem("foodtypes");
	}
	
	if(window.localStorage['Vegetarian '] != ''){
		localStorage.removeItem("Vegetarian ");
	}
	
	if(window.localStorage['Toppings'] != ''){
		localStorage.removeItem("Toppings");
	}
	
	if(window.localStorage['Alcohol'] != ''){
		localStorage.removeItem("Alcohol");
	}
	
	$scope.goToCart = function(){
		window.location="#/app/cart";
	}
	
	$scope.clearBack = function() {
		window.history.back();
	}
	var path = window.localStorage['path'];
	var UserId = window.localStorage['UserId'];
	$scope.imgpath = window.localStorage['imgpath'];
	
	var id = $location.search().id;

	if(id==null) {
		id=window.localStorage['categoryId'];
	} else {
		window.localStorage['categoryId']=id;
	}
	
	var subCatData = JSON.parse(window.localStorage['subCategories']);
	//console.log(subCatData);
	if(subCatData[0]['Success'] != '0') {
		
		for(var subcatLoop=0; subcatLoop<subCatData.length; subcatLoop++){
			
			if(id == subCatData[subcatLoop].intCategoryId){
				$scope.subcategory = subCatData[subcatLoop];
				console.log($scope.subcategory);
				break;
			}
		}
		
	} else {
		
		var categoryData = JSON.parse(window.localStorage['categories']);
	
		for(var catLoop=0; catLoop<categoryData.length; catLoop++){
			//console.log(categoryData[catLoop]);
			if(id == categoryData[catLoop].intCategoryId){
				$scope.subcategory = categoryData[catLoop];
				//console.log($scope.subcategory);
				break;
			}
		}
		
	}
	//alert(id);
	var getProducts = path+"Product.asmx/SelectAllProductByCategory?nUserId="+ UserId + "&nCategoryId=" + id;
		
		$http.get(getProducts).then(function (resp) {
		
			//console.log(resp);
			if(resp.data[0]['Success'] == 0){
				
				$scope.notFound = true;
				
			}else{
				$scope.SubProductList = resp.data;	
			}
			$ionicLoading.hide();
			
		}, function (err) {
			console.error('ERR', err);
		})
})

.controller('productdetail', function ($scope, $http,$location,$ionicLoading,ionicToast,count) {
	
	$scope.count=count.count();
	var path = window.localStorage['path'];
	var UserId = window.localStorage['UserId'];
	$scope.imgpath = window.localStorage['imgpath'];
	
	$scope.goToCart = function(){
		window.location="#/app/cart";
	}
	
	var id = $location.search().productId;

	if(id==null) {
		id=window.localStorage['productId'];
	} else {
		window.localStorage['productId']=id;
	}
	
	var ProductDetailurl = path+"Product.asmx/SelectRow?nProductId=" + id + "&UserId=" + UserId;
	
	$http.get(ProductDetailurl).then(function (resp) {
		
		var mainproduct = resp;
		
        $scope.ProductData = resp.data[0];
		
		//console.log($scope.ProductData);
		
		$scope.address = false;
			$scope.addshow = function () {
				$scope.address = $scope.address ? false : true;
		}
		
		//main product attributes display as selected
		
		//plus show all other attributes of GetAllAttributeChildProduct
		
		//on change in GetAllAttributeChildProduct value -> change main product to that attribute product
		
		//Code for All Attribute Select
		
		//var id=resp.data[0].nProductId;
		var ProductDetailurl = path+"Product.asmx/SelectAllChildProduct?UserId=" + UserId + "&ProductId=" + id;
		$http.get(ProductDetailurl).then(function (resp) {
			
			$scope.ChildProductData=resp.data;
			
			/*Bind size dropdown*/
			var ProductDetailurl = path+"Product.asmx/GetAllAttributeChildProduct?UserId=" + UserId + "&ProductId=" + id;
			$http.get(ProductDetailurl).then(function (resp) {
				
				var attributes = resp;
				
				if(mainproduct.data[0].Attribute != '') {
					//condition for attributes
					
					
					if(attributes.data[0].Success != '0') {
						//attributes list
						
						var attributelength = attributes.data.length;
						
						for(var attributenameloop = 0; attributenameloop< attributelength; attributenameloop++){
							console.log(attributes.data[attributenameloop].cAttributeName);
							
							var attributename = attributes.data[attributenameloop].cAttributeName;
							
							if(attributename == 'Size'){
								$scope.size = true;
								
								if(Boolean(window.localStorage['sizes']) == true){
									$scope.sizes=JSON.parse(window.localStorage['sizes']);
								} else {
									$scope.sizes = attributes.data[attributenameloop].Value[0];
									window.localStorage['sizes'] = JSON.stringify($scope.sizes);
								}
							}
							
							if(attributename == 'Type'){
								$scope.type = true;
								
								if(Boolean(window.localStorage['types']) == true){
									$scope.types=JSON.parse(window.localStorage['types']);
								} else {
									$scope.types = attributes.data[attributenameloop].Value[0];
									window.localStorage['types'] = JSON.stringify($scope.types);
								}
							}
							
							if(attributename == 'Color'){
								$scope.color = true;
								
								if(Boolean(window.localStorage['colors']) == true){
									$scope.colors=JSON.parse(window.localStorage['colors']);
								} else {
									$scope.colors = attributes.data[attributenameloop].Value[0];
									window.localStorage['colors'] = JSON.stringify($scope.colors);
								}
							}
							
							if(attributename == 'Food Type'){
								$scope.foodtype = true;
								
								if(Boolean(window.localStorage['foodtypes']) == true){
									$scope.foodtypes=JSON.parse(window.localStorage['foodtypes']);
								} else {
									$scope.foodtypes = attributes.data[attributenameloop].Value[0];
									window.localStorage['foodtypes'] = JSON.stringify($scope.foodtypes);
								}
							}
							
							if(attributename == 'Food Type'){
								$scope.foodtype = true;
								
								if(Boolean(window.localStorage['foodtypes']) == true){
									$scope.foodtypes=JSON.parse(window.localStorage['foodtypes']);
								} else {
									$scope.foodtypes = attributes.data[attributenameloop].Value[0];
									window.localStorage['foodtypes'] = JSON.stringify($scope.foodtypes);
								}
							}
							
							if(attributename == 'Vegetarian '){
								$scope.foodtype = true;
								
								if(Boolean(window.localStorage['Vegetarian']) == true){
									$scope.vegetarian=JSON.parse(window.localStorage['Vegetarian']);
								} else {
									$scope.vegetarian = attributes.data[attributenameloop].Value[0];
									window.localStorage['Vegetarian'] = JSON.stringify($scope.vegetarian);
								}
							}
							
							if(attributename == 'Toppings'){
								$scope.Toppings = true;
								
								if(Boolean(window.localStorage['Toppings']) == true){
									$scope.Toppings=JSON.parse(window.localStorage['Toppings']);
								} else {
									$scope.Toppings = attributes.data[attributenameloop].Value[0];
									window.localStorage['Toppings'] = JSON.stringify($scope.Toppings);
								}
							}
							
							if(attributename == 'Alcohol'){
								$scope.Alcohol = true;
								
								if(Boolean(window.localStorage['Alcohol']) == true){
									$scope.Alcohol=JSON.parse(window.localStorage['Alcohol']);
								} else {
									$scope.Alcohol = attributes.data[attributenameloop].Value[0];
									window.localStorage['Alcohol'] = JSON.stringify($scope.Alcohol);
								}
							}							
						}						
						
					} else {	//product attributes
						//no attributes
						console.log(attributes.data[0].Success);
						
					}				
					
				} else {	//main product
					//no attributes
					
				}
				
				$scope.object = {};
				
				$scope.object.setDefault=id;
				
				var ProductImageurl = path+"Product.asmx/GetAllImage?UserId="+ UserId + "&ProductId=" + id;
				$http.get(ProductImageurl).then(function (resp) {
				$scope.ProductImageList = resp.data;
				
				window.localStorage['ProductImageList'] = JSON.stringify(resp.data);
				$ionicLoading.hide();
				}, function (err) {
				console.error('ERR', err);
					ionicToast.show('no Products', 'middle', false, 2500);
			
				})	
			}, function (err) {
				console.error('ERR', err);
				// err.status will contain the status code
			})
		}, function (err) {
        console.error('ERR', err);
      
		})
		//Code over For Attribute 
		
	//ng-change size
	$scope.sizeproduct = function(id) {
		
		window.location = "#/app/productdetail?productId="+id;
		window.location.reload();
		
	}
	
	$scope.typeproduct = function(id) {
		window.location = "#/app/productdetail?productId="+id;
		window.location.reload();
		
	}
	$scope.foodtypeproduct = function(id) {
		window.location = "#/app/productdetail?productId="+id;
		window.location.reload();
		
	}
	$scope.vegetarianproduct = function(id) {
		window.location = "#/app/productdetail?productId="+id;
		window.location.reload();
		
	}
	
	$scope.Alcoholproduct = function(id) {
		window.location = "#/app/productdetail?productId="+id;
		window.location.reload();
		
	}

	
	/*Add product to cart start*/
	
	
	if(Boolean(window.localStorage['cart']) == true && window.localStorage['cart'] != '[]') {
		var cart=angular.fromJson(window.localStorage['cart']);
	} else {
		var cart = [];
	}
	    $scope.addToCart=function(){
	
		 var product=$scope.ProductData;

		 $scope.productId=product['nProductId'];
	
		 if(cart!=null){ 
		     for (i=0;i<cart.length;i++)
			    if (cart[i]['nProductId'] == $scope.productId) cart.splice(i,1);
		 }
		cart.push(product);
		
		 localStorage.setItem('cart',angular.toJson(cart));
		 
		 
		 	//Add To Database


        var Pid=window.localStorage['productId'];
	    // alert(Pid);
		var intProductId=Pid;
		var strRemarks1="";
		var strRemarks2="";
		var strRemarks3="";
		
		var intCustomerId=window.localStorage['nCustomerId'];
		var todaydate=new Date();
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
			dd='0'+dd
		} 
		if(mm<10){
			mm='0'+mm
		} 
		var today = mm+'/'+dd+'/'+yyyy;
  var UserId = window.localStorage['UserId'];
		var dtCartDate=today;
		var intUserId=UserId;
		var IsActive=true;
		var IsDisable=true;
		var CustomerImage="";
		
		
		//alert("abc");
		
		$http({
			method: 'POST',
			url:path+'Cart.asmx/CreateCart',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: function (obj) {
				var str = [];
				for (var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data: {
					intProductId: intProductId, 
					intCustomerId: intCustomerId, 
					intUserId:intUserId, 
					dtCartDate:dtCartDate, 
					IsActive:IsActive,
					IsDisable: IsDisable, 
					strRemarks1:strRemarks1,
					strRemarks2: strRemarks2, 
					strRemarks3: strRemarks3,
					
				}
		}).success(function (response) {
			
			//console.log(response.Success);
			if(response.Success == 0) {
				//alert("abc");
				//ionicToast.show('Email Already Exists', 'middle', false, 2500);
				//$ionicLoading.hide();
				
			} else {
				
				 ionicToast.show('Added to cart', 'middle', false, 2500);
				 window.location="#/app/cart";
			}	
		})
		 }
	
	 $scope.buyNow=function(){
	
		 var product=$scope.ProductData;

		$scope.productId=product['nProductId'];
		 if(cart!=null){ 
		     for (i=0;i<cart.length;i++)
			    if (cart[i]['nProductId'] == $scope.productId) cart.splice(i,1);
		}
		 cart.push(product);
		 		
		 localStorage.setItem('cart',angular.toJson(cart));
		 		 
//Add To Database


        var Pid=window.localStorage['productId'];
	    // alert(Pid);
		var intProductId=Pid;		
		var strRemarks1="";
		var strRemarks2="";
		var strRemarks3="";
		
		var intCustomerId=window.localStorage['nCustomerId'];
		var todaydate=new Date();
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
			dd='0'+dd
		} 
		if(mm<10){
			mm='0'+mm
		} 
		var today = mm+'/'+dd+'/'+yyyy;
    var UserId = window.localStorage['UserId'];
		var dtCartDate=today;
		var intUserId=UserId;
		var IsActive=true;
		var IsDisable=true;
		var CustomerImage="";
				
		//alert("abc");
		
		$http({
			method: 'POST',
			url:path+'Cart.asmx/CreateCart',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: function (obj) {
				var str = [];
				for (var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data: {
					intProductId: intProductId, 
					intCustomerId: intCustomerId, 
					intUserId:intUserId, 
					dtCartDate:dtCartDate, 
					IsActive:IsActive,
					IsDisable: IsDisable, 
					strRemarks1:strRemarks1,
					strRemarks2: strRemarks2, 
					strRemarks3: strRemarks3,
					
				}
		}).success(function (response) {	
			//console.log(response.Success);
			if(response.Success == 0) {
				
			} else {
				
				 ionicToast.show('Added to cart', 'middle', false, 2500);		       
			    window.location="#/app/cart";				
			}	
		})
	 }
		
	 }, function (err) {
         console.error('ERR', err);
       
     })
	 
	 
	 
	 //Display Reating
	 var nUserId = window.localStorage['UserId'];
	 var nTypeId=$location.search().productId;
	 var cRemarks1='Good';
	 	var DisplayRatingGoodurl = path+"Reviews.asmx/SelectDataForCountReview?nUserId="+ nUserId+ "&nTypeId="+nTypeId+ "&cRemarks1="+cRemarks1;
		
		$http.get(DisplayRatingGoodurl).then(function (resp) {
		
		  $scope.Rate=resp.data[0].Success;
		  var res=$scope.Rate;
		  if(res==0)
		  {
			   $scope.GoodRate =0;
		  }
		  else
		  {
			   $scope.GoodRate = resp.data.length;
		  }
		 
		 
		 
       
		
		$ionicLoading.hide();
		}, function (err) {
			console.error('ERR', err);
			
		})
		
		 var cRemarks1='Average';
		var DisplayRatingAverageurl = path+"Reviews.asmx/SelectDataForCountReview?nUserId="+ nUserId+ "&nTypeId="+nTypeId+ "&cRemarks1="+cRemarks1;
		
		$http.get(DisplayRatingAverageurl).then(function (resp1) {
		
		 
		 
		  $scope.Rate=resp1.data[0].Success;
		  var res=$scope.Rate;
		  if(res==0)
		  {
			   $scope.AverageRate =0;
		  }
		  else
		  {
			   $scope.AverageRate = resp1.data.length;
		  }
		
		$ionicLoading.hide();
		}, function (err) {
			console.error('ERR', err);
			
		})
		
		
		 var cRemarks1='poor';
		var DisplayRatingpoorurl = path+"Reviews.asmx/SelectDataForCountReview?nUserId="+ nUserId+ "&nTypeId="+nTypeId+ "&cRemarks1="+cRemarks1;
		
		$http.get(DisplayRatingpoorurl).then(function (resp2) {
		
		
		   $scope.Rate=resp2.data[0].Success;
		  var res=$scope.Rate;
		  if(res==0)
		  {
			   $scope.poorRate =0;
		  }
		  else
		  {
			    $scope.poorRate = resp2.data.length;
		  }
       
		
		$ionicLoading.hide();
		}, function (err) {
			console.error('ERR', err);
			
		})
	 
	 
	 //end
	 
	 // For Add Review
	 
	 $scope.Review={};
		 $scope.showpopupForReview = function () {   
    
								$scope.popupReview=true;
								
								$scope.AddGood=function(Good)
								{
									var Rate='Good';
									//alert(Rate);
									window.localStorage['Rate']=Rate;
								}
								
								$scope.addAvg=function(Average)
								{
									var Rate='Average';
									//alert(Rate);
									window.localStorage['Rate']=Rate;
								}
								
								$scope.AddPoor=function(Poor)
								{
									var Rate='Poor';
									//alert(Rate);
									window.localStorage['Rate']=Rate;
								}
								
								$scope.AddReview=function(){
								
							var nTypeId=$location.search().productId;
							var nCustomerId=window.localStorage['nCustomerId'];
							var nUserId = window.localStorage['UserId'];
							var cReview=$scope.Review.txtReview;
							var cReviewFor='Product';
							
							  var today = new Date();
								var dd = today.getDate();
								var mm = today.getMonth()+1; //January is 0!

								var yyyy = today.getFullYear();
								if(dd<10){
									dd='0'+dd
								} 
								if(mm<10){
									mm='0'+mm
								} 
								var today = yyyy+'/'+mm+'/'+dd;  
							
							
							var dtDate=today;
							var nLanguageId=1;
							var cRemarks1='';
							var cRemarks2='';
							var cRemarks3='';
							var cRemarks4='';
							var IsActive=true;
							
							
							                $http({
                                                method: 'POST',
                                                url: path+'Reviews.asmx/InsertReview',
                                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                transformRequest: function (obj) {
                                                    var str = [];
                                                    for (var p in obj)
                                                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                                    return str.join("&");
                                                },
                                                data: { 
												nCustomerId: nCustomerId, 
												nTypeId: nTypeId,
												nUserId: nUserId,
												cReview:cReview,
												cReviewFor:cReviewFor,
												IsActive:IsActive,
												IsDisable:false,
												dtDate:dtDate,
												nLanguageId:nLanguageId,
												cRemarks1:window.localStorage['Rate'],
												cRemarks2:cRemarks2,
												cRemarks3:cRemarks3,
												cRemarks4:cRemarks4
											
												
												}
                                            }).success(function (response) {

                                            });
									$scope.popupReview=false;
									window.localStorage['Rate']='';
									$scope.Review.txtReview='';
									
									
									
						}
						
						window.location = "#/app/productdetail?productId="+nTypeId;		
		 }
	 
	 
			 $scope.closepopupReview= function () { 
				
			
						$scope.popupReview=false;
						window.localStorage['Rate']='';
						$scope.Review.txtReview='';
						
					  
					}
	 //End
})
	
.controller('cart', function ($scope, $http,$location,$ionicLoading,ionicToast,count) {
	
	$scope.count=count.count();
	
	if(window.localStorage['cart']=='' || window.localStorage['cart']=='[]' || window.localStorage['cart']==undefined || $scope.count== '0') {
		
		$scope.nullCart = true;
		$scope.cart = false;
	    $scope.nullCartcashback=false;
		$scope.nullCartTotal=false;
		$scope.nullCartcashbackMsg=false;
		$scope.nullCartForDiscount=false;
		$scope.nullCartforFinalTotal=false;
		$scope.Promo=false;
		$scope.cart1=false;		
	}
	
	var path = window.localStorage['path'];
	var UserId = window.localStorage['UserId'];
	$scope.imgpath = window.localStorage['imgpath'];
	$scope.shipping = 10;
	
	if(Boolean(window.localStorage['cart'])==true){
			var cart=angular.fromJson(window.localStorage['cart']);
	}
	
	$scope.cart=true;
	
	if(window.localStorage['cart']=='' || window.localStorage['cart']=='[]' || window.localStorage['cart']==undefined || $scope.count== '0') {
		$scope.nullCart = true;
		$scope.cart = false;
	}
	
	$scope.cartProducts={};
	
	if(window.localStorage['cart']!='' && window.localStorage['cart'] != '[]' && $scope.count != '0') {
		
		var intCustomerId=window.localStorage['nCustomerId'];
		
		cart=angular.fromJson(window.localStorage['cart']);
		
		$scope.nullCart = false;
		$scope.CartInfo = true;
		
		$scope.shipping = 10;
		$scope.data=window.localStorage['cart'];
	
		
		$scope.cartProducts = {
			items: [{
			
				nQuantity: 1,
				fPrice: cart[0]['fPrice'],
				attribute:cart[0]['Attribute'],
				nProductId:cart[0]['nProductId'],
				cName: cart[0]['cName'],
				cProductImage: cart[0]['cImage']
				
				//quantity=angular.fromJson(window.localStorage['quantity']);
			}],
		};
		
		//console.log(cart);
		
		var Quantity=0;
		
		for(var productInCart=1; productInCart<cart.length; productInCart++) {
		    
			$scope.cartProducts.items.push({	
				nQuantity: 1,
				fPrice: cart[productInCart]['fPrice'],
				attribute:cart[productInCart]['Attribute'],
				nProductId: cart[productInCart]['nProductId'],
				//cValue: cart[productInCart][0]['Attribute'][1]['cValue'],
				cName: cart[productInCart]['cName'],
				cProductImage: cart[productInCart]['cImage']
			});
		} 
	}

	
    $scope.total = function() {
			
			var total = 0;
			var qtyabc = [];
			
			angular.forEach($scope.cartProducts.items, function(item) {

				total += item.nQuantity * item.fPrice;
				
				var abc = item.nQuantity;
				
				qtyabc.push(abc);

				var quantity=JSON.stringify(qtyabc);

			   window.localStorage['quantity']=quantity;
               window.localStorage['total']=total;
			   
			})
			
		      cartSubTotal= total + $scope.shipping;
			  window.localStorage['cartSubTotal']=cartSubTotal;
			
			return cartSubTotal;
		}
		
    /* code to Apply cuoponCode*/
	$scope.CouponcodeCalculation=function() 
	{
		var coupcode=$scope.CouponcodeCalculation.Couponcode;
		var nUserId = window.localStorage['UserId'];
	    var intCustomerId=window.localStorage['nCustomerId'];
		var CustomerurlCouponcodeForValidOrNot = path+"Offer.asmx/CheckCouponCodeIsValidOrNot?intUserId="+nUserId+"&cCouponCode="+coupcode+"&nCustomerId="+intCustomerId;	
		//var CustomerurlCouponcodeForValidOrNot ="http://localhost:3038/ECP/WebServices/Offer.asmx/CheckCouponCodeIsValidOrNot?intUserId="+nUserId+"&cCouponCode="+coupcode+"&nCustomerId="+intCustomerId;	
		
		$http.get(CustomerurlCouponcodeForValidOrNot).then(function (resp1) 
		{
			if(resp1['data'][0]['Success'] != '0')
			{
				 /*date code*/
				var todaydate=new Date();
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!

				var yyyy = today.getFullYear();
				if(dd<10){
					dd='0'+dd
				} 
				if(mm<10){
					mm='0'+mm
				} 
				var today = mm+'/'+dd+'/'+yyyy;
					
					
				if(coupcode!=0)
			    {
				    //var IsCouponCodeBetweenTwoDate ="http://localhost:3038/ECP/WebServices/Offer.asmx/SelectCouponCodeIsValidOrNotBetweenTwoDate?cCouponCode="+coupcode+"&dtdate="+ today+"&nUserId="+nUserId;
					var IsCouponCodeBetweenTwoDate = path+"Offer.asmx/SelectCouponCodeIsValidOrNotBetweenTwoDate?cCouponCode="+coupcode+"&dtdate="+ today+"&nUserId="+nUserId;
				
				
				    $http.get(IsCouponCodeBetweenTwoDate).then(function (resp)
				    {
							if(resp['data'][0]['Success'] != '0')
						{
						
							var strOfferValid="No";
							var fTotalProductAmount=0;
							var	ftotaltemp=0;
							var cartSubTotal = window.localStorage['cartSubTotal'];
							
							// var nOfferId=resp.data[0].nOfferId;
							
							// window.localStorage['nOfferId']=nOfferId;
							var OfferId=resp.data[0].nOfferId;
					 
					        window.localStorage['OfferId']=OfferId;
							
							var cOfferName=resp.data[0].cOfferName;
							var cAppliedOn=resp.data[0].cAppliedOn;
							var nAppliedItemId=resp.data[0].nAppliedItemId;
							var cTypeOfDiscount=resp.data[0].cTypeOfDiscount;
							var IsPublic=resp.data[0].IsPublic;
							var cCouponCode=resp.data[0].cCouponCode;
							var IsCashBack=resp.data[0].IsCashBack;
							
							 window.localStorage['IsCashBack']=IsCashBack;
							
							var nCashBackPercentageOnTotal=resp.data[0].nCashBackPercentageOnTotal;
							var fFixAmount=resp.data[0].fFixAmount;
							var fPercentage=resp.data[0].fPercentage;
							var dtValidFrom=resp.data[0].dtValidFrom;
							var dtValitTo=resp.data[0].dtValitTo;
							var nCustomerType=resp.data[0].nCustomerType;
							var fCashBackAmountGiven=resp.data[0].fCashBackAmountGiven;
							var fMinTotalCashBack=resp.data[0].fMinTotalCashBack;
							var fMaxTotalCashBack=resp.data[0].fMaxTotalCashBack;
							var fMaxDiscountAmount=resp.data[0].fMaxDiscountAmount;
							var nUserId=resp.data[0].nUserId;
							var IsActive=resp.data[0].IsActive;
							var nCustomerId=resp.data[0].nCustomerId;
							var nRepeat=resp.data[0].nRepeat;
							
						
							
							if (IsCashBack == true)
					        {
								var nCashBackPercentageOnTotal=resp.data[0].nCashBackPercentageOnTotal;
								var fMinTotalCashBack=resp.data[0].fMinTotalCashBack;
								var fMaxTotalCashBack=resp.data[0].fMaxTotalCashBack;
					        }
					        else
					        {
								var fFixAmount=resp.data[0].fFixAmount;
								var fPercentage=resp.data[0].fPercentage;
					        }
								
						   cart=angular.fromJson(window.localStorage['cart']);
						   //var customerId=window.localStorage['CustomerId'];
						     var customerId=window.localStorage['nCustomerId'];
						 
						   
							if(customerId==nCustomerId)
					        {	
								if(nRepeat>0)
								{
									for(var productInCart=0; productInCart<cart.length; productInCart++) 
									{
										var productid=cart[productInCart]['nProductId'];
										var productcatid=cart[productInCart]['nProductCategoryId'];
										var productsubcatid=cart[productInCart]['nProductSubCategoryId'];
										
										/*code check coupon valid or not*/
										if (cAppliedOn == "Product")
										{
											if(nAppliedItemId==productid)
											{
												var qty=$scope.cartProducts.items[productInCart].nQuantity;
												
												var fPrice=cart[productInCart]['fPrice'];
												var vartotal=qty*fPrice;
												var totalPrice=vartotal;
												ftotaltemp+=totalPrice;
												
												strOfferValid="Yes";
												ionicToast.show('Your coupon offer succesfully applied on Product....', 'middle', false, 2500);
											}
											else
											{
												strOfferValid="No";
												ionicToast.show('Your coupon offer expire....', 'middle', false, 2500);
											}
										}
										else if(cAppliedOn == "Product Category")
										{	
											if(nAppliedItemId==productsubcatid)
											{
												var qty=$scope.cartProducts.items[productInCart].nQuantity;
												var fPrice=cart[productInCart]['fPrice'];
												var vartotal=qty*fPrice;
												var totalPrice=vartotal;
												ftotaltemp+=totalPrice;
												strOfferValid="Yes";
												ionicToast.show('Your coupon offer succesfully applied on Product Sub category....', 'middle', false, 2500);
											}
											else
											{
												strOfferValid="No";
												ionicToast.show('Your coupon offer expire....', 'middle', false, 2500);
											}
										}
										else
										{
											ionicToast.show('CouponCode Not Apply in this Product....', 'middle', false, 2500);
										}
										/*code over*/
									}
									
									if(IsPublic==true)
									{
										/*Code Cashback Calculation*/
										fTotalProductAmount=ftotaltemp;
										
										if(IsCashBack==true)
										{
											var	fcashbackAmount= (ftotaltemp * nCashBackPercentageOnTotal) / 100;
											//ftotaltemp =ftotaltemp - ((ftotaltemp * nCashBackPercentageOnTotal) / 100);
											
											$scope.nullCartcashback=true;
											$scope.nullCartTotal=true;
											$scope.CouponcodeCalculation.lblCashbackDetailaboutMaxMinTotal=ftotaltemp;
											if(fMinTotalCashBack <= fcashbackAmount &&  fMaxTotalCashBack  >= fcashbackAmount)
											{ 
												ftotaltemp =ftotaltemp - ((ftotaltemp * nCashBackPercentageOnTotal) / 100);
												$scope.CouponcodeCalculation.lblCashbackDetailaboutMaxMin=fcashbackAmount;
												
												  window.localStorage['fcashbackAmount']=fcashbackAmount;
												  
												//+"Total Amount is"+ftotaltemp
												ftotaltemp+=$scope.shipping;
												//cartSubTotal=cartSubTotal-fcashbackAmount;
												cartSubTotal=ftotaltemp;
												$scope.total = function() {
													return cartSubTotal;
												}
												
											}
											else if(fMinTotalCashBack > fcashbackAmount)
											{ 
												$scope.nullCartcashbackMsg=true;
												$scope.nullCartcashback=false;
												$scope.CouponcodeCalculation.lblCashbackDetailaboutMin=true;
												$scope.CouponcodeCalculation.lblCashbackDetailaboutMin="Your cashback is mininum so cant apply";
												
												ftotaltemp+=$scope.shipping;
												cartSubTotal=ftotaltemp;
												$scope.total = function() {
													return cartSubTotal;
												}
											}
										}
										else
										{
											$scope.nullCartForTotal=true;
											$scope.nullCartForDiscount=true;
											$scope.nullCartforFinalTotal=true;
												
											if(fFixAmount!=0)
											{
												ftotaltemp=ftotaltemp-fFixAmount;
												$scope.CouponcodeCalculation.lblTotalCashbackDetail=fTotalProductAmount;
												$scope.CouponcodeCalculation.lblCashbackDetail= fFixAmount; 
												$scope.CouponcodeCalculation.lblTotalWithCutDiscount=ftotaltemp;
												
												ftotaltemp+=$scope.shipping;
												//alert(ftotaltemp);
												//cartSubTotal=cartSubTotal-fFixAmount;
												cartSubTotal=ftotaltemp;
												
												$scope.total = function() {
													return cartSubTotal;
												}
												
												ionicToast.show('Discount Applied Successfully....', 'middle', false, 2500);
												
											}
											else if(fPercentage!=0)
											{
												var fdiscountAmount=(ftotaltemp * fFixAmount) / 100;
												$scope.CouponcodeCalculation.lblTotalCashbackDetail=fTotalProductAmount;
												$scope.CouponcodeCalculation.lblCashbackDetail= fFixAmount; 
												$scope.CouponcodeCalculation.lblTotalWithCutDiscount=ftotaltemp;
												
												
												ftotaltemp+=$scope.shipping;
												//cartSubTotal=cartSubTotal-fFixAmount;
												cartSubTotal=ftotaltemp;
												
												
												$scope.total = function() {
													return cartSubTotal;
												}
												//$scope.CouponcodeCalculation.lblCashbackDetail="Your Discount is: " + fFixAmount; 
												//$scope.CouponcodeCalculation.lblTotalWithCutDiscount=" now you total is: " + ftotaltemp;
												//$scope.CouponcodeCalculation.lblCashbackDetail="Your Discount is: " +fdiscountAmount+ " now you total is:" + ftotaltemp;
												ionicToast.show('Discount Applied Successfully....', 'middle', false, 2500);
											}	
										}
											window.localStorage['cartSubTotalForWalletCalculation']=cartSubTotal;
											//alert(cartSubTotal);
									/*Code Cashback Calculation end*/									
																		
									/*Code update cremarks for repeate couponcode*/							
									
									var crepeatedRemarks=nRepeat-1;
									//alert(crepeatedRemarks);
										
									$http(
									{
										method: 'POST',
										url:path+'Offer.asmx/UpdateRepeatAfterUsingCouponCode',
										//url: path+'http://localhost:3038/ECP/WebServices/Offer.asmx/UpdateRepeatAfterUsingCouponCode',
										headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
										transformRequest: function (obj) {
												var str = [];
												for (var p in obj)
													str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
												return str.join("&");
											},
											//data: { nCustomerId:OfferId,fWalletAmount:coupcode,nQuotationMasterId:nUserId,nOfferId:crepeatedRemarks,dtDate:dtDate,fCreditedAmount:fCreditedAmount,dtCreditedDate:dtCreditedDate,fDebitedAmount:fDebitedAmount,dtDebitedDate:dtDebitedDate,nUserId:nUserId,IsActive:IsActive}
											
											data: {nOfferId:OfferId,cCouponCode:coupcode,nUserId:nUserId,nRepeat:crepeatedRemarks}
									}).success(function (response) {
											//alert("vcbcvb");
											console.log(response);
									});	
							}
							window.localStorage['ftotaltemp']=ftotaltemp;
							//alert(ftotaltemp);	
					}
					else
					{
							ionicToast.show('Coupon Already Use by you....', 'middle', false, 2500);	
					}
				}
				else
				{
						$scope.CouponcodeCalculation.lblTotalCashbackDetail="This offer not valid for you";
				}
			}
			else
			{
					ionicToast.show('Coupon Code Date Is Expired....', 'middle', false, 2500);	
			}				
			}, function (err) {
						console.error('ERR', err);
				     })
				}				
			}
			else
			{
				ionicToast.show('CouponCode not Valid....', 'middle', false, 2500);
			}			
		},function (err){	
			   console.error('ERR', err);
		})
	}	
	/* End to Apply cuoponCode*/
	

	/*Remove item from cart start*/	
		$scope.remove=function(id,index) {	//id = product id  , index for removing product from view 
			var productId = id;
			$scope.cartProducts.items.splice(index, 1);
			
			if(window.localStorage['cart']!='') {
				cart=angular.fromJson(window.localStorage['cart']);

				// delete from localstorage			
				for (var rmvProduct=0;rmvProduct<cart.length;rmvProduct++) {
					if (cart[rmvProduct]['nProductId'] == productId) {
						cart.splice(rmvProduct,1);
					}
				}
				localStorage.setItem('cart',angular.toJson(cart));
					  $scope.count=cart.length;
			}
			if(window.localStorage['cart']=='[]') {
				
				$scope.nullCart = true;
				$scope.nullCart11 = false;
				$scope.nullCartForTotal=false;
				$scope.nullCartForDiscount=false;
				$scope.nullCartforFinalTotal=false;
				$scope.nullCartcashback=false;
				$scope.nullCartTotal=false;
			}
				
		    $http({
                method: 'POST',
                url: path+'Cart.asmx/DeleteCustomerCartRecord',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
               data: {nUserId:nUserId,nCustomerId:intCustomerId,nProductId:productId}
            }).success(function (response) {
				console.log('Success', response);
				//console.log(response);
            });
		}
	/*Remove item from cart end*/
})

.controller('shipping', function ($scope, $http,$location,$ionicLoading,ionicToast) {
		
    //Bind Customer Address
    var path = window.localStorage['path'];
    var nUserId = window.localStorage['UserId'];
	var intCustomerId=window.localStorage['nCustomerId'];
	
	var CustomerAddressurl = path+"customer.asmx/SelectRow?UserId="+ nUserId + "&nCustomerId=" + intCustomerId;
			
	$http.get(CustomerAddressurl).then(function (resp) {
		
		$scope.CustomerAddress = resp.data;		
		$scope.txtCustomerAddress=resp.data.mstCustomer[0].cCustomerAddress;
	    $scope.shippingData.Address1=$scope.txtCustomerAddress;	
		$ionicLoading.hide();
		
    }, function (err) {
	    
	    console.error('ERR', err);
		//ionicToast.show('no Products', 'middle', false, 2500);
	})
	
	//Bind Payment Options
	var CustomerAddressurl = path+"paymentmode.asmx/SelectAllPaymentMode?UserId="+ nUserId;
	
	$http.get(CustomerAddressurl).then(function (resp) {
		
		$scope.shipping = resp.data.mstPaymentMode;				
		$ionicLoading.hide();
		
	}, function (err) {
		console.error('ERR', err);
		//ionicToast.show('no Products', 'middle', false, 2500);
	})
	
	$scope.ShowStoreName = function () {		
		
		$scope.StorLocation =true;
	}
		
	$scope.HideStoreName = function () {
			//alert("fgfghfg");
			$scope.StorLocation =false;
	}
	
	var Storeurl = path+"Store.asmx/SelectAllStore?UserId="+ nUserId;
	
	$http.get(Storeurl).then(function (resp) {
        $scope.StoreName= resp.data;
		//console.log( $scope.StoreName);
    }, function (err) {
		
        console.error('ERR', err);
        
    })
	
	$scope.GetId = function(nStoreId,strStoreLocation){
	
		    window.localStorage['nStoreId']=nStoreId;
		    window.localStorage['strStoreLocation']=strStoreLocation;
	}
	
$scope.shippingData={};
$scope.shippingPaymentOption={};
$scope.data={};

if($scope.shippingPaymentOption.paymentOption == undefined || $scope.shippingPaymentOption.paymentOption == '') {		
		$scope.shippingPaymentOption.paymentOption = "cash on delivery";	
	 }

		$scope.shippingData = function() {
	  
		var Country=$scope.shippingData.Country;
		var City=$scope.shippingData.City;
		var State=$scope.shippingData.State;
		var Zip=$scope.shippingData.Zip;
		var Address1=$scope.shippingData.Address1;
		var Address2=$scope.shippingData.Address2;
		var Comment=$scope.shippingData.Comment;
		var paymentOption = $scope.shippingPaymentOption.paymentOption;  
		var StoreIdForPickUp=$scope.data.Store;
		var valid="";
		if(StoreIdForPickUp=="Dilivery")
		{
			var StorId='Dilivery';
			//alert(StorId);
		}
		else
		{
			var StorId= window.localStorage['nStoreId'];
			//alert(StorId);
		}
		
		if(StoreIdForPickUp=="Dilivery")
		{ 
		    if( Address1 == undefined || Address2 == undefined || City == undefined ) {  
		        ionicToast.show('all fields are required', 'middle', false, 2500);
		    }
		    else
		    {
				valid="yes";
		    }
		} else {
			
				valid="yes";
		}
		
		if(valid=="yes")
		{
				/*CheckOut Start*/
			
				if(window.localStorage['cart']!='') {
					cart=angular.fromJson(window.localStorage['cart']);
				}
					
				if(window.localStorage['quantity'] != '') {
					quantity=angular.fromJson(window.localStorage['quantity']);
				}
			
				if(window.localStorage['nCustomerId'] != '') {
					CustomerId=angular.fromJson(window.localStorage['nCustomerId']);
				}
			
				if(window.localStorage['UserId'] != '') {
					UserId=angular.fromJson(window.localStorage['UserId']);
				}
				var UserId = UserId;
				var SupplierId = 0;
				var Address = Address1 +' '+ Address2 +' '+ City;
				var CustomerId = CustomerId;
				var QuotatinType = 'Admin Order';	//static
				var TotalPrice =window.localStorage['total'];			
				var PaymentTeams = '';
				var DeliveryDate = '1/1/2000';	//static
				var PaymentDueDate = '1/1/2000';	//static
				var VaidityDate = '1/1/2000';	//static
				var QuotationCode = '';
				var QuetationTitle = 'Order from App at ';    //CustomerId +' '+ city;
				var CurrentStatus='Pending';
				var EmpId = 0;
				
				/*Send notification to admin start*/
				/* var loginurl ="http://52.34.37.107:8080/vitenotification/send_notification.php?id=1&title=New Order&message=Hey! You have received new order.";
					$http.get(loginurl).then(function (resp) {
					console.log(resp);
				}) */
				/*Send notification to admin start*/
				
				$http({
					method: 'POST',
					url: path+'Order.asmx/CreateOrder',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					transformRequest: function (obj) {
						var str = [];
						for (var p in obj)
							str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						return str.join("&");
						},
						data: { nUserId: UserId, 
						nSupplier: SupplierId,
						nCustId:intCustomerId,
						cQuatationType: QuotatinType, 
						fTotal: TotalPrice, 
						cPaymentTerms: paymentOption, 
						dtDelivaryDate: DeliveryDate, 
						dtPaymentDueDate: PaymentDueDate, 
						dtValidityDate: VaidityDate, 
						cQuatationCode: QuotationCode, 
						cQuatationTitle: QuetationTitle,
						cCurrentStatus:CurrentStatus, 
						nEmpId: EmpId,
						cBranchAddress:Address,
						cRemarks:StorId
						}
				}).success(function (response) {
					
					//console.log(response.ID);
					nQuotationId = response.ID;
					window.localStorage['total']=nQuotationId;
					//ionicToast.show('order Placed', 'middle', false, 2500);
						
					if (nQuotationId != '' || nQuotationId != undefined) {
						
						for (var insertEachProduct = 0; insertEachProduct < cart.length; insertEachProduct++) {

						    //console.log(cart[insertEachProduct]);
							var nProductId = cart[insertEachProduct]['nProductId'];
							
							var ProductPrice = cart[insertEachProduct]['fPrice'];
							
							var WorentyMonth = 0;
							var fDicount = 0;
							var Details = cart[insertEachProduct]['cDescription'];
	                        var qty=quantity;
	                       
							var fQuantity =qty[insertEachProduct];	//count done
							var QuantityId = 1;
							var PartsId = 0;
							var WarrentyType = cart[insertEachProduct]['cWarrantyType'];
							var IsActive=true;
							var IsDisable=false;
							var dtDate='2016-05-27';
				
							$http({
								method: 'POST',
								url:path+'Order.asmx/AddOrderItem',
								headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
								transformRequest: function (obj) {
									var str = [];
									for (var p in obj)
										str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
									return str.join("&");
								},
								data: { nUserId: UserId, 
								nOrderId: nQuotationId, 
								nProductId: nProductId, 
								fProductPrice: ProductPrice, 
								nWarrantyMonth: WorentyMonth, 
								fDiscount: fDicount, 
								cDetail: Details,
								IsActive:IsActive,
								IsDisable:IsDisable, 
								fQuantity: fQuantity,
								nQuantityId: QuantityId,
								cWarrentyType: WarrentyType,
								dtDate:dtDate }
							}).success(function (response) {
								
								//console.log(response);
								ionicToast.show('order Placed ', 'middle', false, 2500);
								window.location = "#/app/order";
								
							});
							
								/*Remove item from database start*/
		
									  $http({
										method: 'POST',
										url: path+'Cart.asmx/DeleteCustomerCartRecord',
										headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
										transformRequest: function (obj) {
											var str = [];
											for (var p in obj)
												str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
											return str.join("&");
										},
									   data: {nUserId:UserId,nCustomerId:CustomerId,nProductId:nProductId}
									}).success(function (response) {
										//console.log('Success', response);
										console.log(response);
										
									});
									/*Remove item from database end*/						
			        }
		            window.localStorage['cart']='[]';
		            $scope.count=cart.length;
					}		
				});

			/*CheckOut End*/
				
				//insert Customer Wallet Details
			    var IsCashBack=window.localStorage['IsCashBack'];
		        
		        if(IsCashBack==true)
				{
						var nQuotationId=window.localStorage['total'];
						var nUserId = window.localStorage['UserId'];
					    var customerId=window.localStorage['CustomerId'];		 
						var fcashbackAmount=window.localStorage['fcashbackAmount'];
						//alert(fcashbackAmount);
					    var OfferId=window.localStorage['OfferId'];				
						var todaydate=new Date();
						var today = new Date();
						var dd = today.getDate();
						var mm = today.getMonth()+1; //January is 0!

						var yyyy = today.getFullYear();
						if(dd<10){
							dd='0'+dd
						} 
						if(mm<10){
							mm='0'+mm
						} 
						//var today = mm+'/'+dd+'/'+yyyy;
						var today ="2016-09-08";
						 
						 var fCreditedAmount='0.0';
						var fDebitedAmount='0.0';
						var IsActive='true';
							
						$http({
							method: 'POST',
							url:path+'CustomerWallet.asmx/InserCustomerWalletDetail',
							headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
							transformRequest: function (obj) {
								var str = [];
								for (var p in obj)
									str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
									return str.join("&");
								},
								data: {nCustomerId:customerId,fWalletAmount:fcashbackAmount,nQuotationMasterId:nQuotationId,nOfferId:OfferId,
											dtDate:today,fCreditedAmount:fCreditedAmount,dtCreditedDate:today,fDebitedAmount:fDebitedAmount,
											 dtDebitedDate:today,nUserId:nUserId,IsActive:IsActive}
						}).success(function (response) {
							console.log(response.Success);
							if(response.Success == 0) {
								//ionicToast.show('Please Enter Valid User Name', 'middle', false, 2500);
								
								$ionicLoading.hide();
							}
							else
							{
								ionicToast.show('Your Wallet Amount Add Suceesfully', 'middle', false, 2500);
								//window.location = "#/app/mainpage";
								$ionicLoading.hide();
							}
							
						}).error(function(err){
							
							console.log("err",err);
						})
					$ionicLoading.hide();
				}
				else
				{
					//window.location = "#/app/mainpage";
				}
		}
		
	}
})

.controller('order', function ($scope, $http,$location,$ionicLoading,ionicToast) {
		
	var path = window.localStorage['path'];
	var nUserId = window.localStorage['UserId'];
	var intCustomerId=window.localStorage['nCustomerId'];
	//console.log(intCustomerId);
	var cType='Admin Order';

		var AllOrderListurl = path+"Order.asmx/SelectOrderCustomerwise?UserId="+ nUserId+ "&CustomerId="+intCustomerId+ "&cType="+cType;
		
		$http.get(AllOrderListurl).then(function (resp) {
		
		$scope.OrderList = resp.data;
        window.localStorage['OrderList'] = JSON.stringify(resp.data);
		
		$ionicLoading.hide();
		}, function (err) {
			console.error('ERR', err);
			ionicToast.show('no Products', 'middle', false, 2500);
			
		})
		
		$scope.invoice = function (nOrderId) {
		window.localStorage['invoice'] = nOrderId;
	
		window.location = "#/app/invoice?OrderId="+nOrderId;	
    }
})


.controller('invoice', function ($scope, $http,$location,$ionicLoading,ionicToast) {
	
	var path = window.localStorage['path'];
    var nUserId = window.localStorage['UserId'];
	var OrderId=$location.search().OrderId;
	
	var Quotationurl = path+"Order.asmx/SelectRowOrder?UserId=" + nUserId+"&OrderId="+OrderId;

    $http.get(Quotationurl).then(function (resp) {
     
        $scope.OrderRowData= resp.data;
		//console.log($scope.OrderRowData);
		//console.log($scope.OrderData[3].Item[0][0].cProductName);
		$ionicLoading.hide();

        // For JSON responses, resp.data contains the result
    }, function (err) {
		
        console.error('ERR', err);
        
    })	
 
})

.controller('main_page', function ($scope, $http,$location,$ionicLoading,ionicToast) {
 
})

.controller('register', function ($scope, $http,$location,$ionicLoading,ionicToast) {
 
    var path= window.localStorage['path'];
	$scope.signupData={};
	
	$scope.doSignup = function () {
	
		var sourceId=0;
		var ClientId=0;
		var StoreId=0;
		var IndustryId=0;
		var EmpId=0;
		var customerType='Customer';
		var CustomerReferenceId=0;
		var customerFirstName=$scope.signupData.fname;
		var CustomerMiddleName="";
		var customerlastName="";
		var CustomerWebsite="";
		var contactno=$scope.signupData.mobile;
		var CustomerEmailId=$scope.signupData.email;
		var cPassword=$scope.signupData.pass;
		var CustomerAddress="";
		var City="";
		var ZipCode="";
		var CustomerCompany="";
		var PrimaryPerson="";
		var PrimaryPersonEmail="";
		var PrimaryPersonDesignation="";
		var PrimaryPersonContactNo="";
		var ddtCustomerBirthdate="2016-09-08";
		var IsCustomerMarridStatus=false;
		var dtCustomerAnniversaryDate=$scope.signupData.AnniversaryDate;
		var CustomerFacebookLink="";
		var CustomerGLink="";
		var CustomerLinkedLink="";
		
		var todaydate=new Date();
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
			dd='0'+dd
		} 
		if(mm<10){
			mm='0'+mm
		} 
		var today = mm+'/'+dd+'/'+yyyy;

		var dtRegistrationDate=today;
		var UserId=4;
		var IsActive=true;
		var IsVerified=true;
		var CustomerImage="";
		var cGender=$scope.signupData.gender;
		$scope.retypepass=$scope.signupData.retypepass;
		var retype=$scope.retypepass;
		//alert(retype);
		
		//if(cPassword==retype)
		//{
		
		$http({
			method: 'POST',
			url:path+'Customer.asmx/InsertCustomer',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: function (obj) {
				var str = [];
				for (var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data: { nSourceId: sourceId, nClientId: ClientId, 
					nStoreId:StoreId, 
					nIndustryId:IndustryId, 
					nEmpId:EmpId,
					cCustomerType: customerType, 
					nCustomerReferenceId:CustomerReferenceId,
					cCustomerFirstName: customerFirstName, 
					cCustomerMiddleName: CustomerMiddleName,
					cCustomerLastName: customerlastName,
					cCustomerWebsite:CustomerWebsite,
					cCustomerContactNo: contactno, 
					cCustomerEmailId: CustomerEmailId,
					cPassword:cPassword,
					cCustomerAddress: CustomerAddress,
					cCity:City,
					cZipCode:ZipCode,
					cCustomerCompany: CustomerCompany,
					cPrimaryPerson: PrimaryPerson,
					cPrimaryPersonEmail:PrimaryPersonEmail,
					cPrimaryPersonDesignation:PrimaryPersonDesignation,
					cPrimaryPersonContactNo: PrimaryPersonContactNo,
					dtCustomerBirthdate:ddtCustomerBirthdate,
					IsCustomerMarridStatus:true,
					dtCustomerAnniversaryDate:dtCustomerAnniversaryDate,
					cCustomerFacebookLink: CustomerFacebookLink, 
					cCustomerGLink: CustomerGLink, 
					cCustomerLinkedLink: CustomerLinkedLink,
					dtRegistrationDate:dtRegistrationDate,
					nUserId:UserId,
					IsActive:IsActive,
					IsVerified:IsVerified,
					cCustomerImage:CustomerImage,
					cGender:cGender
				}
		}).success(function (response) {
		
		    console.log(response.Success);
		    var result=response.Success;
		    //alert(result);
			if(response.Success == 0) {
				
				ionicToast.show('Data Missing', 'middle', false, 2500);
				$ionicLoading.hide();
			} 
			else if(response.Success == 3)
			{
				ionicToast.show('Email Already Exists', 'middle', false, 2500);
				//window.location = "#/app/register";
				$ionicLoading.hide();
			}
			else if(response.Success==1) {
			
				window.localStorage['LoginId'] = response.ID;
				window.localStorage['CustomerEmailId'] = CustomerEmailId;		
				window.localStorage['nCustomerId'] = response.CustID;			
				window.localStorage['UserId']=UserId
				window.localStorage['UserName'] = CustomerEmailId;	
				var cart=[];
				window.localStorage['cart']='[]';
				ionicToast.show('Register Successfully', 'middle', false, 2500);
				window.location = "#/app/mainpage";
				$ionicLoading.hide();
			}				
		})	
		
	//}
	//else
	//{
		//ionicToast.show('Please enter password and Re-Type Password Is Same', 'middle', false, 2500);
			//		$ionicLoading.hide();
	//}
	}
})

.controller('CustomerProfile', function ($scope, $http,$location,$ionicLoading) {
	
	var path= window.localStorage['path'];
    var nUserId = window.localStorage['UserId'];
	var customerId=window.localStorage['nCustomerId'];	
	
	var customerurl = path+"Customer.asmx/SelectRow?UserId=" + nUserId+"&nCustomerId="+customerId;

    $http.get(customerurl).then(function (resp) {
     
        $scope.CustsRowData= resp.data.mstCustomer;
		$scope.cCustomerFirstName=resp.data.mstCustomer[0].cCustomerFirstName;
		$scope.cCustomerLastName=resp.data.mstCustomer[0].cCustomerLastName;
		$scope.cCustomerContactNo=resp.data.mstCustomer[0].cCustomerContactNo;
		$scope.cCustomerEmailId=resp.data.mstCustomer[0].cCustomerEmailId;
		$scope.cPassword=resp.data.mstCustomer[0].cPassword;
		$ionicLoading.hide();
        // For JSON responses, resp.data contains the result
		
    }, function (err) {
		
        console.error('ERR', err);
        
    })
    
    $scope.updateProfile = function () {      
        window.location="#/app/updateprofile";      
    }
})

.controller('updateprofile', function ($scope, $http,$location,$ionicLoading) {

	var path= window.localStorage['path'];
    var nUserId = window.localStorage['UserId'];
	var customerId=window.localStorage['nCustomerId'];
		
	$scope.update={};
	
	var customerurl = path+"Customer.asmx/SelectRow?UserId=" + nUserId+"&nCustomerId="+customerId;

    $http.get(customerurl).then(function (resp) {
     
        $scope.CustsRowData= resp.data.mstCustomer;
		$scope.update.fname=resp.data.mstCustomer[0].cCustomerFirstName;
		$scope.update.lname=resp.data.mstCustomer[0].cCustomerLastName;
		$scope.update.contact=resp.data.mstCustomer[0].cCustomerContactNo;
		$scope.update.Email=resp.data.mstCustomer[0].cCustomerEmailId;
	    var userData = JSON.stringify(resp.data.mstCustomer);
	    //console.log(userData);
		window.localStorage['customerUpdate'] = userData;
		
		$ionicLoading.hide();
        // For JSON responses, resp.data contains the result
		
    }, function (err) {
		
        console.error('ERR', err);
        
    })
	
	
     $scope.updateProfile = function () {
       
	    var customerData = JSON.parse(window.localStorage['customerUpdate']);
		
		console.log(customerData[0]['dtCustomerAnniversaryDate']);
		var sourceId=0;
		var ClientId=0;
		var StoreId=0;
		var IndustryId=0;
		var EmpId=0;
		var customerType=customerData[0]['cCustomerType'];
		//alert(customerType);
		var CustomerReferenceId=0;
		var customerlastName="";
		var CustomerWebsite="";
	
		var CustomerAddress="";
		var City="";
		var ZipCode="";
		var CustomerCompany="";
		var PrimaryPerson="";
		var PrimaryPersonEmail="";
		var PrimaryPersonDesignation="";
		var PrimaryPersonContactNo="";
		var ddtCustomerBirthdate=customerData[0]['dtCustomerBirthdate'];
		
		var IsCustomerMarridStatus=false;
		var dtCustomerAnniversaryDate=customerData[0]['dtCustomerAnniversaryDate'];
		var CustomerFacebookLink="";
		var CustomerGLink="";
		var CustomerLinkedLink="";
	
		var dtRegistrationDate="2016-09-08";
		var UserId=window.localStorage['UserId'];
	
		var IsActive=true;
		var IsVerified=true;
		var CustomerImage="";
		var cGender=customerData[0]['cRemarks'];
		//alert(cGender);
		
		if(Boolean($scope.update.fname) == false){
			var customerFirstName=customerData[0]['cCustomerFirstName'];
		} else {
			var customerFirstName = $scope.update.fname;
		}
		
		if(Boolean($scope.update.lname) == false){
			var customerlastName=customerData[0]['cCustomerLastName'];
		} else {
			var customerlastName = $scope.update.lname;
		}
		
		/*if(Boolean($scope.update.cCustomerType) == false)
		{
			var CustomerType=customerData.cCustomerType;
		}else{
			var CustomerType = $scope.update.cCustomerType;
		}*/
		
		var CustomerMiddleName=customerData[0]['cCustomerMiddleName'];
		
		if(Boolean($scope.update.contact) == false){
			var CustomerContactNo=customerData[0]['cCustomerContactNo'];
		} else {
			var CustomerContactNo = $scope.update.contact;
		}
		
		if(Boolean($scope.update.contact) == false){
			var CustomerEmailId=customerData[0]['cCustomerEmailId'];
		}else{
			var CustomerEmailId = $scope.update.Email;
		}
		
		var cPassword=customerData[0]['cPassword'];
		
		
			$http({
				method: 'POST',
				url:path+'Customer.asmx/UpdateCustomer',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj)
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data: { nCustomerId: customerId, 
				nSourceId: sourceId, nClientId: ClientId, 
					nStoreId:StoreId, 
					nIndustryId:IndustryId, 
					nEmpId:EmpId,
					cCustomerType: customerType, 
					nCustomerReferenceId:CustomerReferenceId,
					cCustomerFirstName: customerFirstName, 
					cCustomerMiddleName: CustomerMiddleName,
					cCustomerLastName: customerlastName,
					cCustomerWebsite:CustomerWebsite,
					cCustomerContactNo: CustomerContactNo, 
					cCustomerEmailId: CustomerEmailId,
					cCustomerAddress: CustomerAddress,
					cCity:City,
					cZipCode:ZipCode,
					cCustomerCompany: CustomerCompany,
					cPrimaryPerson: PrimaryPerson,
					cPrimaryPersonEmail:PrimaryPersonEmail,
					cPrimaryPersonDesignation:PrimaryPersonDesignation,
					cPrimaryPersonContactNo: PrimaryPersonContactNo,
					dtCustomerBirthdate:ddtCustomerBirthdate,
					IsCustomerMarridStatus:true,
					dtCustomerAnniversaryDate:dtCustomerAnniversaryDate,
					cCustomerFacebookLink: CustomerFacebookLink, 
					cCustomerGLink: CustomerGLink, 
					cCustomerLinkedLink: CustomerLinkedLink,
					dtRegistrationDate:dtRegistrationDate,
					nUserId:UserId,
					IsActive:IsActive,
					IsVerified:IsVerified,
					cCustomerImage:CustomerImage,
					cPassword:cPassword,
					cGender:cGender }
			}).success(function (response) {
				
				console.log(response);
				if(response.Success == 1) {
									
				    window.location = "#/app/CustomerProfile";
					
				} else {
					
				}

			});
    }
    $scope.cancleUpdate = function () {    
         window.location="#/app/CustomerProfile";    
    }
})

.controller('changePassword', function ($scope, $http,$location,$ionicLoading,ionicToast) {
	
	var path= window.localStorage['path'];
	var nUserId = window.localStorage['UserId'];
	var customerId=window.localStorage['nCustomerId'];
	var getoldPassword="";
	$scope.update={};
	
	var customerurl = path+"Customer.asmx/SelectRow?UserId=" + nUserId+"&nCustomerId="+customerId;

    $http.get(customerurl).then(function (resp) {
     
        $scope.CustsRowData= resp.data.mstCustomer;
		$scope.cPassword=resp.data.mstCustomer[0].cPassword;
		getoldPassword=$scope.cPassword;
		$ionicLoading.hide();
        // For JSON responses, resp.data contains the result
        
    }, function (err) {
		
        console.error('ERR', err);
        
    })
	$scope.ChangePass={};
	
	  $scope.ChangePassword = function () {
	  
	    var newPassword=$scope.ChangePass.NewPassword;
	    var oldPassword=$scope.ChangePass.oldPassword;
	    
	    if(oldPassword==getoldPassword)
	    {
	        if(newPassword!=" ")
	        {
	            if(oldPassword!=newPassword)
	            {
		            $http({
				        method: 'POST',
				        url:path+'Login.asmx/ChangePassword',
				        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				        transformRequest: function (obj) {
					        var str = [];
					        for (var p in obj)
						        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					        return str.join("&");
				        },
				        data: { nUserId:nUserId,cPassword:newPassword,nCustomerId:customerId}
			        }).success(function (response) {
				        console.log(response);
				        if(response.Success == 1) {
				        
					        window.location = "#/app/CustomerProfile";
        					
				        } else {
        					
				        }

			        });
			     }
			     else{
			          ionicToast.show('Please Enter New password', 'middle', false, 2500);
			     }
    	    }
    	    else{
    	        ionicToast.show('Please Enter password', 'middle', false, 2500);
    	    }
	    }
	    else{
	        ionicToast.show('Please Check your old password', 'middle', false, 2500);
	    }
	}
 
})


.controller('ForgotPassword', function ($scope, $http,$location,$ionicLoading,ionicToast) {

    var path = window.localStorage['path'];
	var nUserId = window.localStorage['UserId'];
	$scope.loginData = {};
	$scope.SendMail = function (Username) {
		  
		  var username = $scope.loginData.username;
		  if(username =='undefined')
		  {
		    var UserDataurl = path+"Login.asmx/SelectUserData?cUserName=" + Username+"&nUserId="+nUserId;

            $http.get(UserDataurl).then(function (resp) {
     
                $scope.UserData= resp.data;
		        
		        if(resp.data[0].Success!=0)
		        {
			        $scope.nLoginId=resp.data[0].nLoginId;
		            var LoginId=$scope.nLoginId;
		         
		            $http({
			                method: 'POST',
			                url:path+'Login.asmx/SendMailForForgotPassword',
			                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			                transformRequest: function (obj) {
				                var str = [];
				                for (var p in obj)
					                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					                return str.join("&");
				                },
				                data: { nLoginId: LoginId	}
		          }).success(function (response) {
			                
			                console.log(response.Success);
			                if(response.Success == 0) {
				                ionicToast.show('Please Enter Valid User Name', 'middle', false, 2500);

				                $ionicLoading.hide();
			                }
			                else
			                {
				                ionicToast.show('Please Check Your E-Mail', 'middle', false, 2500);
				                window.location = "#/app/main_page";
				                $ionicLoading.hide();
			                }
                			
		         }).error(function(err){
                			
			        console.log("err",err);	
		        })
		
		            $ionicLoading.hide();	
		        }
		        else
		        {
			        ionicToast.show('Please Check Your E-Mail', 'middle', false, 2500);	
		        }
		}, function (err) {

			console.error('ERR', err);
			
		})
		  }
		  else{
			  ionicToast.show('Please Enter Your E-Mail', 'middle', false, 2500);
			  $ionicLoading.hide();
		  }
		}	
})


.controller('PromocodeDisplay', function ($scope, $http,$location,$ionicLoading,ionicToast) {
	
	var path = window.localStorage['path'];
	var nUserId = window.localStorage['UserId'];
	var customerId=window.localStorage['nCustomerId'];
	$scope.storename=window.localStorage['StoreName'];
	var OfferDataurl = path+"Offer.asmx/SelectRowCustomerWise?nCustomerId=" + customerId+"&nUserId="+nUserId;

    $http.get(OfferDataurl).then(function (resp) {
     
        $scope.OfferData= resp.data;
		console.log(resp.data);
		
		$ionicLoading.hide();
        
    }, function (err) {
		
        console.error('ERR', err);
        
    })
 
})


.controller('AddAppoinment', function ($scope, $http,$location,$ionicLoading,ionicToast) {

    $scope.TodayDate={};
	var path = window.localStorage['path'];
	 var nUserId= window.localStorage['UserId'];
    // for DatePicker
	$scope.datePicker = function(){
		$scope.pickerDate=true;
		 //$scope.showsecondCard = false;
	}
	
	$scope.datepickerObject = {

      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      templateType: 'popup', //Optional
      from: new Date(2012, 2, 8), //Optional
      to: new Date(2018, 25, 8),  //Optional
      callback: function (val) {  //Mandatory
        datePickerCallback(val);
      },
      //dateFormat: 'dd-MM-yyyy', //Optional
      closeOnSelect: false, //Optional
    }
	
	
	 var datePickerCallback = function (val) {
		 $scope.TodayDate.date=false;
		 
			 if (typeof(val) === 'undefined') 
			 {
				$scope.OnDayDate = 'Select Date';
				$scope.OnDayDate1 = 'Select Date';
			} 
			else 
			{
			  console.log('Selected date is : ', val)
			  
			  var date = new Date(val);
				
					//var OnDayDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() ;
					var OnDayDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() ;
					window.localStorage['OnDayDate'] = OnDayDate;
					$scope.OnDayDate = OnDayDate;
					//alert($scope.OnDayDate);				  
			}
	 }
	 
	 // display Location
	
	 
	 var DisplayStoreNameurl=path+"Store.asmx/SelectAllStore?UserId="+nUserId;
	  $http.get(DisplayStoreNameurl).then(function (resp) {
        $scope.StoreName= resp.data;
		//console.log( $scope.StoreName);
		
    }, function (err) {
		
        console.error('ERR', err);
        
    })
	
	$scope.GetLocation = function(nStoreId,strStoreLocation){
		//alert(nStoreId);
		    window.localStorage['nStoreId']=nStoreId;
		    window.localStorage['strStoreLocation']=strStoreLocation;
	}
	
	 /*find Today Date*/
	 var todaydate=new Date();
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!

				var yyyy = today.getFullYear();
				if(dd<10){
					dd='0'+dd
				} 
				if(mm<10){
					mm='0'+mm
				} 
				var today = mm+'/'+dd+'/'+yyyy;
	 var td=today;
	$scope.today=function(day){
		if(day=='tomorrow'){
			$scope.OnDayDate= mm+'/'+dd+'/'+yyyy;
		}else{
			$scope.OnDayDate=td;
		}
	}
	// window.localStorage['dt1']=td;
	// console.log(td);
	// alert(td);
	$scope.OnDayDate=td;	
	 $scope.todate=today;
	 //console.log($scope.todate);
	 
	
	 
	 /*find tomorrow Date*/
	 $scope.date = new Date();   
     var tomorrow = new Date();
     tomorrow.setDate(tomorrow.getDate() + 1);
     var dd = tomorrow.getDate();
	 var mm = tomorrow.getMonth()+1; //January is 0!

				var yyyy = tomorrow.getFullYear();
				if(dd<10){
					dd='0'+dd
				} 
				if(mm<10){
					mm='0'+mm
				} 
				var tomorrowday = mm+'/'+dd+'/'+yyyy;
				//alert(tomorrowday);
	  $scope.tomorrowDate=tomorrowday
	
	 if($scope.TodayDate.date == undefined || $scope.TodayDate.date == '') {
		$scope.TodayDate.date =today;
	 }
    
	 $scope.AddAppoinment = function() {
	 
		$scope.Appoinment={};
		var dt=$scope.TodayDate.date;
		var Time=$scope.AddAppoinment.Time;
  	    var totalPerson=$scope.AddAppoinment.totalPerson;
		var Min=$scope.AddAppoinment.Min;	  
		var Hour=$scope.AddAppoinment.Hour;	
		var nEmployeeId=0;
		var cAppointmentTitle='Pending';
		var cAppointmentDesc='Miting';
		var dtStartDate=dt+' '+Time;	 
		// alert(dtStartDate);
		   var dtEndDate=dt;
		   var cAlert='no';
		  var nCustomerId=window.localStorage['nCustomerId'];
		  var nUSerId= window.localStorage['UserId'];
		  var nLanguageId=1;
		    var nStoreId= window.localStorage['nStoreId'];
		    var cLocation=window.localStorage['strStoreLocation'];
			var IsActive=true;
			var IsDisable=false;
			var cRemark1=$scope.AddAppoinment.Notes;
			if(cRemark1==undefined)
			{
				var Notes='';
				
			}
			else
			{
				var Notes=$scope.AddAppoinment.Notes;
			}
	
	
	if(Time != undefined) {	
	
		if( totalPerson != undefined)
		{
		    if(nStoreId != undefined || cLocation != undefined) {	
		
			if(dt!='')
			{
					$http({
						method: 'POST',
						url:path+'Appointment.asmx/AddAppointment',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
								return str.join("&");
							},
							data: { cAppointmentTitle: cAppointmentTitle,
								cAppointmentDesc: cAppointmentDesc, 
								cLocation:cLocation, 
								dtStartDate:dtStartDate,
								dtEndDate: dtEndDate, 
								cAlert:cAlert,
								nEmployeeId: nEmployeeId, 
								nCustomerId: nCustomerId,
								nStoreId: nStoreId,
								nNoOfPeople:totalPerson,
								nUserId: nUserId, 
								nLanguageId: nLanguageId,
								IsActive:IsActive,
								IsDisable:IsDisable,
								cRemark1:Notes
								
							}
					}).success(function (response) {
						
						console.log(response.Success);
						if(response.Success == 0) {
							
							ionicToast.show('Table Already Booked', 'middle', false, 2500);
							$ionicLoading.hide();
							
						} 
						else {			
							ionicToast.show('Table Book Successfully', 'middle', false, 2500);
							window.location = "#/app/mainpage";
							$ionicLoading.hide();					
						}
					})	
				//}
			}
			else
			{
				var OnDayDate=window.localStorage['OnDayDate'];
					
				$http({
						method: 'POST',
						url:path+'Appointment.asmx/AddAppointment',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
								return str.join("&");
							},
							data: { cAppointmentTitle: cAppointmentTitle,
								cAppointmentDesc: cAppointmentDesc, 
								cLocation:cLocation, 
								dtStartDate:OnDayDate+' '+Time,
								dtEndDate: OnDayDate, 
								cAlert:cAlert,
								nEmployeeId: nEmployeeId, 
								nCustomerId: nCustomerId,
								nStoreId: nStoreId,
								nNoOfPeople:totalPerson,
								nUserId: nUserId, 
								nLanguageId: nLanguageId,
								IsActive:IsActive,
								IsDisable:IsDisable,
								cRemark1:Notes
								
							}
					}).success(function (response) {
						
						console.log(response.Success);
						
						if(response.Success == 0) {	
							ionicToast.show('Appoinment Already Exists', 'middle', false, 2500);
							$ionicLoading.hide();	
						} 
						else {		
							ionicToast.show('Appoinment Add Successfully', 'middle', false, 2500);
							window.location = "#/app/mainpage";
							$ionicLoading.hide();
						}
					})				
			}	
		}
		else
		{
				ionicToast.show('Please select location', 'middle', false, 2500);
				$ionicLoading.hide();
		}
		}
		else
		{
				ionicToast.show('Person Field are required', 'middle', false, 2500);
				$ionicLoading.hide();
		}
		}
		else
		{
				ionicToast.show('Time Field are required', 'middle', false, 2500);
				$ionicLoading.hide();
		}
	}
	
})

.controller('getlocation', function ($scope, $http,$location,$ionicLoading,ionicToast) {

	var path = window.localStorage['path'];
	var nUserId= window.localStorage['UserId'];
	 
	var DisplayStoreNameurl=path+"Store.asmx/SelectAllStore?UserId="+nUserId;
	 
	$http.get(DisplayStoreNameurl).then(function (resp) {
     
        $scope.StoreName= resp.data;
		
    }, function (err) {
        console.error('ERR', err);
    })
	
	$scope.GetLocation = function(nStoreId,strStoreLocation){
		alert(nStoreId);
		    window.localStorage['nStoreId']=nStoreId;
		    window.localStorage['strStoreLocation']=strStoreLocation;
	}

})

.controller('OffersDetails', function ($scope, $http,$location,$ionicLoading,ionicToast) {

    $scope.imgpath = window.localStorage['imgpath'];
	var path = window.localStorage['path'];
	var nUserId = window.localStorage['UserId'];
	var nOfferId=$location.search().nOfferId;
	//var customerId=window.localStorage['nCustomerId'];
	//$scope.storename=window.localStorage['StoreName'];
	
	var OfferDataurl = path+"Offer.asmx/SelectRowForDetails?nOfferId=" + nOfferId+"&nUserId="+nUserId;

    $http.get(OfferDataurl).then(function (resp) {
 
        $scope.OfferData= resp.data;
		console.log(resp.data);
		
		$ionicLoading.hide();
        
    }, function (err) {
		
        console.error('ERR', err);
        
    })
  
})


//Select Employee

.controller('AddEmployee', function ($scope, $http,$location,ionicToast,$ionicPopup,$ionicLoading) {
	     

        //Get CustomerName		 
		var path=window.localStorage['path'];
	    var nUserId=window.localStorage['UserId'];
		var nCustomerId=window.localStorage['CustomerId']
		//var nEmpId=window.localStorage['EmpId'];
	    var Customerurl ="http://localhost:40432/webservice/Customer.asmx/SelectAllCustomer?nUserId=1"; //static path
	 
		$http.get(Customerurl).then(function (resp) {
		
			console.log(resp.data);
			$scope.Customer = resp.data;
			$ionicLoading.hide();
			
		}, function (err) {
		
        console.error('ERR', err);
  
    }) //END
	
	//GetCustId()=Get CustomerId
	$scope.GetCustId=function(nCustomerId){
			
			 window.localStorage['nCustomerId'] =nCustomerId;
			 //alert(nCustomerId);	
		
	    //Get EmployeeName
	    var path=window.localStorage['path'];
	    var nUserId=window.localStorage['UserId'];
		//var nEmpId=window.localStorage['EmpId'];
	    var Employeeurl ="http://www.vite.biz/ttm/webservice/EmployeeMaster.asmx/SelectAllEmployeeData?nUserId=1"; //static path
	 
		$http.get(Employeeurl).then(function (resp) {
		
			console.log(resp.data);
			$scope.EmployeeMaster = resp.data;
			$ionicLoading.hide();
			
		}, function (err) {
		
        console.error('ERR', err);
  
    })  //END
        
		
		//GetEmployee()=Get EmployeeId
		$scope.GetEmployee=function(intEmpId){
			
			 window.localStorage['intEmpId']=intEmpId;
			 var OnDayDate= new Date();
			 $scope.intEmpId=intEmpId;
			//alert(intEmpId)
			
		
		
		//Get ProductName
		var path=window.localStorage['path'];
	    var nUserId=window.localStorage['UserId'];
		//var nEmpId=window.localStorage['EmpId'];
	    var Producturl ="http://localhost:40432/webservice/Product.asmx/GetNewProduct?nUserId=1"; //static path
	 
		$http.get(Producturl).then(function (resp) {
		
			console.log(resp.data);
			$scope.Product = resp.data;
			$ionicLoading.hide();
			
		}, function (err) {
		
        console.error('ERR', err);
  
    })  //END
	
	        //GetPrice()=Get ProductId Price
	        $scope.GetPrice=function(ProductId){
			
		    window.localStorage['ProductId']=ProductId;
			$scope.ProductId=ProductId;
			//alert(ProductId)
	
		
		//Get Product Price
	    var path=window.localStorage['path'];
	    var UserId=window.localStorage['UserId'];
		var nProductId=window.localStorage['ProductId'];
	    var Producturl ="http://localhost:40432/webservice/Product.asmx/Select_Product_Details?&nProductId="+ProductId+"&UserId=1"; //static path
	 
		$http.get(Producturl).then(function (resp) {
		
			console.log(resp);
			$scope.Price = resp.data[0].fPrice;	
			//alert($scope.Price);
			$ionicLoading.hide();
			
		}, function (err) {
		
        console.error('ERR', err);
  
    }) //END
	
	
	        //Get EmployeeTime
			var EmployeeTimeurl ="http://www.vite.biz/ttm/webservice/EmployeeAppointment.asmx/GetAllTimingByEmplyeeIdAnddate?nEmployeeId="+intEmpId+"&EmpDateForShedual="+window.localStorage['OnDayDate']+"&intUserId=1"; //static path
	
	    	$http.get(EmployeeTimeurl).then(function (resp) {
		
			console.log(resp.data);
			$scope.EmployeeAppointment= resp.data;
			$ionicLoading.hide();
			
			
		}, function (err) {
			console.error('ERR', err);
    })	//END
	   
		}//End GetPrice()
	
	}//End GetEmployee()
	
}//End GetCustId()	
			
	   
	   
	   $scope.TodayDate={};
	   var path = window.localStorage['path'];
	   var nUserId= window.localStorage['UserId'];
    
	// for DatePicker
	    $scope.datePicker = function(){
		$scope.pickerDate=true;
		
	}
		
	
	$scope.datepickerObject = {

      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      templateType: 'popup', //Optional
      from: new Date(2012, 2, 8), //Optional
      to: new Date(2018, 25, 8),  //Optional
      callback: function (val) {  //Mandatory
        datePickerCallback(val);
      },
      dateFormat: 'dd-MM-yyyy', //Optional
      closeOnSelect: false, //Optional
	  
    }
	
	var datePickerCallback = function (val) {
		 $scope.TodayDate.date=false;
		
			 if (typeof(val) === 'undefined') 
			 {
				$scope.OnDayDate = 'Select Date';
				$scope.OnDayDate1 = 'Select Date';
				
			} 
			else 
			{
			  console.log('Selected date is : ', val)
			  
			        //var date = new Date(val);
				    var OnDayDate= new Date(val);
					//var OnDayDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() ;
				    var dd = OnDayDate.getDate();
			        var mm = OnDayDate.getMonth()+1; //January is 0!

			        var yyyy = OnDayDate.getFullYear();	
				    if(dd<10){
						dd='0'+dd
			        } 
			        if(mm<10){
						mm='0'+mm
			        } 
			        
					var OnDayDate = yyyy+'-'+mm+'-'+dd;
					//var OnDayDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() ;
					window.localStorage['OnDayDate'] = OnDayDate;
					$scope.OnDayDate = OnDayDate;	
	         	
				
			        //GetTime
				    var intEmpId=window.localStorage['intEmpId'];
			        //alert($scope.intEmpId)
			        var intEmpId=$scope.intEmpId
		
					var EmployeeTimeurl ="http://www.vite.biz/ttm/webservice/EmployeeAppointment.asmx/GetAllTimingByEmplyeeIdAnddate?nEmployeeId="+intEmpId+"&EmpDateForShedual="+window.localStorage['OnDayDate']+"&intUserId=1"; //static path
	
		            $http.get(EmployeeTimeurl).then(function (resp) {
		
			        console.log(resp.data);
			        $scope.EmployeeAppointment= resp.data;
			        $ionicLoading.hide();
			
			
		            }, function (err) {
			        console.error('ERR', err);
                 })	//END
	
	   }//END else
	   
	} //END DatePickerCallback

	
	 $scope.GetLocation = function(nStoreId,strStoreLocation){
		//alert(nStoreId);
		    window.localStorage['nStoreId']=nStoreId;
		    window.localStorage['strStoreLocation']=strStoreLocation;
	}
	
	$scope.EmployeeTime={};
    $scope.AddEmployee = function() {
	 
		    var dt=$scope.TodayDate.date;
		    var Time=$scope.EmployeeTime.Time;
		    var ntotalPerson=0;	
		    var nEmployeeId=window.localStorage['intEmpId'];
		    var cAppointmentTitle='today';
		    var cAppointmentDesc='Meeting';
		    var dtStartDate=dt+' '+Time;	 
		    var dtEndDate=dt+' '+Time;
		    var cAlert='no';
		    var cStatus='no';
			
		    var nCustomerId=window.localStorage['nCustomerId'];
		    var nUserId= window.localStorage['UserId'];
		    var nLeadId=window.localStorage['ProductId'];
		    var nLanguageId=1;
		    var nStoreId= window.localStorage['nStoreId'];
		    var cLocation=window.localStorage['strStoreLocation'];
			
			var IsActive=true;
			var IsDisable=false;
			var cRemark1='no';
			var cRemark2='no';
			var cRemark3='no';
			var cRemark4='no';
			
	if(dt!='')
	{
		$http({
						method: 'POST',
						url:'http://localhost:40432/webservice/AppoinmentEmployee.asmx/InsertAppointment',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
								return str.join("&");
							},
							data: { cAppointmentTitle: cAppointmentTitle,
								cAppointmentDesc: cAppointmentDesc, 
								cLocation:cLocation, 
								dtStartDate:OnDayDate+' '+Time,
								dtEndDate: OnDayDate+' '+Time,
								cAlert:cAlert,
								nEmployeeId: nEmployeeId, 
								nCustomerId: nCustomerId,
								nStoreId: nStoreId,
								nNoOfPeople:ntotalPerson,
								nUserId: nUserId, 
								nLanguageId: nLanguageId,
								IsActive:IsActive,
								IsDisable:IsDisable,
								cRemark1:cRemark1,	
								cRemark2:cRemark2,	
								cRemark3:cRemark3,
								cRemark4:cRemark4,
								cStatus:cStatus,
								nLeadId:nLeadId     //ProductId=LeadId
							}
							}).success(function (response) {
						
						console.log(response.Success);
						if(response.Success == 0) {
							
							ionicToast.show('Employee Already Exist', 'middle', false, 2500);
							$ionicLoading.hide();
							
						}
						else {			
							ionicToast.show('Employee Appoinment Successfully', 'middle', false, 2500);
							window.location = "#/app/mainpage";
							$ionicLoading.hide();					
						}
						})
	
}	
else
			{
				var OnDayDate=window.localStorage['OnDayDate'];
					
				$http({
						method: 'POST',
						url:'http://localhost:40432/webservice/AppoinmentEmployee.asmx/InsertAppointment',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
								return str.join("&");
							},
							data: { cAppointmentTitle: cAppointmentTitle,
								cAppointmentDesc: cAppointmentDesc, 
								cLocation:cLocation, 
								dtStartDate:OnDayDate+' '+Time,
								dtEndDate: OnDayDate+' '+Time, 
								cAlert:cAlert,
								nEmployeeId: nEmployeeId, 
								nCustomerId: nCustomerId,
								nStoreId: nStoreId,
								nNoOfPeople:ntotalPerson,
								nUserId: nUserId, 
								nLanguageId: nLanguageId,
								IsActive:IsActive,
								IsDisable:IsDisable,
								cRemark1:cRemark1,	
								cRemark2:cRemark2,	
								cRemark3:cRemark3,
								cRemark4:cRemark4,
								cStatus:cStatus,
								nLeadId:nLeadId    //ProductId=LeadId
							}
					}).success(function (response) {
						
						console.log(response.Success);
						
						if(response.Success == 0) {	
							ionicToast.show('Appoinment already exists', 'middle', false, 2500);
							$ionicLoading.hide();	
						} 
						else {		
							ionicToast.show('Appoinment Insert Successfully', 'middle', false, 2500);
							window.location = "#/app/mainpage";
							$ionicLoading.hide();
						}
					})				
			}
			
		}	 
})


.controller('DisplayEmployee', function ($scope, $http,$location,ionicToast,$ionicPopup,$ionicLoading) {
	     

        //Get 		
		var path=window.localStorage['path'];
	    //var nUserId=window.localStorage['UserId'];
		//var nCustomerId=window.localStorage['CustomerId']
		//var nEmpId=window.localStorage['EmpId'];
	    var path ="http://localhost:40432/webservice/AppoinmentEmployee.asmx/"; //static path
	    var UserId=1;
		var CustomerId=1;
		
		if(UserId > 0){
		
		$http({
					method: 'POST',
					url: path + 'SelectEmployeeDataDisplay',
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
					data: { nUserId : UserId,nCustomerId: CustomerId},
					transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
					
				}).success(function (response) {
					
					var success = response;
					
					if(success != 0){
						$scope.AppoinmentEmployee = response;
					}
					else{
						alert('Data not available');
					}				 				
				});			
	}  
    }) //END
	
 
.controller('AddExpense', function ($scope, $http,$location,ionicToast,$ionicPopup,$ionicLoading) {

	
	 //Insert Expense     
	$scope.Expense={};
    $scope.AddExpense = function() {
		
		
		var dtDate=$scope.Expense.dtDate;
		var fAmount=$scope.Expense.fAmount;
		var cPayee=$scope.Expense.cPayee;
	    var cCategory=$scope.Expense.cCategory;
	    var cPaymentMode=$scope.Expense.cPaymentMode;
		var cDescription=$scope.Expense.cDescription;
		var cPhoto=$scope.Expense.cPhoto;
		var IsActive=$scope.Expense.IsActive;
		var nEmployeeId=window.localStorage['intEmpId'];
		var nUserId=window.localStorage['UserId'];

		$http({
						method: 'POST',
						url:'http://localhost:43871/WebServices/Expense.asmx/InsertExpense',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
								return str.join("&");
							},
							data: {nEmployeeId:nEmployeeId,
								nUserId:nUserId,  
								dtDate:dtDate,
								fAmount:fAmount,
								cPayee: cPayee, 
							    cCategory: cCategory,
								cPaymentMode: cPaymentMode,
								cDescription:cDescription,
								cPhoto: cPhoto, 
								IsActive:IsActive
							}
							}).success(function (response) {
						
						console.log(response.Success);
						if(response.Success == 0) {
							
							ionicToast.show('Expense Already Exist', 'middle', false, 2500);
							$ionicLoading.hide();
							
						}
						else {		
						//$scope.AddExpense = resp.data;	
						//response.ExpenseID
						 //alert(response.ExpenseID);
                        window.localStorage['ExpenseId'] = response.ExpenseID;
								//alert('ExpenseId');
							ionicToast.show('Expense Insert Successfully', 'middle', false, 2500);
							$ionicLoading.hide();
						
						     }
						})
			
		window.location="#/app/ExpenseList";
	
	}		
})
	
.controller('ExpenseList', function ($scope, $http,$location,$ionicLoading,ionicToast) {
		
	var path = window.localStorage['path'];
	var nUserId = window.localStorage['UserId'];
	var nExpenseId=window.localStorage['ExpenseId'];
	//alert(nExpenseId);
	$scope.ExpenseId=nExpenseId;
	

		
		var AllExpenseListurl ="http://localhost:43871/WebServices/Expense.asmx/SelectAllExpense?ExpenseId"+nExpenseId+"&nUserId=4";
		$http.get(AllExpenseListurl).then(function (resp) {
		$scope.ExpenseList = resp.data;
        window.localStorage['ExpenseList'] = JSON.stringify(resp.data);
		
		$ionicLoading.hide();
		}, function (err) {
			console.error('ERR', err);
			ionicToast.show('No Expense', 'middle', false, 2500);
			
		})
})

