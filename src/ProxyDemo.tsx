import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { ProxyImage } from "./components/ProxyImage";

const images = ["images/shoe.jpg", "images/city.jpg", "images/car.jpg"];

export const ProxyDemo: React.FC = () => {
  return (
    <AbsoluteFill className="bg-gray-900">
      {images.map((img, i) => (
        <Sequence key={img} from={i * 90} durationInFrames={120}>
          <AbsoluteFill
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <ProxyImage
              src={staticFile(img)}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 50,
                color: "white",
                fontSize: 40,
                background: "rgba(0,0,0,0.5)",
                padding: "10px 20px",
                borderRadius: 8,
              }}
            >
              High Res Image {i + 1}
            </div>
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
