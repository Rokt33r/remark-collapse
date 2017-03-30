const remark = require('remark')
const collapse = require('..')

const processor = remark()
  .use(collapse, {test: 'tango'})

test('tango should be collapsable', () => {
  const inputString = [
    '# Heading1',
    '',
    '## tango',
    '',
    'target content',
    '',
    '## Another heading2',
    ''
  ].join('\n')

  const resultString = processor.processSync(inputString).toString()

  const expectedString = [
    '# Heading1',
    '',
    '## tango',
    '',
    '<details><summary>Open tango</summary>',
    '',
    'target content',
    '',
    '</details>',
    '',
    '## Another heading2',
    ''
  ].join('\n')

  expect(resultString).toEqual(expectedString)
})

test('throw an error if options.test does not exist', () => {
  expect(() => {
    const invalidProcessor = remark()
      .use(collapse, {})
    invalidProcessor.processSync('# dummy')
  }).toThrow()
})
