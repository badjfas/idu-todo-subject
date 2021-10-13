import {
  Button,
  Dialog,
  Grid,
  makeStyles,
  TextField,
  Typography,
  Checkbox,
} from "@material-ui/core";
import { EventNote } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { DialogProps, TodoState } from "./types";

const TodoDialog = (props: DialogProps) => {
  const { date, addTodo, todo, setTodo, ...rest } = props;
  const [text, setText] = useState("");
  const classes = useStyles();
  const current = `${date.year()}년 ${date.month()}월 ${date.date()}일`;

  const onClick = () => {
    if (text === "") {
      return;
    }

    addTodo({ id: todo.length + 1, title: text, ok: false });
    setText("");
  };

  const onComplete = (form: TodoState) => {
    const fixed = todo.map((v) => {
      if (v.id === form.id) {
        return {
          ...form,
        };
      }

      return v;
    });

    setTodo(fixed);
  };

  const onSave = () => {
    sessionStorage.setItem(current, JSON.stringify(todo));

    props.onClose();
  };

  return (
    <Dialog {...rest} maxWidth="sm" fullWidth className={classes.root}>
      <Grid container className={classes.header}>
        <Typography color="primary" className="current">
          <EventNote fontSize="large" />
          {current}
        </Typography>
      </Grid>

      <Grid container className={classes.contents} direction="column">
        <TextField
          classes={{ root: classes.textField }}
          size="small"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={onClick}>
          등록
        </Button>

        <Grid item className={classes.todoList}>
          {todo.map((v, i) => {
            return (
              <Grid item className="item" key={i}>
                <Checkbox
                  onClick={() => onComplete({ ...v, ok: !v.ok })}
                  checked={v.ok}
                  color="primary"
                />
                {v.title}
                <Button color="default" size="small" variant="contained">
                  삭제
                </Button>
              </Grid>
            );
          })}

          {todo.length === 0 && <Typography>일정이 없습니다.</Typography>}
        </Grid>
      </Grid>

      <Grid container className={classes.bottom}>
        <Button
          disabled={todo.length === 0}
          variant="contained"
          color="primary"
          fullWidth
          onClick={onSave}
        >
          저장하기
        </Button>
      </Grid>
    </Dialog>
  );
};

const useStyles = makeStyles(() => ({
  root: {},
  header: {
    padding: 16,
    "& .current": {
      display: "flex",
      alignItems: "center",

      fontWeight: 700,
      "& > :first-child": {
        marginRight: 8,
      },
    },
  },
  bottom: {
    padding: 16,
  },
  contents: {
    padding: 16,
  },
  todoList: {
    maxHeight: 400,
    overflow: "scroll",
    margin: "16px 0px",
    "& .item": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  textField: {
    marginBottom: 8,
  },
}));

export default TodoDialog;
