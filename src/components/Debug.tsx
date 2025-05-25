export type DebugProps = Record<string, unknown>;
export default function Debug(props: DebugProps) {
  return (
    <span
      style={{
        display: "block",
        padding: "1rem",
        borderRadius: "4px",
        overflowX: "auto",
        border: "1px solid #ccc",
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          whiteSpace: "pre",
          fontSize: "0.8em",
          fontWeight: "normal",
        }}
      >
        <code>{JSON.stringify(props, null, 2)}</code>
      </span>
    </span>
  );
}
