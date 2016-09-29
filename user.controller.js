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
    
	if (window.localStorage.length > 5) 
	{
        if (window.localStorage['UserType'] == 'Admin') 
		{
            window.location = "#/app/search";
            $scope.isAdmin = true;
            $scope.IsEmployee = false;           
        }
        else if (window.localStorage['UserType'] == 'Service') 
		{
            window.location = "#/app/search";
            $scope.isAdmin = true;
            $scope.IsEmployee = true;           
        }      
    }
	else 
	{  
        var i=$location.search().SignUP;
        if(i=='SignUP')
        {
            window.location = "#/app/UserSignup";
        }
        else
		{        
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
     
      if (strEmailID!=undefined &&cCompanyName!=undefined&&cPassword!=undefined&&PhoneNo!=undefined) 
	  {
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


.controller('logout', function ($scope, $http) {

    window.localStorage.clear();
    window.location = "#/login/login";

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
