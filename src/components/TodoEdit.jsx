import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Textarea } from "@mui/joy";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { todoAdded, todoUpdated } from "../redux/todosSlice";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "75%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export const TodoEdit = ({ todo }) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);

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
      dispatch(
        todoUpdated({
          id: todo.id,
          title: title,
          content: content,
          taskStatus: todo.taskStatus,
        })
      );
    }
  };

  return (
    <React.Fragment>
      <IconButton edge="end" aria-label="comments" onClick={handleClickOpen}>
        <ModeEditIcon />
      </IconButton>
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
        <DialogTitle>Edit Task</DialogTitle>
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


