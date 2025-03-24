import React from "react";
export type DebugProps = Record<string, unknown>;
export default function Debug(props: DebugProps) {
  return (
    <div>
      <pre>
        <code>{JSON.stringify(props, null, 2)}</code>
      </pre>
    </div>
  );
}
