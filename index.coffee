class GithubController extends AppController

  constructor:(options = {}, data)->
    options.view    = new GithubMainView
    options.appInfo =
      name : "Github"
      type : "application"

    super options, data

do ->

  # Intialize OAuth
  OAuth.initialize oauthKey

  # In live mode you can add your App view to window's appView
  if appView?
    view = new GithubMainView
    appView.addSubView view

  else
    KD.registerAppClass GithubController,
      name     : "Github"
      routes   :
        "/:name?/Github" : null
        "/:name?/bvallelunga/Apps/Github" : null
      dockPath : "/bvallelunga/Apps/Github"
      behavior : "application"
