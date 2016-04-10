(function () {
    'use strict';

    angular
        .module('gallery')
        .controller('uploadImageController', uploadImageController);

    uploadImageController.$inject = ['$filter', 'FileUploader', 'fileRules', 'lodash', 'toastr', 'environment'];

    var sizeFilterName = 'sizeFilter';
    var extensionsFilterName = 'extensionsFilter';

    function uploadImageController($filter, FileUploader, fileRules, _, toastr, env) {
        var vm = this;

        vm.allowedExtensions = fileRules.allowedExtensions;
        vm.maxSize = fileRules.maxSize;
        vm.imagePreviewApi = {};
        
        var uploader = new FileUploader();
        initUploaderFilters();
        uploader.url = env.apiUrl + 'gallery/upload';
        uploader.autoUpload = true;
        uploader.onWhenAddingFileFailed = handleValidationError;
        uploader.onSuccessItem = handleSuccessUpload;
        uploader.onErrorItem = handleUploadError;

        vm.uploader = uploader;

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

            vm.imagePreviewApi.remove();
            toastr.error(errorMessage);
        }

        function handleUploadError(item, response) {
            toastr.error(response);
        }

        function handleSuccessUpload(item, response) {
            vm.imagePreviewApi.update();
        }
    }
})();