import {
  Button,
  Dialog,
  Grid,
  makeStyles,
  TextField,
  Typography,
  Checkbox,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { DialogProps, TodoState } from "./types";

const TodoDialog = (props: DialogProps) => {
  const { date, addTodo, todo, setTodo, ...rest } = props;
  const [text, setText] = useState("");
  const classes = useStyles();
  const current = date.format("YYYY년 MM월 DD일");

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

  const onDelete = (form: TodoState) => {
    const target = todo.filter((v) => v.id !== form.id);

    setTodo(target);
  };

  const onSave = () => {
    sessionStorage.setItem(current, JSON.stringify(todo));

    props.onClose();
  };

  return (
    <Dialog {...rest} maxWidth="sm" fullWidth className={classes.root}>
      <Grid container className={classes.header}>
        <Typography color="textPrimary" className="current">
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
          placeholder="해야 할 일은 무엇인가요?"
        />
        <Button variant="contained" color="primary" fullWidth onClick={onClick}>
          등록
        </Button>

        <Grid item className={classes.todoList}>
          {todo.map((v, i) => {
            return (
              <Grid item className={`item`} key={i}>
                <Checkbox
                  onClick={() => onComplete({ ...v, ok: !v.ok })}
                  checked={v.ok}
                  color="primary"
                  disabled={v.ok}
                />
                <Typography className={`title ${v.ok ? "finished" : ""}`}>
                  {v.title}
                </Typography>
                <Button
                  onClick={() => onDelete({ ...v })}
                  color="primary"
                  size="small"
                  variant="outlined"
                >
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
    width: "100%",
    maxHeight: 400,
    overflow: "scroll",
    margin: "16px 0px",
    "& .item": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& .title": {
        display: "flex",
        alignItems: "center",
        textOverflow: "ellipsis",
        overflow: "hidden",
        width: "calc(100% - 120px)",
        height: 42,
      },

      "&.finished": {
        opacity: 0.4,
      },
    },
  },
  textField: {
    marginBottom: 8,
  },
}));

export default TodoDialog;
