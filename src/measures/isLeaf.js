module.exports = function (node) {
    return this.childNames.every(function (e) {
        return !node[e]
    })
}