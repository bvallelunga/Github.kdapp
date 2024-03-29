class KiteHelper extends KDController

  constructor:(options = {}, data)->
    @vmIsStarting = false

    {kiteHelperController} = KD.singletons
    return kiteHelperController if kiteHelperController
    @registerSingleton "kiteHelperController", this, yes
    super options, data

  getReady:->
    new Promise (resolve, reject) =>
      {JVM} = KD.remote.api
      JVM.fetchVmsByContext (err, vms)=>
        console.warn err  if err
        return reject vms unless vms

        @_vms = vms
        @_kites = {}

        {kiteController} = KD.singletons

        for vm in vms
          alias = vm.hostnameAlias
          @_kites[alias] = kiteController
            .getKite "os-#{ vm.region }", alias, 'os'

        @emit 'ready'
        resolve()

  setDefaultVm: (vm)->
    @defaultVm = vm
    @vmIsStarting = false

  getVm: ->
    @defaultVm ?= @_vms.first

  getVmByName: (name) ->
    for vm in @_vms when vm.hostnameAlias is name
        return vm

  getVms: ->
    @_vms.sort (a,b)=>
      @getVMNumber(a) > @getVMNumber(b)

  testKite: ->
    @run command: "echo are we running"

  # hostnameAlias comes in format 'vm-0.senthil.kd.io', this helper
  # gets just the vm number
  getVMNumber: ({hostnameAlias})->
    return +(hostnameAlias.match(/\d+/)[0])

  turnOffVm: (vm)->
    new Promise (resolve, reject)=>
      @getReady().then =>
        unless kite = @_kites[vm]
          return reject
            message: "No such kite for #{vm}"

        kite.vmOff().then =>
          @whenVmState(vm, "STOPPED").then ->
            resolve()
          .catch reject
        .catch reject
      .catch reject

  whenVmState: (vm, state)->
    new Promise (resolve, reject)=>
      {vmController} = KD.singletons
      timeout = 10 * 60 * 1000

      repeat = KD.utils.repeat 1000, =>
        vmController.info vm, (err, vmn, info)=>
          if info?.state is state
            KD.utils.killRepeat repeat
            KD.utils.killWait wait
            resolve()

      wait = KD.utils.wait timeout, =>
        if repeat?
          KD.utils.killRepeat repeat
          reject()

  getKite:->
    new Promise (resolve, reject)=>
      @getReady().then =>
        vm = @getVm().hostnameAlias
        {vmController} = KD.singletons

        unless kite = @_kites[vm]
          return reject
            message: "No such kite for #{vm}"

        vmController.info vm, (err, vmn, info)=>
          if err
            return reject err

          if not @vmIsStarting and info.state is "STOPPED"
            @vmIsStarting = true
            timeout = 10 * 60 * 1000
            kite.options.timeout = timeout

            kite.vmOn().then =>
              @whenVmState(vm, "RUNNING").then =>
                @vmIsStarting = false
                resolve kite
              .catch (err)=>
                @vmIsStarting = false
                reject err
            .timeout(timeout)
            .catch (err)=>
              @vmIsStarting = false
              reject err
          else
            resolve kite

  run:(options)->
    @getKite().then (kite)->
      options.timeout ?= 10 * 60 * 1000
      kite.options.timeout = options.timeout
      kite.exec(options)
