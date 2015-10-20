module.exports = function (node, options, childrenProjections) {
    if (node) {
        var projection = Object.keys(childrenProjections)
            .reduce(function (projection, childName) {
                projection[childName] = childrenProjections[childName]
                return projection 
            }, new node.constructor)
        projection[this.dataName] = node[this.dataName]
        return projection
    }
}