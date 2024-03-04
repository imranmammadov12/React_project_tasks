import { Outlet, useLoaderData,  Form, redirect, NavLink,  useNavigation, useSubmit,} from "react-router-dom";
import { getTasks, createTask } from "./tasks"
import { useEffect, useState } from "react";

export async function action() {
    const task = await createTask();
    return redirect(`/tasks/${task.id}/edit`);
  }

  export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const tasks = await getTasks(q);
    return { tasks, q };
  }


const Root = () => {
  const { tasks, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has("q");

  const [taskStatus, setTaskStatus] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");

  const handleCheckboxChange = (taskId, status) => {
    setTaskStatus((prevStatus) => {
      const updatedStatus = { ...prevStatus };
      if (updatedStatus[taskId] === status) {
        delete updatedStatus[taskId];
      } else {
        updatedStatus[taskId] = status;
      }
      return updatedStatus;
    });
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === "all") {
      return true;
    } else if (filterStatus === "done") {
      return taskStatus[task.id] === "done";
    } else if (filterStatus === "not done") {
      return taskStatus[task.id] === "not done";
    }
  });

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  return (
    <>
      <div id="sidebar">
        <h1>React Router Tasks</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.form);
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
        <div id="filter-side">
            <button id="sortBtn" onClick={() => handleFilterChange("all")}>All</button>
            <button id="sortBtn" onClick={() => handleFilterChange("done")}>Done</button>
            <button id="sortBtn" onClick={() => handleFilterChange("not done")}>Not Done</button>
          </div>
        {filteredTasks.length ? (
          <ul>
            {filteredTasks.map((task) => (
              <li key={task.id}>
                <NavLink
                  to={`tasks/${task.id}`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active"
                      : isPending
                      ? "pending"
                      : ""
                  }
                >
                  {task.first || task.last ? (
                    <>
                      {task.first} {task.last}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}{" "}
                  {task.favorite && <span>★</span>}
                </NavLink>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={taskStatus[task.id] === "done"}
                      onChange={() => handleCheckboxChange(task.id, "done")}
                    />{" "}
                    Done
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={taskStatus[task.id] === "not done"}
                      onChange={() => handleCheckboxChange(task.id, "not done")}
                    />{" "}
                    Not Done
                  </label>
                </div>
                <div className="edit-save">
                  <Form action={`tasks/${task.id}/edit`}>
                    <button type="submit">Edit</button>
                  </Form>
                  <Form
                    method="post"
                    action={`tasks/${task.id}/destroy`}
                    onSubmit={(event) => {
                      if (
                        !window.confirm(
                          "Please confirm you want to delete this record."
                        )
                      ) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <button type="submit">Delete</button>
                  </Form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No tasks</i>
          </p>
        )}
        </nav>
      </div>
      <div id="detail" className={
        navigation.state === "loading" ? "loading" : ""
      }>
        <Outlet />
      </div>
    </>
  );
}

export default Root;