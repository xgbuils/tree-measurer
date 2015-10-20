function MeasurerFactory(polyfill) {
    polyfill || (polyfill = {})
    this.defineProperty = Object.defineProperty || polyfill.defineProperty

    this.TreeMeasurer = function (options) {
        options || (options = {})
        this.childNames = options.childNames
        this.parentName = options.parentName
        this.dataName = options.dataName
        this.tree = options.tree
    }
}

function descendantTraverse(node, measure, options) {
    var self = this
    if (node && measure.length > 2) {
        var childrenMeasures = this.childNames.reduce(function (childrenMeasures, childName) {
            if (node.hasOwnProperty(childName)) {
                childrenMeasures[childName] = descendantTraverse.call(self, node[childName], measure, options)
            }
            return childrenMeasures
        }, {})
        return measure.call(this, node, options, childrenMeasures)
    } else {
        return measure.call(this, node, options)
    }
}

function ascendantTraverse(node, measure, options) {
    var self = this
    if (node && measure.length > 2) {
        var parentMeasure = ascendantTraverse.call(self, node[this.parentName], measure, options)
        return measure.call(this, node, options, parentMeasure)
    } else {
        return measure.call(this, node, options)
    }
}

function get(name, node, measure, options) {
    options || (options = {})
    if (options.asc) {
        if (this.parentName) {
            return ascendantTraverse.call(this, node, measure, options)
        } else {
            throw new Error(name + ' method needs that node has parentName property')
        }
    } else {
        return descendantTraverse.call(this, node, measure, options)
    }
}

MeasurerFactory.prototype.add = function (name, measure, cb) {
    this.defineProperty(this.TreeMeasurer.prototype, name, {
        value: function (node) {
            var options = typeof cb === 'function' ? cb(this.tree) : {}
            return get.call(this, name, node, measure, options)
        }
    })
}

MeasurerFactory.prototype.getTreeMeasurer = function () {
    return this.TreeMeasurer
}

module.exports = MeasurerFactory