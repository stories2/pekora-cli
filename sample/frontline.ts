

/* eslint-disable */
declare const container;


import { Index } from "./sample/dir1/index.js"
import { Index1Controller, DummyController, NoNamedController } from "./sample/dir2/index1.js"
import { Index2Controller } from "./sample/dir2/index2.js"
import {  } from "./sample/test.js"

const createFoo = (req, res, next) => container.get(__Index).createFoo(req, res, next) as Index["createFoo"]
const updateFoo = (req) => container.get(__Index).updateFoo(req) as Index["updateFoo"]
const selectFoo = () => container.get(__Index).selectFoo() as Index["selectFoo"]
const deleteFoo = (req1, res2) => container.get(__Index).deleteFoo(req1, res2) as Index["deleteFoo"]
const selectFoo = () => container.get(__Index1Controller).selectFoo() as Index1Controller["selectFoo"]
const deleteFoo = (req1, res2) => container.get(__Index1Controller).deleteFoo(req1, res2) as Index1Controller["deleteFoo"]
const selectFoo = () => container.get(__DummyController).selectFoo() as DummyController["selectFoo"]
const deleteFoo = (req1, res2) => container.get(__DummyController).deleteFoo(req1, res2) as DummyController["deleteFoo"]


export {createFoo, updateFoo, selectFoo, deleteFoo, selectFoo, deleteFoo, selectFoo, deleteFoo};


