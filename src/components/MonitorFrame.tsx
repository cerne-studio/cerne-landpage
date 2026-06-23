import type { ReactNode } from "react";

interface Props {
  url: string;
  children: ReactNode;
}

export default function MonitorFrame({ url, children }: Props) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 14,
        overflow: "hidden",
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 30px 70px rgba(0,0,0,0.5), 0 4px 14px rgba(0,0,0,0.3)",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "10px 14px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "#FBFAF8",
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#E6E3DD" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#E6E3DD" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#E6E3DD" }} />
        <span
          className="font-mono"
          style={{ marginLeft: 8, fontSize: 11, color: "#9A938A" }}
        >
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}
