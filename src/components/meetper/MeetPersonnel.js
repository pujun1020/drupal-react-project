import { Space} from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";
import "@/components/meetper/meetper.css";
import { useSelector } from "react-redux";
import { endTime, timeDetail } from "@/utils/timeFun";

function Meetperson() {
    const dataJson = useSelector(store => {
        return store.dataState.dataJson
    });

    const userspersonValues = (dataJson.users && Object.values(dataJson.users)) || [];

    //从发送的表情符号中筛选出有举手的的人员，并且返回举手次数
    function noEntity(params) {
        //如果参数长度小于等于0，返回false
        if (params.lenght <= 0) {
            return false
        } else {
            //过滤参数，返回一个数组，数组中元素满足name属性等于'raiseHand'
            const raiseHandUsers = params.filter(user => {
                return user.name && user.name === 'raiseHand';
            });
            //返回过滤后的数组
            return raiseHandUsers
        }

    };
    function webcamsFun(param) {
        const webcamTimeLength = param.map(webcam => timeDetail(webcam.stoppedOn - webcam.startedOn))
        return webcamTimeLength;
    }
    return (
        <div className="userwapper">
            <table id="table-4">
                <thead>
                    <tr>
                        <th>用户</th>
                        <th>在线时长</th>
                        <th>发言时长</th>
                        <th>视频时长</th>
                        <th>消息</th>
                        <th>表情符号</th>
                        <th>举手</th>
                    </tr>
                </thead>
                <tbody>
                    {userspersonValues.map(item => (
                        <tr key={item.extId}>
                            <td>
                                <div className="personicondetail">
                                    <div className="personicon">
                                        <Space><UserSwitchOutlined></UserSwitchOutlined></Space>
                                    </div>
                                    <div className="persontexts">
                                        <div className="persontextsname">{item.name}</div>
                                        <div className='persontextsstarttime'>
                                            <div className="svgicon"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg></div>
                                            <div className="persontextstime">{endTime(item.intIds[item.extId].registeredOn, false)}</div>
                                        </div>
                                        <div className="persontextsendtime">
                                            <div className="svgicon"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg></div>
                                            <div className="persontextstime">{endTime(item.intIds[item.extId].leftOn, false)}</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="linetime">
                                    <div className="linetimesvgtime">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                                        <div className="linetimesvgtimetext">
                                            {item.intIds[item.extId] && timeDetail(item.intIds[item.extId].leftOn - item.intIds[item.extId].registeredOn)}
                                        </div>
                                    </div>
                                    <div className="linetimelinebg">
                                    </div>
                                </div>
                            </td>
                            <td>{item.talk.totalTime && timeDetail(item.talk.totalTime)}</td>
                            <td>
                                {item.webcams.length > 0 && webcamsFun(item.webcams).map((item, index) => <div key={index}>{item}</div>)}
                            </td>
                            <td>

                                {item.totalOfMessages !== 0 && (
                                    <div className="message-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                        {item.totalOfMessages}
                                    </div>)}
                            </td>
                            <td>
                                <div className="scroll-td">
                                    {item.reactions.map(item => {
                                        return (
                                            <div key={item.sentOn}>{item.name}{endTime(item.sentOn, "hms")}</div>
                                        )
                                    })}
                                </div>
                            </td>
                            <td>
                                {/* {item.emojis && noeNtity(item.emojis).map(item => item.name)} */}{/* 重要点 */}
                                {item.emojis && noEntity(item.emojis).length}
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default Meetperson;
