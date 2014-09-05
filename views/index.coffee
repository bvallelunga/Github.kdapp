class GithubMainView extends KDView

  constructor:(options = {}, data)->
    @kiteHelper = new KiteHelper
    @appStorage = KD.getSingleton('appStorageController').storage('Github', '0.1')

    @installer = new GithubInstallerController
      kiteHelper: @kiteHelper
      appStorage: @appStorage

    @selectVm = new GithubSelectVm
       kiteHelper: @kiteHelper

    options.cssClass = "#{appCSS} main-view"
    super options, data

  viewAppended: ->
    @addSubView @wrapper = new KDCustomHTMLView
      cssClass   : 'wrapper'

    @wrapper.addSubView @selectVm

    @wrapper.addSubView @container = new KDCustomHTMLView
      cssClass  : 'container'

    @container.addSubView @statusBar = new KDCustomHTMLView
      cssClass  : 'status-bar hidden'

    @container.addSubView @githubConnect = new KDCustomHTMLView
      cssClass  : 'github-button'
      partial   : "Connect with Github"
      click     : @bound "oauthAuthentication"

    @container.addSubView @tabView = new KDTabView
      cssClass  :"tab-view"

    @tabView.addPane @trendingTab = new KDTabPaneView
      title     : "Trending"
      closable  : false

    @tabView.addPane @searchTab = new KDTabPaneView
      title     : "Search"
      closable  : false

    @trendingTab.setMainView new GithubTrendingPaneView
      installer : @installer

    @searchTab.setMainView new GithubSearchPaneView
      installer : @installer

    @tabView.showPane @trendingTab

    KD.utils.defer =>
      token = OAuth.create "github"
      @initPersonal token if token != false

      @selectVm.on "status-update", @bound "statusUpdate"
      @installer.on "status-update", @bound "statusUpdate"

  statusUpdate: (message, error)->
    if message is false
      @githubConnect.show()
      return @statusBar.hide()
    else
      @githubConnect.hide()
      @statusBar.show()

    @statusBar.updatePartial message
    @statusBar[if error then "setClass" else "unsetClass"] "error"

  oauthAuthentication: ->
    OAuth.popup("github", cache: true).done (token)=>
      @initPersonal token
      @appStorage.setValue "githubToken", token
    .fail (err) ->
        console.log err

  initPersonal: (token)->
    @githubConnect.destroy()
    @installer.token = token

    @tabView.addPane @myReposTab = new KDTabPaneView
      title: "My Repos"
      closable: false

    @myReposTab.setMainView new GithubMyReposPaneView
      installer : @installer
