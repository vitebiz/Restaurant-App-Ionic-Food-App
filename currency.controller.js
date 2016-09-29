(function () {
    'use strict';

angular.module('vitebizFMS')

.controller('currencyCtrl', function ($scope, $http,ionicToast,$location) {
	
	
	var path = window.localStorage['path'];
	$scope.choice = {};
	$scope.choice.currency = 'USD';
	$scope.currency = function(){
		
		var nUserId = window.localStorage['UserId'];
		var cCurrencyValue = 0;
		var cCurrencyName = $scope.choice.currency;
		
		if(cCurrencyName == 'USD'){
			var cCurrencySymbole = '$';
		}else if(cCurrencyName == 'GBP'){
			var cCurrencySymbole = '£';
		}else if(cCurrencyName == 'INR'){
			var cCurrencySymbole = 'Rs';
		}
		
		//var cCurrencySymbole = $scope.choice.currency;
		var IsActive = 'true';
		var currency = $scope.choice.currency;

		 var currencyURL =path+"Currency.asmx/AddCurrency?nUserId=" + nUserId + 
							"&cCurrencyValue=" + cCurrencyValue+
							"&cCurrencySymbole=" + cCurrencySymbole+
							"&IsActive=" + IsActive+
							"&IsDefaultCurrency=true&cCurrencyName=" + cCurrencyName;

           
            $http.get(currencyURL).then(function (resp) {
            	
				console.log(resp);
				window.location="#/app/search";
				window.localStorage['CurruncyLogo'] = cCurrencySymbole;
				//ionicToast.show('Pelase Check Your Mail.', 'middle', false, 2500);
		       				               
            }, function (err) {
                console.error('ERR', err);
			
            })
		
	}
	
})	
