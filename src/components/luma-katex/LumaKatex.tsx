'use server';
import styleToObject from 'style-to-object';
import { Fragment, type FC } from 'react';
import {katexLumaRenderToString} from '@luma-dev/katex-luma';
import { MDXRemote } from "next-mdx-remote/rsc";
import {htmlToMdx} from '@/util/html-to-mdx';
import Debug from '../Debug';

export type DisplayMode = 'inline' | 'block-display' | 'inline-display';


//const InlineWrapper: FC<any> = (props) => (
//  <>
//    <span {...props} />
//    <style jsx>{`
//      span {
//        margin-left: 0.4em;
//        margin-right: 0.4em;
//      }
//      span :global(.base) {
//        margin-top: 0.6em;
//      }
//    `}</style>
//  </>
//);
//
//const DisplayWrapper: FC<any> = (props) => (
//  <>
//    <div {...props} />
//    <style jsx>{`
//      div {
//        margin-top: 2em;
//      }
//    `}</style>
//  </>
//);

type LumaKatexProps = {
    readonly mode: DisplayMode;

    readonly defContext: string;
    readonly content: string;
};

const LumaKatex = async ({ content }: LumaKatexProps) => {
  const html = katexLumaRenderToString(content, {throwOnError: false});
  //const mdx = await htmlToMdx({html: rendered});
  return <span dangerouslySetInnerHTML={{__html: html}} />;
  // const Tag = (params: any) => {
  //   switch(mode) {
  //     case 'inline':
  //       return <InlineWrapper {...params} />;
  //     case 'block-display':
  //       return <DisplayWrapper {...params} />;
  //     case 'inline-display':
  //       return <InlineWrapper {...params} />;
  //     default:
  //       const _a: never = mode;
  //   }
  // };
  //
  // return <Tag children={children} />;
};

export default LumaKatex;
