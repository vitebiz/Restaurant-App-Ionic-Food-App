(function () {
    'use strict';
var app = angular.module('vitebizFMS');

app.controller('ShowProduct', function ($scope, $http, $location,ionicToast,$ionicPopup,$ionicLoading) {
	 
	 var path=window.localStorage['path'];
	var nUserId=window.localStorage['UserId'];
	
	  var Producturl = path+"Product.asmx/SelectAllProduct?UserId=" + nUserId;
				$ionicLoading.show({
	
					content: 'Loading..',
					animation: 'fade-in',
					showBackdrop: false,
					maxWidth: 0,
					showDelay: 0
				});
		$http.get(Producturl).then(function (resp) {
			
			
			
			if(resp.data[0]['Success'] == 0){
				$scope.notfound = true;
				$ionicLoading.hide();
			}else{
				$scope.Productlist = resp.data;
				$ionicLoading.hide();
			}
			
		}, function (err) {
			console.error('ERR', err);
    })
	
	 $scope.AddProduct = function () {
		  
		    window.location.href = '#/app/addProducts';
		  
	  }
	  
	  
	  
	   $scope.bindProductDetails = function (nProductId,cName) {
		  
		   
		 window.location = "#/app/ProductDetails?ProductId="+nProductId;
			window.localStorage['nProductId']=nProductId;	   
				
				
						   
	   }
	   
	    var CurrencySymbolurl = path+"Login.asmx/UserInformation?nUserId=" + nUserId;
	   	$http.get(CurrencySymbolurl).then(function (resp) {
			
			$scope.Currency = resp.data;
			$scope.cCurrency=resp.data[0].cCurrency;
			//console.log($scope.cCurrency );
			
		}, function (err) {
			console.error('ERR', err);
    })
	
	 
 })
 
 /////////// For Product Details
 .controller('ProductDetails', function ($scope, $http, $location,ionicToast,$ionicPopup) {
	  
	   var path=window.localStorage['path'];
	var nUserId=window.localStorage['UserId'];
	var nProductId=window.localStorage['nProductId'];	
	
	var ProductDetailurl = path+"Product.asmx/SelectRow?nProductId=" + nProductId+"&UserId="+nUserId;
	
		$http.get(ProductDetailurl).then(function (resp) {
			
			$scope.ProductDetaillist = resp.data;
			
			
		}, function (err) {
			console.error('ERR', err);
    })
	
	  
	  
	 $scope.EditProduct = function () {
		 
		 
		  window.location = "#/app/EditProduct?ProductId="+nProductId;
			window.localStorage['ProductId']=nProductId;	   
	 }
	  
	   var CurrencySymbolurl = path+"Login.asmx/UserInformation?nUserId=" + nUserId;
	   	$http.get(CurrencySymbolurl).then(function (resp) {
			
			$scope.Currency = resp.data;
			$scope.cCurrency=resp.data[0].cCurrency;
			//console.log($scope.cCurrency );
			
		}, function (err) {
			console.error('ERR', err);
    })
	
	  
  })

 //Add Product 
.controller('addProducts', function ($scope, $http,$location,ionicToast,$ionicPopup,$ionicLoading) {
	
	
	
	var imageApi = window.localStorage['imageUploadApi'];	
	var imageFolder = window.localStorage['imageFolder'];	
	
	var emiratespath = imageFolder;
	
	
	$scope.items = [];
		$scope.setFile = function(element) {
			
			$ionicLoading.show({
			  template: 'Uploading...'
			});
		
			$scope.currentFile = element.files[0];
			var reader = new FileReader();
			var seconds = new Date().getTime();
		
			reader.onload = function(event) {

				$scope.items.push({
					nImageId: seconds,
					cImage:	seconds+".jpg",
					image_source: event.target.result
				});
		
				var wishData=JSON.stringify($scope.items);	//first stored as string
				
				window.localStorage['eventImages'] = wishData;
				$scope.imageUpload = false;
				var userWishData = JSON.parse(window.localStorage['eventImages']);
					//second retrieved as object
					$scope.ImageBaseCode=userWishData[0]['image_source'];
					//window.localStorage['BaseCode']=$scope.ImageBaseCode;
				console.log(userWishData[0]['image_source']);
				//$scope.defaultImg = false;
				$scope.items = userWishData;
				$scope.lengthImg = userWishData.length;
				//window.location="#/app/event?eventId="+window.localStorage['eventId']+"&name="+window.localStorage['eventName'];
			}
			$ionicLoading.hide();
		reader.readAsDataURL(element.files[0]);
		}
	
	
	
	var path=window.localStorage['path'];
	var nUserId=window.localStorage['UserId'];
	$scope.CurruncyLogo=window.localStorage['CurruncyLogo'];
	//$scope.Inventory.Val='Don`t track inventory';
	
	//$scope.Warranty.Type='Not Applicable';
	//Select Category
	 var Categoryurl = path+"Category.asmx/SelectAllCategory?UserId=" + nUserId;
	
		$http.get(Categoryurl).then(function (resp) {
			
			$scope.List = resp.data;
			//window.localStorage['ProductSubCategory'] = JSON.stringify(resp.data);
			$ionicLoading.hide();
			
		}, function (err) {
			console.error('ERR', err);
    })
	
	
		$scope.Category = function (intCategoryId) {
			
			window.localStorage['intCategoryId']=intCategoryId;
		}
	
	
	//Select Tax
	
	 var Taxurl = path+"Tax.asmx/SelectAllTax?UserId=" + nUserId;
	
		$http.get(Taxurl).then(function (resp) {
			
			$scope.ListTax = resp.data;
			//window.localStorage['ProductSubCategory'] = JSON.stringify(resp.data);
			$ionicLoading.hide();
			
		}, function (err) {
			console.error('ERR', err);
    })
	
	     $scope.Tax = function (nTaxId) {
			
				 //alert(nTaxId);
			
					 var Tax = path+"Tax.asmx/SelectRow?nTaxId=" + nTaxId+"&nUserId=" + nUserId;
			
				     $http.get(Tax).then(function (resp) {
					
					$scope.TaxData = resp.data;
					$scope.taxPer=resp.data[0].fTaxPercentage;
					
					var tp=$scope.taxPer;
					window.localStorage['tp']=tp;
					console.log($scope.taxPer);
				
					
				}, function (err) {
					console.error('ERR', err);
			})
			
		
			
			var Price = 0;
            var Persantage = 0;
			
			$scope.intPrice=$scope.AddProduct.Price;
			var Price1=$scope.intPrice;
			//alert(Price1);
			console.log($scope.intPrice)
			//alert($scope.intPrice)
			
		
				var taxPersantage=window.localStorage['tp'];
			
			
				$scope.FinalPrice = ($scope.intPrice * taxPersantage / 100);
				
			
				$scope.total=(+$scope.intPrice+ +$scope.FinalPrice);
				
				console.log($scope.total);
				//alert($scope.total)
				window.localStorage['FinalPrice']=$scope.total;
				
				window.localStorage['nTaxId']=nTaxId;
				
			
			
		}
	
	
	
	//select Selling unit
	
	
	$scope.Quantity={};
	 var SellingUniturl = path+"Quantity.asmx/SelectAllSellingUnit?UserId=" + nUserId;
	
		$http.get(SellingUniturl).then(function (resp) {
			
			$scope.ListSellingUnit = resp.data;
			$scope.Val=resp.data[1].nQuantityId;
			
			var sellingUnitId=$scope.Val;
			
			
			$scope.Quantity.setDefaultQuantity=sellingUnitId;
			
		
			
			//window.localStorage['ProductSubCategory'] = JSON.stringify(resp.data);
			$ionicLoading.hide();
			
		}, function (err) {
			console.error('ERR', err);
    })
	//console.log(Quantity.setDefaultQuantity);
	
	$scope.Selling = function (nQuantityId) {
			//alert(nQuantityId);
			window.localStorage['nQuantityId']=nQuantityId;
		}
	
	
	
		
    $scope.inventoryPolicy = function () {
		 
			//alert('hello');
			//inventoryName window.localStorage['inventoryPolicy']=inventoryName;
		}
	 
	
	$scope.Quantity.Inventory = 'Don`t track inventory';
	//$scope.blisterPackTemplates = {};
  $scope.changedValue = function() {
    //alert($scope.Quantity.Inventory);
	var inventoryName=$scope.Quantity.Inventory;
	window.localStorage['inventoryPolicy']=inventoryName;
	
  }    
  
  
  $scope.Warranty={};
		$scope.Warranty.Type = 'Not Applicable';
	//$scope.blisterPackTemplates = {};
  $scope.changedType = function() {
    //alert($scope.Warranty.Type);
	var WarrantyType=$scope.Warranty.Type;
	window.localStorage['Warranty']=WarrantyType;
	
  } 
	
	// Save
	
	//$scope.Produtc={};
	
	$scope.AddProduct = function () {
	
	var imageSource=window.localStorage['eventImages'];
	
		//var imageSource = JSON.parse(window.localStorage['eventImages']);
	
		//console.log(imageSource[0]['image_source']);
					//var imageSource = window.localStorage['BaseCode'];
				
					//console.log(imageSource);
					//var fileName = new Date().getTime();
			
		  // var ImagePath="http://localhost:5326/FMS/WebServices/Product.asmx/UploadImage?strcode="+imageSource[0]['image_source']+"&imgName="+imageSource[0]['nImageId'];
							// $http.get(ImagePath).then(function (resp) {
				
					// localStorage.removeItem('eventImages');
				// console.log(resp);
				
				
			// }, function (err) {
				// console.error('ERR', err);
		// })
		
		
		
		      
				
	
	if(imageSource==undefined || imageSource=='')
	{
		 var FolderPath='~/Design/assets/images/placeholder.jpg';
	}
	else
	{
		var imageSource = JSON.parse(window.localStorage['eventImages']);
		
	  var FolderPath='~/Product/ProductImage/'+imageSource[0]['cImage'];

                    $http({
						method: 'POST',
						url:path+'Product.asmx/UploadImage',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
							return str.join("&");
						},
						data: { strcode: imageSource[0]['image_source'], 
							imgName:imageSource[0]['cImage']
						
							}
				 }).success(function (response) {
				
				  
				 })	  
	}
	
	
	var UnitType=window.localStorage['nQuantityId'];
	
	if(UnitType==undefined || UnitType=='')
	{		
		var SellingUnit=$scope.Quantity.setDefaultQuantity;
	}
	else
	{
		var SellingUnit=window.localStorage['nQuantityId'];
	}
	
	
	var WT=window.localStorage['Warranty'];
	 //alert(WT);
	if(WT==undefined || WT=='')
	{
		var cWarrantyType='Not Applicable';
	}
	else
	{
	  var cWarrantyType=window.localStorage['Warranty'];
	}
	
	var CategoryId=window.localStorage['intCategoryId'];
	//alert(CategoryId);
	if($scope.AddProduct.Weight==undefined)
	{
		var nWeight=0;
	}
	else
	{
		var nWeight=$scope.AddProduct.Weight;
	}
	if($scope.AddProduct.SKU==undefined)
	{
		var cSKU='';
	
	}
	else
	{
		var cSKU=$scope.AddProduct.SKU;
	}
	
	if($scope.AddProduct.PD==undefined)
	{
		var ProductDescription='';
	}
	else
	{
		var ProductDescription=$scope.AddProduct.PD;
	}
	
	if($scope.AddProduct.PSD==undefined)
	{
		var ShortDescription='';
	}
	else
	{
		var ShortDescription=$scope.AddProduct.PSD;
	}
	
	var TaxId=window.localStorage['nTaxId'];

		 //var nTaxId=window.localStorage['nTaxId'];
		 var FinalPrice=window.localStorage['FinalPrice'];
	
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
	
		var inventoryName=window.localStorage['inventoryPolicy'];
		console.log(inventoryName);
		//alert(inventoryName);
		if(inventoryName==undefined || inventoryName=='')
		{
			IsTrackInventory=false;
		}
		else
		{
			IsTrackInventory=true;
		}
		
		
	
	
		var nAttributeSetId=1;
		var nOptionTemplatesId=1;
		var cName=$scope.AddProduct.Name;
		var cDescription=ProductDescription;
		var cShortDescription=ShortDescription;
		var cSKU=cSKU;
		var nWeight=nWeight;
		var fPrice=$scope.AddProduct.Price;
		var nSpecialPrice=0;
		var dtSpecialPriceFrom=today;
		var dtSpecialPriceTo=today;
		var cMetaTitle=$scope.AddProduct.Name;
		var cMetaDescription=ProductDescription;
		var nBaseCurrencyId=0;
		var nParentProductId=0;
		var nTaxId=TaxId;
		var IsActive=true;
		var nUserId=window.localStorage['UserId'];
		var cCsvFile="";
		var cUrlKey="";
		var dtCreatedDate=today;
		var nLanguageId=1;
		var IsDisable=false;
		var cRemark1="";
		var cRemark2="";
		var cRemark3="";
		var cImage=FolderPath;
		var nMinimumStockAlert=0;
		var IsTrackInventory=IsTrackInventory;
		var IsVirualProduct=true;
		var IsFeatured=true;
		var dtNewProductFrom=today;
		var dtNewProductTo=today;
		var cWarrantyType=cWarrantyType;
		var nWarrentyDuration=0;
		var nWarrentyId=0;
		var cProductCode="";
		var cProductUniqueCode="";
		var fMRP=$scope.AddProduct.Price;//FinalPrice;
		var nProductType=2;
		var nQuantityId=SellingUnit;
		
	
		
		if(cDescription==undefined)
		{
			cDescription="";
		}
		if(cShortDescription==undefined)
		{
			cShortDescription="";
		}
		
		if(Boolean(CategoryId))
		{
			if(cName!=undefined)
			{
				
				if(fPrice!=undefined)
				{
					if(TaxId=='' || TaxId==undefined)
					{
						ionicToast.show('Please Select Tax', 'middle', false, 2500);
						$ionicLoading.hide();
					
				
				
					
					}
					else
					{
						 $http({
						method: 'POST',
						url:path+'Product.asmx/InsertProductData',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
							return str.join("&");
						},
						data: { nAttributeSetId: nAttributeSetId, 
							nOptionTemplatesId:	nOptionTemplatesId, 
							cName:cName, 
							cDescription:cDescription, 
							cShortDescription:cShortDescription,
							cSKU:cSKU, 
							nWeight:nWeight,
							fPrice: fPrice, 
							nSpecialPrice: nSpecialPrice,
							dtSpecialPriceFrom: dtSpecialPriceFrom,
							dtSpecialPriceTo:dtSpecialPriceTo,
							cMetaTitle: cMetaTitle, 
							cMetaDescription: cMetaDescription,
							nBaseCurrencyId: nBaseCurrencyId,
							nParentProductId:nParentProductId,
							nTaxId:nTaxId,
							IsActive: IsActive,
							nUserId: nUserId,
							cCsvFile:cCsvFile,
							cUrlKey:cUrlKey,
							dtCreatedDate: dtCreatedDate,
							nLanguageId:nLanguageId,
							IsDisable:IsDisable,
							cRemark1:cRemark1,
							cRemark2: cRemark2, 
							cRemark3: cRemark3, 
							cImage: cImage,
							nMinimumStockAlert:nMinimumStockAlert,
							IsTrackInventory:IsTrackInventory,
							IsVirualProduct:IsVirualProduct,
							IsFeatured:IsFeatured,
							IsFeatured:IsFeatured,
							dtNewProductFrom:dtNewProductFrom,
							dtNewProductTo:dtNewProductTo,
							cWarrantyType:cWarrantyType,
							nWarrentyDuration:nWarrentyDuration,
							nWarrentyId:nWarrentyId,
							cProductCode:cProductCode,
							cProductUniqueCode:cProductUniqueCode,
							fMRP:fMRP,
						    nQuantityId:nQuantityId
							
							
						
							}
				 }).success(function (response) {
				
				   if(response.Success == 3)
					{
						ionicToast.show('Product Already Exists', 'middle', false, 2500);
						$ionicLoading.hide();
					}
					else
					{
						var nProductId=response.ID;
						
						
									 $http({
						method: 'POST',
						url:path+'dtlProductCategory.asmx/InsertProductData',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
							return str.join("&");
						},
						data: { nProductId: nProductId, 
							nCategoryId:window.localStorage['intCategoryId'],
							IsActive:true,
							nUserId:nUserId,
							IsDisable: false, 
							cRemark: "", 
							cRemark1: "",
							cRemark2:""
							
							}
					 }).success(function (response) {
							ionicToast.show('Product Add Successfully', 'middle', false, 2500);
							window.localStorage['FinalPrice']='';
							window.localStorage['nTaxId']='';
							window.localStorage['inventoryPolicy']='';
							window.localStorage['intCategoryId']='';
							window.localStorage['Warranty']='';
							window.localStorage['nQuantityId']='';
							//localStorage.removeItem('eventImages');
							window.localStorage['eventImages']='';
							window.location = "#/app/ShowProduct";
							$ionicLoading.hide();
											
					});

					}					
				});
					}
					
				}
				else
				{
					 ionicToast.show('Please enter Product Price', 'middle', false, 2500);
						$ionicLoading.hide();
				}
			}
			else
			{
				  ionicToast.show('Please enter Product Name', 'middle', false, 2500);
						$ionicLoading.hide();
			}
		}
		else
		{
			ionicToast.show('Please Select Category', 'middle', false, 2500);
						$ionicLoading.hide();
		}
		
	}
	
	
})

///////////////////For Edit ProductDescription
.controller('EditProduct', function ($scope, $http, $location,ionicToast,$ionicPopup,$ionicLoading) {
	 
	 
	var path=window.localStorage['path'];
   var nProductId=window.localStorage['ProductId'];
   
   
   
   $scope.items = [];
		$scope.setFile = function(element) {
			
			$ionicLoading.show({
			  template: 'Uploading...'
			});
		
			$scope.currentFile = element.files[0];
			var reader = new FileReader();
			var seconds = new Date().getTime();
		
			reader.onload = function(event) {

				$scope.items.push({
					nImageId: seconds,
					cImage:	seconds+".jpg",
					image_source: event.target.result
				});
		
				var wishData=JSON.stringify($scope.items);	//first stored as string
				
				window.localStorage['eventImages'] = wishData;
				$scope.imageUpload = false;
				var userWishData = JSON.parse(window.localStorage['eventImages']);
					//second retrieved as object
					$scope.ImageBaseCode=userWishData[0]['image_source'];
					//window.localStorage['BaseCode']=$scope.ImageBaseCode;
				console.log(userWishData[0]['image_source']);
				//$scope.defaultImg = false;
				$scope.items = userWishData;
				$scope.lengthImg = userWishData.length;
				//window.location="#/app/event?eventId="+window.localStorage['eventId']+"&name="+window.localStorage['eventName'];
			}
			$ionicLoading.hide();
		reader.readAsDataURL(element.files[0]);
		}
	
	
   

   $scope.EditProductdata = {};
   
  var nUserId = window.localStorage['UserId'];
  var data='';
 
 
 	//var Productlurl = path+"Product.asmx/SelectRow?nProductId=" +nProductId+"&UserId="+nUserId;
	
	var Productlurl = path+"Product.asmx/SelectRowForProductCategory?nProductId=" +nProductId+"&nUserId="+nUserId;
 

     $http.get(Productlurl).then(function (resp) {
      
        
		$scope.EditProductdata = resp.data;
		data=resp.data;
		
		var ProductData = JSON.stringify(resp.data);
	    //console.log(userData);
		window.localStorage['ProductUpdate'] = ProductData;
		
		$scope.nCategoryId=resp.data[0].nCategoryId;
		
		/*
			select all category
		*/
		
			
	 var Categoryurl = path+"Category.asmx/SelectAllCategory?UserId=" + nUserId;
	
		$http.get(Categoryurl).then(function (resp) {
			
			$scope.CategoryList = resp.data;
			
			
			//$scope.EditProductdata.intCategoryId=resp.data[0].intCategoryId;
			$scope.categoryID = resp.data[0].intCategoryId;
			for(var i=0; i < resp.data.length; i++){
				
			
				console.log(resp.data[i].intCategoryId);
				if($scope.nCategoryId==resp.data[i].intCategoryId)
				{
					  $scope.EditProductdata.intCategoryId =$scope.nCategoryId;	
					  console.log($scope.EditProductdata.intCategoryId);
				}
				
				
				
			
				
				
				
			}
			/*if($scope.nCategoryId == $scope.EditProductdata.intCategoryId){
				
				alert(true);
				$scope.EditProductdata.intCategoryId = 'selected';
				$scope.EditProductdata.intCategoryId = true;
			}else{
				
				alert(false);
				//$scope.EditProductdata.intCategoryId = 'selected';
				$scope.EditProductdata.intCategoryId = false;
			}*/
		    //console.log($scope.EditProductdata.intCategoryId);
		    //$scope.EditProductdata.intCategoryId=$scope.EditProductdata[0].intCategoryId;
			//console.log($scope.CategoryList);
			
			/*if(Boolean($scope.nCategoryId == resp.data[0].intCategoryId)){
			 
				$scope.EditProductdata.intCategoryId = 'selected';
				
			}*/
			
			
		}, function (err) {
			console.error('ERR', err);
    })
		
		/*end*/
		
		
		
		$scope.Inventory=resp.data[0].IsTrackInventory;
		
		$scope.fMRP=resp.data[0].fMRP;
		
		
		$scope.nProductId=resp.data[0].nProductId;
		
	   $scope.fPrice=resp.data[0].fPrice;
	   
	   $scope.TaxId=resp.data[0].nTaxId;
	   
	   $scope.nUnitType=resp.data[0].nUnitType;
	   
		
	   
	   //$scope.EditProductdata.setDefaultTax=$scope.nTaxId;
	
		
		$scope.cDescription=resp.data[0].cDescription;
		
	   $scope.cShortDescription=resp.data[0].cShortDescription;
	
		
		
		if($scope.Inventory==false)
		{
			
			$scope.inventoryName=0;
			
		}
		else
		{
			$scope.inventoryName=1;
		}
	
	
	       $scope.Warranty=resp.data[0].cWarrantyType;
		
			$scope.WarrantyName= $scope.Warranty;
			
			
		if($scope.cDescription==undefined)
		{
			
			cDescription="";
		}
		if($scope.cShortDescription==undefined)
		{
			cShortDescription="";
		}	
			
		//$scope.EditProductdata = {};
		 // var Productlurl = path+"dtlProductCategory.asmx/SelectCategory?nUserId=" +nUserId+"&nProductId="+nProductId;
		
		 // $http.get(Productlurl).then(function (resp) {
			 
			  //$scope.Editdata = resp.data;
			 
			/* console.log(resp.data[0]['nCategoryId']);
			 $scope.catId = resp.data[0]['nCategoryId'];
			 
			 $scope.catId = 'selected';
			if(Boolean($scope.EditProductdata.intCategoryId == resp.data[0].nCategoryId)){
				
				$scope.EditProductdata.intCategoryId = 'selected';
				
				
			}*/
			  //EditProductdata.intCategoryId=resp.data[0].nCategoryId;
			 // alert(resp.data[0].nCategoryId);
			 // $scope.EditProductdata.intCategoryId=resp.data[0].nCategoryId;
			  
			// alert($scope.EditProductdata.intCategoryId);
			 
		 // });
			
       
    });	
        
  
	
	
	 
	 
	  var Taxurl = path+"Tax.asmx/SelectAllTax?UserId=" + nUserId;
	
		$http.get(Taxurl).then(function (resp) {
			
			$scope.TaxList = resp.data;
			//$scope.EditProductdata.nTaxId=resp.data[0].nTaxId;
			
			
			for(var i=0; i < resp.data.length; i++){
				
			
				console.log(resp.data[i].nTaxId);
				if($scope.TaxId==resp.data[i].nTaxId)
				{
					 
					  $scope.EditProductdata.nTaxId =$scope.TaxId;	
					
				}
				
				
			}
		
			
		}, function (err) {
			console.error('ERR', err);
    })
	 
	 
	 
	 
	  var SellingUniturl = path+"Quantity.asmx/SelectAllSellingUnit?UserId=" + nUserId;
	
		$http.get(SellingUniturl).then(function (resp) {
			
			$scope.SellingUnitList = resp.data;
			$scope.nQuantityId=resp.data[0].nQuantityId;
			for(var i=0; i < resp.data.length; i++){
				
			
				console.log(resp.data[i].nQuantityId);
				if($scope.nUnitType==resp.data[i].nQuantityId)
				{
					  $scope.EditProductdata.nQuantityId =$scope.nUnitType;	
					  console.log($scope.EditProductdata.nQuantityId);
				}
				
				
			}
			
		}, function (err) {
			console.error('ERR', err);
    })
	 
	
	 // Update Product
	 if(Boolean(window.localStorage['ProductUpdate']))
	   var Product = JSON.parse(window.localStorage['ProductUpdate']);
   
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
	
	 

	 
	      $scope.EditTax = function (nTaxId) {
			  
		
			  
			
		     $scope.intnTaxId=nTaxId;
			
					 var Taxu = path+"Tax.asmx/SelectRow?nTaxId=" + nTaxId+"&nUserId=" + nUserId;
			
				     $http.get(Taxu).then(function (resp) {
					
					$scope.TaxData = resp.data;
					
					$scope.fTaxPercentage=resp.data[0].fTaxPercentage;
					console.log($scope.fTaxPercentage);
					
					
					
					//Tax Calculate
					
					var Price = 0;
            var Persantage = 0;
		
			
			//$scope.intPrice=$scope.fPrice;
			//$scope.intPrice=$scope.EditProductdata.fPrice;
			
			$scope.intPrice=$scope.EditProductdata[0].fPrice;
			//alert($scope.intPrice);
					
		
			var edittaxPersantage=$scope.fTaxPercentage;
			
			
			$scope.FinalPrice = ($scope.intPrice * edittaxPersantage / 100);
			
			
			$scope.total=($scope.intPrice+$scope.FinalPrice);	
					
					//end 
							
				   window.localStorage['nTaxId']=nTaxId;
					
				}, function (err) {
					console.error('ERR', err);
			})
			
			
			
			window.localStorage['nTaxId']=nTaxId;
			
		}
	
		$scope.EditCategory = function (intCategoryId) {
		  //alert(intCategoryId);
			 $scope.intCategoryId=intCategoryId;
			 window.localStorage['intCategoryId']=$scope.intCategoryId;
			//alert($scope.intCategoryId);
		}
	
	
	$scope.EditSelling = function (nQuantityId) {
			
			  $scope.intnQuantityId=nQuantityId;
			
			  $scope.EditProductdata.nQuantityId=nQuantityId;
			window.localStorage['nQuantityId']=$scope.EditProductdata.nQuantityId;
		}
	
	$scope.EditWarrantyType = function (Name) {
	
			//window.localStorage['WarrantyType']=Name;
		  $scope.EditProductdata.WarrantyName=Name;
		  window.localStorage['WarrantyType']=$scope.EditProductdata.WarrantyName;
		 // alert($scope.EditProductdata.WarrantyName);
		//alert($scope.EditProductdata.WarrantyName);
       //alert($scope.EditProductdata.WarrantyName);
			//window.localStorage['WarrantyType'];
		}
		
   $scope.EditinventoryPolicy = function (inventoryName) {
		 
		
			 //window.localStorage['inventoryPolicy']=inventoryName;
			 $scope.EditProductdata.inventoryName=inventoryName;
			 window.localStorage['inventoryPolicy']= $scope.EditProductdata.inventoryName;
			 
		    // alert($scope.EditProductdata.inventoryName);
		}
	
	  
	//alert($scope.nCategoryId);
	
	
	
	       $scope.Edit = function () {
			   
			
			   
			   	  var imageSource=window.localStorage['eventImages'];
	
			  
			  	
	if(imageSource==undefined || imageSource=='')
	{
		 var FolderPath='~/Design/assets/images/placeholder.jpg';
	}
	else
	{
		var imageSource = JSON.parse(window.localStorage['eventImages']);
	
	  var FolderPath='~/Product/ProductImage/'+imageSource[0]['cImage'];

                    $http({
						method: 'POST',
						url:path+'Product.asmx/UploadImage',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
							return str.join("&");
						},
						data: { strcode: imageSource[0]['image_source'], 
							imgName:imageSource[0]['cImage']
						
							}
				 }).success(function (response) {
				
				  
				 })	  
	}
	
			   
			   // alert($scope.intCategoryId);
			
			  if($scope.intCategoryId==undefined)
			  {
				  $scope.CatId=$scope.nCategoryId;
				 
			  }
			  else
			  {
				   $scope.CatId=window.localStorage['intCategoryId']
			  }
			  
			//alert($scope.intnQuantityId);
			if($scope.intnQuantityId==undefined)
			{
				$scope.nQId=$scope.nUnitType;
			}
			else
			{
				$scope.nQId=window.localStorage['nQuantityId'];
			}
			
			
			if($scope.intnTaxId==undefined)
			{
				$scope.nTId= $scope.TaxId;
			}
			else
			{
				$scope.nTId=window.localStorage['nTaxId'];
			}
			
			
			// alert($scope.EditProductdata.WarrantyName);
			
			if( $scope.EditProductdata.WarrantyName==undefined)
			{
				
				$scope.Warranty=$scope.Warranty;
				//alert($scope.Warranty);
			}
			else
			{
				$scope.Warranty= window.localStorage['WarrantyType'];
				//alert($scope.Warranty);
			}
			
			
			$scope.inventoryName= window.localStorage['inventoryPolicy'];
			
			//alert($scope.inventoryName);
			if($scope.inventoryName==undefined)
			{
				$scope.inventory=false;
			}
			else if($scope.inventoryName==0)
			{
				//alert($scope.inventoryName);
				$scope.inventory=false;
			}
			else
			{
				//alert($scope.inventoryName);
				$scope.inventory=true;
			}

		//alert($scope.EditProductdata.intCategoryId);	
	    var nProductId=window.localStorage['ProductId'];
		var nAttributeSetId=1;
		var nOptionTemplatesId=1;
		
		 var cName=$scope.EditProductdata[0].cName;
		
		
		   var cDescription=$scope.EditProductdata[0].cDescription;
			var cShortDescription=$scope.EditProductdata[0].cShortDescription
			var cSKU=$scope.EditProductdata[0].cSKU;
			var nWeight=$scope.EditProductdata[0].nWeight;
			var fPrice=$scope.EditProductdata[0].fPrice;
			var nSpecialPrice=0;
			var dtSpecialPriceFrom=today;
			var dtSpecialPriceTo=today;
			var cMetaTitle=$scope.EditProductdata[0].cName;
			var cMetaDescription=$scope.EditProductdata[0].cDescription;
			var nBaseCurrencyId=1;
			var nParentProductId=0;
			var nTaxId=$scope.nTId;
			var IsActive=true;
			var nUserId=window.localStorage['UserId'];
			var cCsvFile="";
			var cUrlKey="";
			var dtCreatedDate=today;
			var nLanguageId=1;
			var IsDisable=false;
			var cRemark1="";
				var cRemark2="";
					var cRemark3="";
					var cImage=FolderPath;
					var nMinimumStockAlert=1;
					var IsTrackInventory=$scope.inventory;
					var IsVirualProduct=true;
					var IsFeatured=true;
					var dtNewProductFrom=today;
					var dtNewProductTo=today;
					  var cWarrantyType=$scope.Warranty;
					  //alert(cWarrantyType);
					  //var cWarrantyType=$scope.EditProductdata.WarrantyName;
					  var nWarrentyDuration=1;
					  var nWarrentyId=0;
					  var cProductCode="";
					  var cProductUniqueCode="";
					  var nProductType=2;
					  var nQuantityId=$scope.nQId;
					  
				    //console.log($scope.total);
					var total=$scope.total;
					
						if($scope.total==undefined || $scope.total=='{}')
						{
							
							 $scope.FinalTotal=$scope.fMRP;
							
						}
						else
						{
							$scope.FinalTotal=$scope.total;
							
						}
					  
					  var fMRP= $scope.FinalTotal;
					
					
			if(cName!='')
			   {
				   //alert($scope.Data);
				    $http({
                method: 'POST',
                url:path+'Product.asmx/UpdateProductData',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {nProductId:nProductId,
                        nAttributeSetId: nAttributeSetId, 
						nOptionTemplatesId:	nOptionTemplatesId, 
						cName:cName, 
						cDescription:cDescription, 
						cShortDescription:cShortDescription,
						cSKU:cSKU, 
						nWeight:nWeight,
						fPrice: fPrice, 
						nSpecialPrice: nSpecialPrice,
						dtSpecialPriceFrom: dtSpecialPriceFrom,
						dtSpecialPriceTo:dtSpecialPriceTo,
						cMetaTitle: cMetaTitle, 
						cMetaDescription: cMetaDescription,
						nBaseCurrencyId: nBaseCurrencyId,
						nParentProductId:nParentProductId,
						nTaxId:nTaxId,
						IsActive: IsActive,
						nUserId: nUserId,
						cCsvFile:cCsvFile,
						cUrlKey:cUrlKey,
						dtCreatedDate: dtCreatedDate,
						nLanguageId:nLanguageId,
						IsDisable:IsDisable,
						cRemark1:cRemark1,
						cRemark2: cRemark2, 
						cRemark3: cRemark3, 
						cImage: cImage,
						nMinimumStockAlert:nMinimumStockAlert,
						IsTrackInventory:IsTrackInventory,
						IsVirualProduct:IsVirualProduct,
						IsFeatured:IsFeatured,
						IsFeatured:IsFeatured,
						dtNewProductFrom:dtNewProductFrom,
						dtNewProductTo:dtNewProductTo,
						cWarrantyType:cWarrantyType,
						nWarrentyDuration:nWarrentyDuration,
						nWarrentyId:nWarrentyId,
						cProductCode:cProductCode,
						cProductUniqueCode:cProductUniqueCode,
						fMRP:fMRP,
						nProductType:nProductType,
						nQuantityId:nQuantityId
							
						}
            }).success(function (response) {
				
						// delete category
					  $http({
						method: 'POST',
						url: path+'dtlProductCategory.asmx/DeleteAllProductCategory',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
							return str.join("&");
						},
					   data: {nProductId:nProductId,nUserId:nUserId}
					}).success(function (response) {
				
					});
					
					
					//update category
					//alert($scope.EditProductdata.intCategoryId);
					//intCategoryId=window.localStorage['intCategoryId'];
					//alert(intCategoryId);
					
				$http({
							method: 'POST',
							url:path+'dtlProductCategory.asmx/InsertProductData',
							headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
							transformRequest: function (obj) {
								var str = [];
								for (var p in obj)
									str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
								return str.join("&");
							},
							data: { nProductId: nProductId, 
								nCategoryId:$scope.CatId,
								IsActive:true,
								nUserId:nUserId,
								IsDisable: false, 
								cRemark: "", 
								cRemark1: "",
								cRemark2:""
								
								}
					 }).success(function (response) {
            
              
							ionicToast.show('Product Update Successfully', 'middle', false, 2500);
						
							window.localStorage['nTaxId']='';
							window.localStorage['inventoryPolicy']='';
							window.localStorage['intCategoryId']='';
							window.localStorage['Warranty']='';
							window.localStorage['nQuantityId']='';
							//localStorage.removeItem('eventImages');
							window.localStorage['eventImages']='';
							window.location = "#/app/ShowProduct";
							$ionicLoading.hide();
									
                       });
			
				
            });
			   }
			   else
			   {
				   ionicToast.show('Add Product Name', 'middle', false, 2500);
						
							$ionicLoading.hide();
			   }
			  
		}
	
  
		
	 
})



}());