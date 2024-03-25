import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { todoUpdated } from "../redux/todosSlice";

export const TodosList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    console.log("asdf", value);
    dispatch(
      todoUpdated({
        id: value.id,
        title: value.title,
        content: value.content,
        taskStatus: value.taskStatus === "completed" ? "pending" : "completed",
      })
    );

    const currentIndex = checked.indexOf(value);

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <List
        container
        spacing={2}
        sx={{ width: "100%", maxWidth: 1200, bgcolor: "#f1f8e9", margin: 2 }}
      >
        {todos.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value.id}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <MoreVertIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} dense>
                <ListItemIcon onClick={handleToggle(value)}>
                  <Checkbox
                    edge="start"
                    checked={value.taskStatus === "completed"}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
