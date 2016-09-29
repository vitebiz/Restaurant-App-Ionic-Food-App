.controller('ExpenseList', function ($scope, $http,$location,$ionicLoading,ionicToast) {
		
	var path = window.localStorage['path'];
	var nUserId = window.localStorage['UserId'];
	var nExpenseId=window.localStorage['ExpenseId'];
	//alert(nExpenseId);
	$scope.ExpenseId=nExpenseId;
	

		
		var AllExpenseListurl ="http://localhost:43871/WebServices/Expense.asmx/SelectAllExpense?ExpenseId"+nExpenseId+"&nUserId=4";
		$http.get(AllExpenseListurl).then(function (resp) {
		$scope.ExpenseList = resp.data;
        window.localStorage['ExpenseList'] = JSON.stringify(resp.data);
		
		$ionicLoading.hide();
		}, function (err) {
			console.error('ERR', err);
			ionicToast.show('No Expense', 'middle', false, 2500);
			
		})
})