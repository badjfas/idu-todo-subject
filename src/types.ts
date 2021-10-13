import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import moment from "moment";

export interface AppProps {
  date: moment.Moment;
  onChange: (event: MaterialUiPickersDate) => void;
  onOpen: () => void;
}

export type TodoState = {
  id: number;
  title: string;
  ok: boolean;
};

export interface DialogProps {
  addTodo: (_: TodoState) => void;
  open: boolean;
  date: moment.Moment;
  onClose: () => void;
  todo: TodoState[];
  setTodo: React.Dispatch<React.SetStateAction<TodoState[]>>;
}
