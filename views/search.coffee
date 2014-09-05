class GithubSearchPaneView extends KDView
  constructor: (options = {},data) ->
    super options,data

    @installer = options.installer

  viewAppended: ->
    @addSubView @searchBox = new KDInputView
      cssClass: "search-input"
      placeholder: "Search github for #{topics.slice(0, 3).join ", "}..."

    @searchBox.on 'keydown', (e) =>
      if e.keyCode is 13 and @searchBox.getValue()
        @searchRepos @searchBox.getValue()

    @addSubView @loader = new KDLoaderView
      cssClass  : "loader"
      showLoader: false

    @addSubView @repos = new KDListView
      cssClass: "repos"

  reload: ->
    @searchRepos @searchBox.getValue()

  searchRepos: (search)->
    @loader.show()
    @repos.empty()

    @installer.searchRepos(search).then (repos) =>
      @loader.hide()
      @populateRepos repos

  populateRepos: (repos) ->
    if repos?
      for repo in repos
        @repos.addItemView new GithubRepoView
          installer: @installer
          data     : repo
    else
      @repos.addItemView new KDView
        partial: "Woah, slow down. Github can't handle that many search requests. Try again in a minute"
