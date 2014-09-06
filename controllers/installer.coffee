class GithubInstallerController extends KDController

  constructor:(options = {}, data)->

    { githubInstallerController } = KD.singletons
    return githubInstallerController if githubInstallerController

    @kiteHelper  = options.kiteHelper
    @appStorage  = options.appStorage
    @token       = null
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
    @clonedRepos().then (clonedRepos)=>
      paramaters = "q=#{topic}&sort=stars&order=desc&limit=#{repoSearchLimit}"
      @handler("/search/repositories?#{paramaters}").then (response) =>
        repos = []

        for repo in response.items
          repoData = @repoData clonedRepos, repo
          repos.push repoData

        return repos

  repoData: (repos, repo) ->
    repo.description or= ""

    if repo.description.length > 150
      repo.description = "#{repo.description.slice(0, 150)}..."

    name: repo.name
    user: repo.owner.login
    avatar: repo.owner.avatar_url
    cloneUrl: repo.clone_url
    description: repo.description
    stars: repo.stargazers_count
    language: repo.language
    url: repo.html_url
    sshCloneUrl: repo.ssh_url
    cloned: repo.name in repos

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
          resolve value
        else
          reject error

  myRepos: ->
    @clonedRepos().then (clonedRepos)=>
      @handler("/user/repos").then (response) =>
        repos = []

        for repo in response
          repoData = @repoData clonedRepos, repo
          repos.push repoData

        return repos

  clonedRepos: ->
    @kiteHelper.run
      command: """
        mkdir -p ~/Github;
        cd ~/Github;
        ls -d */;
      """
    .then (response)->
      response.stdout.split("\n").map (folder)-> folder.slice(0, -1)

  cloneRepo: (repo)->
    @announce "Cloning #{repo.name} to ~/Github directory..."

    @kiteHelper.run
      command: "git clone #{repo.cloneUrl} ~/Github/#{repo.name}"
    .then => @announce false

  removeModal: ->
    @modal.destroy()
    delete @modal
