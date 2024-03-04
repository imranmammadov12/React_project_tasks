import './index.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Root, { loader as rootLoader, action as rootAction, } from './root';
import Task, {loader as taskLoader} from './task';
import EditTask, {action as editAction} from './edit';
import { action as destroyAction } from "./destroy";

const rootContainer = document.querySelector('#root');

if (rootContainer === null) throw new Error("Can't find root container");

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    children: [
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