import { Space } from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";
import "@/components/time/time.css";
import { useSelector } from "react-redux";
import { timeDetail } from "@/utils/timeFun";
export default function Time() {
    const dataJson = useSelector(store => {
        return store.dataState.dataJson
    });
    const usersTimeValues = (dataJson.users && Object.values(dataJson.users)) || [];
    /* 在线时间比 */
    const userOnlineTime = (OnlineTime) => {
        const meetTolkTime = dataJson.endedOn - dataJson.createdOn;
        const percentage = (OnlineTime / meetTolkTime) * 100; // 计算百分比
        const percentageInt = `${Math.round(percentage)}%`; // 保留整数
        return percentageInt;
    }
    /* 时间点 */
    const userOnlineTimePositon = (usercreat) => {
        if (dataJson.createdOn && dataJson.endedOn) {
            const meetTolkTime = dataJson.endedOn - dataJson.createdOn;
            const meetUserTimeDiff = usercreat - dataJson.createdOn;
            const meetUserTimeDiffProportion = (meetUserTimeDiff / meetTolkTime) * 100; // 计算百分比
            const percentageInt1 = `${Math.round(meetUserTimeDiffProportion)}%`; // 保留整数
            return percentageInt1;
        }

    }
    return (
        <div className="timewapper">
            <div className="timewapper-box1">用户</div>
            <div className="timewapper-box2">
                {/* <img src="logobj.png" alt="" /> */}
                <div className="timeline-text">{timeDetail(dataJson.endedOn - dataJson.createdOn)}</div>
            </div>
            {usersTimeValues.map(item => (
                <div className="timewapper-box3-wapper" key={item.extId}>
                    <div className="user-name-wapper">
                        <div className="timewapper-box3">
                            <Space><UserSwitchOutlined></UserSwitchOutlined></Space>
                        </div>
                        <div className="user-name">{item.name}</div>
                    </div>
                    <div className="timeLine-box-wapper">
                        <div className="time-line" style={{
                            width: `${item.intIds[item.extId] && userOnlineTime(item.intIds[item.extId].leftOn - item.intIds[item.extId].registeredOn)}`,
                            left: `${item.intIds[item.extId] && userOnlineTimePositon(item.intIds[item.extId].registeredOn)}`
                        }}></div>
                    </div>
                </div>
            ))}
        </div >
    )
}