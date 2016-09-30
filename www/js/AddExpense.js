angular.module('starter', ['ionic']);

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
		var nEmployeeId=$scope.Expense.nEmployeeId;
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
							data: { nEmployeeId:nEmployeeId,
								nUserId:nUserId,  
								dtDate:dtDate,
								//dtEndDate: OnDayDate+' '+Time,
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
							ionicToast.show('Expense Insert Successfully', 'middle', false, 2500);
							window.location = "#/app/mainpage";
							$ionicLoading.hide();				
						     }
						})
	}		
})
