import parseCodeClass from '../parse-code-class.ts';

describe('parseCodeClass', () => {
  it('parse code class', () => {
    expect(parseCodeClass()).toEqual({
      language: null,
      file: null,
    });
    expect(parseCodeClass('language-js')).toEqual({
      language: 'js',
      file: null,
    });
    expect(parseCodeClass('language-js:a.js')).toEqual({
      language: 'js',
      file: {
        root: '',
        path: 'a.js',
        dir: '',
        base: 'a.js',
        ext: '.js',
        name: 'a',
      },
    });
  });
});
