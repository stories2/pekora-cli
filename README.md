# pekora-cli

I want to go home faster

## What the hell is this?

Auto generate di container and frontline mapping source based on [this module](https://www.npmjs.com/package/node-dependency-injection)

This is first version of program. So, there will be many bugs.

## Install

```
npm i --save-dev pekora-cli
# or
npm i -g pekora-cli
```

## How to use?

```
                 _                                            _   _
  _ __     ___  | | __   ___    _ __    __ _            ___  | | (_)
 | '_ \   / _ \ | |/ /  / _ \  | '__|  / _` |  _____   / __| | | | |
 | |_) | |  __/ |   <  | (_) | | |    | (_| | |_____| | (__  | | | |
 | .__/   \___| |_|\_\  \___/  |_|     \__,_|          \___| |_| |_|
 |_|
Usage: peko [options]

CLI for auto generate di.container.js and frontline.js

---Example---

- Generate di.container.js and frontline.js
peko -od ./sample/di.container.js -of ./sample/frontline.js -s ./sample/**/*.js ./sample/test.js

Options:
  -V, --version                     output the version number
  -od, --output-di <string>         Output path of di container (overwrite). ex) /path/to/filename.js
  -of, --output-frontline <string>  Output path of frontline (overwrite). ex) /path/to/filename.js
  -s, --source <strings...>         Directory of source. You can use wild card and mulitiple paths ex) /path/**/*.js /other/path/*.js
  -h, --help                        display help for command
```

## In your source should be...

```
//@Autowired        <-- Should mark autowired annotation so that generate in di.container.js
class Foo {
   /**
   * @param {Index1Controller} index1Controller         <-- Should write params so that binding dependency in di.container.js
   * @param {Index2Controller} index2Controller
   */
   constructor(index1Controller, index2Controller) {
        this.index1Controller = index1Controller;
        this.index2Controller = index2Controller;
   }

   //@frontline             <-- Should mark frontline annotation so that generate in frontline.js
   bar(a, b, c) {

   }
}
```
