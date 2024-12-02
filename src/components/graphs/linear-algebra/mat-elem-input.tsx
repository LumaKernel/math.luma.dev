import { clampInAbs100Number } from '@blogkit/blog-components/src/lib/number';
import type { FC, FormEvent } from 'react';
import { cssColors } from '@blogkit/blog-components/src/lib/colors';

const Input: FC<any> = (props) => (
  <>
    <input {...props} />
    <style jsx>{`
      input {
        width: 4em;
        background-color: ${cssColors.bgPrimary};
        color: ${cssColors.text};
        border: none;
        border: 1px solid ${cssColors.decorationPrimary};
      }
    `}</style>
  </>
);

const emphasizedStyle = `
  border-width: 5px;
  border-style: solid;
`;

export interface Props {
  value: number;
  emphasis?: string;
  onInput?: (newValue: number) => void;
}
const MatElemInput: FC<Props> = ({ value, emphasis, onInput }) => {
  const inputHandler = (ev: FormEvent<HTMLInputElement>) => {
    const { value } = ev.target as any;
    onInput?.(clampInAbs100Number(value));
  };
  return (
    <>
      <div className={`wrapper ${emphasis ? 'emphasized' : ''}`} style={{ borderColor: emphasis }}>
        <Input type="number" value={value} onInput={(ev: FormEvent<HTMLInputElement>) => inputHandler(ev)} />
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .wrapper.emphasized {
          ${emphasizedStyle}
        }
      `}</style>
    </>
  );
};

export default MatElemInput;
