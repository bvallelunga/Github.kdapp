class GithubMyReposPaneView extends KDView
  constructor: (options = {},data) ->
    super options,data

    @installer = options.installer

  viewAppended: ->
    @addSubView @loader = new KDLoaderView
      cssClass  : "loader"
      showLoader: false

    @addSubView @repos = new KDListView
      cssClass: "repos"

    KD.utils.defer => @populateRepos()

  reload: ->
    @populateRepos()

  populateRepos: ->
    @loader.show()
    @repos.empty()

    @installer.myRepos().then (repos) =>
      @loader.hide()

      if repos?
        for repo in repos
          @repos.addItemView new GithubRepoView
            installer: @installer
            data     : repo
      else
        @repos.addItemView new KDView
          partial: "Woah, slow down. Github can't handle that many search requests. Try again in a minute"
