import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body
          style={{
            background:
              " linear-gradient(179.17deg, #161617 29.6%, #FF3464 99.29%)",
            backgroundRepeat: "no-repeat",
            paddingBottom: "90px",
          }}
        >
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
