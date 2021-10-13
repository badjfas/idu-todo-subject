import React, { useState, useEffect } from "react";
import moment from "moment";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import AppPresenter from "./AppPresenter";
import TodoDialog from "./TodoDialog";
import { TodoState } from "./types";

const AppContainer = () => {
  const currentDate = moment().utc();
  const [date, changeDate] = useState<moment.Moment>(currentDate);
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState<TodoState[]>([]);
  const current = `${date.year()}년 ${date.month()}월 ${date.date()}일`;

  useEffect(() => {
    const data = sessionStorage.getItem(current);

    if (data) {
      setTodo(JSON.parse(data));
    }
  }, [date, current]);

  useEffect(() => {
    if (!open) {
      setTodo([]);
    }
  }, [open]);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (event: MaterialUiPickersDate) => {
    changeDate(event!);
    onOpen();
  };

  const addTodo = (form: TodoState) => {
    setTodo([...todo, form]);
  };

  return (
    <React.Fragment>
      <TodoDialog
        open={open}
        onClose={onClose}
        date={date}
        addTodo={addTodo}
        setTodo={setTodo}
        todo={todo}
      />
      <AppPresenter date={date} onChange={onChange} onOpen={onOpen} />;
    </React.Fragment>
  );
};

export default AppContainer;
