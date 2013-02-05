/**
 * @author Fabrice
 *
 * Function d'initialisation,
 * ecoute de l'evenement javascript
 * qui signifie que le DOM est chargé
 */

//Zepto(function($){
    //new TemplateManager({
        //nbPlayer : 5
    //});
//});
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    //if(notNull(navigator.splashscreen)) navigator.splashscreen.hide();
}

var APP_COUNTER = {},
    App = angular.module('APP_COUNTER', ['ngResource']),
	note = Note.getInstance();
note.initialise();

App.games = null;

App.initialised = false;
App.currentPageAnim = 'right';
App.currentPage = 'counter';
App.setting = new Setting();
Data.getInstance().initialise();

var SettingCtrl = function($scope, $http, $location) {
    MobileAction.removeListener();
    App.templateManager.removeListener();
    $scope.title = 'Setting';
    $scope.players = Data.getInstance().getOption();
    App.currentPageAnim = 'left';
    App.currentPage = 'setting';
    
    if(App.games === null) App.games = Data.getInstance().getGames().games;
    $scope.games = App.games;
};

var CounterCtrl = function($scope, $http, $location) {
    if(!App.initialised)
    App.setting.removeListener();
    App.currentPageAnim = 'right';
    App.currentPage = 'counter';
    $scope.type = Data.getInstance().getOption().game;
    App.templateManager = App.templateManager || new TemplateManager();
    App.templateManager.initDefault();
};

App.initView = function() {
    switch(App.currentPage){
        case 'setting' :
            App.setting.initListener();
            MobileAction.swipeGoToCounter();
        break;
        case 'counter' :
            MobileAction.initListener();
            MobileAction.swipeGoToSetting();
        break;
        default:break;
    }
};

App.config(function($routeProvider)
    {
        $routeProvider
            .when("/", {
                controller : CounterCtrl,
                templateUrl : 'templates/counter.html'
            }) 
            .when("/setting", {
                controller : SettingCtrl,
                templateUrl : 'templates/setting.html'
            })
            .otherwise({
                redirectTo: ""
            });
    })
    .config(function ($httpProvider)
    {
        App.transition = App.transition || new Transition();
        $httpProvider.responseInterceptors.push('myHttpInterceptor');
        var beforePageLoad = function (data, headersGetter)
        {
            if(App.initialised) App.transition.prepare(App.currentPageAnim);
            return data;
        };
        $httpProvider.defaults.transformRequest.push(beforePageLoad);
    })
    .factory('myHttpInterceptor', function ($q, $window)
    { // register the interceptor as a service, intercepts ALL angular ajax http calls
        return function (promise) {
            return promise.then(function (response) { // SUCCESS
                if(App.initialised) {
                    App.transition.animate(App.currentPageAnim, function(){
                        App.initView();
                    });
                }
                else {
                    App.initialised = true;
                    App.initView();
                }
                
                return response;
            },
            function (response) { // ERROR
                return $q.reject(response);
            });
        };
    })
    .run(['$rootScope', function ($rootScope)
    {
        // ALL $scope object will inherit this method
        $rootScope.sharedFunction = function()
        {
            
        };
    }]);

var HeadCtrl = function($scope, $http, $location) {
    //$scope.sharedFunction();
};

HeadCtrl.$inject = ['$scope','$http','$location'];


/* Function from context menu */

function menuReload(){
    $(window).trigger( Static.RELOAD_APP, [ true ] );
}

function clearDataCache(){
    Data.getInstance().clearLocalStorage();
}

function displayAstuce(){
    Data.getInstance().sendNote();
}
