const remark = require('remark')
const collapse = require('..')

test('tango should be collapsible', () => {
  const processor = remark()
    .use(collapse, {test: 'tango'})

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

test('summarizer can be overridden', () => {
  const processor = remark()
    .use(collapse, {
      test: 'tango',
      summary: (str) => 'Give yourself away!'
    })

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
    '<details><summary>Give yourself away!</summary>',
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

test('summarizer can be overridden by a string', () => {
  const processor = remark()
    .use(collapse, {
      test: 'tango',
      summary: 'Give yourself away!'
    })

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
    '<details><summary>Give yourself away!</summary>',
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

test('throw an error if options.summary is not a function', () => {
  expect(() => {
    const invalidProcessor = remark()
      .use(collapse, {
        test: 'dummy',
        summary: 1234 // Definetely neither a function nor a string
      })
    invalidProcessor.processSync('# dummy')
  }).toThrow()
})
