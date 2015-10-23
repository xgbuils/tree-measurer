module.exports = function (node, options, childrenProjections) {
    if (node) {
        var projection = Object.keys(childrenProjections)
            .reduce(function (projection, childName) {
                projection[childName] = childrenProjections[childName]
                return projection 
            }, new node.constructor)
        projection[this.dataName] = node[this.dataName]
        if (projection instanceof Array) {
            var n = projection.length - 1
            for ( ; n >= 0; --n) {
                if (projection[n] === undefined) {
                    projection[n] = undefined;
                }
            }
        }
        return projection
    }
}