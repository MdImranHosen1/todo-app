import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { todoUpdated } from "../redux/todosSlice";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { TodoEdit } from "./TodoEdit";

export const TodosList = () => {
  const data = useSelector((state) => state.todos);
  const sortOrder = {
    completed: 2,
    pending: 1,
    backlog: 0,
  };

  const todos = [...data].sort(
    (a, b) => sortOrder[a.taskStatus] - sortOrder[b.taskStatus]
  );

  const dispatch = useDispatch();
  const [expandedTodo, setExpandedTodo] = React.useState(-1);
  const handleExpandClick = (id) => () => {
    if (id === expandedTodo) {
      setExpandedTodo(-1);
    } else {
      setExpandedTodo(id);
    }
  };
  // TodoEdit;

  const handleToggle = (value) => () => {
    dispatch(
      todoUpdated({
        id: value.id,
        title: value.title,
        content: value.content,
        taskStatus: value.taskStatus === "completed" ? "pending" : "completed",
      })
    );
  };

  const calculateDayDifference = (oldTimestamp) => {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const oldDate = new Date(oldTimestamp);
    const currentDateTime = new Date();
    oldDate.setHours(0, 0, 0, 0);
    currentDateTime.setHours(0, 0, 0, 0);
    const differenceInMilliseconds =
      currentDateTime.getTime() - oldDate.getTime();
    const differenceInDays = differenceInMilliseconds / millisecondsPerDay;
    return differenceInDays;
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <List
        container
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: 1200,
          bgcolor: "#f1f8e9",
          marginTop: 1,
        }}
      >
        {todos.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <>
              <ListItem
                key={value.id}
                secondaryAction={
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <p>{calculateDayDifference(value.id)} days</p>
                    <TodoEdit todo={value} />
                  </div>
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
                  <ListItemText
                    id={labelId}
                    primary={value.title}
                    onClick={handleExpandClick(value.id)}
                    style={{
                      textDecoration:
                        value.taskStatus === "completed"
                          ? "line-through"
                          : "none",
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <Collapse
                in={expandedTodo === value.id}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Typography paragraph>{value.content}</Typography>
                </CardContent>
              </Collapse>
            </>
          );
        })}
      </List>
    </div>
  );
};
