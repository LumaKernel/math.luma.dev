const darkColors = `
  --color-code-bg: #101010;
  --color-code-default: #eeeeee;
  --color-keyword: #724dff;
  --color-function: #ff4382;
  --color-type: #ff8600;
  --color-operator: #eeeeee;
  --color-punctuation: #eeeeee;
  --color-variable: #bae7f2;
  --color-constant: #318f05;
  --color-string: #959507;
  --color-escape: #44d300;

  --color-comment: #a7a7a7;
  --color-comment--document: #0034d3;
  --color-property: #d913b4;
  --color-attribute: #d913b4;
  --color-constructor: #8888cc;
  --color-number: #cc4444;
  --color-tag: #ebffa3;

  --color-text: #eeeeee;
  --color-deco-pri: #eeeeee;
  --color-deco-sec: #666666;
  --color-rev-text: #222222;
  --color-em1: #40eaed;
  --color-em2: #ec9dd1;
  --color-em3: #eda840;
  --color-em4: #40ed90;
  --color-em1-dim: #30aaad;
  --color-em2-dim: #ac6d91;
  --color-em3-dim: #ad6810;
  --color-em4-dim: #30ad60;
  --color-bg-pri: #222222;
  --color-bg-rev-pri: #dddddd;
  --color-bg-comment: #aaaaaa;
  --color-bg-em1: #30aaad;
  --color-bg-input: #111;
  --color-brand-wikipedia: #ffffff;
  --color-brand-eom: #ffcd18;
  --color-skeleton-pri: #444444;
`;

const GlobalStyle = () => {
  return (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Inconsolata&family=Noto+Sans+JP&family=Roboto&display=swap");

      html {
        padding: 0;
        margin: 0;
      }

      body {
        font-family: "Noto Sans JP", "Roboto", sans-serif;
        font-weight: 400;
        padding: 0;
        margin: 0;
      }

      [data-color="em1"] {
        color: var(--color-em1);
      }

      [data-color="em2"] {
        color: var(--color-em2);
      }

      [data-color="em3"] {
        color: var(--color-em3);
      }

      [data-bd-color="decoration-primary"] {
        border-color: var(--color-deco-pri);
      }

      body {
        color: var(--color-text);
      }

      div,
      main,
      section,
      a,
      p,
      ul,
      ol,
      li,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      span {
        color: inherit;
      }

      text {
        fill: var(--color-text);
      }

      p {
        line-height: 1.2em;
      }

      li {
        line-height: 1.3em;
      }

      table {
        border-top: 0.6px solid var(--color-deco-sec);
      }

      th {
        padding: 0.3rem 0rem;
        border-bottom: 4px solid var(--color-deco-sec);
      }
      th:not(:last-child) {
        border-right: 0.6px solid var(--color-deco-sec);
      }

      td {
        padding: 0.4rem 0.6rem;
        border-bottom: 0.6px solid var(--color-deco-sec);
      }
      td:not(:last-child) {
        border-right: 0.6px solid var(--color-deco-sec);
      }

      .root {
        --color-code-bg: #efefef;
        --color-code-default: #000000;
        --color-keyword: #320de7;
        --color-function: #a90848;
        --color-type: #ff8600;
        --color-operator: #000000;
        --color-punctuation: #000000;
        --color-variable: #000000;
        --color-constant: #318f05;
        --color-string: #959507;
        --color-escape: #44d300;

        --color-comment: #a7a7a7;
        --color-comment--document: #0034d3;
        --color-property: #d913b4;
        --color-attribute: #d913b4;
        --color-constructor: #8888cc;
        --color-number: #cc4444;
        --color-tag: #8888cc;

        --color-text: #222222;
        --color-deco-pri: #222222;
        --color-deco-sec: #8f8f8f;
        --color-rev-text: #ffffff;
        --color-em1: #10adaf;
        --color-em2: #cd2896;
        --color-em3: #dc8b14;
        --color-em4: #10ad50;
        --color-em1-dim: #026d6f;
        --color-em2-dim: #ac6d91;
        --color-em3-dim: #ad6810;
        --color-em4-dim: #006d30;
        --color-bg-pri: #ffffff;
        --color-bg-rev-pri: #dddddd;
        --color-bg-comment: #aaaaaa;
        --color-bg-em1: #d0f0f0;
        --color-bg-input: #e0e0e0;
        --color-brand-wikipedia: #000000;
        --color-brand-eom: #ffcd18;
        --color-skeleton-pri: #e0e0e0;
      }

      .root {
        color: var(--color-text);
        background-color: var(--color-rev-text);
      }

      @media (prefers-color-scheme: dark) {
        .root:not(.light) {
          ${darkColors}
        }
      }

      .root.dark {
        ${darkColors}
      }

      .sk-top-container {
        background-color: var(--color-bg-pri) !important;
      }
      .sk-toggleable__content,
      .sk-toggleable__content pre {
        background-color: var(--color-bg-pri) !important;
        color: var(--color-text) !important;
      }
      .sk-toggleable__label.sk-toggleable__label-arrow {
        background-color: var(--color-em1) !important;
        color: var(--color-rev-text) !important;
      }
    `}</style>
  );
};

export default GlobalStyle;
