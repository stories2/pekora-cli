//@Autowired
class Index1Controller extends InvisibleController{
    constructor() {}

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

  //@frontline
  defaultNullFoo(req1, res2 = null) {
    console.log("asdf");
  }

  //@frontline
  defaultUndefinedFoo(req1, res2 = undefined) {
    console.log("asdf");
  }

  //@frontline
  defaultZeroFoo(req1, res2 = 0) {
    console.log("asdf");
  }
}

//@Autowired
class DummyController {
    constructor() {}
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

class InvisibleController {
    constructor() {}

  //@frontline
  selectFoo() {
    console.log("afsdaf");
  }

  selectBar() {
    console.log("fasfa");
  }
}

//@Autowired
class NoNamedController {

}//--boundary

module.exports = { Index1Controller };
