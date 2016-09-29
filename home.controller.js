(function () {
    'use strict';

angular.module('vitebizFMS')

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
