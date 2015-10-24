var TreeMeasurer = require('../')
var chai = require('chai')
var expect = chai.expect

describe('TreeMeasurer()', function() {
    it('creates an instance of TreeMeasurer', function() {
        var measure = new TreeMeasurer()
        expect(measure).to.be.an.instanceOf(TreeMeasurer)
    })

    it('creates an instance of TreeMeasurer that measures a tree based on object', function() {
        var measure = new TreeMeasurer({
            childNames: ['left', 'right'],
        })

        var tree = simpleTreeObject()
        expect(measure.height(tree)).to.be.equal(3)
    })

    it('creates an instance of TreeMeasurer that measures a tree based on array', function() {
        var measure = new TreeMeasurer({
            childNames: ['1', '2'],
        })

        var tree = simpleTreeArray()
        expect(measure.height(tree[1])).to.be.equal(1)
    })
})

describe('.height()', function () {
    it('measures height of tree node', function () {
        var measure = new TreeMeasurer({
            childNames: ['left', 'right'],
        })
        var tree = simpleTreeObject()

        expect(measure.height(tree.right)).to.be.equal(2)
    })

    it('heights of the same tree with or without parents are equal', function () {
        var simpleMeasure = new TreeMeasurer({
            childNames: ['1', '2'],
        })
        var parentMeasure = new TreeMeasurer({
            childNames: ['2', '3'],
            parentName: '1'
        })
        var simpleTree = simpleTreeArray()
        var withParents = treeArrayWithParents()

        expect(simpleMeasure.height(simpleTree)).to.be.equal(3)
        expect(parentMeasure.height(withParents)).to.be.equal(3)
    })
})

describe('.isLeaf()', function () {
    
    context('using tree array', function () {
        var measure = new TreeMeasurer({
            childNames: ['1', '2']
        })
        var tree = simpleTreeArray()


        it('returns false if node is not a leaf', function () {
            expect(measure.isLeaf(tree[2][1])).to.be.equal(false)
        })

        it('returns true if node is a leaf', function () {
            expect(measure.isLeaf(tree[2][2])).to.be.equal(true)
        })
    })

    context('using tree arrays with and without parent name', function () {
        var simpleMeasure = new TreeMeasurer({
            childNames: ['1', '2']
        })
        var parentMeasure = new TreeMeasurer({
            childNames: ['2', '3'],
            parentName: '1'
        })
        var simpleTree = simpleTreeArray()
        var withParents = treeArrayWithParents()

        it('returns the same results in nodes with and without parents', function () {
            expect(simpleMeasure.isLeaf(simpleTree[2])).to.be.equal(false)
            expect(parentMeasure.isLeaf(withParents[3])).to.be.equal(false)
        })
    })
})

describe('.data()', function() {
    it('returns data of node', function () {
        var measure = new TreeMeasurer({
            childNames: ['1', '2'],
            dataName: '0',
        })
        var tree = simpleTreeArray()

        expect(measure.data(tree[2][1])).to.be.equal(11)
    })

    it('returns undefined if is not a tree node', function () {
        var measure = new TreeMeasurer({
            childNames: ['left', 'right'],
            dataName: 'data',
        })
        var tree = treeObjectWithParents()

        expect(measure.data(tree.left.right)).to.be.equal(undefined)
    })
})

describe('.projection()', function() {
    describe('if node have just data and child properties', function () {
        context ('array tree nodes without parent property', function () {
            it('returns clone of node subtree', function () {
                var measure = new TreeMeasurer({
                    childNames: ['1', '2'],
                    dataName: '0'
                })
                var tree = simpleTreeArray()

                var projection = measure.projection(tree)
                expect(projection).to.be.deep.equal(tree)
                expect(projection).not.to.be.equal(tree)
            })
        })

        context ('object tree nodes without parent property', function () {
            it('returns clone of node subtree', function () {
                var measure = new TreeMeasurer({
                    childNames: ['left', 'right'],
                    dataName: 'data'
                })
                var tree = simpleTreeObject()

                var projection = measure.projection(tree.left)
                expect(projection).to.be.deep.equal(tree.left)
                expect(projection).not.to.be.equal(tree.left)
            })
        })

        context ('array tree nodes with parent properties', function () {
            it('filters parent property of node subtree', function () {
                var measure = new TreeMeasurer({
                    childNames: ['2', '3'],
                    parentName: '1',
                    dataName: '0',
                })
                var tree = treeArrayWithParents()

                var projection = measure.projection(tree[3])
                expect(projection).to.be.deep.equal(treeArrayWithoutParents()[3])
                expect(projection).not.to.be.equal(tree[3])
            })
        })

        context ('object tree nodes with parent properties', function () {
            it('filters parent propertie of node subtree', function () {
                var measure = new TreeMeasurer({
                    childNames: ['left', 'right'],
                    parentName: 'parent',
                    dataName: 'data',
                })
                var tree = treeObjectWithParents()

                var projection = measure.projection(tree)
                expect(projection).to.be.deep.equal(simpleTreeObject())
                expect(projection).not.to.be.equal(tree)
            })
        })
    })
})

describe('.depth()', function() {
    context('tree measurer has parentName property', function () {
        var measure
        beforeEach(function () {
            measure = new TreeMeasurer({
                parentName: 'parent',
                childNames: ['left', 'right'],
                dataName: 'data',
            })
        })
        var tree = treeObjectWithParents()

        it('returns depth of node', function () {
            expect(measure.depth(tree.right)).to.be.equal(1)
        })

        it('returns undefined if is not a tree node', function () {
            expect(measure.depth(tree.left.left)).to.be.equal(2)
        })
    })

    context('tree measurer does not have parentName property', function () {
        var measure
        var tree
        beforeEach(function () {
            measure = new TreeMeasurer({
                childNames: ['left', 'right'],
                dataName: 'data',
            })

            tree = simpleTreeObject()
        })


        it('throws an exception', function () {
            expect(function () {
                measure.depth(tree.left.left)
            }).to.Throw()
        })
    })
})

var util = require('util')

console.debug = function (obj) {
    console.log(util.inspect(obj, false, null));
}

function simpleTreeObject () {
    return {
        data: 5,
        left: {
            data: 1,
            left: {
                data: 8
            },
        },
        right: {
            data: 2,
            left: {
                data: 11,
                right: {
                    data: 6
                }
            },
            right: {
                data: 23
            }
        }
    }
}

function simpleTreeArray() {
    return [
        5, 
        [
            1,
            [8]
        ], 
        [
            2, 
            [
                11,
                undefined, 
                [6]
            ], 
            [23]

        ]
    ]
}

function treeObjectWithParents () {
    var tree = simpleTreeObject()
    tree.left.parent = tree.right.parent = tree
    tree.left.left.parent = tree.left
    tree.right.left.parent = tree.right.right.parent = tree.right
    tree.right.left.right.parent = tree.right.left

    return tree
}

function treeArrayWithoutParents () {
    var tree = simpleTreeArray()

    tree.splice(1, 0, undefined)
    tree[2].splice(1, 0, undefined)
    tree[3].splice(1, 0, undefined)
    tree[2][2].splice(1, 0, undefined)
    tree[3][2].splice(1, 0, undefined)

    return tree
}

function treeArrayWithParents () {
    var tree = treeArrayWithoutParents()

    tree[2][1] = tree[3][1] = tree
    tree[2][2][1] = tree[3][2][1] = tree[2]
    tree[3][3][1] = tree[3]
    tree[3][2][3][1] = tree[3][2]

    return tree
}