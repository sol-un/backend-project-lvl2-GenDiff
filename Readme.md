[![Test Coverage](https://api.codeclimate.com/v1/badges/615aa62d7fac4ecfdbc0/test_coverage)](https://codeclimate.com/github/sol-un/backend-project-lvl2/test_coverage)

https://github.com/sol-un/backend-project-lvl2/workflows/NodeCI/badge.svg

## The Gendiff Project

#### Description

_Gendiff_  is a CLI utility that accepts two configuration files in _json_, _yml_, or _ini_  format and shows changes between them. The output can be formatted in either visual or verbose style, as well as converted to _json_ for interfacing with other applications.

#### Installation

`npm install -g backend-project-lvl2`

#### Usage
```
gendiff [options] <filepath1> <filepath2> [format]

Options:
  -V, --version        output the version number
  -f, --format [type]  output format: stylish, plain, or json (default: "stylish")
  -h, --help           output usage information
