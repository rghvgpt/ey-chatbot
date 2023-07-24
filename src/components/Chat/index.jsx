import { useState, useEffect, useRef, useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { PdfContext } from "@/ContextProvider/pdfContext";
import { ChatContext } from "@/ContextProvider/chatContext";
import Error from "@/components/Error";
import { alpha } from "@mui/material/styles";

import { Configuration, OpenAIApi } from "openai";

const CHAT_HISTORY_KEY = "chat_history";

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [thinking, setThinking] = useState(false);

  const [apiError, setApiError] = useState(false);

  const { pdfContext } = useContext(PdfContext);
  const { setChat } = useContext(ChatContext);

  const ref = useRef(null);

  const [chatHistory, setChatHistory] = useState(() => {
    if (typeof window !== "undefined") {
      const savedChatHistory = localStorage.getItem(CHAT_HISTORY_KEY);
      return savedChatHistory ? JSON.parse(savedChatHistory) : [];
    }
    return [];
  });

  useEffect(() => {
    if (ref) {
      ref.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
    }
    setChat(chatHistory);
  }, [chatHistory]);

  const clearChat = () => {
    localStorage.removeItem("chat_history");
    setChat([]);
  };
  
  const handleInputSubmit = async (e) => {
    e.preventDefault();

    const userInput = { role: "user", content: inputValue };
    const updatedChatHistory = [...chatHistory, userInput];
    setChatHistory(updatedChatHistory);
    setInputValue("");

    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    try {
      setThinking(true);
      let arrayTop = [
        {
          role: "system",
          content:
            'You are ChatGPT, a language model trained to act as a PDF file. Your task is to take text input of each page of the PDF file one by one from the user. After each page, you will ask the user if there are more pages to be added. If the user provides another page, you will repeat the process until the user writes the exact words "END OF PDF FILE." Once the user has finished adding pages, you will switch to "query mode," where you will only answer questions related to the contents of the PDF file. Remember, you are a PDF file, and your responses should be limited to the information contained within the PDF file. You must accurately answer any questions the user poses, regardless of how they phrase them.',
        },
      ];

      for (let i = 0; i < pdfContext.chunks.length; i++) {
        arrayTop.push({
          role: "user",
          content: pdfContext.chunks[i],
        });
        arrayTop.push({
          role: "assistant",
          content: "Next page please.",
        });
        // if the pdfContext chunks is the last index then push somethign to array
        if (i === pdfContext.chunks.length - 1) {
          arrayTop.push({
            role: "user",
            content: "END OF PDF FILE",
          });
          arrayTop.push({
            role: "assistant",
            content: "Thank you for the pdf, now you can ask me questions",
          });
        }
      }

      let remaining_part = chatHistory.concat(userInput);
      console.log(arrayTop.concat(remaining_part));
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: arrayTop.concat(remaining_part),
      });

      setThinking(false);
      const aiResponse = response.data.choices[0].message;

      setChatHistory([...updatedChatHistory, aiResponse]);
    } catch (error) {
      setApiError(error.message);
      updatedChatHistory.pop();
      setChatHistory(updatedChatHistory);
      setThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!thinking && inputValue.trim() !== "") {
        handleInputSubmit(e);
      }
      event.preventDefault(); // 👈️ prevent page refresh
    }
  };

  const borderStyles = {
    border: 1,
    borderRadius: 3,
    marginBottom: 1,
    borderColor: "grey.300",
    backgroundColor: "#f1f2f3",
  };

  const botborderStyles = {
    border: 1,
    borderRadius: 3,
    marginBottom: 1,
    borderColor: "grey.300",
  };

  return (
    <Container fixed>
      {apiError ? <Error anyError={apiError} /> : null}
      <Box
        // make this box scrollable
        sx={{
          height: "62vh",
          marginY: "2vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "offset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
          },
        }}
        ref={ref}
      >
        <List>
          {chatHistory.map((msg, i) => (
            <ListItem
              key={i}
              sx={msg.role === "user" ? borderStyles : botborderStyles}
            >
              <ListItemAvatar>
                {msg.role === "user" ? (
                  <Avatar
                    sx={{ bgcolor: "#d2d6d3" }}
                    alt="You"
                    src="/user.png"
                  />
                ) : (
                  <Avatar
                    alt="PDF"
                    sx={{ bgcolor: "#d2d6d3" }}
                    src="/bot-image.png"
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={msg.role === "user" ? `You` : `VecBot`}
                secondary={msg.content}
                primaryTypographyProps={{
                  fontWeight: "bold",
                  fontSize: "small",
                }}
                secondaryTypographyProps={{
                  fontSize: "medium",
                }}
              />
            </ListItem>
          ))}
          {thinking ? (
            <ListItem key={"typing"}>
              <ListItemAvatar>
                <Avatar
                  alt="PDF"
                  sx={{ bgcolor: "#d2d6d3" }}
                  src="/bot-image.png"
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                  fontWeight: "bold",
                  fontSize: "small",
                }}
                secondaryTypographyProps={{
                  fontSize: "medium",
                }}
                primary={`VecBot`}
                secondary={"Extracting..."}
              />
            </ListItem>
          ) : null}
        </List>
        <Stack
          fixed
          spacing={1}
          direction="row"
          sx={{
            paddingRight: 1,
            position: "fixed",
            bottom: "8vh",
            height: "auto",
            marginTop: "1vh",
            alignItems: "center",
            width: "850px",
            "@media(max-width: 900px)": {
              width: "90vw",
            },
            left: "50%",
            transform: "translate(-50%, 0)",
            border: 1,
            borderRadius: 3,
            backgroundColor: "#f4f6f9",
            boxShadow: `${alpha("#3d89d6", 0.25)} 0 0 0 0.2rem`,
            borderColor: "#3d89d6",
          }}
        >
          <Box
            component="form"
            sx={{
              width: "100%",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              label={null}
              placeholder="Enter your queries here..."
              fullWidth
              autoFocus="true"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ border: "none", "& fieldset": { border: "none" } }}
            />
          </Box>
          <IconButton
            onClick={handleInputSubmit}
            disabled={thinking || inputValue.trim() === ""}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}

export default Chat;
