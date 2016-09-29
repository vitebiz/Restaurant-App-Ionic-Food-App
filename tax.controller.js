(function () {
    'use strict';
var app = angular.module('vitebizFMS');
app.controller('AddTax', function ($scope, $http,$location,ionicToast,$ionicPopup) {

$scope.AddTax={};

	$scope.AddTax=function()
	{
	
	
		 var nUserId = window.localStorage['UserId'];
		
		var path=window.localStorage['path'];
		var cTaxName=$scope.AddTax.Name;
		var fTaxPercentage=$scope.AddTax.Percentage;
		var nLanguageId=1;
		var nLocationId=0;
		var nRuleId=0;
		var IsActive=true;
		var IsDisable=false;
		
		
		
		if(cTaxName=='' || cTaxName==undefined || fTaxPercentage=='' || fTaxPercentage==undefined)
		{
			ionicToast.show('Please enter Data', 'middle', false, 2500);
						$ionicLoading.hide();
		
		}
		else
		{
			$http({
						method: 'POST',
					url:path+'Tax.asmx/AddTax',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					transformRequest: function (obj) {
						var str = [];
						for (var p in obj)
							str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						return str.join("&");
					},
					data: {cTaxName:cTaxName,
							fTaxPercentage:fTaxPercentage,
							nLanguageId:nLanguageId,
							nLocationId:nLocationId,
							nRuleId:nRuleId,
							nUserId:nUserId,
							IsActive:IsActive,
							IsDisable:IsDisable
						
							}
				}).success(function (response) {
					ionicToast.show('Tax Add Successfully', 'middle', false, 2500);
							window.location = "#/app/ViewTax";
							$ionicLoading.hide();
						
						}).success(function (response) {
							ionicToast.show('Tax Add Successfully', 'middle', false, 2500);
							window.location = "#/app/ViewTax";
							$ionicLoading.hide();
					
						});
						
		}
		
		
	
	
	}
})
.controller('ViewTax', function ($scope, $http,$location,ionicToast,$ionicPopup) {

	 var path=window.localStorage['path'];
	var nUserId=window.localStorage['UserId'];
	
	  var Taxurl = path+"Tax.asmx/SelectAllTax?UserId=" + nUserId;
	
		$http.get(Taxurl).then(function (resp) {
			
			$scope.TaxList = resp.data;
			
			
		}, function (err) {
			console.error('ERR', err);
    })
	
	$scope.DeleteTax=function(nTaxId)
	{
		
		  $http({
						method: 'POST',
						url: path+'Tax.asmx/DeleteTax',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						transformRequest: function (obj) {
							var str = [];
							for (var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
							return str.join("&");
						},
					   data: {nTaxId:nTaxId,nUserId:nUserId}
					}).success(function (response) {

						    ionicToast.show('Tax Delete Successfully', 'middle', false, 2500);
							window.location = "#/app/ViewTax";
							$ionicLoading.hide();
				
					});
	}
	
})

.controller('EditTax', function ($scope, $http,$location,ionicToast,$ionicPopup) {

       $scope.EditTax={};
	 var path=window.localStorage['path'];
	var nUserId=window.localStorage['UserId'];
	var nTaxId=$location.search().nTaxId;
	
	  var Taxurl = path+"Tax.asmx/SelectRow?nTaxId=" + nTaxId+"&nUserId="+nUserId;
	
		$http.get(Taxurl).then(function (resp) {
			
			$scope.TaxList = resp.data;
			$scope.cTaxName=resp.data[0].cTaxName;
			$scope.fTaxPercentage=resp.data[0].fTaxPercentage;
			
			$scope.EditTax.Name=$scope.cTaxName;
			$scope.EditTax.Percentage=$scope.fTaxPercentage;
			
			
		}, function (err) {
			console.error('ERR', err);
    })
	
	
	$scope.EditTax=function()
	{
		
		var cTaxName=$scope.EditTax.Name;
		var fTaxPercentage=$scope.EditTax.Percentage;
		var nLanguageId=1;
		var nLocationId=0;
		var nRuleId=0;
		var IsActive=true;
		var IsDisable=false;
		
		
			if(cTaxName=='' || cTaxName==undefined || fTaxPercentage=='' || fTaxPercentage==undefined)
			{
				ionicToast.show('Please enter Data', 'middle', false, 2500);
							$ionicLoading.hide();
			
			}
			else
			{
			
				$http({
							method: 'POST',
							url:path+'Tax.asmx/UpdateTax',
							headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
							transformRequest: function (obj) {
								var str = [];
								for (var p in obj)
									str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
								return str.join("&");
							},
							data: { nTaxId: nTaxId, 
								cTaxName:cTaxName,
								fTaxPercentage:fTaxPercentage,
								nLanguageId:nLanguageId,
								nLocationId: nLocationId, 
								nRuleId: nRuleId, 
								nUserId: nUserId,
								IsActive:IsActive,
								IsDisable:IsDisable
								
								}
					 }).success(function (response) {
            
              
							ionicToast.show('Tax Update Successfully', 'middle', false, 2500);
							window.location = "#/app/ViewTax";
							$ionicLoading.hide();
									
                      });
			 }
	}
	
	
	
	
})
}());