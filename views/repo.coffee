class GithubRepoView extends KDView
  constructor: (options = {},data) ->
    super options,data

    @repo       = data
    @installer  = options.installer
    @loading    = false

    options.cssClass = "repo"

  viewAppended: ->
    @addSubView @name = new KDCustomHTMLView
      cssClass: "name"

    name.addSubView new KDCustomHTMLView
      tagName: "span"
      partial: @repo.user

    name.addSubView new KDCustomHTMLView
      tagName: "strong"
      partial: @repo.name
