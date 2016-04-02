# sapui5 grunt powered template

## Process

1. Prepare `grunt`
   ```
   npm intall
   ```

2. Put your sapui5 library into `res/sapui5` or change set path in `package.json>/dirs.sapui5`

3. Now you can start development server
   ```
   grunt serve
   ```
   or explicitly
   ```
   grunt serve:dev
   ```

4. When you finish you can build `dbg` and `preload` files and produce `jsdoc`
   ```
   grunt build
   ```

5. Then you can test the distribution and check [jsdoc](http://localhost:8000/sampleapp/doc)
   ```
   grunt serve:dist
   ```

## Features

- [x] grunt task for producing component preload and dbg files
- [x] mvc module structure
- [x] jsdoc integration
- [ ] 

## TODOs

- [ ] plantuml grunt task
- [ ] integrate plantuml in jsdoc
- [ ] grunt task ro refactor `sampleapp` top-level namespace
- [ ] Check for [TDG Best Practices](https://openui5.hana.ondemand.com/#docs/guide/5ca68e6e62e6464a8103297fbc19cd9c.html)
- [ ] top module example
- [ ] mock data example
- [ ] custom control example
- [ ] `stub.lib.debug`
- [ ] less example
- [ ] `test-resources` integration
- [ ] grunt task for unit testing
- [ ] unit test example
- [ ] grunt task for OPA testing
- [ ] OPA test example
- [ ] integrate `openui5_preload` task for library preload generation
- [ ] grunt task around `regi.exe` for HANA upload
- [ ] insert copyright notice on `copy:process` task
- [ ] check & update patch around [grunt-openui5](https://github.com/krasnobaev/grunt-openui5/tarball/da4d0b123ecda852224d200a5d3112e4d0e42499)
- [ ] enable grunt linter jscs task with [custom codestyle](https://github.com/krasnobaev/codestyle/blob/bb262fcf47adb116681cc350ce9f0cac75fbffa6/ui5.json)
- [ ] add sapui5/openui5 version dev dependency
- [ ] check compatibility with openui5 library
- [ ] grunt task for netweaver upload
- [ ] i18n example
- [?] grunt deploy
- [?] bower integration

## Notes

Do not forget to uncomment `# build` in `.gitignore`

## Links

Inspired with [Building your SAP UI5 Application using Grunt](http://scn.sap.com/people/sathishkv/blog/2014/09/04/building-your-sap-ui5-application-using-grunt)

[grunt-openui5](https://www.npmjs.com/package/grunt-openui5)

### Similar projects

[Yeoman generator for SAP OpenUI5](https://github.com/saschakiefer/generator-openui5)
