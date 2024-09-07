import { useEffect, useState } from "react";
import Bowser from "bowser";

export default function useBrowserType() {
  const [browserType, setBrowserType] = useState<string>("");

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);

    setBrowserType(browser.getBrowserName());
  }, []);

  return { browserType };
}
