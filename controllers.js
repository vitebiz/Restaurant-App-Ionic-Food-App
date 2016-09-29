(function () {
    'use strict';

angular.module('vitebizFMS')
.controller('AppCtrl', function ($scope,$location, $ionicModal, $timeout, $http,$cordovaDevice,ionicToast,$ionicLoading) {
    // Form data for the login modal
	
   window.localStorage['path']="http://www.vite.biz/FMS/webservices/";
 
   window.localStorage['imageFolder']="http://www.vite.biz/FMS/Product/ProductImage/";
   var path=window.localStorage['path'];
   $scope.loginData = {};
   $scope.cCompanyLogo="Design/Icon/vite.png";
    if (window.localStorage.length > 5) {

        if (window.localStorage['UserType'] == 'Admin') {
            window.location = "#/app/search";
            $scope.isAdmin = true;
            $scope.IsEmployee = false;           
        }
        else if (window.localStorage['UserType'] == 'Service') {
            window.location = "#/app/search";
            $scope.isAdmin = true;
            $scope.IsEmployee = true;           
        }      
    }else {
      
        var i=$location.search().SignUP;
        if(i=='SignUP')
        {
            window.location = "#/app/UserSignup";
        }
        else{        
            window.location = "#/login/login";
        }
    }  
    
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };
    
    // Perform the SignUp action when the user submits the SignUp form
    $scope.doSignUp=function(){
       // href="#/app/register"
       var SignUP='SignUP';
       window.location="#/app/UserSignup?SignUP="+SignUP;      
    }
    
    //Over

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {

        //var type=window.localStorage['UserType']
        var cUserName = $scope.loginData.username;
        var cPassword = $scope.loginData.password;
      //alert(cUserName);

        if (cUserName!=undefined && cPassword !=undefined) {

            var loginurl =path+"Login.asmx/SelectUserTypewiseDetails?cUserName=" + cUserName + "&cPassword=" + cPassword;
				$ionicLoading.show({
	
					content: 'Loading..',
					animation: 'fade-in',
					showBackdrop: false,
					maxWidth: 0,
					showDelay: 0
				});
           
            $http.get(loginurl).then(function (resp) {
            	
		        if(resp['data'][0]['Success'] == '0'){
				
					ionicToast.show('Please enter valid username and password', 'middle', false, 2500);
					$ionicLoading.hide();
				}
				else
				{
					window.localStorage['UserId'] = resp.data[0].nUserId;   // set
					window.localStorage['LoginId'] = resp.data[0].nLoginId;
					window.localStorage['StoreId']=resp.data[0].nStoreId;
					//window.localStorage['BranchId'] = resp.data[0].nBranchId;
					window.localStorage['UserType'] = resp.data[0].cRoleType;
					window.localStorage['CustomerId'] = resp.data[0].nCustomerId;
					window.localStorage['EmployeeId'] = resp.data[0].nEmployeeId;
					window.localStorage['cUserName'] = resp.data[0].cUserName;
					window.localStorage['cCompanyName'] = resp.data[0].cCompanyName;	
									
                //  var name = window.localStorage['name'];     // Get
					$scope.closeLogin();
					$ionicLoading.hide();
               
					var nUserId = resp.data[0].nUserId;
					
					var curruncyLogourl = path+"Login.asmx/UserInformation?nUserId=" + nUserId ;
					 
					$http.get(curruncyLogourl).then(function (resp) {
						
						 window.localStorage['CurruncyLogo'] = resp.data[0].cCurrency;
						//console.log(window.localStorage['CurruncyLogo']);
						 window.location = "#/app/search";
					})	
							
						if (resp.data[0].strUserType == 'Admin') {
							window.location = "#/app/search";
						}
					   
						else if (resp.data[0].strUserType == 'Service') {
							//alert("fgf");
							window.location = "#/app/search";
						}
               
			}				                //10/10/2017
            }, function (err) {
                console.error('ERR', err);
			 // console.log(resp[0].Success);
            
             
                //alert('Please Insert Valid Username & Password');
				ionicToast.show('Please enter valid username and password', 'middle', false, 2500);
                // err.status will contain the status code
            })
        }
        else {
            //alert('Please Insert Username & Password');
			ionicToast.show('Please enter valid username and password', 'middle', false, 2500);
        }       
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 10000);
    };
	    
	$scope.UserName=window.localStorage['cUserName'];	
	    /* jayesh -> status list start */
	/* 	
		var nUserId = window.localStorage['UserId'];
		
		var OrderCounturl = path+"Order.asmx/SelectStatusCountForOrderWise?UserId="+nUserId;
			$http.get(OrderCounturl).then(function (resp) {
				//console.log(resp);
				$scope.StatusCount = resp.data;
		}, function (err) {
              console.error('ERR', err);
		 
		}) */
})

.controller('UserSignup', function ($scope, $http,ionicToast,$ionicModal) {

     var nUserId = window.localStorage['UserId'];
     var path=window.localStorage['path'];
     $scope.signupData={};
	/*  $ionicModal.fromTemplateUrl('templates/modal.html', {
		 scope: $scope,
		 animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
	 }); */
	  
	  
     $scope.doSignup=function(){
     
     var strEmailID=$scope.signupData.email;
     window.localStorage['strEmailID']=strEmailID;
     var Password=$scope.signupData.pass;
     window.localStorage['Password']=Password;
     var PhoneNo=$scope.signupData.telephone;
      window.localStorage['PhoneNo']=PhoneNo;
     var cCompanyName=$scope.signupData.cCompanyName;
      window.localStorage['cCompanyName']=cCompanyName;
     /*Find today Date*/
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

     var cUserWebStoreName=""; 
     var dtRegistrationDate=today;
     var cLogo="";
     var dtCreationDate=today;
     var cEmail=strEmailID;
     var IsValidEmail=false;
     var cPrimaryContactNo=PhoneNo;
     var IsActive=true;
     var IsDisable=false;
     var nLanguageId=1;
     var cRemark="";
     var cRemark1="";
     var cRemark2="";
     var cRemark3="";
     var nSMSCounter=0;
     var dExpireDate=today;
     var nBillNoStart=0;
     var cABNNno="";
     var cACNno="";
     var cABNBranch="";
     var cFaxNumber="";
     var cWebsite="";
     var IsTaxablePaymentsReporting=false;
     var cAddress="";   
     var cSuburb="";
     var cState="";
     var cPostCode="";
     var cCountry="";
     var nAccountingYearId=1;
     var dtOpeningBalanceDate=today;
     var cPrimaryFirstName="";
     var cPrimaryLastName="";
     var cPrimarycontact="";
     var IsValidity=false;
     var cPassword=Password;
     //alert(strEmailID);
     
      if (strEmailID!=undefined &&cCompanyName!=undefined&&cPassword!=undefined&&PhoneNo!=undefined) {
      
            $http({
                method: 'POST',
                url: path+'User.asmx/InsertUserData',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: { cCompanyName: cCompanyName, 
                 cUserWebStoreName: cUserWebStoreName, 
                 dtRegistrationDate: dtRegistrationDate,
                 cLogo: cLogo, 
                 dtCreationDate: dtCreationDate, 
                 cEmail: cEmail,
                 IsValidEmail: IsValidEmail, 
                 cPrimaryContactNo: cPrimaryContactNo, 
                 IsActive: IsActive, 
                 IsDisable: IsDisable, 
                 nLanguageId: nLanguageId, 
                 cRemark: cRemark, 
                 cRemark1: cRemark1, 
                 cRemark2: cRemark2, 
                 cRemark3: cRemark3, 
                 nSMSCounter: nSMSCounter,
                 dExpireDate: dExpireDate, 
                 nBillNoStart: nBillNoStart, 
                 cABNNno: cABNNno, 
                 cACNno: cACNno, 
                 cABNBranch: cABNBranch,
                 cFaxNumber:cFaxNumber, 
                 cWebsite:cWebsite,
                 IsTaxablePaymentsReporting:IsTaxablePaymentsReporting,
                 cAddress:cAddress,
                 cSuburb:cSuburb,
                 cState:cState,
                 cPostCode:cPostCode,
                 cCountry:cCountry,
                 nAccountingYearId:nAccountingYearId,
                 dtOpeningBalanceDate:dtOpeningBalanceDate,
                 cPrimaryFirstName:cPrimaryFirstName,
                 cPrimaryLastName:cPrimaryLastName,
                 cPrimarycontact:cPrimarycontact,
                 IsValidity:IsValidity,
                 cPassword:cPassword
              }
            }).success(function (response) {
            
                console.log(response.Success);
                var Result=response.Success;
                if(Result==2)
                {
                    ionicToast.show('Email Id Already Exists.', 'middle', false, 2500);
                }
                else if(Result==1)
                {
				    if(response.UserID!="")
				    {
						
						/* Login user  */
						var loginurl =path+"Login.asmx/SelectUserTypewiseDetails?cUserName=" + cEmail + "&cPassword=" + cPassword;
						$http.get(loginurl).then(function (resp) {
							window.localStorage['UserId'] = resp.data[0].nUserId;   // set
							window.localStorage['LoginId'] = resp.data[0].nLoginId;
							window.localStorage['StoreId']=resp.data[0].nStoreId;
							window.localStorage['UserType'] = resp.data[0].cRoleType;
							window.localStorage['CustomerId'] = resp.data[0].nCustomerId;
							window.localStorage['EmployeeId'] = resp.data[0].nEmployeeId;
							window.localStorage['cUserName'] = resp.data[0].cUserName;
							window.localStorage['cCompanyName'] = resp.data[0].cCompanyName;	
							
							/* var curruncyLogourl = path+"Login.asmx/UserInformation?nUserId=" + resp.data[0].nUserId ; 
							$http.get(curruncyLogourl).then(function (resp) {
								window.localStorage['CurruncyLogo'] = resp.data[0].cCurrency;
								ionicToast.show('Pelase Check Your Mail.', 'middle', false, 2500);
								//window.location = "#/app/UserLogo?UserId="+response.UserID;
							}) */	
							window.location="#/app/currencyCtrl";
							
					}, function (err) {
						console.error('ERR', err);
						ionicToast.show('Please enter valid username and password', 'middle', false, 2500);
					})
						/* Login user */		
				    }	
				}			     			
            });
         }
        else {
            ionicToast.show('All fields requerid','middle', false, 2500);
        } 
     }
})

.controller('UserLogo', function ($scope, $http,ionicToast,$location) {

     
    var UserId=$location.search().UserId;
	window.localStorage['UserId'] = UserId;
	//alert(UserId);
     var path=window.localStorage['path'];
     $scope.signupData={};
     var emiratespath = "http://vite.biz/ecp/SuperAdmin/Logo/";
         
     var imageFolder = window.localStorage['imageFolder'];
	 var imageApi = window.localStorage['imageApi'];	
     
     /*Upload Logo*/
     $scope.items = [];
     
				$scope.setFile = function(element) {
				
				$scope.currentFile = element.files[0];
				var reader = new FileReader();
				var seconds = new Date().getTime();
					reader.onload = function(event) {
								$scope.items.push({
									nImageId: seconds,
									cImage: emiratespath+seconds+".jpg",
									//cImage: prescriptionpath+prescriptionName,
									image_source: event.target.result,
								});
					
								var wishData=JSON.stringify($scope.items);	//first stored as string
								
								window.localStorage['signupEImage'] = wishData;					
								var userWishData = JSON.parse(window.localStorage['signupEImage']);		//second retrieved as object
								$scope.items = userWishData;
								//console.log($scope.items);
								$scope.prescriptionPage = true;
						//}
				
					}
			
				// when the file is read it triggers the onload event above.
				reader.readAsDataURL(element.files[0]);
				}
				
				$scope.logoUpload=function(){
				 
				// nUserId=UserId; 
				 
				 window.location="#/app/currencyCtrl";
				 			 
				 }
})
.controller('currencyCtrl', function ($scope, $http,ionicToast,$location) {
	
	
	var path = window.localStorage['path'];
	$scope.choice = {};
	$scope.choice.currency = 'USD';
	$scope.currency = function(){
		
		var nUserId = window.localStorage['UserId'];
		var cCurrencyValue = 0;
		var cCurrencyName = $scope.choice.currency;
		
		if(cCurrencyName == 'USD'){
			var cCurrencySymbole = '$';
		}else if(cCurrencyName == 'GBP'){
			var cCurrencySymbole = '₤';
		}else if(cCurrencyName == 'INR'){
			var cCurrencySymbole = 'Rs';
		}
		
		//var cCurrencySymbole = $scope.choice.currency;
		var IsActive = 'true';
		var currency = $scope.choice.currency;

		 var currencyURL =path+"Currency.asmx/AddCurrency?nUserId=" + nUserId + 
							"&cCurrencyValue=" + cCurrencyValue+
							"&cCurrencySymbole=" + cCurrencySymbole+
							"&IsActive=" + IsActive+
							"&IsDefaultCurrency=true&cCurrencyName=" + cCurrencyName;

           
            $http.get(currencyURL).then(function (resp) {
            	
				console.log(resp);
				window.location="#/app/search";
				window.localStorage['CurruncyLogo'] = cCurrencySymbole;
				//ionicToast.show('Pelase Check Your Mail.', 'middle', false, 2500);
		       				               
            }, function (err) {
                console.error('ERR', err);
			
            })
		
	}
	
})	
.controller('Home', function ($scope, $http) {

    var nUserId = window.localStorage['UserId'];
    var nBranchId = window.localStorage['BranchId'];
	var path=window.localStorage['path'];
	 var filterBarInstance;

	/* jayesh -> order count start */
	  var TotalPendingOrderurl = path+"Order.asmx/CountPendingTotalOrder?UserId="+nUserId;

    $http.get(TotalPendingOrderurl).then(function (resp) {
    
        //console.log('Task', resp.data.TotalOrder);
        
		
			
			$scope.TotalPendingOrderlist = resp.data.TotalOrder;  
			$scope.Order= resp.data.TotalOrder;
		
		
	
    }, function (err) {
        console.error('ERR', err);
    })
	/* jayesh-> order count end */
})

.controller('logout', function ($scope, $http) {

    window.localStorage.clear();
    window.location = "#/login/login";

})



.controller('CreateCustomerReturn', function ($scope, $http,$ionicLoading,ionicToast,$location) {

var path= window.localStorage['path'];

$scope.showToast = function(){
<!-- ionicToast.show(message, position, stick, time); -->
  ionicToast.show('This is a toast at the top.', 'middle', false, 2500);
};
    $scope.productInvoice = {};
    var nUserId = window.localStorage['UserId'];
    var nEmpId = window.localStorage['EmployeeId'];
	var Id = $location.search().Id;
	if(Id==null)
		Id=window.localStorage['backCustId'];
	else
		window.localStorage['backCustId']=Id;

/*Customer select popup start*/	
$scope.showpopup=function(){
	$scope.show=true;
	$ionicLoading.show({
    content: 'Loading..',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 0,
    showDelay: 0
  });
    if(Id == 2)
	{
		var Customerurl = path+"Customer.asmx/SelectAllCustomer?nEmpId=" + nEmpId + "&UserId=" + nUserId;
		//alert(Customerurl);
	}else
	{
		var Customerurl = path+"Customer.asmx/SelectAllCustomer?nUserId=" + nUserId;
	}

    $http.get(Customerurl).then(function (resp) {
        //console.log('Success', resp);
        $scope.CustomerData = resp.data;
		$ionicLoading.hide();
        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })
}
$scope.setCustomer=function(id,name){
	$scope.productInvoice.Customer=name;
	$scope.productInvoice.nCustomerId=id;
	$scope.show=false;
}
$scope.close=function(){
	$scope.show=false;
}
/*Customer Select popup end*/
/*Jayesh--> Bind All product in Popup start*/



// Referance Number Generate
var cType='Invoices';
var Orderurl = path+"Order.asmx/SelectAllOrder?UserId=" + nUserId+"&cType="+cType;

$http.get(Orderurl).then(function (resp) {
   
         $scope.OrderList = resp.data;
		 $scope.nOrderId = resp.data[0].nOrderId;
		console.log($scope.nOrderId);
		
		if(resp['data'][0]['Success'] != 0)
		{
			var IncrementNumber =  $scope.nOrderId+1;
		    $scope.productInvoice.Reference= "CN" + IncrementNumber;
		}
		else
		{
			$scope.productInvoice.Reference= "CN" + 1;
		}
		
		
    })



$scope.showproductpopup=function(){
	$scope.showproduct=true;
	$ionicLoading.show({
    content: 'Loading..',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 0,
    showDelay: 0
  });
	var productlisturl = path+"Product.asmx/SelectAllProduct?UserId=" + nUserId;
	$http.get(productlisturl).then(function (resp) {
        //console.log('Success', resp);
        $scope.productlist = resp.data;
		$ionicLoading.hide();
    })
}

$scope.setProduct=function(id,name,cWarrentyType,nWarrentyDuration){
	$scope.productInvoice.nProductId=id;
	$scope.productInvoice.product=name;
	$scope.productInvoice.cWarrentyType=cWarrentyType;
	$scope.productInvoice.nWarrentyDuration=nWarrentyDuration;
	
	//$scope.changeProductSubCategory=name;
	$scope.showproduct=false;
}
$scope.closeproduct=function(){
	$scope.showproduct=false;
}
/*Jayesh--> Bind All product in Popup end*/

    var Qtyurl = path+"Quantity.asmx/SelectAllSellingUnit?UserId=" + nUserId;
    $http.get(Qtyurl).then(function (resp) {
        //console.log('Success', resp);
        $scope.QtyData = resp.data;

        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
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
    

 
     var ProductAddForInvoice = [];
    $scope.add = function () {
    
        var nProductId = $scope.productInvoice.nProductId;
        var nQuantityId = $scope.productInvoice.quantity.nQuantityId;
        var Quantity = $scope.productInvoice.TotalQuantity;
        var Discount = $scope.productInvoice.discount;
        
        if (nProductId != null && nProductId != '' && nQuantityId != null && nQuantityId != '' && Quantity != null && Quantity != '') {

            var ProductDetailurl = path+"Product.asmx/Select_Product_Details?nProductId=" + nProductId + "&UserId=" +nUserId;

            $http.get(ProductDetailurl).then(function (resp) {
                
                //console.log('Success', resp);
                var Products = resp.data[0].cName;
                var Description = resp.data[0].cDescription;
                var Warrentytype = resp.data[0].cWarrantyType;
                
                console.log( resp.data[0].cWarrantyType);
               // var Tax = resp.data[0].cTaxName;
                var Tax="";
                var Warrentymonths = resp.data[0].nWarrentyDuration;
                var Price1 = resp.data[0].fMRP;
				var Price = '$' + Price1;
                var Total = Price1 * Quantity;
                
               // alert("ProductId"+nProductId+"Warrentytype"+Warrentytype);
                
                if (Discount != '' && Discount != '0' && Discount != 0 && Discount != null) {
                    Total = (Total - (((Price1 * Quantity) * Discount) / 100));
                }
                else {
                    Discount = 0;
                    Total = (Total - (((Price1 * Quantity) * Discount) / 100));
                }
                          
               /* var t = $('#test').DataTable({
                    "bFilter": false,
                    "bInfo": false,
                    "bPaginate": false
                    //"bDestroy": true
                });

                t.row.add([Products,Description, Warrentytype,Tax, Warrentymonths, Quantity,Price, Discount, Total, nQuantityId, nProductId,Price1]).draw();
                var rowData = t.rows().data().length;*/
                
               
                //$scope.ProductAddForQuotes = [];
                                    
                ProductAddForInvoice.push({                                
                Products:Products,
                Description:Description,
                Warrentytype:Warrentytype,
                Tax:Tax,
                Warrentymonths:Warrentymonths, 
                Quantity:Quantity,
                Price:Price,
                Discount:Discount,
                Total:Total,
                nQuantityId:nQuantityId, 
                nProductId:nProductId,
                Price1:Price1                               
                });
                           
                var TotalProductPrice = 0;
                for (var i = 0; i < ProductAddForInvoice.length; i++) {
                
                    var temp =ProductAddForInvoice[i]['Total'];
                    TotalProductPrice = TotalProductPrice + temp;
                    
                }
                
                $scope.ProductDetails=ProductAddForInvoice;
                $scope.productInvoice.product='';
                $scope.TotalValue = TotalProductPrice;
                $scope.productInvoice.quantity = 0;
                $scope.productInvoice.TotalQuantity = '';
                $scope.productInvoice.discount = '';
                //For JSON responses, resp.data contains the result
                
             
                
            }, function (err) {
                console.error('ERR', err);
                //alert(err);
                // err.status will contain the status code
            })
        }
    }
    
    var Terms = [];
    
    $scope.addTerms = function () {

        var Products=$scope.productInvoice.paymentterms;
       
        if (Products != null && Products != '') {
        
         Terms.push({                                             
                Terms:Products                             
                });            
        } 
        $scope.ProductTerms=Terms; 
            //terms.row.add([Products]).draw();

            $scope.productInvoice.paymentterms = '';
        //}

    }
    
    $scope.shippingPaymentOption={};
    $scope.Save = function () {
	//alert($scope.productquotation.cWarrentyType);
    //alert($scope.productquotation.nWarrentyMonths);    
		var UserId = nUserId;
        var SupplierId = '0';
        var CustomerId = $scope.productInvoice.nCustomerId;
        var QuotatinType = $scope.productInvoice.quotationtype;
        QuotatinType='Invoices';
        if (typeof QuotatinType === "undefined") {
            QuotatinType = '';
        }
        var TotalPrice = $scope.TotalValue;
        var PaymentTeams = $scope.shippingPaymentOption.paymentOption;
        var DeliveryDate = $scope.productInvoice.delivarydate;
        var VaidityDate = $scope.productInvoice.validitydate;
        var PaymentDueDate = $scope.productInvoice.paymentduedate;
        var QuetationTitle = $scope.productInvoice.Reference;
    
        var CurrentStatus='Return';
        var EmpId = nEmpId;
        var QuotationCode = $scope.productInvoice.Reference;
        var nQuotationId = '0';
		var Address='';
		var cRemarks='';
		var OrderPlacedDate='2016-05-27';
		//var todayDate='2016-06-27'
		 var todayDate = new Date();
		          var dd = todayDate.getDate();
		          var mm = todayDate.getMonth()+1; //January is 0!

		          var yyyy = todayDate.getFullYear();
		          if(dd<10){
			          dd='0'+dd
		          } 
		          if(mm<10){
			        mm='0'+mm
		          } 
		          todayDate = yyyy+'-'+mm+'-'+dd;  
        if (CustomerId != null && CustomerId != '') {

            if (QuotatinType != null && QuotatinType != '') {

                if (DeliveryDate != null && DeliveryDate != '' && VaidityDate != null && VaidityDate != '' && PaymentDueDate != null && PaymentDueDate != '') {

                 if (DeliveryDate>todayDate)
                 {
                       // alert(todayDate);
                                $http({
                                    method: 'POST',
                                    url: path+'order.asmx/CreateOrder',
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    transformRequest: function (obj) {
                                        var str = [];
                                        for (var p in obj)
                                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                        return str.join("&");
                                    },
                                    data: { nUserId: nUserId, nSupplier: SupplierId,nCustId:CustomerId,cQuatationType: QuotatinType, 
                                    fTotal: TotalPrice, cPaymentTerms: PaymentTeams, 
                                    dtDelivaryDate: DeliveryDate, 
                                    dtPaymentDueDate: PaymentDueDate, 
                                    dtValidityDate: VaidityDate, 
                                    cQuatationCode: QuotationCode, 
                                    cQuatationTitle: QuetationTitle,
                                    cCurrentStatus:CurrentStatus,nEmpId: EmpId,
                                    cBranchAddress:Address,
                                    cRemarks:cRemarks
                                     }
                                }).success(function (response) {

                                    nQuotationId = response.ID;
                                    console.log(nQuotationId);

                                    if (nQuotationId > 0) {

                                        /*var table = $('#test').DataTable();

                                        var rowData = table.rows().data().length;*/

                                        for (var i = 0; i < ProductAddForInvoice.length; i++) {

                                            var nProductId = ProductAddForInvoice[i]['nProductId'];
                                            var ProductPrice = ProductAddForInvoice[i]['Price1'];
                                            //alert(ProductPrice);
                                            var Warrentymonths = ProductAddForInvoice[i]['Warrentymonths'];                           
                                            var fDicount = ProductAddForInvoice[i]['Discount'];
                                            var Details = ProductAddForInvoice[i]['Description'];
                                            var fQuantity = ProductAddForInvoice[i]['Quantity'];
                                            var QuantityId = ProductAddForInvoice[i]['nQuantityId'];
                                            var PartsId = 0;
                                            var WarrentyType = $scope.productInvoice.cWarrentyType;
								            var WorentyMonth = $scope.productInvoice.nWarrentyDuration;
                                            
								            $http({
                                                method: 'POST',
                                                url: path+'Order.asmx/AddOrderItem',
                                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                transformRequest: function (obj) {
                                                    var str = [];
                                                    for (var p in obj)
                                                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                                    return str.join("&");
                                                },
                                                data: { nUserId: UserId, nOrderId: nQuotationId, nProductId: nProductId, 
                                                fProductPrice: ProductPrice, 
                                                nWarrantyMonth: WorentyMonth, 
                                                fDiscount: fDicount, cDetail: Details,
                                                IsActive:true,
                                                IsDisable:false,                                     
                                                fQuantity: fQuantity, 
                                                nQuantityId: QuantityId, 
                                                cWarrentyType:WarrentyType,
                                                dtDate:OrderPlacedDate
                                                }
                                            }).success(function (response) {
                                            
                                                console.log(response);

                                            });
                                        }
                                        
                                        /*var Terms = $('#Terms').DataTable();
                                        var Termsrows = Terms.rows().data().length;*/
                                        for (var i = 0; i < Terms.length; i++) {
                                                                          
                                            var Paymentterms = Terms[i]['Terms'];

                                            $http({
                                                method: 'POST',
                                                url: path+'PaymentMode.asmx/AddPaymentTearms',
                                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                transformRequest: function (obj) {
                                                    var str = [];
                                                    for (var p in obj)
                                                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                                    return str.join("&");
                                                },
                                                data: { cPaymentterms: Paymentterms, nQuotationMasterId: nQuotationId, nUserId: UserId,IsActive:true }
                                            }).success(function (response) {

                                            });
                                        }
                                    }
                                    $scope.productInvoice.Customer = 0;
                                    $scope.productInvoice.Invoicetitle = '';
                                    $scope.productInvoice.quotationtype = '';
                                    $scope.TotalValue = 0;
                                    $scope.productInvoice.delivarydate = '';
                                    $scope.productInvoice.paymentduedate = '';
                                    $scope.productInvoice.validitydate = '';
						            if(Id==2)
						            {
							            window.location = "#/app/salesdisplayquotation?Id=2";
						            }else
						            {
							             window.location = "#/app/productInvoiceslist";
						            }
                                   

                                });
                          }
                    else {
					    ionicToast.show('Please Insert DeliveryDate greater than Today date', 'middle', false, 2500);
                       // alert('Please Insert DeliveryDate & VaidityDate & PaymentDueDate');
                    }
                }
                else {
					ionicToast.show('Please Insert DeliveryDate & VaidityDate & PaymentDueDate', 'middle', false, 2500);
                   // alert('Please Insert DeliveryDate & VaidityDate & PaymentDueDate');
                }

            }
            else {
				ionicToast.show('Please Insert Quotation Title & Quotation Type', 'middle', false, 2500);
                //alert('Please Insert Quotation Title & Quotation Type');
            }

        }
        else {
			ionicToast.show('Please Select Customer', 'middle', false, 2500);
           // alert('Please Select Customer');
        }
    }

})

}());
