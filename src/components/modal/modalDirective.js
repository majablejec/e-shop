angular.module('app').directive('appModal', function ()
{
    return {
        restrict:   'E',
        controller: function ($scope, $modal)
        {
            $scope.openModal = function ()
            {
				var modalInstance = $modal.open({
                                                    templateUrl: 'templates/modal-template.html',
                                                    controller:  'ModalInstanceController',
                                                    resolve:     {
                                                        total: function ()
                                                        {
                                                            return $scope.total();
                                                        },
														totalItems: function ()
                                                        {
                                                            return $scope.totalItems();
                                                        }
                                                    }
                                                });

                modalInstance.result.then(function (success)
                                          {
                                              alert(success);
                                          }, function (error)
                                          {
                                              alert(error);
                                          });
            }
        },
		template: '<a class="btn btn-info" ng-click="openModal()" role="button">Cart summary</a>'
    };
});