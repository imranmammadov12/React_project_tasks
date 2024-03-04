// import { Form, useLoaderData, redirect, useNavigate, } from "react-router-dom";

// import { updateContact } from "./contacts";

// export async function action({ request, params }) {
//     const formData = await request.formData();
//     const updates = Object.fromEntries(formData);
//     await updateContact(params.contactId, updates);
//     return redirect(`/contacts/${params.contactId}`);
//   }

// const EditContact = () => {
//   const { contact } = useLoaderData();
//   const navigate = useNavigate();

//   return (
//     <Form method="post" id="contact-form">
//       <p>
//         <span>Task name</span>
//         <input
//           placeholder="First"
//           aria-label="First name"
//           type="text"
//           name="first"
//           defaultValue={contact.first}
//         />
//         {/* <span>Details</span>
//         <input
//           placeholder="Last"
//           aria-label="Last name"
//           type="text"
//           name="last"
//           defaultValue={contact.last}
//         /> */}
//       </p>
//       {/* <label>
//         {/* <span>Twitter</span>
//         <input
//           type="text"
//           name="twitter"
//           placeholder="@jack"
//           defaultValue={contact.twitter}
//         />
//       </label> */} 
//       {/* <label>
//         <span>Avatar URL</span>
//         <input
//           placeholder="https://example.com/avatar.jpg"
//           aria-label="Avatar URL"
//           type="text"
//           name="avatar"
//           defaultValue={contact.avatar}
//         />
//       </label> */}
//       <label>
//         <span>Details</span>
//         <textarea
//           name="notes"
//           defaultValue={contact.notes}
//           rows={1}
//         />
//       </label>
//       <p>
//         <button type="submit">Save</button>
//         <button type="button" onClick={() => {
//             navigate(-1);
//           }}>Cancel</button>
//       </p>
//     </Form>
//   );
// }

// export default EditContact;




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
        <span>Task name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={task.first}
        />
        {/* <span>Details</span>
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        /> */}
      </p>
      {/* <label>
        {/* <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label> */} 
      {/* <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label> */}
      <label>
        <span>Details</span>
        <textarea
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