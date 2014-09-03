/* Compiled by kdc on Wed Sep 03 2014 23:22:17 GMT+0000 (UTC) */
(function() {
/* KDAPP STARTS */
if (typeof window.appPreview !== "undefined" && window.appPreview !== null) {
  var appView = window.appPreview
}
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/config.coffee */
var CLONED, CLONING, LOADING, NOT_CLONED, api, app, appCSS, appName, dataPath, domain, getSession, github, logger, maxSymbolsInDescription, oauthKey, randomTopic, repoSearchLimit, topics, user, vmHostname, _ref;

_ref = [0, 1, 2, 3], NOT_CLONED = _ref[0], CLONING = _ref[1], CLONED = _ref[2], LOADING = _ref[3];

user = KD.nick();

domain = "" + user + ".kd.io";

vmHostname = "" + user + ".koding.kd.io";

getSession = function() {
  return (Math.random() + 1).toString(36).substring(7);
};

app = "github";

appName = "Github";

appCSS = "Github-installer";

github = "https://rest.kd.io/bvallelunga/Github.kdapp/master";

logger = "/tmp/_Github." + (getSession()) + ".out";

api = "https://api.github.com";

repoSearchLimit = 50;

maxSymbolsInDescription = 100;

dataPath = "~/.gitdashboard/repodata";

oauthKey = "D6R6uhEmh7kmXCVT9YzSwvHP-tk";

topics = ["express", "sails", "orm", "geo location", "phonegap", "ios", "contact picker", "go", "session handler", "kd", "mixpanel"];

randomTopic = function() {
  return topics[Math.floor(Math.random() * (topics.length - 1))];
};
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/views/selectVm.coffee */
var GithubSelectVm,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubSelectVm = (function(_super) {
  __extends(GithubSelectVm, _super);

  function GithubSelectVm(options, data) {
    if (options == null) {
      options = {};
    }
    this.kiteHelper = options.kiteHelper;
    this.installer = options.installer;
    options.cssClass = "" + appName + "-dropdown";
    GithubSelectVm.__super__.constructor.call(this, options, data);
  }

  GithubSelectVm.prototype.viewAppended = function() {
    return this.kiteHelper.getReady().then((function(_this) {
      return function() {
        _this.addSubView(_this.header = new KDCustomHTMLView({
          tagName: 'div',
          cssClass: 'header',
          partial: _this.namify(_this.kiteHelper.getVm())
        }));
        _this.addSubView(_this.selection = new KDCustomHTMLView({
          tagName: 'div',
          cssClass: 'selection'
        }));
        return _this.updateList();
      };
    })(this));
  };

  GithubSelectVm.prototype.namify = function(hostname) {
    return hostname.split(".")[0];
  };

  GithubSelectVm.prototype.updateList = function() {
    var vmController;
    this.selection.updatePartial("");
    vmController = KD.singletons.vmController;
    return this.kiteHelper.getVms().forEach((function(_this) {
      return function(vm) {
        var vmItem;
        _this.selection.addSubView(vmItem = new KDCustomHTMLView({
          tagName: 'div',
          cssClass: "item",
          click: function() {
            if (!_this.hasClass("disabled")) {
              return _this.chooseVm(vm.hostnameAlias);
            }
          }
        }));
        if (vm.hostnameAlias === _this.kiteHelper.getVm()) {
          vmItem.setClass("active");
        }
        vmItem.addSubView(new KDCustomHTMLView({
          tagName: 'span',
          cssClass: "bubble"
        }));
        vmItem.addSubView(new KDCustomHTMLView({
          tagName: 'span',
          cssClass: "name",
          partial: _this.namify(vm.hostnameAlias)
        }));
        return vmController.info(vm.hostnameAlias, function(err, vmn, info) {
          return vmItem.setClass(info != null ? info.state.toLowerCase() : void 0);
        });
      };
    })(this));
  };

  GithubSelectVm.prototype.chooseVm = function(vm) {
    this.kiteHelper.setDefaultVm(vm);
    this.header.updatePartial(this.namify(vm));
    return this.updateList();
  };

  GithubSelectVm.prototype.turnOffVm = function(vm) {
    this.installer.announce("Please wait while we turn off " + (this.namify(vm)) + "...", WORKING, 0);
    return this.kiteHelper.turnOffVm(vm).then((function(_this) {
      return function() {
        return KD.utils.wait(10000, function() {
          return _this.updateList();
        });
      };
    })(this))["catch"]((function(_this) {
      return function(err) {
        return _this.installer.error(err);
      };
    })(this));
  };

  GithubSelectVm.prototype.turnOffVmModal = function() {
    var container, vmController;
    if (this.modal) {
      retun(this.modal);
    }
    vmController = KD.singletons.vmController;
    this.addSubView(container = new KDCustomHTMLView({
      tagName: 'div'
    }));
    container.addSubView(new KDCustomHTMLView({
      tagName: 'div',
      cssClass: "description",
      partial: "Your plan's vm quota requires that you turn off one of your vms to use another"
    }));
    this.kiteHelper.getVms().forEach((function(_this) {
      return function(vm) {
        var vmItem;
        container.addSubView(vmItem = new KDCustomHTMLView({
          tagName: 'div',
          cssClass: "item",
          partial: "<div class=\"bubble\"></div>\n" + vm.hostnameAlias,
          click: function(event) {
            _this.turnOffVm(vm.hostnameAlias);
            return _this.removeModal();
          }
        }));
        return vmController.info(vm.hostnameAlias, function(err, vmn, info) {
          if ((info != null ? info.state : void 0) !== "RUNNING") {
            return vmItem.destroy();
          }
        });
      };
    })(this));
    return this.modal = new KDModalView({
      title: "Choose VM To Turn Off",
      overlay: true,
      overlayClick: false,
      width: 400,
      height: "auto",
      cssClass: "new-kdmodal",
      view: container,
      cancel: (function(_this) {
        return function() {
          return _this.removeModal();
        };
      })(this)
    });
  };

  GithubSelectVm.prototype.removeModal = function() {
    this.modal.destroy();
    return delete this.modal;
  };

  GithubSelectVm.prototype.disabled = function(disabled) {
    if (disabled) {
      return this.setClass("disabled");
    } else {
      return this.unsetClass("disabled");
    }
  };

  return GithubSelectVm;

})(KDView);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/views/repo.coffee */
var GithubRepoView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubRepoView = (function(_super) {
  __extends(GithubRepoView, _super);

  function GithubRepoView(options, data) {
    if (options == null) {
      options = {};
    }
    GithubRepoView.__super__.constructor.call(this, options, data);
    this.repo = data;
    this.installer = options.installer;
    this.loading = false;
    options.cssClass = "repo";
  }

  GithubRepoView.prototype.viewAppended = function() {
    this.addSubView(this.name = new KDCustomHTMLView({
      cssClass: "name"
    }));
    name.addSubView(new KDCustomHTMLView({
      tagName: "span",
      partial: this.repo.user
    }));
    return name.addSubView(new KDCustomHTMLView({
      tagName: "strong",
      partial: this.repo.name
    }));
  };

  return GithubRepoView;

})(KDView);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/views/trending.coffee */
var GithubTrendingPaneView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubTrendingPaneView = (function(_super) {
  __extends(GithubTrendingPaneView, _super);

  function GithubTrendingPaneView(options, data) {
    if (options == null) {
      options = {};
    }
    GithubTrendingPaneView.__super__.constructor.call(this, options, data);
    this.installer = options.installer;
    this.loading = false;
  }

  GithubTrendingPaneView.prototype.viewAppended = function() {
    this.addSubView(this.loader = new KDLoaderView({
      showLoader: false
    }));
    this.addSubView(this.repos = new KDListView({
      cssClass: "repos"
    }));
    return KD.utils.defer((function(_this) {
      return function() {
        return _this.populateRepos();
      };
    })(this));
  };

  GithubTrendingPaneView.prototype.populateRepos = function() {
    this.repos.empty();
    return this.installer.trendingRepos().then((function(_this) {
      return function(repos) {
        var loading, repo, _i, _len, _results;
        if (repos != null) {
          _results = [];
          for (_i = 0, _len = repos.length; _i < _len; _i++) {
            repo = repos[_i];
            _results.push(_this.repos.addSubview = new GithubRepoView({
              installer: _this.installer,
              data: repo
            }));
          }
          return _results;
        } else {
          _this.hideLoader();
          _this.repos.addItemView(new KDView({
            partial: "Woah, slow down. Github can't handle that many search requests. Try again in a minute"
          }));
          return loading = false;
        }
      };
    })(this));
  };

  GithubTrendingPaneView.prototype.hideLoader = function() {
    var loading;
    loading = false;
    return this.loader.hide();
  };

  return GithubTrendingPaneView;

})(KDView);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/views/search.coffee */
var GithubSearchPaneView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubSearchPaneView = (function(_super) {
  __extends(GithubSearchPaneView, _super);

  function GithubSearchPaneView(options, data) {
    if (options == null) {
      options = {};
    }
    GithubSearchPaneView.__super__.constructor.call(this, options, data);
    this.installer = options.installer;
    this.loading = false;
  }

  GithubSearchPaneView.prototype.viewAppended = function() {
    this.addSubView(this.searchBox = new KDInputView({
      cssClass: "search-input",
      placeholder: "Search github..."
    }));
    this.searchBox.on('keydown', (function(_this) {
      return function(e) {
        var loading;
        if (e.keyCode === 13 && _this.searchBox.getValue()) {
          loading = true;
          _this.loader.show();
          _this.repos.empty();
          return _this.installer.searchRepos(_this.searchBox.getValue()).then(function(repos) {
            return _this.populateRepos(repos);
          });
        }
      };
    })(this));
    this.addSubView(this.loader = new KDLoaderView({
      showLoader: false
    }));
    return this.addSubView(this.repos = new KDListView({
      cssClass: "repos"
    }));
  };

  GithubSearchPaneView.prototype.populateRepos = function(repos) {
    var loading, repo, _i, _len, _results;
    if (repos != null) {
      _results = [];
      for (_i = 0, _len = repos.length; _i < _len; _i++) {
        repo = repos[_i];
        _results.push(this.repos.addSubview = new GithubRepoView({
          installer: this.installer,
          data: repo
        }));
      }
      return _results;
    } else {
      this.repos.empty();
      this.hideLoader();
      this.repos.addItemView(new KDView({
        partial: "Woah, slow down. Github can't handle that many search requests. Try again in a minute"
      }));
      return loading = false;
    }
  };

  GithubSearchPaneView.prototype.hideLoader = function() {
    var loading;
    loading = false;
    return this.loader.hide();
  };

  return GithubSearchPaneView;

})(KDView);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/controllers/kiteHelper.coffee */
var KiteHelper,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

KiteHelper = (function(_super) {
  __extends(KiteHelper, _super);

  function KiteHelper(options, data) {
    var kiteHelperController;
    if (options == null) {
      options = {};
    }
    this.vmIsStarting = false;
    kiteHelperController = KD.singletons.kiteHelperController;
    if (kiteHelperController) {
      return kiteHelperController;
    }
    this.registerSingleton("kiteHelperController", this, true);
    KiteHelper.__super__.constructor.call(this, options, data);
  }

  KiteHelper.prototype.getReady = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        var JVM;
        JVM = KD.remote.api.JVM;
        return JVM.fetchVmsByContext(function(err, vms) {
          var alias, kiteController, vm, _i, _len;
          if (err) {
            console.warn(err);
          }
          if (!vms) {
            return;
          }
          _this._vms = vms;
          _this._kites = {};
          kiteController = KD.getSingleton('kiteController');
          for (_i = 0, _len = vms.length; _i < _len; _i++) {
            vm = vms[_i];
            alias = vm.hostnameAlias;
            _this._kites[alias] = kiteController.getKite("os-" + vm.region, alias, 'os');
          }
          _this.emit('ready');
          return resolve();
        });
      };
    })(this));
  };

  KiteHelper.prototype.setDefaultVm = function(vm) {
    this.defaultVm = vm;
    return this.vmIsStarting = false;
  };

  KiteHelper.prototype.getVm = function() {
    if (this.defaultVm == null) {
      this.defaultVm = this._vms.first.hostnameAlias;
    }
    return this.defaultVm;
  };

  KiteHelper.prototype.getVms = function() {
    return this._vms.sort((function(_this) {
      return function(a, b) {
        return _this.getVMNumber(a) > _this.getVMNumber(b);
      };
    })(this));
  };

  KiteHelper.prototype.getVMNumber = function(_arg) {
    var hostnameAlias;
    hostnameAlias = _arg.hostnameAlias;
    return +(hostnameAlias.match(/\d+/)[0]);
  };

  KiteHelper.prototype.turnOffVm = function(vm) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return _this.getReady().then(function() {
          var kite;
          if (!(kite = _this._kites[vm])) {
            return reject({
              message: "No such kite for " + vm
            });
          }
          return kite.vmOff().then(function() {
            return _this.whenVmState(vm, "STOPPED").then(function() {
              return resolve();
            })["catch"](reject);
          })["catch"](reject);
        })["catch"](reject);
      };
    })(this));
  };

  KiteHelper.prototype.whenVmState = function(vm, state) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        var repeat, timeout, vmController, wait;
        vmController = KD.singletons.vmController;
        timeout = 10 * 60 * 1000;
        repeat = KD.utils.repeat(1000, function() {
          return vmController.info(vm, function(err, vmn, info) {
            debugger;
            if ((info != null ? info.state : void 0) === state) {
              KD.utils.killRepeat(repeat);
              KD.utils.killWait(wait);
              return resolve();
            }
          });
        });
        return wait = KD.utils.wait(timeout, function() {
          if (repeat != null) {
            KD.utils.killRepeat(repeat);
            return reject();
          }
        });
      };
    })(this));
  };

  KiteHelper.prototype.getKite = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return _this.getReady().then(function() {
          var kite, vm, vmController;
          vm = _this.getVm();
          vmController = KD.singletons.vmController;
          if (!(kite = _this._kites[vm])) {
            return reject({
              message: "No such kite for " + vm
            });
          }
          return vmController.info(vm, function(err, vmn, info) {
            var timeout;
            if (!_this.vmIsStarting && info.state === "STOPPED") {
              _this.vmIsStarting = true;
              timeout = 10 * 60 * 1000;
              kite.options.timeout = timeout;
              return kite.vmOn().then(function() {
                return _this.whenVmState(vm, "RUNNING").then(function() {
                  _this.vmIsStarting = false;
                  return resolve(kite);
                })["catch"](function(err) {
                  _this.vmIsStarting = false;
                  return reject(err);
                });
              }).timeout(timeout)["catch"](function(err) {
                _this.vmIsStarting = false;
                return reject(err);
              });
            } else {
              return resolve(kite);
            }
          });
        });
      };
    })(this));
  };

  KiteHelper.prototype.run = function(options, callback) {
    return this.getKite().then(function(kite) {
      if (options.timeout == null) {
        options.timeout = 10 * 60 * 1000;
      }
      kite.options.timeout = options.timeout;
      return kite.exec(options).then(function(result) {
        if (callback) {
          return callback(null, result);
        }
      })["catch"](function(err) {
        if (callback) {
          callback({
            message: "Failed to run " + options.command,
            details: err
          });
        }
        return console.error(err);
      });
    })["catch"](function(err) {
      if (callback) {
        callback({
          message: "Failed to run " + options.command,
          details: err
        });
      }
      return console.error(err);
    });
  };

  return KiteHelper;

})(KDController);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/controllers/installer.coffee */
var GithubInstallerController,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubInstallerController = (function(_super) {
  __extends(GithubInstallerController, _super);

  function GithubInstallerController(options, data) {
    var githubInstallerController;
    if (options == null) {
      options = {};
    }
    githubInstallerController = KD.singletons.githubInstallerController;
    if (githubInstallerController) {
      return githubInstallerController;
    }
    this.kiteHelper = options.kiteHelper;
    this.appStorage = KD.getSingleton('appStorageController').storage('Gitdashboard', '0.1');
    this.registerSingleton("githubInstallerController", this, true);
    GithubInstallerController.__super__.constructor.call(this, options, data);
  }

  GithubInstallerController.prototype.request = function(topic) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        var paramaters;
        paramaters = "q=" + topic + "&sort=stars&order=desc&limit=" + repoSearchLimit;
        return $.getJSON("" + api + "/search/repositories?" + paramaters).then(function(json) {
          var repo, repoData, repos, _i, _len, _ref;
          repos = [];
          _ref = json.items;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            repo = _ref[_i];
            repoData = _this.repoData(repo);
            repos.push(repoData);
          }
          return resolve(repos);
        }).fail(function(error) {
          return reject(error);
        });
      };
    })(this));
  };

  GithubInstallerController.prototype.repoData = function(repo) {
    return {
      name: repo.name,
      user: repo.owner.login,
      authorGravatarUrl: repo.owner.avatar_url,
      cloneUrl: repo.clone_url,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      url: repo.html_url,
      sshCloneUrl: repo.ssh_url
    };
  };

  GithubInstallerController.prototype.searchRepos = function(search) {
    return this.request(search);
  };

  GithubInstallerController.prototype.trendingRepos = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return _this.request(randomTopic()).then(resolve)["catch"](function(error) {
          var decode, value;
          console.log(error);
          value = _this.appStorage.getValue("repos");
          if (value != null) {
            decode = value.replace(/&quot;/g, "\"");
            return resolve(JSON.parse(decode));
          } else {
            return reject(error);
          }
        });
      };
    })(this));
  };

  return GithubInstallerController;

})(KDController);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/views/index.coffee */
var GithubMainView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubMainView = (function(_super) {
  __extends(GithubMainView, _super);

  function GithubMainView(options, data) {
    if (options == null) {
      options = {};
    }
    this.kiteHelper = new KiteHelper;
    this.installer = new GithubInstallerController({
      kiteHelper: this.kiteHelper
    });
    this.selectVm = new GithubSelectVm({
      kiteHelper: this.kiteHelper,
      installer: this.installer
    });
    options.cssClass = "" + appCSS + " main-view";
    GithubMainView.__super__.constructor.call(this, options, data);
  }

  GithubMainView.prototype.viewAppended = function() {
    this.addSubView(this.wrapper = new KDCustomHTMLView({
      tagName: 'div',
      cssClass: 'wrapper'
    }));
    this.wrapper.addSubView(this.selectVm);
    this.wrapper.addSubView(this.container = new KDCustomHTMLView({
      tagName: 'div',
      cssClass: 'container'
    }));
    this.container.addSubView(this.tabView = new KDTabView({
      cssClass: "tab-view"
    }));
    this.tabView.addPane(this.trendingTab = new KDTabPaneView({
      title: "Trending",
      closable: false
    }));
    this.tabView.addPane(this.searchTab = new KDTabPaneView({
      title: "Search",
      closable: false
    }));
    this.trendingTab.setMainView(new GithubTrendingPaneView({
      installer: this.installer
    }));
    this.searchTab.setMainView(new GithubSearchPaneView({
      installer: this.installer
    }));
    return this.tabView.showPane(this.trendingTab);
  };

  return GithubMainView;

})(KDView);
/* BLOCK STARTS: /home/bvallelunga/Applications/Github.kdapp/index.coffee */
var GithubController,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GithubController = (function(_super) {
  __extends(GithubController, _super);

  function GithubController(options, data) {
    if (options == null) {
      options = {};
    }
    options.view = new GithubMainView;
    options.appInfo = {
      name: "Github",
      type: "application"
    };
    GithubController.__super__.constructor.call(this, options, data);
  }

  return GithubController;

})(AppController);

(function() {
  var view;
  if (typeof appView !== "undefined" && appView !== null) {
    view = new GithubMainView;
    return appView.addSubView(view);
  } else {
    return KD.registerAppClass(GithubController, {
      name: "Github",
      routes: {
        "/:name?/Github": null,
        "/:name?/bvallelunga/Apps/Github": null
      },
      dockPath: "/bvallelunga/Apps/Github",
      behavior: "application"
    });
  }
})();

/* KDAPP ENDS */
}).call();