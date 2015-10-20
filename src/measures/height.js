module.exports = function (node, options, childrenHeights) {
    if (node) {
        var heights = this.childNames.map(function (childName) {
            var height = childrenHeights[childName]
            return height === undefined ? -1 : height
        })
        return 1 + Math.max.apply(null, heights)
    } else {
        return 0
    }
}