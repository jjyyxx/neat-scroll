# CHANGELOG
All notable changes to this project will be documented in this file.

## 2.0.0

### Features:

  - Add support for global scroll config via `NeatScroll.config`
  - Add `index.d.ts` for better typing and typescript integration
  - Use `eslint` for code style check

### Breaking changes:

  - The core is rewritten in ES6 class style. Instead of calling the required module as a function, you **have to** treat it as a class and call it with `new` now. To fix it, simply add `new` before existing calls to the module.

## 1.0.0 (2018-07-30)

Initial version of neat-scroll
