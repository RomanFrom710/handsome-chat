(function () {
    'use strict';

    angular
        .module('common')
        .provider('modalState', ModalStateProvider);

    ModalStateProvider.$inject = ['$stateProvider', 'lodashProvider'];

    function ModalStateProvider($stateProvider, lodashProvider) {
        var provider = this;
        var _ = lodashProvider.$get();

        this.$get = function () {
            return provider;
        };

        // todo: handle parent states' resolves
        this.state = function (name, options) {
            var modal = null;

            var inject = ['$uibModal', '$state', '$timeout'];
            var resolveKeys = [];
            if (options.resolve) {
                resolveKeys = _.keys(options.resolve);
            }
            // Resolve results will be injected by ui-router,
            // so $state and $stateParams will represent current state.
            onEnter.$inject = inject.concat(resolveKeys);

            $stateProvider.state(name, {
                url: options.url,
                resolve: options.resolve,
                onEnter: onEnter,
                onExit: onExit
            });

            return provider;

            function onEnter($modal, $state, $timeout) {
                // Get injected resolve results.
                var resolveValues = _.slice(arguments, inject.length);
                // Pass them into modal.
                options.resolve = _.zipObject(resolveKeys, resolveValues);

                $timeout(function () {
                    // Wait for event loop ending. This will prevent bug with state.reload,
                    // when previous modal's promise is called after new modal is opened,
                    // so it goes to the parent state.
                    modal = $modal.open(options);
                    modal.result.finally(function () {
                        if (modal) {
                            $state.go('^');
                            modal = null;
                        }
                    });
                });
            }

            function onExit() {
                if (modal) {
                    modal.close();
                    modal = null;
                }
            }
        };
    }
})();