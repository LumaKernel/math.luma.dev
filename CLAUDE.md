# Check

- `npm run typecheck` and `npm run lint-fix` to check types after you edit.

# General Style

- Must use `readonly` for almost everywhere.
  - `{ readonly foo: number }`
  - `readonly number[]`
- Never use `any`.
- Never use non-nullish assertion like `foo.bar!`

# Component Style

Quick template:

```tsx
export type FooProps = {
    readonly children?: React.ReactNode;
    // ...
};
export default function Foo({ ... }: FooProps) {
    // ...
}
```

- Must use function style
- Must use sparated props type, and exported.
- Must use destructive assignment on arguments.
- Separate components into single file.
  - Do not forget to add 'use client' if it uses client only features like `useState`.
