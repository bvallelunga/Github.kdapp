class GithubSelectVm extends KDView

  constructor: (options = {}, data)->
    @kiteHelper = options.kiteHelper

    options.cssClass = "#{appName}-dropdown"
    super options, data

  viewAppended: ->
    @kiteHelper.getReady().then =>
      @addSubView @header = new KDCustomHTMLView
        tagName       : 'div'
        cssClass      : 'header'
        partial       : @namify(@kiteHelper.getVm().hostnameAlias)

      @addSubView @selection = new KDCustomHTMLView
        tagName       : 'div'
        cssClass      : 'selection'

      @updateList()

  announce: (message, error)->
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

  namify: (hostname)->
    return hostname.split(".")[0]

  updateList: ->
    @selection.updatePartial ""
    {vmController} = KD.singletons

    @kiteHelper.getVms().forEach (vm)=>
      @selection.addSubView vmItem = new KDCustomHTMLView
        tagName       : 'div'
        cssClass      : "item"
        click         : =>
          @chooseVm vm if !@hasClass "disabled"

      if vm.hostnameAlias is @kiteHelper.getVm().hostnameAlias
        vmItem.setClass "active"

      vmItem.addSubView new KDCustomHTMLView
        tagName       : 'span'
        cssClass      : "bubble"

      vmItem.addSubView new KDCustomHTMLView
        tagName       : 'span'
        cssClass      : "name"
        partial       : @namify vm.hostnameAlias

      vmController.info vm.hostnameAlias, (err, vmn, info)=>
        vmItem.setClass info?.state.toLowerCase()

  chooseVm: (vm)->
    hostname = @namify vm.hostnameAlias

    @disabled true
    @announce "Please wait while we turn on #{hostname}... It can take awhile", false
    @header.updatePartial hostname
    @kiteHelper.setDefaultVm vm
    @turnOnVm()

  turnOnVm: ->
    @kiteHelper.testKite().then =>
      @announce false
      @disabled false
      @updateList()
      @emit "reload-tabs"
    .catch (err)=>
      @error err

  turnOffVm: (vm)->
    @announce "Please wait while we turn off #{@namify vm}... It can take awhile", false

    @kiteHelper.turnOffVm(vm).then =>
      # Wait for Koding to register other vm is off
      KD.utils.wait 15000, => @turnOnVm()
    .catch (err)=>
      @error err

  turnOffVmModal: ->
    return @modal if @modal

    {vmController} = KD.singletons
    @addSubView container = new KDCustomHTMLView
        tagName         : 'div'

    container.addSubView new KDCustomHTMLView
        tagName       : 'div'
        cssClass      : "description"
        partial       : """
          Your plan's vm quota requires that you turn off one of your vms to use another
        """

    @kiteHelper.getVms().forEach (vm)=>
      container.addSubView vmItem = new KDCustomHTMLView
        tagName       : 'div'
        cssClass      : "item"
        partial       : """
          <div class="bubble"></div>
          #{vm.hostnameAlias}
        """
        click         : (event)=>
          @turnOffVm vm.hostnameAlias
          @removeModal()

      vmController.info vm.hostnameAlias, (err, vmn, info)=>
        if info?.state != "RUNNING"
          vmItem.destroy()

    @modal = new KDModalView
      title           : "Choose VM To Turn Off"
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

  disabled: (disabled)->
    if disabled
      @setClass "disabled"
    else
      @unsetClass "disabled"
