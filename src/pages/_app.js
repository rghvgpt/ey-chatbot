import "../styles/globals.scss";
import { ChatContextProvider } from "../ContextProvider/chatContext";
import { PdfContextProvider } from "../ContextProvider/pdfContext";
import { ThemeContextProvider } from "../ContextProvider/themeContext";

export default function App({ Component, pageProps }) {
  return (
    <PdfContextProvider>
      <ChatContextProvider>
        <ThemeContextProvider>
          <Component {...pageProps} />
        </ThemeContextProvider>
      </ChatContextProvider>
    </PdfContextProvider>
  );
}
