

/* eslint-disable */
const { ContainerBuilder, Reference } = require('node-dependency-injection');
const container = new ContainerBuilder();
  

const { Index } = require('./sample/dir1/index.js')
const { Index1Controller, DummyController, NoNamedController } = require('./sample/dir2/index1.js')
const { Index2Controller } = require('./sample/dir2/index2.js')
const {  } = require('./sample/test.js')

const __Index = new Reference('__Index')
const __Index1Controller = new Reference('__Index1Controller')
const __DummyController = new Reference('__DummyController')
const __NoNamedController = new Reference('__NoNamedController')
const __Index2Controller = new Reference('__Index2Controller')

container.register('__Index', Index)
    .addArgument(__Index1Controller)
    .addArgument(__Index2Controller)
container.register('__Index1Controller', Index1Controller)
container.register('__DummyController', DummyController)
container.register('__NoNamedController', NoNamedController)
container.register('__Index2Controller', Index2Controller)


container.compile();
module.exports = { container };
  
