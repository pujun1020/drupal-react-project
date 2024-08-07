import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider} from "react-router-dom";
import router from "@/router/index";
import { Provider } from "react-redux";
import store from './store/index';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>{/* 只能包裹在最外层 */}
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </Provider>
);
