import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Textarea } from "@mui/joy";

import { useDispatch } from "react-redux";
import { todoAdded } from "../redux/todosSlice";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "75%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export const TodoAdd = () => {
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSavePostSubmit = () => {
    if (title && content) {
      dispatch(todoAdded(title, content, "running"));
      setTitle("");
      setContent("");
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <StyledFab color="secondary" onClick={handleClickOpen} aria-label="add">
        <AddIcon />
      </StyledFab>
      <CustomDialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <Textarea
            name="Neutral"
            placeholder="Title…"
            variant="outlined"
            color="neutral"
            value={title}
            onChange={onTitleChanged}
          />
          <Textarea
            placeholder="Description…"
            minRows={5}
            value={content}
            onChange={onContentChanged}
            sx={{
              marginTop: "30px",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="click" onClick={onSavePostSubmit}>
            Save
          </Button>
        </DialogActions>
      </CustomDialog>
    </React.Fragment>
  );
};
