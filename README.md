# tree-measurer

A javascript tool to measure properties of trees for Node.js and browser with [browserify](http://browserify.org/).

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

## API

### constructor (options)

It creates a new instance of `TreeMeasurer` based on its parameters.

#### options
- Type: Object
- Default: {}

A set of properties configuring structure of tree to measure.

##### options.childNames
- Type: Array
- Default: []

Array of strings that means the names of childs.

**Example:**
``` javascript
var TreeMeasurer = require('tree-measurer')

// measures properties of tree nodes based on object where 'left' and 'right' properties are the child of each node.
var measure1 = new TreeMeasurer({
    childNames: ['left', 'right']
})

var treeObject = {
    data: 2,
    left: {
        data: 3
    },
    right: {
        data: 1
        left: {
            data: 0
        }
    }
}

measure1.isLeaf(treeObject.right) // false

// measures properties of tree nodes based on array where 1 and 2 indexs are the childs of each node.

var measure2 = new TreeMeasurer({
    childNames: ['1', '2']
})

var treeArray = [
    2,
    [3],
    [
        1,
        [0]
    ]
]

measure2.isLeaf(treeArray[2]) // false
```

##### options.parentName
- Type: String

String means the name property (or index) that represents the parent node.

##### options.dataName
- Type: String

### .height(node)
- Type: Function
- Returns: Integer

It returns the height of `node`.

### .isLeaf(node)
- Type: Function
- Returns: Boolean

It returns if `node` is a leaf or not.

### .depth(node)
- Type: Function
- Returns: Boolean

It returns the `depth` of node in tree.

### .projection(node)
- Type: Function
- Returns: Tree

It returns a subtree with `node` as root and only has childs and data properties.

**Example:**
```
var TreeMeasurer = require('tree-measurer')

var measure = new TreeMeasurer({
    dataName: 'data',
    childNames: ['left', 'right'],
    parentName: 'parent'
})

var tree = {
    data: 2,
    left: {
        data: 3
    },
    right: {
        data: 1
        left: {
            data: 0
        }
    }
}
// add parent fields in tree
tree.right.parent = tree.left.parent = tree
tree.right.left.parent = tree.right

measure.projection(tree.right) /* returns {
    data: 1
    left: {
        data: 0
    }
} (without parent fields)*/

## Licence

MIT