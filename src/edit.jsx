import { Form, useLoaderData, redirect, useNavigate, } from "react-router-dom";

import { updateTask } from "./tasks";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateTask(params.taskId, updates);
    return redirect(`/tasks/${params.taskId}`);
  }


const EditTask = () => {
  const { task } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Task name:</span>
        <input
          placeholder="Enter task name..."
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={task.first}
        />
      </p>
      <label>
        <span>Details:</span>
        <textarea
          placeholder="Enter task details..."
          name="notes"
          defaultValue={task.notes}
          rows={1}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => {
            navigate(-1);
          }}>Cancel</button>
      </p>
    </Form>
  );
}

export default EditTask;