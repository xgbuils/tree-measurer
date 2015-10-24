# tree-measurer

A javascript tool to measure properties of trees for Node.js and browser with [browserify](http://browserify.org/).

This tool borns with the intention of enabling easier tests about tree structures. It supply a series of methods that measures properties of tree nodes.

## Installation

``` bash
$ npm install tree-measurer
```

## Usage

``` javascript
var TreeMeasurer = require('tree-measurer')

var treeSample = {
    data: 6,
    left: {
        data: 8,
        right: {
            data: 11
        }
    },
    right: {
        data: 1
    }
}

var measure = new TreeMeasurer({
    childNames: ['left', 'right'],
    parentName: 'parent',
    dataName: 'data'
})

measure.height(tree) // 2
measure.height(tree.right) // 0
measure.depth(tree.left) // 1
measure.depth(tree.right) // 1
measure.isLeaf(tree) // false
measure.isLeaf(tree.right) // true
measure.isLeaf(tree.left) // false
measure.data(tree.right) // 1
measure.projection(tree.left) /* {
    data: 8,
    right: {
        data: 11
    }
}*/
```

## [API Documentation](docs/api.md)

## TO DO

- Add support to use this tool in legacy browsers (Now =< IE9)

## Licence

MIT