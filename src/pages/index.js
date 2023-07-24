import Head from "next/head";
import { useContext } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PdfContext } from "@/ContextProvider/pdfContext";
import Chat from "@/components/Chat";
import Uploader from "@/components/Uploader";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const themeLight = createTheme({
  palette: {
    fontFamily: [
      "Open Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default function Home() {
  const { pdfContext } = useContext(PdfContext);

  return (
    <>
      <Head>
        <title>EY Bot - Chat with your PDFs</title>
        <meta name="description" content="PDF that talks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
      </Head>
      <ThemeProvider theme={themeLight}>
        <CssBaseline enableColorScheme />
        <Container maxWidth="md" disableGutters={true}>
          <Navbar />
          <Uploader />
          {pdfContext?.name ? <Chat /> : null}
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  );
}
