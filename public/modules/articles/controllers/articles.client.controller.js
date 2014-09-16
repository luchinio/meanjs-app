'use strict';

// ADD 'Suppliers'  
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', 'Suppliers',
	function($scope, $stateParams, $location, Authentication, Articles, Suppliers) {
		$scope.authentication = Authentication;
		$scope.spname = Suppliers.query();

		$scope.create = function() {
			//console.log($scope);
			var article = new Articles({
				title: this.title,
				content: this.content,			
				spname: this.spname
			});
			
			//$scope.spname = Suppliers.query();
			//console.log($scope.spname);

			//var aux = Suppliers.query(); // ADD
			//console.log('aux');
			//console.log(aux); // ADD

			article.$save(function(response) {
				$location.path('articles/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});			

			this.title = '';
			this.content = '';
			//this.spname = Suppliers.query();
			//$scope.Suppliers = Suppliers.query(); //ADD
		};
  		
		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);