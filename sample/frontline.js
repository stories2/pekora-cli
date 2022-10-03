/* eslint-disable */
const createFoo = (req, res, next) => container.get('__Index').createFoo(req, res, next);
const updateFoo = (req) => container.get('__Index').updateFoo(req);
const selectFoo = () => container.get('__Index').selectFoo();
const deleteFoo = (req1, res2) => container.get('__Index').deleteFoo(req1, res2);
const selectFoo = () => container.get('__Index1Controller').selectFoo();
const deleteFoo = (req1, res2) => container.get('__Index1Controller').deleteFoo(req1, res2);
const selectFoo = () => container.get('__DummyController').selectFoo();
const deleteFoo = (req1, res2) => container.get('__DummyController').deleteFoo(req1, res2);
module.exports = {createFoo, updateFoo, selectFoo, deleteFoo, selectFoo, deleteFoo, selectFoo, deleteFoo};