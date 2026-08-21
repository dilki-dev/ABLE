import { ImageResponse } from "next/og";

export const alt = "ABLE Property Maintenance (Pvt) Ltd — property maintenance and renovation in Colombo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#111111", color: "white", padding: "72px", fontFamily: "Arial, sans-serif" }}><div style={{ display: "flex", alignItems: "center", gap: "24px" }}><div style={{ width: "88px", height: "88px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f97316", boxShadow: "inset -18px 0 0 #38bdf8", fontSize: "42px", fontWeight: 900 }}>A</div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: "38px", fontWeight: 900 }}>ABLE Property Maintenance</div><div style={{ marginTop: "8px", color: "#fdba74", fontSize: "20px", fontWeight: 700 }}>(Pvt) Ltd</div></div></div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ maxWidth: "980px", display: "flex", flexDirection: "column", fontSize: "66px", lineHeight: 1.05, letterSpacing: "-3px", fontWeight: 900 }}><span>Reliable property care.</span><span style={{ color: "#f97316" }}>Built to last.</span></div><div style={{ marginTop: "28px", fontSize: "24px", color: "#bae6fd" }}>Maintenance · Repairs · Renovations · Colombo, Sri Lanka</div></div><div style={{ display: "flex", justifyContent: "space-between", color: "#a3a3a3", fontSize: "18px" }}><span>www.ableconstructions.lk</span><span>+94 71 304 3444</span></div></div>, size);
}
