class GithubTrendingPaneView extends KDView
  constructor: (options = {},data) ->
    super options,data
    
    @installer = options.installer
    @loading = false

  viewAppended: ->
    @addSubView @loader = new KDLoaderView
      showLoader: false

    @addSubView @repos = new KDListView
      cssClass: "repos"

    KD.utils.defer => @populateRepos()

  populateRepos: ->
    @repos.empty()
    @installer.trendingRepos().then (repos) =>
      @hideLoader()
      
      if repos?
        for repo in repos
          @repos.addItemView new GithubRepoView
            installer: @installer
            data     : repo
      else
        @repos.addItemView new KDView
          partial: "Woah, slow down. Github can't handle that many search requests. Try again in a minute"
        loading = false

  hideLoader: ->
    loading = false
    @loader.hide()
