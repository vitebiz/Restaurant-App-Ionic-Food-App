(function () {
    'use strict';
var app = angular.module('vitebizFMS');
//Add Category

app.controller('AddCategory', function ($scope, $http,$location,$ionicLoading,ionicToast) {
	
	var path=window.localStorage['path'];
	var nUserId=window.localStorage['UserId'];
	
	$scope.AddCategory={};
	//Select Category
	 var Categoryurl = path+"Category.asmx/SelectAllCategory?UserId=" + nUserId;
	
		$http.get(Categoryurl).then(function (resp) {
			
			$scope.List = resp.data;
			//window.localStorage['ProductSubCategory'] = JSON.stringify(resp.data);
			$ionicLoading.hide();
			
		}, function (err) {
			console.error('ERR', err);
    })
	
	
	
	// for Save category
	
	$scope.Parent=function()
	{
		
	}
	
	$scope.AddCategory=function()
	{
	
		var cCategoryName=$scope.AddCategory.Name;
		var Description=$scope.AddCategory.Description;
		var IsParent=$scope.AddCategory.IsParent;
		
		//console.log(IsParent);
		//alert(IsParent);
		 if(IsParent==undefined)
		 {
			 var IsParentId=false;
		 }
		 else
		 {
			 var IsParentId=true;
		 }		
		if(Description==undefined)
		{
			var cCategoryDesc='';
		}
		else
		{
			var cCategoryDesc=$scope.AddCategory.Description;
		}
		
		
		var cCategoryImage='';
		var cCategoryIcon='';
		var cURLKey='';
		var nLanguageId=1;
		var IsActive=true;
		var IsDisable=false;
		
		
		if(IsParent=="Yes")
		{
		  
			var intCategoryId = $scope.AddCategory.Category.intCategoryId;
			var nParentId=intCategoryId;
			
				if(cCategoryName!=undefined)
		            {
						  $http({
                                    method: 'POST',
                                    url: path+'Category.asmx/AddCategory',
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    transformRequest: function (obj) {
                                        var str = [];
                                        for (var p in obj)
                                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                        return str.join("&");
                                    },
                                    data: { cCategoryName: cCategoryName, 
									cCategoryDesc: cCategoryDesc,
									cCategoryImage:cCategoryImage,
									cCategoryIcon: cCategoryIcon, 
                                    cURLKey: cURLKey,
									IsParent: IsParentId, 
                                    nParentId: nParentId, 
                                    nUserId: nUserId, 
                                    nLanguageId: nLanguageId, 
                                    IsActive: IsActive, 
                                    IsDisable: IsDisable
                                   
                                     }
                                }).success(function (response) {
									
										var msg=response.Message;
										if(msg=='Category already exists')
										{
											ionicToast.show('Category already exists', 'middle', false, 2500);
						                     $ionicLoading.hide();
										}
										else
										{
											ionicToast.show('Category Add Successfully', 'middle', false, 2500);
						                     $ionicLoading.hide();
											 window.location = "#/app/ShowCategory";
										}
										
									
								})
					}
					else
					{
						ionicToast.show('Enter Category Name', 'middle', false, 2500);
						 $ionicLoading.hide();
					}
					
		}
		else
		{
			var nParentId=0;
			
				
				if(cCategoryName!=undefined)
		            {
						  $http({
                                    method: 'POST',
                                    url: path+'Category.asmx/AddCategory',
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    transformRequest: function (obj) {
                                        var str = [];
                                        for (var p in obj)
                                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                        return str.join("&");
                                    },
                                    data: { cCategoryName: cCategoryName, 
									cCategoryDesc: cCategoryDesc,
									cCategoryImage:cCategoryImage,
									cCategoryIcon: cCategoryIcon, 
                                    cURLKey: cURLKey,
									IsParent: IsParentId, 
                                    nParentId: nParentId, 
                                    nUserId: nUserId, 
                                    nLanguageId: nLanguageId, 
                                    IsActive: IsActive, 
                                    IsDisable: IsDisable
                                   
                                     }
                                }).success(function (response) {
									
										var msg=response.Message;
										if(msg=='Category already exists')
										{
											ionicToast.show('Category already exists', 'middle', false, 2500);
						                     $ionicLoading.hide();
										}
										else
										{
											ionicToast.show('Category Add Successfully', 'middle', false, 2500);
						                     $ionicLoading.hide();
											  window.location = "#/app/ShowCategory";
										}
									
									
								})
					}
					else
					{
						ionicToast.show('Enter Category Name', 'middle', false, 2500);
						 $ionicLoading.hide();
					}
			
			}
	
	}
	
	
})
// For Display Category

.controller('ShowCategory', function ($scope, $http,$location) {

		var path = window.localStorage['path'];
		var nUserId = window.localStorage['UserId'];

		  var SelectAllCategoryurl = path+"Category.asmx/SelectAll?UserId=" + nUserId;

	     $http.get(SelectAllCategoryurl).then(function (respAllOrderStatus) {
	
		 $scope.CategoryList = respAllOrderStatus.data;
		
	}, function (err) {
		console.error('ERR', err);
	})

	
	$scope.AddCategory=function()
	{
		window.location = "#/app/AddCategory";
		
	}
	
	$scope.EditProduct=function(intCategoryId)
	{
	  window.location = "#/app/EditCategory?intCategoryId="+intCategoryId;	
	}
	
})

//End
//edit Category

.controller('EditCategory', function ($scope, $http, $location,$ionicLoading,ionicToast) {
		
		$scope.EditCategory={};
		var path = window.localStorage['path'];
		var nUserId = window.localStorage['UserId'];
		
		var nCategoryId = $location.search().intCategoryId;
		
		var path=window.localStorage['path'];
	var nUserId=window.localStorage['UserId'];
	
	//$scope.AddCategory={};
	//Select Category
	
		
		
		
		 var SelectCategoryDataurl = path+"Category.asmx/SelectRowForCategory?nCategoryId=" + nCategoryId+"&nUserId="+nUserId;

	     $http.get(SelectCategoryDataurl).then(function (resp) {
	
		 $scope.CategoryRowData = resp.data;
		 console.log();
		 $scope.strCategoryName=resp.data[0].strCategoryName;
		  $scope.strCategoryDesc=resp.data[0].strCategoryDesc;
		   $scope.IsParent=resp.data[0].IsParent;
		  $scope.intParentId=resp.data[0].intParentId;
		    $scope.strCategoryImage=resp.data[0].strCategoryImage;
		  $scope.strCategoryIcon=resp.data[0].strCategoryIcon;
		  
		  $scope.EditCategory.Name= $scope.strCategoryName;
		  $scope.EditCategory.Description= $scope.strCategoryDesc;
		  var IsParent=  $scope.IsParent;
		  var intParentId= $scope.intParentId;
		  
		  console.log(IsParent);
		  
		  if(IsParent==true)
		  {
			  $scope.EditCategory.IsParent='Yes';
			   $scope.EditCategory.Category=intParentId;
		  }
		  else
		  {
			   $scope.EditCategory.IsParent='No';
		  }
		  
		  // For Select Category
		  
		   var Categoryurl = path+"Category.asmx/SelectAllCategory?UserId=" + nUserId;
	
		   $http.get(Categoryurl).then(function (resp) {
			
				$scope.CategoryListData = resp.data;
				
				
			
				for(var i=0; i < resp.data.length; i++){
					
				
					//console.log(resp.data[i].intCategoryId);
					if(intParentId==resp.data[i].intCategoryId)
					{
						console.log(intParentId,resp.data[i].intCategoryId);
						 $scope.EditCategory.intCategoryId =intParentId;	
						 // console.log($scope.EditCategory.intCategoryId);
					}
					
				
				}
				//window.localStorage['ProductSubCategory'] = JSON.stringify(resp.data);
				$ionicLoading.hide();
				
			}, function (err) {
				console.error('ERR', err);
            })
		  
			//End Display Category
			
			
			//For Edit Category
			
			$scope.Edit=function()
			{
				
				
				
				  var cCategoryName=$scope.EditCategory.Name;
				
					var Description=$scope.EditCategory.Description;
					var IsParent=$scope.EditCategory.IsParent;
					
					
					if(IsParent=="No")
					{
						var IsParentId=false;
					}
					else
					{
						var IsParentId=true;
					}
					
					if(Description==undefined)
					{
						var cCategoryDesc='';
					}
					else
					{
						var cCategoryDesc=$scope.EditCategory.Description;
					}
					
					
					var cCategoryImage='';
					var cCategoryIcon='';
					var cURLKey='';
					var nLanguageId=1;
					var IsActive=true;
					var IsDisable=false;
					
							if(IsParent=="Yes")
							{
							  
							   var intCategoryId = $scope.EditCategory.intCategoryId;
								var nParentId=intCategoryId;
								
									if(cCategoryName!='')
										{
											  $http({
														method: 'POST',
														url: path+'Category.asmx/UpdateCategory',
														headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
														transformRequest: function (obj) {
															var str = [];
															for (var p in obj)
																str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
															return str.join("&");
														},
														data: { nCategoryId:nCategoryId,
														cCategoryName: cCategoryName, 
														cCategoryDesc: cCategoryDesc,
														cCategoryImage:cCategoryImage,
														cCategoryIcon: cCategoryIcon, 
														cURLKey: cURLKey,
														IsParent: IsParentId, 
														nParentId: nParentId, 
														nUserId: nUserId, 
														nLanguageId: nLanguageId, 
														IsActive: IsActive, 
														IsDisable: IsDisable
													   
														 }
													}).success(function (response) {
														
															var msg=response.Message;
															if(msg=='Category already exists')
															{
																ionicToast.show('Category already exists', 'middle', false, 2500);
																 $ionicLoading.hide();
															}
															else
															{
																ionicToast.show('Category Update Successfully', 'middle', false, 2500);
																 $ionicLoading.hide();
																 window.location = "#/app/ShowCategory";
															}
															
														
													})
										}
										else
										{
											ionicToast.show('Enter Category Name', 'middle', false, 2500);
											 $ionicLoading.hide();
										}
										
							}
							else
							{
									
									
									 var intCategoryId = $scope.EditCategory.intCategoryId;
								     var nParentId=0;
								
									if(cCategoryName!='')
										{
											  $http({
														method: 'POST',
														url: path+'Category.asmx/UpdateCategory',
														headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
														transformRequest: function (obj) {
															var str = [];
															for (var p in obj)
																str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
															return str.join("&");
														},
														data: { nCategoryId:nCategoryId,
														cCategoryName: cCategoryName, 
														cCategoryDesc: cCategoryDesc,
														cCategoryImage:cCategoryImage,
														cCategoryIcon: cCategoryIcon, 
														cURLKey: cURLKey,
														IsParent: IsParentId, 
														nParentId: nParentId, 
														nUserId: nUserId, 
														nLanguageId: nLanguageId, 
														IsActive: IsActive, 
														IsDisable: IsDisable
													   
														 }
													}).success(function (response) {
														
															var msg=response.Message;
															if(msg=='Category already exists')
															{
																ionicToast.show('Category already exists', 'middle', false, 2500);
																 $ionicLoading.hide();
															}
															else
															{
																ionicToast.show('Category Update Successfully', 'middle', false, 2500);
																 $ionicLoading.hide();
																 window.location = "#/app/ShowCategory";
															}
															
														
													})
										}
										else
										{
											ionicToast.show('Enter Category Name', 'middle', false, 2500);
											 $ionicLoading.hide();
										}
									
							}
				
			}
			
			
		 
		
	}, function (err) {
		console.error('ERR', err);
	})

		

})


}());