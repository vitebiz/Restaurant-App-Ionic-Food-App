(function () {
    'use strict';
var app = angular.module('vitebizFMS');

app.controller('PlaylistsCtrl', function ($scope, $http,$ionicLoading) {

     var path=window.localStorage['path'];
    var nUserId = window.localStorage['UserId'];
    var Customerurl = path+"Customer.asmx/SelectAllCustomer?nUserId=" + nUserId;
	$ionicLoading.show({
	
    content: 'Loading..',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 0,
    showDelay: 0
  });
    $http.get(Customerurl).then(function (resp) {
        
		//console.log(resp.data.mstCustomer);
        //$scope.CustomerList = resp.data.mstCustomer;
			//$ionicLoading.hide();
        /* Narendra changes customer list */
		
		 if(resp.data[0]['Success'] == 0){
			
			$scope.notShow = true;
			$ionicLoading.hide();
			
		}else{
			
			//$scope.CustomerList = resp.data.mstCustomer;
			$scope.CustomerList = resp.data;
			$ionicLoading.hide();
		} 
		
		
		/* End customer list none */
		
        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })
	 $scope.addCall = function (Contectnumber) {
		  
		    window.open("tel:" + Contectnumber);
		  
	  }
	  
	  $scope.addmail = function (email) {
		  
		    window.open("mailto:" + email);
		  
	  }
	    $scope.addsms = function (sms) {
		  
		    window.open("sms:" + sms);
		  
	  }
	  $scope.AddCustomer = function () {
		  
		    window.location.href = '#/app/addnewcustomer';
		  
	  }
	 // $scope.filter = function () {
		 
		  // window.location.href = '#/app/CustomerFilter';
	 // }
$scope.filter=function(){
	$scope.showfilter=true;
}
$scope.closeproduct=function(){
	$scope.showfilter=false;
}
 
})

.controller('addnewcustomer', function ($scope, $http,$location,ionicToast,$ionicPopup,$ionicLoading) {

var path=window.localStorage['path'];
$scope.value="company";
$scope.showcompany=true;
$scope.changetype=function(value){
	
		if(value=='personal')
		{
			
			$scope.showcompany=false;
			$scope.showpersonal=true;
			
		}
		if(value=='company')
		{
			
			$scope.showcompany=true;
			$scope.showpersonal=false;
		}
		
	}
	
    $scope.customerdata = {};

    var nUserId = window.localStorage['UserId'];
	
   var nUserId = window.localStorage['UserId'];
   

    var ClientSourceurl = path+"CustomerSource.asmx/SelectAllSource?UserId=" + nUserId;

    $http.get(ClientSourceurl).then(function (resp) {
        $scope.ClientSourceList = resp.data;
    }, function (err) {
        console.error('ERR', err);
       
    })

    var ClientTypeurl = path+"CustomerClientType.asmx/SelectAllClientType?UserId=" + nUserId;

    $http.get(ClientTypeurl).then(function (resp) {      
        $scope.ClientTypeList = resp.data;
        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })

    var Industryurl = path+"CustomerIndustry.asmx/SelectAllIndustry?UserId=" + nUserId;

    $http.get(Industryurl).then(function (resp) {    
        $scope.IndustryList = resp.data;
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

    $scope.Save = function () {

		$ionicLoading.show({
	
		content: 'Loading..',
		animation: 'fade-in',
		showBackdrop: false,
		maxWidth: 0,
		showDelay: 0
	  });
        var sourceId = $scope.customerdata.SourceId;
        if (typeof sourceId === "undefined") {
            sourceId = 0;
        }
        var UserType = window.localStorage['UserType'];
        var customerType = "";
        if (UserType == 'Admin') {
            customerType = 'Direct';
        }
        else if (UserType = 'Sales') {
            customerType = 'Salesman Reference';
        }

        var ClientId = $scope.customerdata.ClientId;
        if (typeof ClientId === "undefined") {
           
            ClientId = 0;
        }
        var EmpId = window.localStorage['EmployeeId'];
        var StoreId = window.localStorage['StoreId'];
        var CustomerReferenceId = 0;
        var customerFirstName = $scope.customerdata.firstname;
       // alert(customerFirstName);
        if (typeof customerFirstName === "undefined") {
            customerFirstName = " ";
        }
        var CustomerMiddleName = $scope.customerdata.middlename;
        if (typeof CustomerMiddleName === "undefined") {
            CustomerMiddleName = " ";
        }
        var customerlastName = $scope.customerdata.lastname;
        if (typeof customerlastName === "undefined") {
            customerlastName = " ";
        }
        var CustomerWebsite=" ";
        
        var contactno = $scope.customerdata.contactno;
        if (typeof contactno === "undefined") {
            contactno = " ";
        }
        var CustomerEmailId = $scope.customerdata.emailid;
        if (typeof CustomerEmailId === "undefined") {
            CustomerEmailId = " ";
        }
        var CustomerAddress = $scope.customerdata.address;
        if (typeof CustomerAddress === "undefined") {
            CustomerAddress = " ";
        }
        
        var City=$scope.customerdata.City;
        if (typeof City === "undefined") {
            City = '';
        }
        
        var ZipCode = '';
        
        var CustomerCompany = $scope.customerdata.contactperson;
        if (typeof CustomerCompany === "undefined") {
            CustomerCompany = '';
        }

        var IndustryId = $scope.customerdata.IndustryId;
        if (typeof IndustryId === "undefined") {
           
            IndustryId = 0;
        }
        

        var PrimaryPerson = $scope.customerdata.contactperson;
        if (typeof PrimaryPerson === "undefined") {
            PrimaryPerson = " ";
        }
        
        var PrimaryPersonEmail=$scope.customerdata.PrimaryPersonEmail;
        if (typeof PrimaryPersonEmail === "undefined") {
            PrimaryPersonEmail = " ";
        }
        
        var PrimaryPersonDesignation=$scope.customerdata.Designation;
        if (typeof PrimaryPersonDesignation === "undefined") {
            PrimaryPersonDesignation = " ";
        }
      
        var PrimaryPersonContactNo = $scope.customerdata.contactpersonno;
        if (typeof PrimaryPersonContactNo === "undefined") {
            PrimaryPersonContactNo = " ";
        }
        var ddtCustomerBirthdate="1992-08-09";
        
        var IsCustomerMarridStatus=false;
		var dtCustomerAnniversaryDate="2016-08-09";

        //var AreaId = $scope.arealist.nAreaId;

        var CustomerFacebookLink = $scope.customerdata.fblink;
        if (typeof CustomerFacebookLink === "undefined") {
            CustomerFacebookLink = " ";
        }
        var CustomerGLink = $scope.customerdata.glink;
        if (typeof CustomerGLink === "undefined") {
            CustomerGLink = " ";
        }
        var CustomerLinkedLink = $scope.customerdata.linkedinlink;
        if (typeof CustomerLinkedLink === "undefined") {
            CustomerLinkedLink = "";
        }
		/* var CustomerRegistrationDate = $scope.customerdata.registrationdate;
        if (typeof CustomerRegistrationDate === "undefined") {
            CustomerRegistrationDate =  '01/01/0000';
        }*/
       
        var UserId = nUserId;
       
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
		var today = yyyy+'-'+mm+'-'+dd;

		var dtRegistrationDate=today;
		//var UserId=window.localStorage['UserId'];
		//alert(UserId);
		var IsActive=true;
		var IsVerified=true;
		var CustomerImage='';
		var cGender = '';
		var cPassword=$scope.customerdata.contactno;

        if (customerFirstName != '') {
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
                data: { nSourceId: sourceId, nClientId:ClientId, 
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
					cPassword:cPassword,cGender:cGender
					}
            }).success(function (response) {
            
               if(response.Success == 3)
				{
					ionicToast.show('Email Already Exists', 'middle', false, 2500);
					$ionicLoading.hide();
				}
				else
				{
					$ionicLoading.hide();
					window.location = "#/app/playlists";
				}				
            });
		

        }
        else {
            alert('Please Insert Customer Name');
        }

    }

})
.controller('dtlcustomer', function ($scope, $http, $location) {

    var nUserId = window.localStorage['UserId'];
	var CustomerId = $location.search().CustId;
	var path=window.localStorage['path'];
		$scope.CurruncyLogo=window.localStorage['CurruncyLogo'];
	 var Id = $location.search().Id;
	if(Id==null)
		Id=window.localStorage['backCustId1'];
	else
		window.localStorage['backCustId1']=Id;

	if(CustomerId==null)
		CustomerId=window.localStorage['backCustId'];
	else
		window.localStorage['backCustId']=CustomerId;


    var Customerurl = path+"Customer.asmx/SelectRow?UserId=" + nUserId + "&nCustomerId=" +window.localStorage['backCustId'];

    $http.get(Customerurl).then(function (resp) {
        //console.log('Success', resp);
        $scope.CustomerData = resp.data.mstCustomer;

        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })
	
	 $scope.addmail = function (mailid) {
		// alert(mailid);
		 window.open("mailto:" + mailid);
	 }
	$scope.addCall = function (Contectnumber) {
		  
		    window.open("tel:" + Contectnumber);
		  
	}

     var ChatmediaUrl = path+"CustomerAttributeValueSocialMedia.asmx/SelectAllAttributeForCustomer?nUserId=" +nUserId+"&nCustomerId=" +CustomerId;
	
   $http.get(ChatmediaUrl).then(function (resp) {
  
		//console.log(resp.data[0]);
        if(resp.data[0].Success==0)
		{
			//alert("kjnhsdkf");
			test();
		}else
		{
			//alert($scope.dtlEditCommunicationMedia);
		$scope.CommunicationMedia=resp.data;
		console.log($scope.CommunicationMedia);
		}
        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })
   var data1= 0;
function test()
{
//alert("test");
	var ChatUrl = path+"CustomerAttributeSocialMedia.asmx/SelectAllSocialMedia?nUserId="+nUserId;
	 $http.get(ChatUrl).then(function (resp) {
        console.log('Success', resp);
		$scope.CommunicationMedia=resp.data.mstCustomerAttribute;
		 $scope.Data=1;
        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })
	
}

/*jayesh -> select */
	var allappointment = path+"Appointment.asmx/SelectAllCustomerWiseAppointment?nUserId="+nUserId+"&nCustomerId="+CustomerId;
	 $http.get(allappointment).then(function (resp) {
		$scope.Appointment=resp.data.mstAppointmentManagement;
    }, function (err) {
        console.error('ERR', err);
    })
	
	var alltask = path+"DashboardActivities.asmx/SelectAllActivitiesTask?UserId="+nUserId+"&nCustomerId="+CustomerId;

	 $http.get(alltask).then(function (resp) {
		$scope.Task=resp.data;
    }, function (err) {
        console.error('ERR', err);
    })
	
	var alllead = path+"DashboardActivities.asmx/SelectAllLeadSummary?UserId="+nUserId+"&nCustomerId="+CustomerId;
	 $http.get(alllead).then(function (resp) {
		$scope.lead=resp.data;
    }, function (err) {
        console.error('ERR', err);
    })

/*jayesh -> select end*/
	 $scope.Edit = function () {
		 
		  if(Id ==2)
		  {
		  window.location.href = '#/app/EditCustomer?CustId='+CustomerId + "&Id=2";
		  }else
		  {
			   window.location.href = '#/app/EditCustomer?CustId='+CustomerId;
		  }
		 
	 }

	 // select Customer Invoicess
	 
	 var CustomerInvoicesurl = path+"Order.asmx/SelectAllOrderByCustomerWise?nUserId=" + nUserId + "&nCustomerId=" +CustomerId;
		 $http.get(CustomerInvoicesurl).then(function (resp) {
			$scope.CustomerInvoices=resp.data;
			
			}, function (err) {
				console.error('ERR', err);
			})
		
			
	// Total For Customer Invoices
	    var CustomerInvoicesTotalurl = path+"Order.asmx/SelectTotalForCustomerWise?nUserId=" + nUserId + "&nCustomerId=" +CustomerId;
		 $http.get(CustomerInvoicesTotalurl).then(function (resp) {
			$scope.TotalPrice=resp.data.TotalPrice;
			
			}, function (err) {
				console.error('ERR', err);
			})

})

//Over
 .controller('dtlEditCustomer', function ($scope, $http, $location) {

    //var CustomerId = 4;
   var path=window.localStorage['path'];
   var CustomerId = $location.search().CustId;
    var Id = $location.search().Id;
	if(Id==null)
		Id=window.localStorage['backCustId'];
	else
		window.localStorage['backCustId']=Id;

   if(CustomerId=='')
		CustomerId=window.localStorage['backeditCustId'];
	else
		window.localStorage['backeditCustId']=CustomerId;

   $scope.EditCustomerdata = {};
   
  var nUserId = window.localStorage['UserId'];
 var data='';
 var Customerurl = path+"Customer.asmx/SelectRow?UserId=" + nUserId + "&nCustomerId=" +window.localStorage['backCustId'];

    $http.get(Customerurl).then(function (resp) {
       // //console.log('Success', resp);
        
		$scope.EditCustomerdata = resp.data.mstCustomer;
		data=resp.data;
		
		$scope.Edit.cAuthorityPersonContactNo = parseInt(resp.data.mstCustomer[0].cAuthorityPersonContactNo); 
		$scope.Edit.cCustomerContactNo = parseInt(resp.data.mstCustomer[0].cCustomerContactNo); 
		//console.log($scope.Edit.cCustomerContactNo);
		$scope.Edit.cPrimaryPersonContactNo = parseInt(resp.data.mstCustomer[0].cPrimaryPersonContactNo); 
		$scope.$watch('cPrimaryPersonContactNo',function(val){
       
    });	
        // For JSON responses, resp.data contains the result
    }, function (err) {
        //console.error('ERR', err);
        // err.status will contain the status code
    })
/*jayesh -> set number in type number*/

    var nUserId = window.localStorage['UserId'];
   
    /* var ClientSourceurl = path+"CustomerSource.asmx/SelectAllSource?UserId=" + nUserId;

    $http.get(ClientSourceurl).then(function (resp) {
      //  //console.log('Success', resp);
        $scope.ClientSourceList = resp.data;
        // console.log( $scope.ClientSourceList);
   // console.log($scope.EditCustomerdata[0].nSourceId);
       $scope.EditCustomerdata.nSourceId=$scope.EditCustomerdata[0].nSourceId;
        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })

    var ClientTypeurl = path+"CustomerClientType.asmx/SelectAllClientType?UserId=" + nUserId;

    $http.get(ClientTypeurl).then(function (resp) {
       //console.log('Success', resp);
        $scope.ClientTypeList = resp.data;
        // console.log($scope.ClientTypeList);
        //console.log($scope.EditCustomerdata[0].nClientId);
        $scope.EditCustomerdata.nClientId=$scope.EditCustomerdata[0].nClientId;
        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    })

    var Industryurl = path+"CustomerIndustry.asmx/SelectAllIndustry?UserId=" + nUserId;

    $http.get(Industryurl).then(function (resp) {
       // //console.log('Success', resp);
        $scope.IndustryList = resp.data;
          // console.log( $scope.IndustryList);
        $scope.EditCustomerdata.nIndustryId=$scope.EditCustomerdata[0].nIndustryId;
        // For JSON responses, resp.data contains the result
    }, function (err) {
        console.error('ERR', err);
        // err.status will contain the status code
    }) */

    $scope.change_Country = function (id) {
        var data = angular.fromJson(window.localStorage['State']);
        var res = alasql('SELECT * FROM ? Where nStateId= ' + id, [data]);
        //   var state = JSON.stringify(res);
        $scope.StateList = "";
        $scope.StateList = res;
    }

    $scope.change_State = function (id) {

        var data = angular.fromJson(window.localStorage['City']);
        var res = alasql('SELECT * FROM ? Where nCityId= ' + id, [data]);
        //   var state = JSON.stringify(res);
        $scope.CityList = "";
        $scope.CityList = res;
    }

    $scope.Edit = function () {
        //console.log($scope.EditCustomerdata.cCustomerFirstName);
		//alert($scope.EditCustomerdata[0].cCustomerContactNo);
		
        var sourceId = $scope.EditCustomerdata[0].nSourceId;
		
        var UserType = window.localStorage['UserType'];
        var customerType = "";
        if (UserType == 'Admin') {
            customerType = 'Customer';
        }
        else if (UserType = 'Sales') {
            customerType = 'Salesman Reference';
        }

        var ClientId = $scope.EditCustomerdata[0].nClientId;
        var EmpId = window.localStorage['EmployeeId'];
        var StoreId = window.localStorage['StoreId'];        
        var CustomerReferenceId = '0';
        var customerFirstName = $scope.EditCustomerdata[0].cCustomerFirstName;
		
		//alert($scope.EditCustomerdata.cCustomerFirstName);
		
        if (typeof customerFirstName === "undefined") {
            customerFirstName = '';
        }
        var CustomerMiddleName = $scope.EditCustomerdata[0].cCustomerMiddleName;
        if (typeof CustomerMiddleName === "undefined") {
            CustomerMiddleName = '';
        }
        var customerlastName = $scope.EditCustomerdata[0].cCustomerLastName;
        if (typeof customerlastName === "undefined") {
            customerlastName = '';
        }
        
        var CustomerWebsite='';
        
        var CustomerContactNo = $scope.Edit.cCustomerContactNo;
        if (typeof CustomerContactNo === "undefined") {
            CustomerContactNo = '';
        }
        var CustomerEmailId = $scope.EditCustomerdata[0].cCustomerEmailId;
        if (typeof CustomerEmailId === "undefined") {
            CustomerEmailId = '';
        }
        var CustomerAddress = $scope.EditCustomerdata[0].cCustomerAddress;
        if (typeof CustomerAddress === "undefined") {
            CustomerAddress = '';
        }
        
        var City=$scope.EditCustomerdata[0].cCity;
        var ZipCode=$scope.EditCustomerdata[0].cZipCode;
		//alert(CustomerAddress);
        var CustomerCompany = $scope.EditCustomerdata[0].cCustomerCompany;
        if (typeof CustomerCompany === "undefined") {
            CustomerCompany = '';
        }

        var IndustryId = $scope.EditCustomerdata[0].nIndustryId;

        var PrimaryPerson = $scope.EditCustomerdata[0].cPrimaryPerson;
        if (typeof PrimaryPerson === "undefined") {
            PrimaryPerson = '';
        }
        
        var PrimaryPersonEmail=$scope.EditCustomerdata[0].cPrimaryPersonEmail;
        if (typeof PrimaryPersonEmail === "undefined") {
            PrimaryPersonEmail = '';
        }
        
        var PrimaryPersonDesignation=$scope.EditCustomerdata[0].cPrimaryPersonDesignation;
        if (typeof PrimaryPersonDesignation === "undefined") {
            PrimaryPersonDesignation = '';
        }
        
        var PrimaryPersonContactNo = $scope.EditCustomerdata[0].cPrimaryPersonContactNo;
		//console.log(PrimaryPersonContactNo);
        if (typeof PrimaryPersonContactNo === "undefined") {
            PrimaryPersonContactNo = '';
        }
        
       
        
        var IsCustomerMarridStatus=false;
		
        
		

       // var AreaId = $scope.EditCustomerdata[0].nAreaId;

        var CustomerFacebookLink = $scope.EditCustomerdata[0].cCustomerFacebookLink;
        if (typeof CustomerFacebookLink === "undefined") {
            CustomerFacebookLink = '';
        }
        var CustomerGLink = $scope.EditCustomerdata[0].cCustomerGLink;
        if (typeof CustomerGLink === "undefined") {
            CustomerGLink = '';
        }
        var CustomerLinkedLink = $scope.EditCustomerdata[0].cCustomerLinkedLink;
        if (typeof CustomerLinkedLink === "undefined") {
            CustomerLinkedLink = '';
        }
	
       var cGender='';
        var UserId = nUserId;
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
		var today = yyyy+'/'+mm+'/'+dd;

		var dtRegistrationDate=today;
		var dtCustomerAnniversaryDate=today;
		 var ddtCustomerBirthdate=today;
		
		var IsActive=true;
		var IsVerified=true;
		var cPassword='';
		var CustomerImage='null';

        if (customerFirstName != '') {
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
                data: { nCustomerId: CustomerId, 
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
					cGender:cGender
                }
            }).success(function (response) {
            
				 window.location = "#/app/browse?CustId=" + response.CustID ;
				
            });
				
        }
        else {
            alert('Please Insert Customer Name');
        }
    }	
 })
 

}());