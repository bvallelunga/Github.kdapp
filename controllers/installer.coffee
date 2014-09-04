class GithubInstallerController extends KDController

  constructor:(options = {}, data)->

    { githubInstallerController } = KD.singletons
    return githubInstallerController if githubInstallerController

    @kiteHelper = options.kiteHelper
    @appStorage = KD.getSingleton('appStorageController').storage('Gitdashboard', '0.1')
    @registerSingleton "githubInstallerController", this, yes
    super options, data

  request: (topic)->
    new Promise (resolve, reject)=>
      paramaters = "q=#{topic}&sort=stars&order=desc&limit=#{repoSearchLimit}"
      $.getJSON("#{api}/search/repositories?#{paramaters}").then (json)=>
        repos = []

        for repo in json.items
          repoData = @repoData repo
          repos.push repoData

        resolve repos
      .fail (error)->
        reject error

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

  searchRepos: (search)->
    @request(search)

  trendingRepos: ->
    new Promise (resolve, reject)=>
      @request(randomTopic()).then resolve
      .catch (error)=>
        console.log error
        value = @appStorage.getValue("repos")

        if value?
          decode = value.replace(/&quot;/g,"\"")
          resolve JSON.parse decode
        else
          reject error
