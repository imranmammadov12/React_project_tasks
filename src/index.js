// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



// index.js
// index.js
import './index.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
// import TaskList from './TaskList';
import store from './store';
// // import TaskForm from './TaskForm';
// import rootReducer from './rootReducers';
// import AddTaskButton from './AddNewTask';
// import NewTaskButton from './NewTaskButton';
import Root, { loader as rootLoader, action as rootAction, } from './root';
import Task, {loader as taskLoader} from './task';
import EditTask, {action as editAction} from './edit';
import { action as destroyAction } from "./destroy";

const rootContainer = document.querySelector('#root');

if (rootContainer === null) throw new Error("Can't find root container");

const router = createBrowserRouter([
  {
    path: '/',
    // element: <AddTaskButton />,
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    children: [
      // {
      //   path: '/new',
      //   element: <TaskList />,
      // },
      {
        path: "tasks/:taskId",
        element: <Task />,
        loader: taskLoader,
      },
      {
        path: "tasks/:taskId/edit",
        element: <EditTask />,
        loader: taskLoader,
        action: editAction,
      },
      {
        path: "tasks/:taskId/destroy",
        action: destroyAction,
      },
    ]
  },
  // {
  //   path: '/new',
  //   element: <TaskList />,
  // },
  ]);


const root = createRoot(rootContainer);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      <Routes />
      </RouterProvider>
    </Provider>
  </StrictMode>
);