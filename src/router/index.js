
import Meetperson from "@/components/meetper/MeetPersonnel";
import Active from "@/components/active/Active";
import Time from "@/components/time/Time";
import Vote from "@/components/vote/Vote";
import App from "@/App";
import { createBrowserRouter,createHashRouter } from "react-router-dom";
const router = createHashRouter([


    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,/* 子路由不能以绝对路径开始，不然报错  */
                element: <Meetperson />,
            },
            {
                path: "active",/* 子路由不能以绝对路径开始，不然报错  */
                element: <Active />,
            },
            {
                path: "time",/* 子路由不能以绝对路径开始，不然报错  */
                element: <Time />,
            },
            {
                path: "vote",/* 子路由不能以绝对路径开始，不然报错  */
                element: <Vote />,
            },
            
        ]
    }
])
export default router;