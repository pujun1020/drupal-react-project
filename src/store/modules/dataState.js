import { createSlice } from "@reduxjs/toolkit";
import { dataJson } from "@/apis/datajson";
const counterStore = createSlice({
    name: "counter",
    initialState: {
        dataJson: {},
        pollFlag: true,
    },
    reducers: {
        //创建任务处理状态数据state
        setDatejson(state, action) {
            state.dataJson = action.payload
            if (action.payload.polls) {
                state.pollFlag = false;
            }
        },
        
    }
})
//解构出actioncreater
const dateJsonobj = (meetid) => {//可以当做actioncreater去触发
    return async (dispatch) => {
        let res = await dataJson(meetid);
        dispatch(setDatejson(res));
    }
}
//从任务行动对象中解构任务
const { setDatejson } = counterStore.actions;
//获取状态仓库
const datereducer = counterStore.reducer;
export { setDatejson };
export { dateJsonobj };
export default datereducer;