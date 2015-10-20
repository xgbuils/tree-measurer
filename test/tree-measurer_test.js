var TreeMeasurer = require('../')
var chai = require('chai')
var expect = chai.expect

var trees = treeSamples()
var treeArray = trees.treeArray
var treeObject = trees.treeObject
var treeWithParent = trees.treeWithParent

describe('TreeMeasurer()', function() {
    it('creates an instance of TreeMeasurer', function() {
        var tm = new TreeMeasurer()
        expect(tm).to.be.an.instanceOf(TreeMeasurer)
    })

    it('creates an instance of TreeMeasurer that measures a tree based on object', function() {
        var tm = new TreeMeasurer({
            childNames: ['left', 'right'],
            tree: treeObject
        })

        expect(tm.height(treeObject)).to.be.equal(3)
    })

    it('creates an instance of TreeMeasurer that measures a tree based on array', function() {
        var tm = new TreeMeasurer({
            childNames: ['1', '2'],
            tree: treeArray
        })

        expect(tm.height(treeArray[1])).to.be.equal(1)
    })
})

describe('.height()', function() {
    var tm

    beforeEach(function () {
        tm = new TreeMeasurer({
            childNames: ['left', 'right'],
            tree: treeObject
        })
    })

    it('measures height of tree node', function () {
        expect(tm.height(treeObject.right)).to.be.equal(2)
    })
})

describe('.isLeaf()', function() {
    var tm

    beforeEach(function () {
        tm = new TreeMeasurer({
            childNames: ['1', '2'],
            tree: treeArray
        })
    })

    it('returns false if node is not a leaf', function () {
        expect(tm.isLeaf(treeArray[2][1])).to.be.equal(false)
    })

    it('returns true if node is a leaf', function () {
        expect(tm.isLeaf(treeArray[2][2])).to.be.equal(true)
    })
})

describe('.data()', function() {
	var tm

    it('returns data of node', function () {
        tm = new TreeMeasurer({
            childNames: ['1', '2'],
            dataName: '0',
            tree: treeArray
        })
        expect(tm.data(treeArray[2][1])).to.be.equal(11)
    })

    it('returns undefined if is not a tree node', function () {
        tm = new TreeMeasurer({
            childNames: ['left', 'right'],
            dataName: 'data',
            tree: treeObject
        })
        expect(tm.data(treeObject.left.right)).to.be.equal(undefined)
    })
})

/*var util = require('util');

console.debug = function (obj) {
    console.log(util.inspect(obj, {showHidden: false, depth: null}));
}*/

describe('.projection()', function() {
    describe('if node have just data and child properties', function () {
        context ('array tree', function () {
            it('returns clone of node subtree', function () {
                var tm = new TreeMeasurer({
                    childNames: ['1', '2'],
                    dataName: '0',
                    tree: treeArray
                })
                var projection = tm.projection(treeArray)
                expect(projection).to.be.deep.equal(treeArray)
                expect(projection).not.to.be.equal(treeArray)
            })
        })

        context ('object tree', function () {
            it('returns clone of node subtree', function () {
                var tm = new TreeMeasurer({
                    childNames: ['left', 'right'],
                    dataName: 'data',
                    tree: treeObject
                })
                var projection = tm.projection(treeObject)
                expect(projection).to.be.deep.equal(treeObject)
                expect(projection).not.to.be.equal(treeObject)
            })
        })

        context ('tree with parent pointers', function () {
            it('filters parent pointers of node subtree', function () {
                var tm = new TreeMeasurer({
                    childNames: ['left', 'right'],
                    parentName: 'parent',
                    dataName: 'data',
                    tree: treeWithParent
                })
                var projection = tm.projection(treeWithParent)
                expect(projection).to.be.deep.equal(treeObject)
                expect(projection).not.to.be.equal(treeWithParent)
            })
        })
    })
})

describe('.depth()', function() {
    context('tree measurer has parentName property', function () {
    	var tm
        beforeEach(function () {
            tm = new TreeMeasurer({
                parentName: 'parent',
                childNames: ['left', 'right'],
                dataName: 'data',
                tree: treeWithParent
            })
        })

        it('returns depth of node', function () {
            expect(tm.depth(treeWithParent.right)).to.be.equal(1)
        })

        it('returns undefined if is not a tree node', function () {
            expect(tm.depth(treeWithParent.left.left)).to.be.equal(2)
        })
    })

    context('tree measurer does not have parentName property', function () {
    	beforeEach(function () {
            tm = new TreeMeasurer({
                childNames: ['left', 'right'],
                dataName: 'data',
                tree: treeWithParent
            })
        })

    	it('throws an exception', function () {
            expect(function () {
            	tm.depth(treeWithParent.left.left)
            }).to.Throw()
        })
    })
})

function treeSamples() {
    var trees = {
        treeObject: {
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
        },
        treeArray: [
            5, [
                1, [
                    8
                ]
            ], [
                2, [
                    11,
                    undefined, [
                        6
                    ]
                ], [
                    23
                ]

            ]
        ]
    }

    function cloneSimpleTree (tree) {
        var tm = new TreeMeasurer({
            childNames: ['left', 'right'],
            dataName: 'data',
            tree: tree
        })

        return tm.projection(tree)
    }
    
    var treeWithParent = trees.treeWithParent = cloneSimpleTree(trees.treeObject)
    treeWithParent.right.parent = treeWithParent.left.parent = treeWithParent
    treeWithParent.left.left.parent = treeWithParent.left
    treeWithParent.right.left.parent = treeWithParent.right.right.parent = treeWithParent.right
    treeWithParent.right.left.right.parent = treeWithParent.right.left

    return trees
}
