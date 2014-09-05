class GithubTrendingPaneView extends KDView
  constructor: (options = {},data) ->
    super options,data

    @topic = randomTopic()
    @installer = options.installer

  viewAppended: ->
    @addSubView new KDListView
      cssClass: "topic"
      partial : """
        Showing trending repos related to <strong>#{@topic}</strong>...
      """

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

    @installer.trendingRepos(@topic).then (repos) =>
      @loader.hide()

      if repos?
        for repo in repos
          @repos.addItemView new GithubRepoView
            installer: @installer
            data     : repo
      else
        @repos.addItemView new KDView
          partial: "Woah, slow down. Github can't handle that many search requests. Try again in a minute"
