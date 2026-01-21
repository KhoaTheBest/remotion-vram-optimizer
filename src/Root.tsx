import "./index.css";
import { Composition } from "remotion";
import { ProxyDemo } from "./ProxyDemo";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProxyDemo"
        component={ProxyDemo}
        durationInFrames={360}
        fps={30}
        width={3840}
        height={2160}
      />
    </>
  );
};
