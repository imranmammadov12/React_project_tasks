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
        {/* <img
          key={contact.avatar}
          src={contact.avatar || null}
        /> */}
      </div>

      <div>
        <h1>Task Name: <span> </span>
          {task.first || task.last ? (
            <>
              {task.first} {task.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite task={task} />
        </h1>

        {task.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${task.twitter}`}
            >
              {task.twitter}
            </a>
          </p>
        )}
        <br />
        <h1>Details &#8595;</h1> <span> </span>
        {task.notes && <p>{task.notes}</p>}

        {/* <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
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
        </div> */}
      </div>
    </div>
  );
}


export default Task;

function Favorite({ task }) {
  // yes, this is a `let` for later
  let favorite = task.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {/* {favorite ? "★" : "☆"} */}
      </button>
    </Form>
  );
}



