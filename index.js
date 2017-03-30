const heading = require('mdast-util-heading-range')
const toString = require('mdast-util-to-string')

module.exports = function (opts) {
  if (opts == null || opts.test == null) throw new Error('options.test must be given')

  return function (node) {
    heading(node, opts.test, function (start, nodes, end) {
      let result = []

      start == null || result.push(start)

      result.push({
        type: 'paragraph',
        children: [
          {
            type: 'html',
            value: '<details>'
          },
          {
            type: 'html',
            value: '<summary>'
          },
          {
            type: 'text',
            value: 'Open ' + toString(start)
          },
          {
            type: 'html',
            value: '</summary>'
          }
        ]
      })

      result = result.concat(nodes)

      result.push({
        type: 'paragraph',
        children: [
          {
            type: 'html',
            value: '</details>'
          }
        ]
      })

      end == null || result.push(end)

      return result
    })
  }
}
