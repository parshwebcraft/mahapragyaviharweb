import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgba(255,247,230,1) 0%, rgba(245,211,106,1) 100%)",
          color: "#7A1E1E",
          fontSize: 108,
          borderRadius: 80,
          border: "12px solid rgba(122,30,30,0.12)"
        }}
      >
        MV
      </div>
    ),
    {
      width: 512,
      height: 512
    }
  );
}
