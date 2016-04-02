(function () {
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
        vm.image = null;
        
        var uploader = new FileUploader();
        initUploaderFilters();

        uploader.onWhenAddingFileFailed = handleUploadError;
        uploader.onAfterAddingFile = handleUploading;
        uploader.onSuccessItem = handleSuccessUpload;

        vm.uploader = uploader;

        function initUploaderFilters() {
            uploader.filters.push({
                name: extensionsFilterName,
                fn: function (item) {
                    var extension = _.last(item.name.split('.'));
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

        function handleUploadError(item, filter) {
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

            toastr.error(errorMessage);
        }

        function handleUploading(item) {
            item.url = env.apiUrl + 'gallery/upload';
            item.upload();
        }

        function handleSuccessUpload(item, response) {

        }
    }
})();