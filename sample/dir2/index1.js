//@Autowired
class Index1Controller {
    constructor()

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

//@Autowired
class DummyController {
    constructor()
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
    constructor()

  //@frontline
  selectFoo() {
    console.log("afsdaf");
  }

  selectBar() {
    console.log("fasfa");
  }
}

module.exports = { Index1Controller };
