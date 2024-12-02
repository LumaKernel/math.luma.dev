"use client";

import { cssFonts } from "./lib/fonts";

const Text = (props: React.ComponentProps<"span">) => (
  <>
    <span {...props} />
    <style jsx>{`
      span {
        font-family: ${cssFonts.monospace};
      }
    `}</style>
  </>
);

export default function Qed() {
  return <Text>■</Text>;
}
