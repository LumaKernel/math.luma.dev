import type { FC } from 'react';

interface Props {
  'data-blogkit-code-highlight-lang'?: string;
  className?: string;
  children: React.ReactElement;
}

const ReferenceAnchor: FC<React.HTMLProps<HTMLAnchorElement>> = (props) => {
  return (
    <>
      <a {...props} />
      <style jsx>{`
        a {
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

const EverythingSpan: FC<Props> = ({ 'data-blogkit-code-highlight-lang': codeHlLang, ...rest }) => {
  const className = rest.className ?? '';
  if (codeHlLang === 'wolfram') {
    if (/\bconstant--builtin--builtin_symbol\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor
          {...rest}
          href={`https://reference.wolfram.com/language/ref/${rest.children}.html`}
          target="_blank"
        />
      );
    }
    if (/\bstring--special--char_name\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor
          {...rest}
          href={`https://reference.wolfram.com/language/ref/character/${rest.children}.html`}
          target="_blank"
        />
      );
    }
    if (/\btag--blank\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/Blank.html'} target="_blank" />
      );
    }
    if (/\bpunctuation--bracket--apply\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/Apply.html'} target="_blank" />
      );
    }
    if (/\bpunctuation--bracket--list\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/List.html'} target="_blank" />
      );
    }
    if (/\boperator--derivative\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor
          {...rest}
          href={'https://reference.wolfram.com/language/ref/Derivative.html'}
          target="_blank"
        />
      );
    }
    if (/\bnumber\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/Number.html'} target="_blank" />
      );
    }
    if (/\boperator--negative\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/Minus.html'} target="_blank" />
      );
    }
    if (/\boperator--per\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/Divide.html'} target="_blank" />
      );
    }
    if (/\boperator--plus\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/Plus.html'} target="_blank" />
      );
    }
    // if (/\bstring\b/.test(className ?? '')) {
    //   return (
    //     <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/String.html'} target="_blank" />
    //   );
    // }
    if (/\boperator--apply_at\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor
          {...rest}
          href={'https://reference.wolfram.com/language/ref/Prefix.html#793473401'}
          target="_blank"
        />
      );
    }
    if (/\boperator--minus\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/Subtract.html'} target="_blank" />
      );
    }
    if (/\boperator--times_ast\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/Times.html'} target="_blank" />
      );
    }
    if (/\boperator--rule_ascii\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/Rule.html'} target="_blank" />
      );
    }
    if (/\boperator--compound_expression\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor
          {...rest}
          href={'https://reference.wolfram.com/language/ref/CompoundExpression.html'}
          target="_blank"
        />
      );
    }
    if (/\boperator--set\b/.test(className ?? '')) {
      return <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/Set.html'} target="_blank" />;
    }
    if (/\boperator--set_delayed\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor
          {...rest}
          href={'https://reference.wolfram.com/language/ref/SetDelayed.html'}
          target="_blank"
        />
      );
    }
    if (/\bpunctuation--string\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor {...rest} href={'https://reference.wolfram.com/language/ref/String.html'} target="_blank" />
      );
    }
  }
  if (codeHlLang === 'python') {
    if (/\bfunction--builtin\b/.test(className ?? '')) {
      return (
        <ReferenceAnchor
          {...rest}
          href={`https://docs.python.org/3/library/functions.html#${rest.children}`}
          target="_blank"
        />
      );
    }
  }
  return <span {...rest} />;
};

export default EverythingSpan;
