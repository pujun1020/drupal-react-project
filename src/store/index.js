import { configureStore } from "@reduxjs/toolkit";
//导出子模块状态工具reducer
import dataState from "@/store/modules/dataState";

const store=configureStore({
    reducer:{
        dataState
    }
})


export default store;