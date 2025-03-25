import React from "react";
import { cssColorProperties, cssColors } from "@/lib/colors.ts";
import { cssFonts } from "@/lib/fonts.ts";

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

  ${cssColorProperties.text}: #eeeeee;
  ${cssColorProperties.decorationPrimary}: #eeeeee;
  ${cssColorProperties.decorationSecondary}: #666666;
  ${cssColorProperties.border}: #eeeeee;
  ${cssColorProperties.revertedText}: #222222;
  ${cssColorProperties.em1}: #40eaed;
  ${cssColorProperties.em2}: #ec9dd1;
  ${cssColorProperties.em3}: #eda840;
  ${cssColorProperties.em1Dim}: #30aaad;
  ${cssColorProperties.em2Dim}: #ac6d91;
  ${cssColorProperties.em3Dim}: #ad6810;
  ${cssColorProperties.bgPrimary}: #222222;
  ${cssColorProperties.bgRevPrimary}: #dddddd;
  ${cssColorProperties.bgComment}: #aaaaaa;
  ${cssColorProperties.brandWikipedia}: #ffffff;
  ${cssColorProperties.brandEncyclopediaOfMath}: #ffcd18;
`;

const GlobalStyle = () => {
  return (
    <style jsx global>
      {`
      @import url("https://fonts.googleapis.com/css2?family=Inconsolata&family=Noto+Sans+JP&family=Roboto&display=swap");

      html {
        padding: 0;
        margin: 0;
      }

      body {
        font-family: ${cssFonts.sansSelf};
        font-weight: 400;
        padding: 0;
        margin: 0;
      }

      [data-color="em1"] {
        color: ${cssColors.em1};
      }

      [data-color="em2"] {
        color: ${cssColors.em2};
      }

      [data-color="em3"] {
        color: ${cssColors.em3};
      }

      [data-bd-color="decoration-primary"] {
        border-color: ${cssColors.decorationPrimary};
      }

      body {
        color: ${cssColors.text};
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
        fill: ${cssColors.text};
      }

      p {
        line-height: 1.2em;
      }

      li {
        line-height: 1.3em;
      }

      table {
        border-top: 0.6px solid ${cssColors.decorationSecondary};
      }

      th {
        padding: 0.3rem 0rem;
        border-bottom: 4px solid ${cssColors.decorationSecondary};
      }
      th:not(:last-child) {
        border-right: 0.6px solid ${cssColors.decorationSecondary};
      }

      td {
        padding: 0.4rem 0.6rem;
        border-bottom: 0.6px solid ${cssColors.decorationSecondary};
      }
      td:not(:last-child) {
        border-right: 0.6px solid ${cssColors.decorationSecondary};
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

        ${cssColorProperties.text}: #222222;
        ${cssColorProperties.decorationPrimary}: #222222;
        ${cssColorProperties.decorationSecondary}: #8f8f8f;
        ${cssColorProperties.border}: #222222;
        ${cssColorProperties.revertedText}: #ffffff;
        ${cssColorProperties.em1}: #10adaf;
        ${cssColorProperties.em2}: #cd2896;
        ${cssColorProperties.em3}: #dc8b14;
        ${cssColorProperties.em1Dim}: #026d6f;
        ${cssColorProperties.em2Dim}: #ac6d91;
        ${cssColorProperties.em3Dim}: #ad6810;
        ${cssColorProperties.bgPrimary}: #ffffff;
        ${cssColorProperties.bgRevPrimary}: #dddddd;
        ${cssColorProperties.bgComment}: #aaaaaa;
        ${cssColorProperties.brandWikipedia}: #000000;
        ${cssColorProperties.brandEncyclopediaOfMath}: #ffcd18;
      }

      .root {
        color: ${cssColors.text};
        background-color: ${cssColors.revertedText};
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
        background-color: var(${cssColorProperties.bgPrimary}) !important;
      }
      .sk-toggleable__content,
      .sk-toggleable__content pre {
        background-color: var(${cssColorProperties.bgPrimary}) !important;
        color: var(${cssColorProperties.text}) !important;
      }
      .sk-toggleable__label.sk-toggleable__label-arrow {
        background-color: var(${cssColorProperties.em1}) !important;
        color: var(${cssColorProperties.revertedText}) !important;
      }
    `}
    </style>
  );
};

export default GlobalStyle;
