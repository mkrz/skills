const EM_DASH = String.fromCharCode(0x2014);

/** @type {import('markdownlint').Rule} */
export default {
  names: ['no-em-dash'],
  description:
    'No em dashes. Rewrite the sentence with a period, comma or colon.',
  tags: ['prose'],
  parser: 'none',
  function: (params, onError) => {
    params.lines.forEach((line, index) => {
      const column = line.indexOf(EM_DASH);
      if (column === -1) return;
      onError({
        lineNumber: index + 1,
        range: [column + 1, 1],
        context: line.trim(),
      });
    });
  },
};
