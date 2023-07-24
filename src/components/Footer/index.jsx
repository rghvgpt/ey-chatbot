import { Box, Paper } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { WidthFull } from "@mui/icons-material";
// import ModeSwitcher from "@/components/ModeSwitcher";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        paddingBottom: 2,
        bottom: 0,
        justify: "center",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        left: "50%",
        transform: "translate(-50%, 0)",
        fontSize: "small",
        columnGap: "20px",
        width: "100vw",
      }}
    >
      <p>© 2023 · Raghav Gupta</p>
      <p>
        <a href="https://github.com/rghvgpt/ey-chatbot">
          <GitHubIcon
            sx={{
              fontSize: "medium",
            }}
          />
        </a>
      </p>
      <p>
        <a href="https://www.linkedin.com/in/raghav-gupta-b194a5230">
          <LinkedInIcon
            sx={{
              fontSize: "medium",
            }}
          />
        </a>
      </p>
    </Box>
  );
};

export default Footer;
