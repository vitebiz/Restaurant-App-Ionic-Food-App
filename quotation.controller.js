(function () {
    'use strict';
var app = angular.module('vitebizFMS');

app.controller('productquotationlist', function ($scope, $http,$ionicLoading) {

    var path=window.localStorage['path'];
    var nUserId = window.localStorage['UserId'];
    var nEmpId = window.localStorage['EmployeeId'];
	$scope.CurruncyLogo=window.localStorage['CurruncyLogo'];
    $scope.group = 'Active';
    var Type='Quotes';
    var Quotationurl = path+"Order.asmx/SelectAllOrder?UserId=" + nUserId+"&cType="+Type;
	
	$ionicLoading.show({
		 content: 'Loading..',
		animation: 'fade-in',
		showBackdrop: false,
		maxWidth: 0,
		showDelay: 0
	});
  
    $http.get(Quotationurl).then(function (resp) {
        console.log(resp.data[0]['Success']);
		
		if(resp.data[0]['Success'] == 0){
			
			$scope.notFound = true;
			$ionicLoading.hide();
			
		}else{
			
			$scope.QuotationData = resp.data;
			console.log(resp.data);
			$ionicLoading.hide();
			
		}
       
		
        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })

  $scope.AddproductQuatation = function () {
	  
	   window.location = "#/app/productquotation";
	
  }

    $scope.changeEnvironment = function (value) {

        var Quotationurl = path+"Order.asmx/SelectAllQuotation?UserId=" + nUserId + "&Status=" + value;

        $http.get(Quotationurl).then(function (resp) {
            //console.log('Success', resp);
            $scope.QuotationData = resp.data;

            // For JSON responses, resp.data contains the result
        }, function (err) {
            console.error('ERR', err);
            // err.status will contain the status code
        })
    }

})

.controller('productquotationCtrl', function ($scope, $http,$ionicLoading,ionicToast,$location) {

var path= window.localStorage['path'];

    $scope.productquotation = {};
    var nUserId = window.localStorage['UserId'];
    var nEmpId = window.localStorage['EmployeeId'];
	var Id = $location.search().Id;
	if(Boolean(Id)==false)
		Id=window.localStorage['backCustId'];
	else
		window.localStorage['backCustId']=Id;
	$scope.CurruncyLogo=window.localStorage['CurruncyLogo'];
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
	$scope.productquotation.Customer=name;
	$scope.productquotation.nCustomerId=id;
	$scope.show=false;
}
$scope.close=function(){
	$scope.show=false;
}
/*Customer Select popup end*/
/*Jayesh--> Bind All product in Popup start*/


var cType='Quotes';
var Orderurl = path+"Order.asmx/SelectAllOrder?UserId=" + nUserId+"&cType="+cType;

$http.get(Orderurl).then(function (resp) {
   
         $scope.OrderList = resp.data;
		 $scope.nOrderId = resp.data[0].nOrderId;
		console.log($scope.nOrderId);
		
		if(resp['data'][0]['Success'] != 0)
		{
			var IncrementNumber =  $scope.nOrderId+1;
		    $scope.productquotation.Reference= IncrementNumber;
		}
		else
		{
			$scope.productquotation.Reference=1;
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
	$scope.productquotation.nProductId=id;
	$scope.productquotation.product=name;
	$scope.productquotation.cWarrentyType=cWarrentyType;
	$scope.productquotation.nWarrentyDuration=nWarrentyDuration;
	
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
		$scope.shippingPaymentOption.paymentOption='COD';
		$ionicLoading.hide();
	}, function (err) {
		console.error('ERR', err);
	
	})

     var ProductAddForQuotes = [];
     
     
    $scope.add = function () {
    
        var nProductId = $scope.productquotation.nProductId;
        var nQuantityId = $scope.productquotation.quantity.nQuantityId;
        var Quantity = $scope.productquotation.TotalQuantity;
        var Discount = $scope.productquotation.discount;
        
        if (nProductId !=undefined) {
					
					if(Quantity!=undefined)
					{
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
											
						ProductAddForQuotes.push({                                
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
						for (var i = 0; i < ProductAddForQuotes.length; i++) {
						
							var temp =ProductAddForQuotes[i]['Total'];
							TotalProductPrice = TotalProductPrice + temp;
							
						}
						
						$scope.ProductDetails=ProductAddForQuotes;
						$scope.productquotation.product='';
						$scope.TotalValue = TotalProductPrice;
						$scope.productquotation.quantity = 0;
						$scope.productquotation.TotalQuantity = '';
						$scope.productquotation.discount = '';

					}, function (err) {
						console.error('ERR', err);
					})
			}
			else
			{
				ionicToast.show('Please Enter Quantity', 'middle', false, 2500);
			}
        }
		else
		{
			ionicToast.show('Please Select Product', 'middle', false, 2500);
		}
    }
    
    var Terms = [];
    
    $scope.addTerms = function () {

        var Products=$scope.productquotation.paymentterms;
       
        if (Products != null && Products != '') {
        
         Terms.push({                                             
                Terms:Products                             
                });            
        } 
        $scope.ProductTerms=Terms; 
            //terms.row.add([Products]).draw();

            $scope.productquotation.paymentterms = '';
        //}

    }
    
    $scope.shippingPaymentOption={};
    $scope.Save = function () {
	//alert($scope.productquotation.cWarrentyType);
    //alert($scope.productquotation.nWarrentyMonths);    
		var UserId = nUserId;
        var SupplierId = '0';
        var CustomerId = $scope.productquotation.nCustomerId;
        var QuotatinType = $scope.productquotation.quotationtype;
        QuotatinType='Quotes';
        if (typeof QuotatinType === "undefined") {
            QuotatinType = '';
        }
        var TotalPrice = $scope.TotalValue;
        var PaymentTeams = $scope.shippingPaymentOption.paymentOption;
        var DeliveryDate = $scope.productquotation.delivarydate;
        var VaidityDate = $scope.productquotation.validitydate;
        var PaymentDueDate = $scope.productquotation.paymentduedate;
        var QuetationTitle = '';
        if (typeof QuetationTitle === "undefined") {
            QuetationTitle = '';
        }
        var CurrentStatus='Pending';
        var EmpId = nEmpId;
        var QuotationCode = $scope.productquotation.Reference;
        var nQuotationId = '0';
		var Address='';
		var cRemarks='';
		var OrderPlacedDate='2016-05-27';
		//var todayDate='2016-06-27';
		
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

                                        for (var i = 0; i < ProductAddForQuotes.length; i++) {

                                            var nProductId = ProductAddForQuotes[i]['nProductId'];
                                            var ProductPrice = ProductAddForQuotes[i]['Price1'];
                                            //alert(ProductPrice);
                                            var Warrentymonths = ProductAddForQuotes[i]['Warrentymonths'];                           
                                            var fDicount = ProductAddForQuotes[i]['Discount'];
                                            var Details = ProductAddForQuotes[i]['Description'];
                                            var fQuantity = ProductAddForQuotes[i]['Quantity'];
                                            var QuantityId = ProductAddForQuotes[i]['nQuantityId'];
                                            var PartsId = 0;
                                            var WarrentyType = $scope.productquotation.cWarrentyType;
								            var WorentyMonth = $scope.productquotation.nWarrentyDuration;
                                            
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
                                    $scope.productquotation.Customer = 0;
                                    $scope.productquotation.quotationtitle = '';
                                    $scope.productquotation.quotationtype = '';
                                    $scope.TotalValue = 0;
                                    $scope.productquotation.delivarydate = '';
                                    $scope.productquotation.paymentduedate = '';
                                    $scope.productquotation.validitydate = '';
						            if(Id==2)
						            {
							            window.location = "#/app/salesdisplayquotation?Id=2";
						            }else
						            {
							             window.location = "#/app/productquotationlist";
						            }
                                });
                          }
                    else {
					    ionicToast.show('Please Insert DeliveryDate greater than Today date', 'middle', false, 2500);
                    }
                }
                else {
					ionicToast.show('Please Insert DeliveryDate & VaidityDate & PaymentDueDate', 'middle', false, 2500);
                }

        }
        else {
			ionicToast.show('Please Select Customer', 'middle', false, 2500);
        }
    }

})
.controller('EditQutationDetails', function ($scope, $http, $location,$ionicLoading,ionicToast) {

    var path=window.localStorage['path'];
    var nUserId = window.localStorage['UserId'];
	$scope.CurruncyLogo = window.localStorage['CurruncyLogo'];
    var QuotationId = $location.search().QuotationId;
	var Id = $location.search().Id;
	var dtlQuotationDataAddNew = []; 
	var Terms=[];   
	var TotalProductPrice = 0;    
    var TotalDiscount=0; 
    var TotalfProductPrice=0;  
    var TotalPriceWithTotalDiscount=0;   
    $scope.shippingPaymentOption={};     
	$scope.forDisplayDiscount=false;
	$scope.forTotalPrice=false;
	
    if(Boolean(Id)==false)
		Id=window.localStorage['backCustId'];
	else
		window.localStorage['backCustId']=Id;
   
    var QuotationDataurl = path+"Order.asmx/SelectRowOrder?UserId=" + nUserId+ "&OrderId=" + QuotationId;

    $http.get(QuotationDataurl).then(function (resp) {
    
    $scope.QuotationMasterData = resp.data;
        
        var CustomerDataurl = path+"Customer.asmx/SelectRow?UserId=" + nUserId + "&nCustomerId="+resp.data[0].nCustomerId;
        $http.get(CustomerDataurl).then(function (resp) { 
                
            $scope.CustomerData = resp.data.mstCustomer;            
            $scope.productquotation.Customer=$scope.CustomerData[0].cCustomerFirstName;
            $scope.productquotation.nCustomerId=$scope.CustomerData[0].nCustomerId;  
                        
        }, function (err) {
            console.error('ERR', err);
        })
        
       $scope.productquotation.quotationtitle=$scope.QuotationMasterData[0].cOrderTitle;
	   $scope.productquotation.Reference=$scope.QuotationMasterData[0].cOrderCode;
       //var dt=$scope.QuotationMasterData[0].dtDeliveryDate;
       var dtDeliveryDate=new Date($scope.QuotationMasterData[0].dtDeliveryDate);      
       var ddDeliveryDate = dtDeliveryDate.getDate();
	   var mmDeliveryDate = dtDeliveryDate.getMonth()+1; //January is 0!
	   var yyyyDeliveryDate = dtDeliveryDate.getFullYear();	
	   if(ddDeliveryDate<10){
			ddDeliveryDate='0'+ddDeliveryDate
		} 
		if(mmDeliveryDate<10){
			mmDeliveryDate='0'+mmDeliveryDate
	    } 	    
	   dtDeliveryDate = yyyyDeliveryDate+'-'+mmDeliveryDate+'-'+ddDeliveryDate;	    
       $scope.productquotation.delivarydate=dtDeliveryDate; 
        
       var dtPaymentDueDate=new Date($scope.QuotationMasterData[0].dtPaymentDueDate);
       var ddPaymentDueDate = dtPaymentDueDate.getDate();
	   var mmPaymentDueDate = dtPaymentDueDate.getMonth()+1; //January is 0!
	   var yyyyPaymentDueDate = dtPaymentDueDate.getFullYear();	
	   if(ddPaymentDueDate<10){
			ddPaymentDueDate='0'+ddPaymentDueDate
	   } 
	   if(mmPaymentDueDate<10){
			mmPaymentDueDate='0'+mmPaymentDueDate
	   }  
	   dtPaymentDueDate = yyyyPaymentDueDate+'-'+mmPaymentDueDate+'-'+ddPaymentDueDate;
       $scope.productquotation.paymentduedate=dtPaymentDueDate;
      
       var dtValidityDate=new Date($scope.QuotationMasterData[0].dtValidityDate);
       var ddValidityDate = dtValidityDate.getDate();
	   var mmValidityDate = dtValidityDate.getMonth()+1; //January is 0!
	   var yyyyValidityDate = dtValidityDate.getFullYear();	 
	   if(ddValidityDate<10){
			ddValidityDate='0'+ddValidityDate
	   } 
	   if(mmValidityDate<10){
			mmValidityDate='0'+mmValidityDate
	   } 
	   dtValidityDate = yyyyValidityDate+'-'+mmValidityDate+'-'+ddValidityDate;  
       $scope.productquotation.validitydate=dtValidityDate; 
        
        /*if($scope.QuotationMasterData[0].item)*/
      
        
       $scope.TotalValue=$scope.QuotationMasterData[0].fTotalPrice;
       $scope.ProductTerms={};
       $scope.ProductTerms.cPaymentTerms=$scope.QuotationMasterData[0].cPaymentTerms;
       $scope.productquotation.cWarrentyType=$scope.QuotationMasterData[0].cWarrentyType;
       $scope.productquotation.nWarrentyDuration=$scope.QuotationMasterData[0].nWarrentyDuration;
       $scope.shippingPaymentOption.paymentOption=$scope.QuotationMasterData[0].cPaymentTerms;
        
    }, function (err) {
            console.error('ERR', err);
        // err.status will contain the status code
    })

    /*Select items of quotes*/
    var dtlQuotationDataurl = path+"Order.asmx/SelectRowOrder?UserId=" + nUserId+ "&OrderId=" + QuotationId;
    $http.get(dtlQuotationDataurl).then(function (resp) {      
        $scope.dtlQuotationData = resp.data[0].Item[0];	     
        
        for(var QuotationDatalen=0;QuotationDatalen<$scope.dtlQuotationData.length;QuotationDatalen++)
                {                                                       
                        dtlQuotationDataAddNew.push({    
                        nOrderDetailId:$scope.dtlQuotationData[QuotationDatalen].nOrderDetailId, 
                        nOrderPalcedDate:$scope.dtlQuotationData[QuotationDatalen].dtDate,                                              
                        cProductName:$scope.dtlQuotationData[QuotationDatalen].cProductName,
                        Description:$scope.dtlQuotationData[QuotationDatalen].cDetail,
                        Warrentytype:$scope.dtlQuotationData[QuotationDatalen].cWarrentyType,
                        Tax:$scope.dtlQuotationData[QuotationDatalen].cTaxName,
                        Warrentymonths:$scope.dtlQuotationData[QuotationDatalen].nWarrantyMonth, 
                        fQuantity:$scope.dtlQuotationData[QuotationDatalen].fQuantity,
                        fProductPrice:$scope.dtlQuotationData[QuotationDatalen].fProductPrice,
                        Discount:$scope.dtlQuotationData[QuotationDatalen].fDiscount,
                        Total:$scope.dtlQuotationData[QuotationDatalen].fProductPrice,
                        nQuantityId:$scope.dtlQuotationData[QuotationDatalen].nQuantityId, 
                        nProductId:$scope.dtlQuotationData[QuotationDatalen].nProductId,
                        Price1:$scope.dtlQuotationData[QuotationDatalen].fProductPrice                                                                                                                  
                        });  
                    }   
                                                                                          
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
    
    

    var QuotationDataurl = path+"Order.asmx/SelectRowOrder?UserId=" + nUserId+ "&OrderId=" + QuotationId;
    $http.get(QuotationDataurl).then(function (resp) {        
        $scope.QuotationMasterData = resp.data;
		$scope.group=resp.data[0].cCurrentStatus;
        var PaymentDataurl = path+"paymentmode.asmx/SelectPaymentTearmsQuotesIdwise?nOrderId=" + QuotationId + "&nUserId=" + nUserId;
        $http.get(PaymentDataurl).then(function (resp) {
            $scope.PaymentTermsData = resp.data.dtlPaymentTerms;
            
            for(var PaymentTermsDatalen=0;PaymentTermsDatalen<$scope.PaymentTermsData.length;PaymentTermsDatalen++)
            {
               Terms.push({
                    nPaymentTermsId:$scope.PaymentTermsData[PaymentTermsDatalen].nPaymentTermsId,                                                          
                    cPaymentTerms:$scope.PaymentTermsData[PaymentTermsDatalen].cPaymentTerms                                                 
                    });                          
            }
            // For JSON responses, resp.data contains the result
        }, function (err) {
            console.error('ERR', err);
        })        
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })    
    /*jayesh-> change lead status start*/	    
	    $scope.changeEnvironment=function(value)	{
		    var changestatusurl = path+"Order.asmx/UpdateOrderStatus?nOrderId="+QuotationId+"&nUserId="+nUserId+"&cStatus="+orderstatus;
		    $http.get(changestatusurl).then(function (resp) {
			
		    }, function (err) {
			    console.error('ERR', err);
		    }) 
	   }
    /*jayesh-> change lead ststus end*/

  
    $scope.productquotation = {};
    var nUserId = window.localStorage['UserId'];
    var nEmpId = window.localStorage['EmployeeId'];
	
               /*Customer select popup start*/	
            $scope.showpopup=function(){
            
            $scope.productquotation.Customer='';
            $scope.productquotation.nCustomerId=0;
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
	        $scope.productquotation.Customer=name;
	        $scope.productquotation.nCustomerId=id;
	        $scope.show=false;
        }
        $scope.close=function(){
	        $scope.show=false;
        }
        /*Customer Select popup end*/


        /*Jayesh--> Bind All product in Popup start*/
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
                $scope.productlist = resp.data;
		        $ionicLoading.hide();
            })
        }
        $scope.setProduct=function(id,name,cWarrentyType,nWarrentyDuration){

	        $scope.productquotation.nProductId=id;
	        $scope.productquotation.product=name;
	        $scope.productquotation.cWarrentyType=cWarrentyType;
	        $scope.productquotation.nWarrentyDuration=nWarrentyDuration;
	        $scope.showproduct=false;
        }
        $scope.closeproduct=function(){
	        $scope.showproduct=false;
        }
        /*Jayesh--> Bind All product in Popup Over*/
        
         var Qtyurl = path+"Quantity.asmx/SelectAllSellingUnit?UserId=" + nUserId;
         $http.get(Qtyurl).then(function (resp) {                
                $scope.QtyData = resp.data;
                // For JSON responses, resp.data contains the result
         }, function (err) {
                console.error('ERR', err);
                // err.status will contain the status code
        })
          
            
         $scope.add = function () {	
         
         $scope.forDisplayDiscount=true;
         $scope.forTotalPrice=true; 
         
            var TotalProductPrice = 0;    
            var TotalDiscount=0; 
            var TotalfProductPrice=0;  
            var TotalPriceWithTotalDiscount=0;   
           
           var nProductId = $scope.productquotation.nProductId;
           var nQuantityId = $scope.productquotation.quantity.nQuantityId;
           var fQuantity = $scope.productquotation.TotalQuantity;
           var Discount = $scope.productquotation.discount;
        
        if (Boolean(nProductId)) {
			if(Boolean(fQuantity))
			{
					var ProductDetailurl = path+"Product.asmx/Select_Product_Details?nProductId=" + nProductId + "&UserId=" +nUserId;

					$http.get(ProductDetailurl).then(function (resp) {                                    
						
						var cProductName = resp.data[0].cName;
						var Description = resp.data[0].cDescription;
						var Warrentytype = resp.data[0].cWarrantyType;                
						//console.log( resp.data[0].cWarrantyType);
						var Tax="";
						var Warrentymonths = resp.data[0].nWarrentyDuration;
						var Price1 = resp.data[0].fMRP;
						var fProductPrice = '$' + Price1;
						var Total = Price1 * fQuantity; 
						
						
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
					   // alert("ProductId"+nProductId+"Warrentytype"+Warrentytype);
						
						if (Discount != '' && Discount != '0' && Discount != 0 && Discount != null) {
							Total = (Total - (((Price1 * fQuantity) * Discount) / 100));
						}
						else {
							Discount = 0;
							Total = (Total - (((Price1 * fQuantity) * Discount) / 100));
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
														   
						dtlQuotationDataAddNew.push({
						nOrderDetailId:0, 
						nOrderPalcedDate:today,                               
						cProductName:cProductName,
						Description:Description,
						Warrentytype:Warrentytype,
						Tax:Tax,
						Warrentymonths:Warrentymonths, 
						fQuantity:fQuantity,
						fProductPrice:Price1,
						Discount:Discount,
						Total:Total,
						nQuantityId:nQuantityId, 
						nProductId:nProductId,
						Price1:Price1                               
						});
						
					  
						/*var TotalProductPrice = 0;
						for (var i = 0; i < dtlQuotationDataAddNew.length; i++) {                
							var temp =dtlQuotationDataAddNew[i]['Total'];
							TotalProductPrice = TotalProductPrice + temp;                   
						}*/
						
						/*TotalValue of Discount*/                          
							for (var i = 0; i < dtlQuotationDataAddNew.length; i++) {                                                               
								var Discounttemp =dtlQuotationDataAddNew[i]['Discount']; 
								//console.log(Discounttemp);        
								TotalDiscount = TotalDiscount+ Discounttemp;
								//console.log(DiscountTotalProductPrice);
								$scope.DiscountTotalValue=TotalDiscount;                                          
							} 
							
							/*TotalValue of fMRP*/
							for (var i = 0; i < dtlQuotationDataAddNew.length; i++) {                                                               
								var fProductPricetemp =(dtlQuotationDataAddNew[i]['fProductPrice']*dtlQuotationDataAddNew[i]['fQuantity']); 
								//console.log(fProductPricetemp);        
								TotalfProductPrice = TotalfProductPrice+fProductPricetemp;
								//console.log(TotalfProductPrice);
								$scope.TotalfProductPrice=TotalfProductPrice;                                          
							} 
							
							/*Calculate Discount*/                          
							if(Boolean($scope.DiscountTotalValue)) {                                                                 
								 TotalPriceWithTotalDiscount = ($scope.TotalfProductPrice)-($scope.TotalfProductPrice * $scope.DiscountTotalValue) / 100;                                                                
							}
							else {                                   
							   Discount = 0;
							   //Total = (Total - (((Price1 * fQuantity) * Discount) / 100));
							   TotalPriceWithTotalDiscount =($scope.TotalfProductPrice)-(($scope.TotalfProductPrice * Discount) / 100);
							}
							$scope.TotalValue=TotalPriceWithTotalDiscount;
																					
						   //console.log(TotalProductPrice);                                                                                                                                                     
						$scope.dtlQuotationData=dtlQuotationDataAddNew;
					   
					   // $scope.TotalValue = TotalProductPrice;                
						$scope.productquotation.product='';               
						$scope.productquotation.quantity = 0;
						$scope.productquotation.TotalQuantity = '';
						$scope.productquotation.discount = '';
						
						//For JSON responses, resp.data contains the result                                            
					}, function (err) {
						console.error('ERR', err);
						//alert(err);
						// err.status will contain the status code
					})
			}
			else
			{
				ionicToast.show('Please Enter Quantity', 'middle', false, 2500);
			}
        } 
		else
		{
			ionicToast.show('Please Select Product', 'middle', false, 2500);
		}			
       }
         
      
        $scope.addTerms = function () {
        
			var Products=$scope.productquotation.paymentterms;
			if (Products != null && Products != '') {
			 Terms.push({    
					nPaymentTermsId:0,                                         
					cPaymentTerms:Products                             
					});            
			}      	
			$scope.PaymentTermsData=Terms;         
			$scope.productquotation.paymentterms = '';     
        }
        
        $scope.Edit = function () {	 
     
	        var nQuotationMasterId = $location.search().QuotationId;
		    var UserId = nUserId;
            var SupplierId = '0';
            var CustomerId =$scope.productquotation.nCustomerId;
            if(CustomerId==''){
                CustomerId=$scope.CustomerData[0].nCustomerId;	
             }
           
		    var QuetationTitle = $scope.productquotation.quotationtitle;		   
            var QuotatinType = 'Quotes';
            //QuotatinType=;
            if (typeof QuotatinType === "undefined") {
                QuotatinType = '';
            }		
             
            var TotalPrice=$scope.TotalValue;
            //alert(TotalPrice);
            
            /*if(TotalPrice=='')
            {
                 TotalPrice= $scope.QuotationMasterData[0].fTotalPrice;	                
            }*/
            
            var PaymentTeams=$scope.shippingPaymentOption.paymentOption;       
            if(PaymentTeams=='')
            {	         
                 PaymentTeams=$scope.QuotationMasterData[0].cPaymentTerms;	
            }    
            
            var DeliveryDate=$scope.productquotation.delivarydate;
            if(DeliveryDate==''){      
             DeliveryDate= $scope.QuotationMasterData[0].dtDeliveryDate;     
            }
            
            var VaidityDate = $scope.productquotation.validitydate;
            if(VaidityDate==''){      
             VaidityDate= $scope.QuotationMasterData[0].dtValidityDate;     
            }
            
           var PaymentDueDate= $scope.productquotation.paymentduedate;        
            if(PaymentDueDate==''){      
             PaymentDueDate= $scope.QuotationMasterData[0].dtPaymentDueDate;     
            }
                       
            if (typeof QuetationTitle === "undefined") {
                QuetationTitle = '';
            }         
            var cCurrentStatus =  $scope.QuotationMasterData[0].cCurrentStatus;              
            var QuotationCode = $scope.productquotation.Reference;
            if(typeof QuotationCode === "undefined")
            {
                QuotationCode='';
            }
            var nEmpId=$scope.QuotationMasterData[0].nEmpId;
            if(typeof nEmpId === "undefined")
            {
                nEmpId=0;
            }
            var nQuotationId = '0';
		    var Address='';
		    var cRemarks='';
            if (CustomerId != null && CustomerId != '') {

               //if (QuotatinType != null && QuotatinType != '') {

                    if (DeliveryDate != null && DeliveryDate != '' && VaidityDate != null && VaidityDate != '' && PaymentDueDate != null && PaymentDueDate != '') {

                        $http({
                            method: 'POST',
                            url: path+'order.asmx/UpdateOrder',
                             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                            data: { nOrderId:nQuotationMasterId,
                                        nUserId: nUserId, 
                                        nSupplier: SupplierId,
                                        nCustId:CustomerId,
                                        cQuatationType: QuotatinType, 
                                        fTotal: TotalPrice,
                                        cPaymentTerms: PaymentTeams, 
                                        dtDelivaryDate: DeliveryDate, 
                                        dtPaymentDueDate: PaymentDueDate, 
                                        dtValidityDate: VaidityDate, 
                                        cQuatationCode: QuotationCode, 
                                        cQuatationTitle: QuetationTitle,
                                        cCurrentStatus:cCurrentStatus,
                                        nEmpId:nEmpId,
                                        cBranchAddress:Address,
                                        cRemarks:cRemarks }
                        }).success(function (response) {
                        
                                 nQuotationId = response.ID;
                                    
                                    if (nQuotationId > 0){
                                    
                                       /*var table = $('#test').DataTable();                                       
                                        var rowData = table.rows().data().length;*/
                                        for (var i = 0; i <dtlQuotationDataAddNew.length; i++) {
                                        
                                            //console.log($scope.dtlQuotationData);
                                        
                                            var nOrderDetailId = dtlQuotationDataAddNew[i]['nOrderDetailId'];
                                            var nProductId = dtlQuotationDataAddNew[i]['nProductId'];
                                            var ProductPrice = dtlQuotationDataAddNew[i]['Price1'];
                                            //alert(ProductPrice);
                                            var Warrentymonths = dtlQuotationDataAddNew[i]['Warrentymonths'];                           
                                            var fDicount =dtlQuotationDataAddNew[i]['Discount'];
                                            var Details = dtlQuotationDataAddNew[i]['Description'];
                                            var fQuantity = dtlQuotationDataAddNew[i]['fQuantity'];
                                            var QuantityId = dtlQuotationDataAddNew[i]['nQuantityId'];
                                            var OrderPlacedDate=dtlQuotationDataAddNew[i]['nOrderPalcedDate'];
                                            var PartsId = 0;
                                            var WarrentyType = '';
                                           
								            var WorentyMonth = Warrentymonths;							           						            								          							            
                                            
                                        if(nOrderDetailId!=0){
                                        
                                                $http({
                                                method: 'POST',
                                                url: path+'Order.asmx/UpdateOrderItem',
                                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                transformRequest: function (obj) {
                                                    var str = [];
                                                    for (var p in obj)
                                                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                                    return str.join("&");
                                                },
                                                data: { nOrdertemDetailId:nOrderDetailId,
                                                nUserId: UserId, nOrderId: nQuotationId, nProductId: nProductId, 
                                                fProductPrice: ProductPrice, 
                                                nWarrantyMonth: Warrentymonths, 
                                                fDiscount: fDicount, 
                                                cDetail: Details,
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
                                        else{
                                           
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
                                                fDiscount: fDicount,
                                                cDetail: Details,
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
                                        }
                                        
                                        /*var Terms = $('#Terms').DataTable();
                                        var Termsrows = Terms.rows().data().length;*/
                                        
                                        
                                        for (var i = 0; i < Terms.length; i++) {      
                                        
                                             var nPaymentTermsId=Terms[i]['nPaymentTermsId'];                                      
                                             var Paymentterms = Terms[i]['cPaymentTerms'];
                                             
                                             if(nPaymentTermsId!=0){
                                             
                                                    $http({
                                                method: 'POST',
                                                url: path+'PaymentMode.asmx/UpdatePaymentTerms',
                                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                transformRequest: function (obj) {
                                                    var str = [];
                                                    for (var p in obj)
                                                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                                    return str.join("&");
                                                },
                                                data: {nPaymentTermsId:nPaymentTermsId,cPaymentterms: Paymentterms, nQuotationMasterId: nQuotationId, nUserId: UserId,IsActive:true}
                                                 }).success(function (response) {
                                                 
                                                    });                                                      
                                              }                                              
                                              else
                                              {
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
                                    }
                                    $scope.productquotation.Customer = 0;
                                    $scope.productquotation.quotationtitle = '';
                                    $scope.productquotation.quotationtype = '';
                                    $scope.TotalValue = 0;
                                    $scope.productquotation.delivarydate = '';
                                    $scope.productquotation.paymentduedate = '';
                                    $scope.productquotation.validitydate = '';                                 
                               if(Id==2)
					           {
						            window.location = "#/app/salesdisplayquotation?Id=2";
					           }else
					           {
                                    window.location = "#/app/productquotationlist";
					           }

                        });
                    }
                    else {
					    ionicToast.show('Please Insert DeliveryDate & VaidityDate & PaymentDueDate', 'middle', false, 2500);
                       // alert('Please Insert DeliveryDate & VaidityDate & PaymentDueDate');
                    }
                // }
                // else {
				    // ionicToast.show('Please Insert Quotation Type', 'middle', false, 2500);
                    // //alert('Please Insert Quotation Title & Quotation Type');
                // }
            }
            else {
			    ionicToast.show('Please Select Customer', 'middle', false, 2500);
               // alert('Please Select Customer');
            }
        }
        
        /*Delete Order Item for List*/        
         $scope.remove = function (nOrdertemDetailId) {             
        $scope.forDisplayDiscount=true;
        $scope.forTotalPrice=true;                  
         if(nOrdertemDetailId==0)
         {
                for (var rmvProduct=0;rmvProduct<dtlQuotationDataAddNew.length;rmvProduct++) {
					if (dtlQuotationDataAddNew[rmvProduct]['nOrderDetailId'] == nOrdertemDetailId) {
						dtlQuotationDataAddNew.splice(rmvProduct,1);
					}
				}  
         }
         else{          
          for (var rmvProduct=0;rmvProduct<dtlQuotationDataAddNew.length;rmvProduct++) {
					if (dtlQuotationDataAddNew[rmvProduct]['nOrderDetailId'] == nOrdertemDetailId) {
						dtlQuotationDataAddNew.splice(rmvProduct,1);
					}					         
				}   
				    
            $http({
                method: 'POST',
                url: path+'Order.asmx/DeleteOrderItem',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
               data: {nOrdertemDetailId:nOrdertemDetailId,nUserId:nUserId}
            }).success(function (response) {			
				//console.log('Success', response);
				console.log(response);
				// alert("ok");
            });
                             	 
         }
         
			$scope.dtlQuotationData=dtlQuotationDataAddNew;
      
							/*TotalValue of Discount*/                          
							for (var i = 0; i < dtlQuotationDataAddNew.length; i++) {                                                               
								var Discounttemp =dtlQuotationDataAddNew[i]['Discount']; 
								//console.log(Discounttemp);        
								TotalDiscount = TotalDiscount+ Discounttemp;
								//console.log(DiscountTotalProductPrice);
								$scope.DiscountTotalValue=TotalDiscount;                                          
							} 
							
							/*TotalValue of fMRP*/
							for (var i = 0; i < dtlQuotationDataAddNew.length; i++) {                                                               
								var fProductPricetemp =(dtlQuotationDataAddNew[i]['fProductPrice']*dtlQuotationDataAddNew[i]['fQuantity']); 
								//console.log(fProductPricetemp);        
								TotalfProductPrice = TotalfProductPrice+fProductPricetemp;
								//console.log(TotalfProductPrice);
								$scope.TotalfProductPrice=TotalfProductPrice;                                          
							} 
							
							/*Calculate Discount*/                          
							if(Boolean($scope.DiscountTotalValue)) {                                                                 
								 TotalPriceWithTotalDiscount = ($scope.TotalfProductPrice)-($scope.TotalfProductPrice * $scope.DiscountTotalValue) / 100;                                                                
							}
							else {                                   
							   Discount = 0;
							   //Total = (Total - (((Price1 * fQuantity) * Discount) / 100));
							   TotalPriceWithTotalDiscount =($scope.TotalfProductPrice)-(($scope.TotalfProductPrice * Discount) / 100);
							}
							$scope.TotalValue=TotalPriceWithTotalDiscount;
							              
        }     
        
        /*Remove PaymentTerms*/ 
         $scope.removePaymentTerms = function (nPaymentTermsId) {  
        
         if(nPaymentTermsId==0)
         {
                for (var rmvTerms=0;rmvTerms<Terms.length;rmvTerms++) {
					if (Terms[rmvTerms]['nPaymentTermsId'] == nPaymentTermsId) {
						Terms.splice(rmvTerms,1);
					}
				}  
         }
         else{ 
         
            for (var rmvTerms=0;rmvTerms<Terms.length;rmvTerms++) {
					if (Terms[rmvTerms]['nPaymentTermsId'] == nPaymentTermsId) {
						Terms.splice(rmvTerms,1);
					}
				} 
				
				$http({
                method: 'POST',
                url: path+'PaymentMode.asmx/DeletePaymentTerms',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
               data: {nPamenttermsId:nPaymentTermsId,nUserId:nUserId}
            }).success(function (response) {			
				//console.log('Success', response);
				console.log(response);
				// alert("ok");
            });
                             	 
         }
          $scope.PaymentTermsData=Terms;
         
         }
          
})

.controller('productpurchasequotationdetail', function ($scope, $http, $location,ionicToast) {

    var path=window.localStorage['path'];
    var nUserId = window.localStorage['UserId'];
    var nEmpId = window.localStorage['EmployeeId'];
	$scope.CurruncyLogo=window.localStorage['CurruncyLogo'];
	
    var QuotationId = $location.search().QuotationId;
    if(QuotationId==null)
		 QuotationId=window.localStorage['QuotationIdbackid'];
	 else
		window.localStorage['QuotationIdbackid']=QuotationId;
	
    var QuotationDataurl = path+"Order.asmx/SelectRowOrder?UserId=" + nUserId + "&OrderId=" + QuotationId;

    $http.get(QuotationDataurl).then(function (resp) {    
        //console.log('Success', resp);        
        $scope.QuotationMasterData = resp.data;     
        
         
        var CustomerDataurl = path+"Customer.asmx/SelectRow?UserId=" +nUserId + "&nCustomerId=" +resp.data[0].nCustomerId;
        $http.get(CustomerDataurl).then(function (resp) {           
            $scope.CustomerData = resp.data.mstCustomer;

            // For JSON responses, resp.data contains the result
        }, function (err) {
            console.error('ERR', err);
        })
        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })
	
	var allOrderStatusUrl = path+"Order.asmx/SelectOrderStatusList?UserId=" + nUserId;
	$http.get(allOrderStatusUrl).then(function (respAllOrderStatusUrl) {
		//console.log('Success', resp);
		$scope.orderStatus = respAllOrderStatusUrl.data;
		//console.log(respAllOrderStatusUrl.data);
		// For JSON responses, resp.data contains the result
	}, function (err) {
		console.error('ERR', err);
	})

    var dtlQuotationDataurl = path+"Order.asmx/SelectRowOrder?UserId=" + nUserId + "&OrderId="+QuotationId;
    $http.get(dtlQuotationDataurl).then(function (resp) {
       // console.log('Success', resp.data[0].Item);
        $scope.dtlQuotationData = resp.data[0].Item[0];
        //console.log($scope.dtlQuotationData);
        
		 // $scope.fTotal = resp.data[0].fTotal;
		// var total = $scope.fTotal;
		// $scope.total = total;
		// alert(total);
		
        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })


    var QuotationDataurl = path+"Order.asmx/SelectRowOrder?UserId=" + nUserId + "&OrderId="+QuotationId;

    $http.get(QuotationDataurl).then(function (resp) {
        //console.log('Success quotation data url', resp);
        $scope.QuotationMasterData = resp.data;
		$scope.group=resp.data[0].cCurrentStatus;
		
		window.localStorage['nLoginId']=resp.data[0].nLoginId;

        var PaymentDataurl = path+"paymentmode.asmx/SelectPaymentTearmsQuotesIdwise?nOrderId=" + QuotationId + "&nUserId=" + nUserId;

        $http.get(PaymentDataurl).then(function (resp) {
            //console.log('Success', resp);
            $scope.PaymentTermsData = resp.data.dtlPaymentTerms;
            // For JSON responses, resp.data contains the result
        }, function (err) {
            console.error('ERR', err);
        })


        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);

        // err.status will contain the status code
    })

var Id = $location.search().Id;
	if(Id==null)
		Id=window.localStorage['backCustId'];
	else
		window.localStorage['backCustId']=Id;

	$scope.changeEnvironment=function(value,orderstatus)	{

		$scope.QuotationMasterData[0].cCurrentStatus=value;
		$scope.popup=false;
		var changestatusurl = path+"Order.asmx/UpdateOrderStatus?nOrderId="+QuotationId+"&nUserId="+nUserId+"&cStatus="+orderstatus;
		$http.get(changestatusurl).then(function (resp11) {
			
			if(resp11.data.Message=="Order Status Updated Successfully") {
				ionicToast.show(resp11.data.Message, 'middle', false, 2500);
				
				var nLoginId = window.localStorage['nLoginId'];
				//console.log(orderStatusCustomerId, 'customer id');
				//console.log(orderstatus, 'changed order status');
				
				/*Send notification to customer for status changed start*/
				var loginUserurl ="http://52.34.37.107:8080/vitenotification/send_notification.php?id=" + nLoginId + "&title=Order Status" + "&message=Your order status changed to "+orderstatus;
				$http.get(loginUserurl).then(function (resp) {
				console.log(resp);
				//alert("Success");
				})
				/*Send notification to customer for status changed End*/
				
				
				window.location = "#/app/productquotationlist";
				
				localStorage.removeItem('nLoginId');
				
			} else {
				ionicToast.show('Error updating status', 'middle', false, 2500);
				window.location = "#/app/productquotationlist";
			}
			
		}, function (err) {
			console.error('ERR', err);
		}) 
	}

$scope.showpopup=function(){
	
	$scope.popup=true;
}

$scope.closepopup=function(){
	$scope.popup=false;
}

/*jayesh -> change status popup end*/



//Send Email 

$scope.SendMail=function(nOrderId)
{
	 var nUserId = window.localStorage['UserId'];
	
	alert(nOrderId);

                    $http({
						method: 'POST',
						url:'http://localhost:5326/FMS/WebServices/Order.asmx/SendMailFromQuotation',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
							return str.join("&");
						},
						data: { nUserId: nUserId, 
							nOrderId:nOrderId
						
							}
				 }).success(function (response) {
					
					ionicToast.show('Your Message hase been sent.', 'middle', false, 2500);
				  
				 })	  
	
}

//end

 $scope.Edit = function () {
	 
	 if(Id== 2)
	 {
		 window.location = "#/app/EditQutation?QuotationId=" + QuotationId + "&Id=2";
	 }else
	 {
	 
	  window.location = "#/app/EditQutation?QuotationId=" + QuotationId;
	 }
	// alert(QuotationId);
 }
})


}());