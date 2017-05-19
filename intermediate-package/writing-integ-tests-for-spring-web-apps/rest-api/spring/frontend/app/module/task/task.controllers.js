'use strict';

angular.module('app.task.controllers', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('task', {
                    url: '/',
                    abstract: true,
                    template: '<ui-view/>'
                })
                .state('task.list', {
                    authenticate: true,
                    url: '',
                    controller: 'TaskListController',
                    templateUrl: 'task/task-list-view.html',
                    resolve: {
                        tasks: ['TaskService', function(TaskService) {
                            return TaskService.findAll();
                        }]
                    }
                });
        }
    ])
    .controller('TaskListController', ['$log', '$scope', 'tasks', function($log, $scope, tasks) {
        var logger = $log.getInstance('app.task.controllers.TaskListController');
        logger.info('Rendering task list view with %s tasks', tasks.length);
        $scope.tasks = tasks;
    }]);