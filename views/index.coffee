class GithubMainView extends KDView

  constructor:(options = {}, data)->
    @kiteHelper = new KiteHelper

    @installer = new GithubInstallerController
      kiteHelper: @kiteHelper

    @selectVm = new GithubSelectVm
       kiteHelper: @kiteHelper
       installer : @installer

    options.cssClass = "#{appCSS} main-view"
    super options, data

  viewAppended: ->
    @addSubView @wrapper = new KDCustomHTMLView
      tagName       : 'div'
      cssClass      : 'wrapper'

    @wrapper.addSubView @selectVm

    @wrapper.addSubView @container = new KDCustomHTMLView
      tagName       : 'div'
      cssClass      : 'container'

    @container.addSubView @tabView = new KDTabView
      cssClass:"tab-view"

    @tabView.addPane @trendingTab = new KDTabPaneView
      title: "Trending"
      closable: false

    @tabView.addPane @searchTab = new KDTabPaneView
      title: "Search"
      closable: false

    @trendingTab.setMainView new GithubTrendingPaneView
      installer: @installer

    @searchTab.setMainView new GithubSearchPaneView
      installer: @installer

    @tabView.showPane @trendingTab
