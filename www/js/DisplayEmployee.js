angular.module('starter', ['ionic']);

//Select Employee

.controller('DisplayEmployee', function ($scope, $http,$location,ionicToast,$ionicPopup,$ionicLoading) {
	     

        //Get 		
		//var path=window.localStorage['path'];
	    var nUserId=window.localStorage['UserId'];
		var nCustomerId=window.localStorage['CustomerId']
		//var nEmpId=window.localStorage['EmpId'];
	    var DisplayEmployeeurl ="http://localhost:40432/webservice/AppoinmentEmployee.asmx/SelectEmployeeDataDisplay?nCustomerId="+CustomerId+"&nUserId=1"; //static path
	 
		$http.get(DisplayEmployeeurl).then(function (resp) {
		
			console.log(resp.data);
			$scope.AppoinmentEmployee = resp.data;
			$ionicLoading.hide();
			
		}, function (err) {
		
        console.error('ERR', err);
  
    }) //END
	
	