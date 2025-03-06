import printf from "printf";

export type CounterProps = {
  readonly w: string;
  readonly template: string;
  readonly start: number;
  readonly countJson: string;
};
export default function Counter({ countJson, start, template }: Props) {
  const count: number = JSON.parse(countJson);
  const c = start + count;
  const numStr = c.toString();
  const str = printf(template, numStr);
  return <span>{str}</span>;
}
