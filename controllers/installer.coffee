class GithubInstallerController extends KDController

  constructor:(options = {}, data)->

    { githubInstallerController } = KD.singletons
    return githubInstallerController if githubInstallerController

    @kiteHelper = options.kiteHelper
    @appStorage = options.appStorage
    @token      = null
    @registerSingleton "githubInstallerController", this, yes
    super options, data

  announce:(message, error)->
    @emit "status-update", message, error

  error: (err, override)->
    message = err.details?.message or err.message

    switch message
      when "CPU limit reached"
        message = "To use another vm with your plan, please turn off one of your vms"
        @turnOffVmModal()
      else
        message = override

    console.log err
    @announce message, true

  handler: (url)->
    new Promise (resolve, reject)=>
      if @token?
        @token.get(url).done (data)->
          resolve data
        .fail (err)->
          reject err
      else
        $.getJSON("#{api}#{url}").then (data)->
          resolve data
        .fail (err)->
          reject err

  request: (topic)->
    paramaters = "q=#{topic}&sort=stars&order=desc&limit=#{repoSearchLimit}"
    @handler("/search/repositories?#{paramaters}").then (response) =>
      repos = []

      for repo in response.items
        repoData = @repoData repo
        repos.push repoData

      return repos

  repoData: (repo) ->
    name: repo.name
    user: repo.owner.login
    avatar: repo.owner.avatar_url
    cloneUrl: repo.clone_url
    description: repo.description
    stars: repo.stargazers_count
    language: repo.language
    url: repo.html_url
    sshCloneUrl: repo.ssh_url
    cloned: false

  searchRepos: (search)->
    @request(search)

  trendingRepos: (topic)->
    new Promise (resolve, reject)=>
      @request(topic).then (repos)=>
        @appStorage.setValue "repos", repos
        resolve repos
      .catch (error)=>
        console.log error
        value = @appStorage.getValue "repos"

        if value?
          decode = value.replace(/&quot;/g,"\"")
          resolve JSON.parse decode
        else
          reject error

  myRepos: ->
    @handler("/user/repos").then (response) =>
      repos = []

      for repo in response
        repoData = @repoData repo
        repos.push repoData

      return repos

  cloneRepo: (repo)->
    unless @modal?
      new Promise (resolve, reject)=>
        container = new KDCustomHTMLView
          tagName         : 'div'

        @modal = new KDModalView
          title           : "Select Clone Location"
          overlay         : yes
          overlayClick    : no
          width           : 400
          height          : "auto"
          cssClass        : "vm-kdmodal"
          view            : container
          cancel          : => @removeModal()

  removeModal: ->
    @modal.destroy()
    delete @modal
