angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

angular.module('your_app_name', [
  'ionic',
  //'your_app_name.views',
  'your_app_name.common.controllers',
  'your_app_name.common.directives',

  'your_app_name.account.controllers',
  'your_app_name.account.directives',
  'your_app_name.account.services',

  'your_app_name.auth.controllers',
  'your_app_name.auth.directives',
  'your_app_name.auth.services',

  'your_app_name.checkout.controllers',
  'your_app_name.checkout.directives',
  'your_app_name.checkout.services',

  'your_app_name.content.controllers',
  'your_app_name.content.directives',
  'your_app_name.content.services',


  'your_app_name.feed.controllers',
  'your_app_name.feed.directives',
  'your_app_name.feed.filters',
  'your_app_name.feed.services',

  'your_app_name.feed.servicesBeer',

  'your_app_name.sort.controllers',

  'your_app_name.filters.controllers',
  'your_app_name.filters.directives',
  'your_app_name.filters.services',

  'your_app_name.getting-started.controllers',
  'your_app_name.getting-started.directives',
  'your_app_name.getting-started.services',

  'your_app_name.liked.controllers',
  'your_app_name.liked.directives',
  'your_app_name.liked.services',

  'your_app_name.search.controllers',
  'your_app_name.search.directives',
  'your_app_name.search.filters',
  'your_app_name.search.services',

  'your_app_name.search.controllersBeer',
  'your_app_name.search.directivesBeer',
  'your_app_name.search.filtersBeer',
  'your_app_name.search.servicesBeer',

  'your_app_name.shopping-cart.controllers',
  'your_app_name.shopping-cart.directives',
  'your_app_name.shopping-cart.services',

  'your_app_name.walkthrough.controllers',
  'your_app_name.walkthrough.directives',
  'your_app_name.walkthrough.services',

  'underscore',
  'angularMoment',
  'ngMap',
  'ngRangeSlider'
])


.run(function($ionicPlatform, amMoment, $rootScope) {
  $rootScope.previousView = [];

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    var last_state = _.last($rootScope.previousView);
    console.log(JSON.stringify(fromState));
    console.log(JSON.stringify(toState));

    if(last_state && (last_state.fromState === toState.name)){
      $rootScope.previousView.pop();
    }else{
      $rootScope.previousView.push({ "fromState": fromState.name, "fromParams": fromParams });
    }
  });

  $ionicPlatform.ready(function() {
    console.log("$ionicPlatform.ready");

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    amMoment.changeLocale('en-gb');
  });


})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.views.swipeBackEnabled(true);
  $ionicConfigProvider.form.checkbox('circle');

  if(!ionic.Platform.isWebView())
  {
    console.log("jsScrolling");
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('intro', {
    url: '/intro',
    abstract: true,
    templateUrl: 'views/common/intro.html'
  })

      .state('intro.walkthrough-welcome', {
        url: '/walkthrough-welcome',
        views: {
          'intro-view@intro': {
            templateUrl: 'views/walkthrough/welcome.html'
          }
        }
      })

      /*.state('intro.walkthrough-learn', {
        url: '/walkthrough-learn',
        views: {
          'intro-view@intro': {
            templateUrl: 'views/walkthrough/learn.html',
            controller: 'GettingStartedCtrl'
          }
        }
      })*/

      .state('intro.auth-login', {
        url: '/auth-login',
        views: {
          'intro-view@intro': {
            templateUrl: 'views/auth/login.html',
            controller: 'LoginCtrl'
          }
        }
      })

      .state('intro.auth-signup', {
        url: '/auth-signup',
        views: {
          'intro-view@intro': {
            templateUrl: 'views/auth/signup.html',
            controller: 'SignupCtrl'
          }
        }
      })

      .state('intro.auth-forgot-password', {
        url: '/forgot-password',
        views: {
          'intro-view@intro': {
            templateUrl: 'views/auth/forgot-password.html',
            controller: 'ForgotPasswordCtrl'
          }
        }
      })

  .state('main', {
    url: '/main',
    abstract: true,
    templateUrl: 'views/common/main.html'
  })

      .state('main.app', {
        url: '/app',
        views: {
          'main-view@main': {
            templateUrl: 'views/common/app.html',
            controller: 'AppCtrl'
          }
        },
        resolve: {
          logged_user: function(AuthService){
            return AuthService.getLoggedUser();
          }
        }
      })
      // Aca deberiamos resolver al usuario logueado no?
      // Como lo haciamos en las otras apps?
      // DONE

          .state('main.app.filters', {
            url: '/filters',
            views: {
              'main-view@main': {
                templateUrl: 'views/filters/filters.html',
                controller: 'FiltersCtrl'
              }
            }
          })
          // Aca va un resolve con los filtros (toda la info y cual corresponde a cada categoria)
          // Agregar un parametro que sea la categoria desde la que se abrio, o mejor aun,
          // los filtros que tiene activos, por si el usuario hace click en filters dos veces,
          // que no se pierda lo que selecciono en un principio

          .state('main.app.feed', {
            url: '/feed',
            views: {
              'app-feed@main.app': {
                templateUrl: 'views/feed/feed.html',
                controller: 'FeedCtrl'
              }
            }
          })

              //DEALS FEED
              .state('main.app.feed.deals', {
                url: '/deals',
                views: {
                  'category-feed@main.app.feed': {
                    templateUrl: 'views/feed/deals.html',
                    controller: 'DealsCtrl'
                  }
                },
                resolve: {
                  products: function(DealsService){
                    console.log("resolving deals");
                    return DealsService.getProducts();
                  }
                }
              })



           //SEARCH BARS       
          .state('main.app.search', {
            url: '/search',
            views: {
              'app-search@main.app': {
                templateUrl: 'views/search/search.html',
                controller: 'SearchCtrl'
              }
            },
            resolve: {              
              results: function(FoodService,$stateParams){
                return FoodService.getProducts();
              }
            }
          })
                  .state('main.app.search.content', {
                    url: '/content/:productId',
                    views: {
                      'main-view@main': {
                        templateUrl: 'views/content/food.html',
                        controller: 'FoodContentCtrl'
                      }
                    },
                    resolve: {
                      product: function(FoodService, $stateParams){
                        return FoodService.getProduct($stateParams.productId);
                      }
                    }
                  })
          //Search Beers
          .state('main.app.searchBeer', {
            url: '/searchBeer',
            views: {
              'app-searchBeer@main.app': {
                templateUrl: 'views/search/searchBeer.html',
                controller: 'SearchCtrl'
              }
            },
            resolve: {              
              results: function(FashionService,$stateParams){
                return FashionService.getProducts();
              }
            }
          })
                  //NEW STATE FOR BEERS CONTENTS
                  .state('main.app.searchBeer.contentB', {
                    url: '/contentB/:productId',
                    views: {
                      'main-view@main': {
                        templateUrl: 'views/content/fashion.html',
                        controller: 'FashionContentCtrl'
                       }
                      },
                    resolve: {
                      product: function(FashionService, $stateParams){
                        return FashionService.getProduct($stateParams.productId);
                      }
                    }
                  })

          .state('main.app.liked', {
            url: '/liked',
            views: {
              'app-liked@main.app': {
                templateUrl: 'views/liked/liked.html',
                controller: 'LikedCtrl'
              }
            },
            resolve: {
              lists: function(ListService){
                return ListService.getUserLists();
              }
            }
          })
          // Aca deberiamos resolver las listas salvadas por el usuario.
          // Cada lista tiene:
          //    - nombre
          //    - tags
          //    - category
          //    - fecha de creacion de la lista
          //    - imagen (deberia ser un compilado de las imagenes de los productos que estan en la lista, pero esto es muy complicado, no lo vamos a hacer no?)
          //    - lista de product_id's
          // DONE

              .state('main.app.liked.list-details', {
                url: '/list-details/:listId',
                views: {
                  'main-view@main': {
                    templateUrl: 'views/liked/list-details.html',
                    controller: 'ListDetailsCtrl'
                  }
                },
                resolve: {
                  list: function(ListService, $stateParams) {
                    return ListService.getList($stateParams.listId);
                  }
                }
              })
              // Tenemos que agregarle un parametro de list_id a esta ruta
              // Resolver la data de esa lista aca
              // DONE

              .state('main.app.liked.new-list', {
                url: '/new-list',
                views: {
                  'main-view@main': {
                    templateUrl: 'views/liked/new-list.html',
                    controller: 'NewListCtrl'
                  }
                }
              })

          .state('main.app.account', {
            url: '/account',
            views: {
              'app-account@main.app': {
                templateUrl: 'views/account/account.html'                
              }
            }
          })

              .state('main.app.account.profile', {
                url: '/profile',
                views: {
                  'my-profile@main.app.account': {
                    templateUrl: 'views/account/profile.html',
                    controller: 'ProfileCtrl'
                  }
                },
                resolve: {
                  user: function(ProfileService){
                    return ProfileService.getUserData();
                  }
                }
              })
                  .state('main.app.account.profile.edit', {
                    url: '/editprofile',
                    views: {
                      'main-view@main': {
                        templateUrl: 'views/account/editprofile.html',
                        controller: 'ProfileCtrl'
                      }
                    },
                    resolve: {
                      user: function(ProfileService){
                        return ProfileService.getUserData();
                      }
                    }
                  })

              /*.state('main.app.account.orders', {
                url: '/orders',
                views: {
                  'my-orders@main.app.account': {
                    templateUrl: 'views/account/orders.html',
                    controller: 'OrdersCtrl'
                  }
                },
                resolve: {
                  orders: function(OrderService){
                    return OrderService.getUserOrders();
                  }
                }
              })*/
              // Resolver el listado de productos comprados, los atributos en un principio deberian ser:
              //    - product_id
              //    - fecha de comprado
              //    - status (shipped, bla bla)
              // DONE

          .state('main.app.shopping-cart', {
            url: '/shopping-cart',
            views: {
              'main-view@main': {
                templateUrl: 'views/shopping-cart/cart.html',
                controller: 'ShoppingCartCtrl'
              }
            },
            resolve: {
              products: function(ShoppingCartService){
                return ShoppingCartService.getProducts();
              }
            }
          })

          .state('main.app.checkout', {
            url: '/checkout',
            views: {
              'main-view@main': {
                templateUrl: 'views/checkout/checkout.html',
                controller: 'CheckoutCtrl'
              }
            },
            resolve: {
              products: function(ShoppingCartService){
                return ShoppingCartService.getProducts();
              }
            }
          })

              .state('main.app.checkout.address', {
                url: '/address',
                views: {
                  'main-view@main': {
                    templateUrl: 'views/checkout/address.html',
                    controller: 'CheckoutAddressCtrl'
                  }
                },
                resolve: {
                  user_shipping_addresses: function(CheckoutService){
                    return CheckoutService.getUserShippingAddresses();
                  }
                }
              })
              // Aca deberiamos resolver un listado de direcciones que el usuario guardo

              .state('main.app.checkout.card', {
                url: '/card',
                views: {
                  'main-view@main': {
                    templateUrl: 'views/checkout/card.html',
                    controller: 'CheckoutCardCtrl'
                  }
                },
                resolve: {
                  user_credit_cards: function(CheckoutService){
                    return CheckoutService.getUserCreditCards();
                  }
                }
              })
              // Aca deberiamos resolver un listado de tarjetas de credito que el usuario guardo

              /*.state('main.app.checkout.promo-code', {
                url: '/promo-code',
                views: {
                  'main-view@main': {
                    templateUrl: 'views/checkout/promo-code.html',
                    controller: 'CheckoutPromoCodeCtrl'
                  }
                }
              })*/

              .state('main.app.checkout.thanks', {
                url: '/thanks',
                views: {
                  'main-view@main': {
                    templateUrl: 'views/checkout/thanks.html'
                  }
                }
              })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/intro/walkthrough-welcome');
  // $urlRouterProvider.otherwise('/main/app/feed/fashion');
});
