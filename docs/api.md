## Before API documentation

In API Documentation will be used two functions in the code samples repeatedly that returns two tree structures:

``` javascript
function treeObject () {
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
    // add parent properties
    tree.left.parent = tree.right.parent = tree
    tree.right.left.parent = tree.right

    return tree
}

function treeArray () {
    var tree = [
        2,
        undefined,
        [3],
        [
            1,
            undefined,
            [0]
        ]
    ]
    // add parent properties
    tree[2][1] = tree[3][1] = tree
    tree[3][2][1] = tree[3]

    return tree
}
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

Array of strings that defines children names properties used to measure properties as node of tree like `height` and `projection` methods.

**Example:**
``` javascript
var TreeMeasurer = require('tree-measurer')
var tree1 = treeObject()
var tree2 = treeArray()

// defines 'left' and 'right' as children names properties.
var measure1 = new TreeMeasurer({
    childrenNames: ['left', 'right']
})
measure1.height(tree1.right) // 1
measure1.height(tree1.left) // 0

// defines '2' and '3' indexs as children names properties.
var measure2 = new TreeMeasurer({
    childNames: ['2', '3']
})
measure2.height(tree2) // 2
measure2.height(tree2[3][2]) // 0
```

##### options.parentName
- Type: String

String that defines parent name property used to measure `depth` of tree.

**Example:**
``` javascript
var TreeMeasurer = require('tree-measurer')
var tree1 = treeObject()
var tree2 = treeArray()

// defines 'parent' as parent name property.
var measure1 = new TreeMeasurer({
    childrenNames: ['left', 'right']
})
measure1.depth(tree1.right) // 1

// defines '1' as parent name property.
var measure2 = new TreeMeasurer({
    parentName: '1'
})
measure2.depth(tree2) // 0
```

##### options.dataName
- Type: String

String that defines data name property used to measure `data` or `projection` of tree node.

**Example:**
``` javascript
var TreeMeasurer = require('tree-measurer')
var tree1 = treeObject()
var tree2 = treeArray()

// defines 'data' as data name property.
var measure1 = new TreeMeasurer({
    dataName: 'data'
})
measure1.depth(tree1.right.left) // 0

// defines '0' as data name property.
var measure2 = new TreeMeasurer({
    dataName: '0'
})
measure2.data(tree2) // 2
```

<h3 id="height">.height (node)</h3>
- Type: Function
- Returns: Integer

It returns the height of tree `node`.

### .isLeaf(node) # {#anchor name}
- Type: Function
- Returns: Boolean

It returns if tree `node` is a leaf or not.

### .data(node)
- Type: Function
- Returns: Boolean

**Example:**
``` javascript
var TreeMeasurer = require('tree-measurer')
var tree = treeObject()

var measure = new TreeMeasurer({
    childNames: ['left', 'right'],
    parentName: 'parent',
    dataName: 'data'
})

measure.data(tree) // 2
measure.data(tree.left) // 3
```

It returns the data of tree `node`.

### .depth(node)
- Type: Function
- Returns: Boolean
- Throws an error when TreeMesurer constructor does not receive `options.parentName`

It returns the `depth` of tree node.

### .projection(node)
- Type: Function
- Returns: Tree

It returns a subtree with `node` as root that only has childs and data properties.

**Example:**
``` javascript
var TreeMeasurer = require('tree-measurer')

var measure = new TreeMeasurer({
    dataName: 'data',
    childNames: ['left', 'right'],
    parentName: 'parent'
})

var tree1 = treeObject()

measure1.projection(tree1.right) /* returns {
    data: 1
    left: {
        data: 0
    }
} (without parent fields)*/

measure2.projection(tree2) /* [
    2,
    undefined,
    [3],
    [
        1,
        undefined,
        [0]
    ]
] */
```