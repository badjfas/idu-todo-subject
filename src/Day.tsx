import React from "react";
import { Badge, makeStyles, Tooltip } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { useState } from "react";
import { useEffect } from "react";
import { Moment } from "moment";
import { TodoState } from "./types";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 4,

    "&.unfinish": {
      color: "red",
    },
  },
  dot: {
    minWidth: 4,
    height: 4,
    top: 10,
    right: 8,
  },
  tooltip: {
    width: "fit-content",
  },
  tooltipPlacementBottom: {
    bottom: 16,
  },
}));

interface DayProps {
  date: Moment;
  day: MaterialUiPickersDate;
  selectedDate: MaterialUiPickersDate;
  dayInCurrentMonth: boolean;
  dayComponent: JSX.Element;
}
const Day = ({ day }: DayProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [unfinished, setUnfinished] = useState(false);

  const todoDate = sessionStorage.getItem(
    day?.format("YYYY년 MM월 DD일") ?? ""
  );

  const parsedDate: Array<TodoState> = JSON.parse(todoDate as string);
  const unfinishedTodo = parsedDate?.filter((v) => v.ok === false);

  useEffect(() => {
    if (unfinishedTodo && unfinishedTodo.length >= 1) {
      setUnfinished(true);
    } else {
      setUnfinished(false);
    }
  }, [day, parsedDate, unfinishedTodo]);

  const onOpen = () => {
    if (unfinished === true) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <Tooltip
      classes={{
        tooltip: classes.tooltip,
        tooltipPlacementBottom: classes.tooltipPlacementBottom,
      }}
      open={open}
      onOpen={onOpen}
      onClose={() => setOpen(false)}
      title={`해야 할 일이 ${unfinishedTodo?.length}개 남았어요!`}
      placement="bottom"
      arrow
    >
      <Badge
        classes={{
          dot: classes.dot,
        }}
        variant="dot"
        color="error"
        invisible={!unfinished}
      >
        <div className={`${classes.root} ${unfinished ? "unfinish" : ""}`}>
          {day?.date()}
        </div>
      </Badge>
    </Tooltip>
  );
};

export default Day;
