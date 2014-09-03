# DO NOT TOUCH
[NOT_CLONED,CLONING,
CLONED, LOADING]        = [0..3]
user                    = KD.nick()
domain                  = "#{user}.kd.io"
vmHostname              = "#{user}.koding.kd.io"
getSession              = -> (Math.random() + 1).toString(36).substring 7

# Configure App Here
app                     = "github"                                             # App name used for variables
appName                 = "Github"                                                  # App name used for titles and statuses
appCSS                  = "Github-installer"                                     # App name used for css
github                  = "https://rest.kd.io/bvallelunga/Github.kdapp/master"  # Git repository on the master branch
logger                  = "/tmp/_Github.#{getSession()}.out"                     # Path to log installer progress

# Addition Configuration Variables Here
api                     = "https://api.github.com"
repoSearchLimit         = 50
maxSymbolsInDescription = 100
dataPath                = "~/.gitdashboard/repodata"
oauthKey                = "D6R6uhEmh7kmXCVT9YzSwvHP-tk"
topics                  = [
                           "express", "sails", "orm", "geo location", "phonegap", "ios"
                           "contact picker", "go", "session handler", "kd", "mixpanel"
                          ]
randomTopic             = -> topics[Math.floor(Math.random() * (topics.length - 1))]
