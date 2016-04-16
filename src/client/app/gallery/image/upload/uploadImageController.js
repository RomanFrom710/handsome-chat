(function () {
    'use strict';

    angular
        .module('gallery')
        .controller('uploadImageController', uploadImageController);

    uploadImageController.$inject = ['$scope', '$state', '$filter', 'FileUploader',
        'fileRules', 'lodash', 'toastr', 'environment'];

    var sizeFilterName = 'sizeFilter';
    var extensionsFilterName = 'extensionsFilter';

    function uploadImageController($scope, $state, $filter, FileUploader, fileRules, _, toastr, env) {
        var vm = this;

        vm.allowedExtensions = fileRules.allowedExtensions;
        vm.maxSize = fileRules.maxSize;
        vm.imagePreviewApi = {};
        vm.currentItem = null;

        vm.progress = {
            isLoading: false,
            value: 0,
            maxValue: 0
        };
        
        var uploader = new FileUploader();
        initUploaderFilters();
        initUploaderCallbacks();
        uploader.url = env.apiUrl + 'gallery/upload';
        vm.uploader = uploader;

        function initUploaderCallbacks() {
            uploader.onWhenAddingFileFailed = handleValidationError;

            uploader.onSuccessItem = function (item, response) {
                vm.progress.isLoading = false;
                toastr.success('The image was successfully uploaded!');
                $scope.$close();
                $state.go('chat.singleImage', { id: response });
            };
            uploader.onErrorItem = function (item, response) {
                toastr.error(response);
            };
            uploader.onBeforeUploadItem = function (item) {
                vm.progress.isLoading = true;
                vm.progress.value = 0;
                vm.progress.maxValue = item.file.size;
            };
            uploader.onProgressItem = function (item, progress) {
                vm.progress.value = item.file.size * progress / 100;
            };
            uploader.onAfterAddingFile = function (item) {
                vm.imagePreviewApi.update();
                vm.currentItem = item;
            };
        }

        vm.upload = function () {
            if (!vm.currentItem) {
                return;
            }
            vm.currentItem.formData = [{ description: vm.description }];
            vm.currentItem.upload();
        };

        function initUploaderFilters() {
            uploader.filters.push({
                name: extensionsFilterName,
                fn: function (item) {
                    var extension = _.last(item.name.split('.')).toLowerCase();
                    return _.indexOf(vm.allowedExtensions, extension) !== -1;
                }
            });

            uploader.filters.push({
                name: sizeFilterName,
                fn: function (item) {
                    return item.size < vm.maxSize;
                }
            })
        }

        function handleValidationError(item, filter) {
            var errorMessage;
            if (filter.name === extensionsFilterName) {
                errorMessage = 'Wrong file extension! Supported extensions are: ';
                errorMessage += $filter('fileExtensions')(vm.allowedExtensions);
            } else if (filter.name === sizeFilterName) {
                errorMessage = 'Wrong file size! Maximum file size is ';
                errorMessage += $filter('fileSize')(vm.maxSize);
            } else {
                errorMessage = 'Error while uploading file.';
            }

            vm.currentItem = null;
            vm.imagePreviewApi.remove();
            toastr.error(errorMessage);
        }

    }
})();