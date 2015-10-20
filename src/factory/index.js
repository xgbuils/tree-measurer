var MeasurerFactory = require('./measurer-factory')

module.exports = function (polyfill) {
    var mf = new MeasurerFactory(polyfill)

    mf.add('height', require('../measures/height'))
    mf.add('data', require('../measures/data'))
    mf.add('depth', require('../measures/depth'), function (tree) {
        return {
            root: tree,
            asc: true
        }
    })
    mf.add('isLeaf', require('../measures/isLeaf'))
    mf.add('projection', require('../measures/projection'))

    return mf.getTreeMeasurer()
}