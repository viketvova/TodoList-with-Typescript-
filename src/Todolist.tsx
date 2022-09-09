import React from "react";
import { FilterValueType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type PropsType = {
  id: string;
  title: string;
  placeholder: string;
  tasks: TaskType[];
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (filter: FilterValueType, id: string) => void;
  addTask: (title: string, id: string) => void;
  changeCheckbox: (id: string, todolistId: string) => void;
  filter: FilterValueType;
  deleteTodolist: (todolistId: string) => void;
  onTaskTitleChange: (
    todolistId: string,
    taskId: string,
    title: string
  ) => void;
  onTodolistTitleChange: (todolistId: string, title: string) => void;
};

export function Todolist(props: PropsType) {
  function onTodolistTitleChange(title: string) {
    props.onTodolistTitleChange(props.id, title);
  }

  function deleteTodolist() {
    props.deleteTodolist(props.id);
  }

  function onAllButtonClick() {
    props.changeFilter("All", props.id);
  }
  function onActiveButtonClick() {
    props.changeFilter("Active", props.id);
  }
  function onCompletedButtonClick() {
    props.changeFilter("Completed", props.id);
  }
  function AddTask(title: string) {
    props.addTask(title, props.id);
  }
  return (
    <div>
      <h3>
        <EditableSpan
          title={props.title}
          onTitleChange={onTodolistTitleChange}
        />
        <button onClick={deleteTodolist}>X</button>
      </h3>
      <AddItemForm addItem={AddTask} placeholder={props.placeholder} />

      <ul>
        {props.tasks.map((task) => {
          function removeTask() {
            props.removeTask(task.id, props.id);
          }
          function changeCheckbox() {
            props.changeCheckbox(task.id, props.id);
          }
          function onTitleChange(title: string) {
            props.onTaskTitleChange(props.id, task.id, title);
          }
          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeCheckbox}
              />
              <EditableSpan title={task.title} onTitleChange={onTitleChange} />
              <button onClick={removeTask}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={onAllButtonClick}
          className={props.filter === "All" ? "active-filter" : ""}
        >
          All
        </button>
        <button
          onClick={onActiveButtonClick}
          className={props.filter === "Active" ? "active-filter" : ""}
        >
          Active
        </button>
        <button
          onClick={onCompletedButtonClick}
          className={props.filter === "Completed" ? "active-filter" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
