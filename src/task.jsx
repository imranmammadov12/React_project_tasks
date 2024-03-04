import { Form, useLoaderData } from "react-router-dom";
import { getTask } from "./tasks";

export async function loader({ params }) {
  const task = await getTask(params.taskId);
  return { task };
}

const Task = () => {
  const { task } = useLoaderData();

  return (
    <div id="contact">
      <div>
        <h1>Task Name: <span> </span>
          {task.first || task.last ? (
            <>
              {task.first} {task.last}
            </>
          ) : (
            <i>No Task</i>
          )}{" "}
        </h1>
        <br />
        <h1>Details &#8595;</h1> <span> </span>
        {task.notes && <p className="task-notes">{task.notes}</p>}
      </div>
    </div>
  );
}


export default Task;



