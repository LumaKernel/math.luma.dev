"use client";

type PreForCodeProps = React.ComponentProps<"pre">;

export default function PreForCode(props: PreForCodeProps) {
  return (
    <>
      <pre {...props} />
      <style jsx>{`
        pre :global(code) {
          padding: 0.4em;
          display: block;
        }
      `}</style>
    </>
  );
}
