angular.module('starter', ['ionic']);

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
			alert(intEmpId)
			
		
		
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
			alert(ProductId)
	
		
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
  	    //var totalPerson=$scope.AddAppoinment.totalPerson;
		//var Min=$scope.AddAppoinment.Min;	  
		//var Hour=$scope.AddAppoinment.Hour;	
		var nEmployeeId=window.localStorage['intEmpId'];
		var cAppointmentTitle='today';
		var cAppointmentDesc='Meeting';
		var dtStartDate=dt+' '+Time;	 
		// alert(dtStartDate);
		   var dtEndDate=dt+' '+Time;
		   var cAlert='no';
		   var cStatus='no';
		  var nCustomerId=window.localStorage['nCustomerId'];
		  var nUserId= window.localStorage['UserId'];
		  //var nAppointmentId=window.localStorage['nAppointmentId'];
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
								nLeadId:nLeadId
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
								nLeadId:nLeadId
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
})

