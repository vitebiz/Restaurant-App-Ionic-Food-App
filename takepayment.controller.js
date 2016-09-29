(function () {
    'use strict';
var app = angular.module('vitebizFMS');
app.controller('TakePaymentInvoicedetail', function ($scope, $http, $location,$ionicLoading,ionicToast) {

     var path=window.localStorage['path'];
     var nUserId = window.localStorage['UserId'];
     var nCustomerId=$location.search().nCustomerId;
	 $scope.CurruncyLogo = window.localStorage['CurruncyLogo'];
     var cType='Invoices';
     var cCurrentStatus='Pending';
     var InvoiceData=[];
     var ChangeAmount=[];
     $scope.TakePaymentData={};
     $scope.TakePaymentData.TotalAmountReceived='0';
     $scope.TakePaymentData.txtDiscount='0';
     $scope.TakePaymentData.txtPayment='0';
    //var QuotationId = $location.search().QuotationId;
    
     var CustomerRowurl = path+"Customer.asmx/SelectRow?UserId=" + nUserId+"&nCustomerId="+nCustomerId;
      
     $http.get(CustomerRowurl).then(function (resp) {    
            $scope.CustomerData = resp.data.mstCustomer[0];
            //console.log($scope.InvoiceTackPaymentData);
		    $ionicLoading.hide();
            // For JSON responses, resp.data contains the result
     }, function (err) {
            console.error('ERR', err);
            // err.status will contain the status code
     })
      
 /*Customer Account Type Select Start*/
        var SelectAllCutomerAccountTypeurl = path+"CustomerAccountType.asmx/SelectAllCutomerAccountType?UserId=" + nUserId;
        $http.get(SelectAllCutomerAccountTypeurl).then(function (resp) {       
            $scope.CutomerAccountType = resp.data;
		    $ionicLoading.hide();
            // For JSON responses, resp.data contains the result
        }, function (err) {
            console.error('ERR', err);
            // err.status will contain the status code
        })
/*Customer Account Type Select end*/
      
/*Customer Reference No. Genrate start*/
    var SelectAllTakePaymenturl = path+"TakePayment.asmx/SelectAllTakePayment?UserId=" + nUserId;   
    $http.get(SelectAllTakePaymenturl).then(function (resp) {  
             
           $scope.SelectAllTakePayment = resp.data;
           var iRowForCount=$scope.SelectAllTakePayment.length;
           if(iRowForCount!=0)
           {
              iRowForCount=iRowForCount-1;
              var TakePaymentId=resp.data[iRowForCount].nTakePaymentId; 
              var incId=TakePaymentId+1; 
              var finalString="CP"+incId;
              $scope.TakePaymentData.RefNO=finalString;
              //console.log($scope.TakePaymentData);
           }
           else{
                var finalString="CP1";
                $scope.TakePaymentData.RefNO=finalString;
           }
		    $ionicLoading.hide();
            // For JSON responses, resp.data contains the result
        }, function (err) {
            console.error('ERR', err);
            // err.status will contain the status code
        })
/*Customer Reference No. Genrate end*/
 
 $scope.InvoiceDataForBind={};

 /*Bind CustomerWise Invoices start*/
     var Customerurl = path+"TakePayment.asmx/SelectallCustomerInvoiceTackPayment?nUserId=" + nUserId+"&nCustomerId="+nCustomerId+"&cType="+cType+"&cCurrentStatus="+cCurrentStatus;
     $http.get(Customerurl).then(function (resp) { 
        
            $scope.InvoiceTackPaymentData = resp.data;
            console.log(resp.data[0].Success);
            if(resp.data[0].Success==0)
            {
                $scope.ForDataInsertTakePayemnt=false;
                $scope.InvoiceDetails=false;
            }
            else{
//            alert("abc");
                $scope.ForDataInsertTakePayemnt=true;
                $scope.InvoiceDetails=true;
            
            }
            var InvoiceTackPaymentDatalen=$scope.InvoiceTackPaymentData;
                      
            for(var Invoicelen=0;Invoicelen<$scope.InvoiceTackPaymentData.length;Invoicelen++)
            {
                //ADD First Time
                InvoiceData.push({
                    InvoiceNo:resp.data[Invoicelen].nOrderId, 
                    OriginalAmount:resp.data[Invoicelen].fTotalPrice1,
                    Discount:0,
                    TakePeyment:0,                               
                    AmountDue:resp.data[Invoicelen].fTotalPrice2                           
                });
                //$scope.TakePaymentData.lblAmountDue=resp.data[Invoicelen].fTotalPrice2;
            }
            
             $scope.InvoiceDataForBind=InvoiceData;
            //console.log($scope.InvoiceTackPaymentData);
		    $ionicLoading.hide();
            // For JSON responses, resp.data contains the result
     }, function (err) {
            console.error('ERR', err);
            // err.status will contain the status code
     })
 /*Bind CustomerWise Invoices end*/    
 
     $scope.showpopupPayment = function (InvoiceNumber,AmountDue,OriginalAmount) {   
    
        $scope.popupPayment=true;
       
        var InvoiceNumber=InvoiceNumber;
        //alert(InvoiceNumber);
        var AmountDue=AmountDue;
       
        $scope.changeDiscountEnvironment= function (txtDiscount) {
        
            if(txtDiscount=="")
            {
                $scope.TakePaymentData.txtDiscount='0';
            }
            else if(txtDiscount!="")
            {
                $scope.TakePaymentData.txtDiscount=txtDiscount;
            }
        }       
        $scope.changePaymentEnvironment= function (txtPayment) {
       
            var Payment=txtPayment;
            $scope.TakePaymentData.txtPayment=txtPayment;  
           
        }
        
        $scope.Payment= function () {
         
            ChangeAmount=[]; 
            var Amount=0;
            var Discount=$scope.TakePaymentData.txtDiscount;
            var TakePeyment=$scope.TakePaymentData.txtPayment;
            if(Discount!=0)
            {
               var FinalAmount=AmountDue-Discount;                
                for(ChageAmountInInvoicedata=0;ChageAmountInInvoicedata<InvoiceData.length;ChageAmountInInvoicedata++) 
                {
                    var InvoiceNO=InvoiceData[ChageAmountInInvoicedata].InvoiceNo;
                    if(InvoiceNO==InvoiceNumber)
                    {
                        InvoiceData[ChageAmountInInvoicedata].AmountDue=FinalAmount;
                        InvoiceData[ChageAmountInInvoicedata].Discount=Discount;
                        InvoiceData[ChageAmountInInvoicedata].TakePeyment=TakePeyment;
                    }
                } 
            }
            else if(TakePeyment!=0)
            {    
                        var FinalAmount=AmountDue-TakePeyment;
                 
                        for(ChageAmountInInvoicedata=0;ChageAmountInInvoicedata<InvoiceData.length;ChageAmountInInvoicedata++) 
                        {
                            var InvoiceNO=InvoiceData[ChageAmountInInvoicedata].InvoiceNo;
                            if(InvoiceNO==InvoiceNumber)
                            {
                                //InvoiceData[ChageAmountInInvoicedata].AmountDue=FinalAmount;
                                InvoiceData[ChageAmountInInvoicedata].Discount=Discount;
                                InvoiceData[ChageAmountInInvoicedata].TakePeyment=TakePeyment;
                                
                            }
                        } 
//                } 
//                else{
//                    ionicToast.show('You must enter a Payment Amount for invoice.', 'middle', false, 2500);
//                    alert("abc");
//                }          
            }
           
           $scope.InvoiceDataForBind=InvoiceData;
           var TotalAmount=0;
           for(var FindTotalPayAmount=0;FindTotalPayAmount<$scope.InvoiceDataForBind.length;FindTotalPayAmount++)
           {
               
                TotalAmount+=+$scope.InvoiceDataForBind[FindTotalPayAmount].TakePeyment;
               
           }
           $scope.TakePaymentData.TotalAmountReceived=TotalAmount;
          // alert(TotalAmount);
           $scope.popupPayment=false;    
        }    
     }
    $scope.closepopupPayment= function () { 
    
        $scope.popupPayment=false;
        $scope.TakePaymentData.txtDiscount='0';
        $scope.TakePaymentData.txtPayment='0';
      
    }
    $scope.Save = function () { 
   // alert("abc");
    
            var nCustomerId=$location.search().nCustomerId;
            var data=$scope.TakePaymentData.CoustomerAccountType;
            //var nCutomerAccountTypeId=data.nCutomerAccountTypeId;
            //console.log(data);
            if(data!=undefined)
            {
            var nCutomerAccountTypeId=data.nCutomerAccountTypeId;
            var cNotes=$scope.TakePaymentData.Notes;
            if(cNotes==undefined)
            {
                cNotes="";
            }
            var cReferenceNumber=$scope.TakePaymentData.RefNO;
            var fTotalAmountReceived=$scope.TakePaymentData.TotalAmountReceived;
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
            
            var dtPaymentReceived=today;
            var nEmployeeId= window.localStorage['EmployeeId'];
            var cPaymentMode="";
            var cPaymentTocken="";
            var nUserId=window.localStorage['UserId'];
            var nLanguageId=1;
            var IsActive=true;
            var IsValid="";
            //alert(fTotalAmountReceived);
            if(fTotalAmountReceived!=0)
            {
               for(var idtlTakePayment=0;idtlTakePayment<$scope.InvoiceDataForBind.length;idtlTakePayment++)
               {
                        var OrderId=InvoiceData[idtlTakePayment].InvoiceNo;
                        
                        var fPaymentAmount=InvoiceData[idtlTakePayment].TakePeyment;          
                        var fDiscountGiven=InvoiceData[idtlTakePayment].Discount;
                        var fAmountDue=InvoiceData[idtlTakePayment].AmountDue;
                        //var fAmountDue=0; 
                       
                        if(fDiscountGiven!=0)
                        {
                            if(fPaymentAmount==fAmountDue)
                            {
                                 fAmountDue=fAmountDue-fPaymentAmount;
                            }
                            else{
                                
                                fDiscountGiven=0;
                                //InvoiceData[idtlTakePayment].AmountDue=
                                IsValid='Yes';
                            }
                        }
                        else{
                             //alert(fDiscountGiven);
                            fAmountDue=fAmountDue-fPaymentAmount;
                        }
                        
              }
              if(IsValid=='Yes')
              {
                           ionicToast.show('You cannot apply a discount to an invoice that is not paid in full.', 'middle', false, 2500);
                           $scope.popupPayment=true;
               }
               if(IsValid=='Yes')
               {
               }
               
              
                $http({
                     method: 'POST',
                     url: path+'TakePayment.asmx/AddTakePAyment',
                     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                     transformRequest: function (obj) {
                         var str = [];
                         for (var p in obj)
                         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                         return str.join("&");
                    },
                   data: { 
                   
                         nCustomerId: nCustomerId, 
                         nCutomerAccountTypeId: nCutomerAccountTypeId, 
                         cNotes: cNotes,
                         cReferenceNumber:cReferenceNumber, 
                         fTotalAmountReceived:fTotalAmountReceived,
                         dtPaymentReceived:dtPaymentReceived,
                         nEmployeeId:nEmployeeId,
                         cPaymentMode:cPaymentMode,
                         cPaymentTocken:cPaymentTocken,
                         nUserId:nUserId,
                         nLanguageId:nLanguageId,
                         IsActive:true
                   }
               }).success(function (response) {
                                          
               for(var idtlTakePayment=0;idtlTakePayment<$scope.InvoiceDataForBind.length;idtlTakePayment++)
               {
                        var OrderId=InvoiceData[idtlTakePayment].InvoiceNo;
                        var nTakePaymentId=response.ID;
                        var fPaymentAmount=InvoiceData[idtlTakePayment].TakePeyment;
                        var fDiscountGiven=InvoiceData[idtlTakePayment].Discount;
                        var fAmountDue=InvoiceData[idtlTakePayment].AmountDue;
                        //var fAmountDue=Amount-fPaymentAmount;
                        var nUserId=window.localStorage['UserId'];
                        var IsActive=true;
                        var IsDisable=false;
                        
                        if(fDiscountGiven!=0)
                        {
                            if(fPaymentAmount==fAmountDue)
                            {
                                 fAmountDue=fAmountDue-fPaymentAmount;
                            }
                            else{
                                
                                fDiscountGiven=0;
                                //IsValid='Yes';
                            }
                        }
                        else{
                             //alert(fDiscountGiven);
                            fAmountDue=fAmountDue-fPaymentAmount;
                        }
                   
                        $http({
                            method: 'POST',
                            url: path+'TakePayment.asmx/AdddtlTakePAyment',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            transformRequest: function (obj) {
                                var str = [];
                                for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                return str.join("&");
                            },
                            data: {                       
                                nOrderId: OrderId, 
                                nTakePaymentId: nTakePaymentId, 
                                fPaymentAmount: fPaymentAmount,
                                fDiscountGiven:fDiscountGiven, 
                                fAmountDue:fAmountDue,                          
                                nUserId:nUserId,
                                IsActive:IsActive,
                                IsDisable:IsDisable
                            }
                       }).success(function (response) {
                       
                                          
                      });
                       /*Update Status Order Paid*/
                       //alert(fAmountDue);
                       if(fAmountDue==0)
                       {
                           $http({
                                   method: 'POST',
                                   url: path+'Order.asmx/UpdateInvoiceStatusPaid',
                                   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                              transformRequest: function (obj) {
                                              var str = [];
                                              for (var p in obj)
                                                   str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                                   return str.join("&");
                                              },
                                              data: {
                                              
                                              nOrderId:OrderId,
                                              nUserId: nUserId, 
                                              cCurrentStatus: 'Paid', 
                                              cOrderType: 'Invoices'
                                             
                                              }
                            }).success(function (response) {
                                                     
                            }); 
                        }
                 /*Over*/                          
                 }
                 
                 if(IsValid!='Yes')
                 {
                    window.location="#/app/TakePaymentCustomerList";
                 }
                 console.log($scope.InvoiceDataForBind);             
              });  
              
              }
              else{
            
              ionicToast.show('You must enter a Payment Amount for at least one invoice.', 'middle', false, 2500);
              
              }
              }
              else{
                ionicToast.show('You need to select the bank account the customer payment will be deposited into.', 'middle', false, 2500);
              }  
     }
 /*Open Popup*/
 
})

/*Take Payment section*/
.controller('TakePaymentCustomerList', function ($scope, $http, $location,$ionicLoading,ionicToast) {

     var path=window.localStorage['path'];
     var nUserId = window.localStorage['UserId'];
     var cType='Invoices';
     var cCurrentstatus='Pending';
     
     var Customerurl = path+"TakePayment.asmx/SelectAllCustomerListForTakePayment?UserId=" + nUserId+"&cType="+cType+"&cCurrentstatus="+cCurrentstatus;
     $http.get(Customerurl).then(function (resp) {       
            
			
			if(resp.data[0]['Success'] == 0){
				
				$scope.notFound = true;
				$ionicLoading.hide();
				
			}else{
				
				$scope.CustomerData = resp.data;
				$ionicLoading.hide();
				
			}
            // For JSON responses, resp.data contains the result
     }, function (err) {
            console.error('ERR', err);
            // err.status will contain the status code
     })
})

}());