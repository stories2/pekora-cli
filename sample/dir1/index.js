//@Autowired
class Index {
  /**
   * @param {Index1Controller} index1Controller
   * @param {Index2Controller} index2Controller
   */
  constructor(index1Controller, index2Controller) {
    this.index1Controller = index1Controller;
    this.index2Controller = index2Controller;
  }

  //@frontline
  createFoo(req, res, next) {
    console.log("asdf");
  }

  createBar(req, res, next) {
    console.log("fadsf");
  }

  //@frontline
  updateFoo(req) {
    console.log("afaf");
  }

  updateBar(req) {
    console.log("ASdf");
  }

  //@frontline
  selectFoo() {
    console.log("afsdaf");
  }

  selectBar() {
    console.log("fasfa");
  }

  //@frontline
  deleteFoo(req1, res2) {
    console.log("asdf");
  }

  deleteFoo(req1, res2) {
    console.log("asdfsad");
  }
}

module.exports = { Index };
