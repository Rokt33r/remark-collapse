const heading = require('mdast-util-heading-range')
const toString = require('mdast-util-to-string')

function defaultSummarizer (str) {
  return 'Open ' + str
}

function isFunction (fn) {
  return typeof fn === 'function'
}

module.exports = function (opts) {
  if (opts == null || opts.test == null) throw new Error('options.test must be given')

  const summarizer = opts.summary != null
    ? opts.summary
    : defaultSummarizer

  if (!isFunction(summarizer)) throw new Error('options.summary must be function')

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
            value: summarizer(toString(start))
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
