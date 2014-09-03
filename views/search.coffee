class GithubSearchPaneView extends KDView
  constructor: (options = {},data) ->
    super options,data
    @installer = options.installer
    @loading = false

  viewAppended: ->
    @addSubView @searchBox = new KDInputView
      cssClass: "search-input"
      placeholder: "Search github..."

    @searchBox.on 'keydown', (e) =>
      if e.keyCode is 13 and @searchBox.getValue()
        loading = true
        @loader.show()
        @repos.empty()

        @installer.searchRepos @searchBox.getValue()
        .then (repos) => @populateRepos repos

    @addSubView @loader = new KDLoaderView
      showLoader: false

    @addSubView @repos = new KDListView
      cssClass: "repos"

  populateRepos: (repos) ->
    if repos?
      for repo in repos
        @repos.addSubview = new GithubRepoView
          installer: @installer
          data     : repo
    else
      @repos.empty()
      @hideLoader()

      @repos.addItemView new KDView
        partial: "Woah, slow down. Github can't handle that many search requests. Try again in a minute"
      loading = false

  hideLoader: ->
    loading = false
    @loader.hide()
