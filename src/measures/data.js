module.exports = function (node) {
    if (node) {
        return node[this.dataName]
    }
}