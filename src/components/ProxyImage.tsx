import React, { useEffect, useState } from "react";
import { Img, continueRender, delayRender } from "remotion";
import { compressImage } from "../utils/image-proxy";

interface ProxyImageProps {
  src: string;
  style?: React.CSSProperties;
  className?: string;
  useProxy?: boolean;
}

export const ProxyImage: React.FC<ProxyImageProps> = ({
  src,
  style,
  className,
  useProxy = true,
}) => {
  const [displaySrc, setDisplaySrc] = useState<string | null>(
    useProxy ? null : src,
  );
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    if (!useProxy) {
      continueRender(handle);
      return;
    }

    let active = true;

    const loadProxy = async () => {
      try {
        const compressed = await compressImage(src);
        if (active) {
          setDisplaySrc(compressed);
        }
      } catch (e) {
        console.error("Failed to proxy image", e);
        if (active) setDisplaySrc(src);
      } finally {
        if (active) {
          continueRender(handle);
        }
      }
    };

    loadProxy();

    return () => {
      active = false;
    };
  }, [src, handle, useProxy]);

  if (!displaySrc) {
    return null;
  }

  return <Img src={displaySrc} style={style} className={className} />;
};
