var app = angular.module('Book', ['ionic']);

app.controller('ViewBookTable', function ($scope, $http,$location,$ionicLoading,ionicToast) {
	
	var path = window.localStorage['path'];
	var nUserId= window.localStorage['UserId'];
	var nCustomerId=window.localStorage['nCustomerId'];
	 
	var Appoinmenturl=path+"Appointment.asmx/SelectAllCustomerWiseAppointment?nUserId="+nUserId+"&nCustomerId="+nCustomerId;
	 
	$http.get(Appoinmenturl).then(function (resp) {
     
        $scope.Appoinment= resp.data.mstAppointmentManagement;
		
    }, function (err) {
        console.error('ERR', err);
    })
	
	

})



//ng-app="AddEmployeeCtrl" ng-controller="AddEmployeePageCtrl"