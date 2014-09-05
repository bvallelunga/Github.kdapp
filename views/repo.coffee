class GithubRepoView extends KDListItemView
  constructor: (options = {},data) ->
    options.cssClass = "repo"
    super options, data

    @state      = NOT_CLONED
    @repo       = options.data
    @installer  = options.installer
    @loading    = false

  viewAppended: ->
    @addSubView new KDCustomHTMLView
      cssClass: "avatar"
      partial : """
        <img src="#{@repo.avatar}"/>
      """

    @addSubView info = new KDCustomHTMLView
      cssClass: "info"

    info.addSubView new KDCustomHTMLView
      tagName : "a"
      cssClass: "name"
      partial : """
        <span>#{@repo.user}</span>/<strong>#{@repo.name}</strong>
      """
      attributes:
        href: @repo.url
        target: "_blank"

    info.addSubView new KDCustomHTMLView
      cssClass: "description"
      partial : @repo.description

    @addSubView extraInfo = new KDCustomHTMLView
      cssClass: "extra-info"

    extraInfo.addSubView new KDCustomHTMLView
      cssClass: "details"
      partial : """
        #{@repo.language or "Unknown"} - Stars: #{@repo.stars}
      """

    if @repo.cloned
      buttonTitle = "cloned"
      cssClass    = "cloned"
    else
      buttonTitle = "clone to vm"
      cssClass    = ""

    extraInfo.addSubView @button = new KDCustomHTMLView
      partial       : buttonTitle
      cssClass      : "button #{cssClass}"
      click         : =>
        if not @repo.cloned
          @button.setClass "cloned"
          @button.updatePartial "cloning"

          @installer.cloneRepo(@repo).then =>
            @button.updatePartial "cloned"
            @button.setClass "cloned"
            @repo.cloned = true

          .catch (error)=>
            console.log error

            @button.updatePartial "failed"
            @button.setClass "error"
            @button.unsetClass "cloned"
