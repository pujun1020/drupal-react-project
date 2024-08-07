
import { Space } from "antd";
import "@/components/vote/vote.css";
import { UserSwitchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
export default function Vote() {
    /* 获取redux仓库中的状态数据 */
    const { dataJson, pollFlag } = useSelector(store => {
        return store.dataState
    });
    /* 对象转数组 */
    const pollsValues = (dataJson.polls && Object.values(dataJson.polls)) || [];
    const usersValues = (dataJson.users && Object.values(dataJson.users)) || [];
    const anonymousValues = pollsValues.filter(item => item.anonymous === true);
    /* 英文内容替换为中文 */
    const switchValues = (values) => {
        const value = values.join(',');
        switch (value) {
            case "Yes":
                return "赞成";
            case "No":
                return "反对";
            case "Abstention":
                return "弃权";
            default:
                return value;
        }
    }

    return (<div>
        {pollFlag ? <div className="nosuorce-wapper">
            <div className="cardicon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
            </div>
            <div className="nosuorce-title">没有创建投票</div>
            <div className="nosuorce-text">一旦向用户发送了民意调查，他们的结果将出现在此列表中。</div>
        </div> : <div className="pollswapper">
            <table id="table-4">
                <thead>
                    <tr>
                        <th>用户</th>
                        <th>投票总计</th>
                        {pollsValues.map(poll => <th key={poll.pollId}>{poll.question}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="personicondetail">
                                <div className="personicon">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="relative hidden w-8 h-8 mr-3 rounded-full md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <div className="persontexts">
                                    <div className="persontextsname">匿名</div>
                                </div>
                            </div>
                        </td>
                        <td>{anonymousValues.length}</td>
                        {pollsValues.map((poll, index) => (
                            <td key={poll.pollId}>
                                <div className="scroll-w">{pollsValues[index].anonymous && pollsValues[index].anonymousAnswers.join(',')}</div>
                            </td>))}
                    </tr>
                    {usersValues.map(user =>
                    (<tr key={user.extId}>
                        <td>
                            <div className="personicondetail">
                                <div className="personicon">
                                    <Space><UserSwitchOutlined></UserSwitchOutlined></Space>
                                </div>
                                <div className="persontexts">
                                    <div className="persontextsname">{user.name}</div>
                                </div>
                            </div>
                        </td>
                        <td>{((user.answers && Object.values(user.answers)) || []) && Object.values(user.answers).length}</td>
                        {pollsValues.map(poll => (
                            <td key={poll.pollId}>
                                {user.answers && user.answers[poll.pollId] ? switchValues(user.answers[poll.pollId]) : " "
                                }
                            </td>))}
                    </tr>))}


                </tbody>

            </table>
        </div>}
    </div>)
}