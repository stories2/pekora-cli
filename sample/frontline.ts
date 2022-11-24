/* eslint-disable */
declare const container;
import { Index } from "./sample/dir1/index";
import { Index1Controller } from "./sample/dir2/index1";
import { DummyController } from "./sample/dir2/index1";
import { NoNamedController } from "./sample/dir2/index1";
import { Index2Controller } from "./sample/dir2/index2";
const createFoo = (req, res, next) => container.get('__Index').createFoo(req, res, next) as Index["createFoo"];
const updateFoo = (req) => container.get('__Index').updateFoo(req) as Index["updateFoo"];
const selectFoo = () => container.get('__Index').selectFoo() as Index["selectFoo"];
const deleteFoo = (req1, res2) => container.get('__Index').deleteFoo(req1, res2) as Index["deleteFoo"];
const selectFoo = () => container.get('__Index1Controller').selectFoo() as Index1Controller["selectFoo"];
const deleteFoo = (req1, res2) => container.get('__Index1Controller').deleteFoo(req1, res2) as Index1Controller["deleteFoo"];
const selectFoo = () => container.get('__DummyController').selectFoo() as DummyController["selectFoo"];
const deleteFoo = (req1, res2) => container.get('__DummyController').deleteFoo(req1, res2) as DummyController["deleteFoo"];
module.exports = {createFoo, updateFoo, selectFoo, deleteFoo, selectFoo, deleteFoo, selectFoo, deleteFoo};