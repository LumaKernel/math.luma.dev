"use client";

const Text = (props: React.ComponentProps<"span">) => (
  <>
    <span {...props} />
    <style jsx>{`
      span {
        font-family: "Inconsolata", monospace;
      }
    `}</style>
  </>
);

export default function Qed() {
  return <Text>■</Text>;
}
