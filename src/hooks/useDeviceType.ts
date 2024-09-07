import { useEffect, useState } from "react";

export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState<"iOs" | "android" | "other">(
    "other"
  );

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType("iOs");
    } else if (/android/.test(userAgent)) {
      setDeviceType("android");
    }
  }, []);

  return { deviceType };
}
