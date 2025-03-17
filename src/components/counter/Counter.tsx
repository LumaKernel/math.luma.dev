import printf from "printf";

export type CounterProps = {
  readonly template: string;
  readonly start: number;
  readonly index: number;
  readonly total: number;
};
export default function Counter({ start, index, template }: CounterProps) {
  const c = start + index;
  const numStr = c.toString();
  const str = printf(template, numStr);
  return <span>{str}</span>;
}
