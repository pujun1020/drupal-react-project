/* ctrl+d 全选一个内容 */
import { Link, Outlet } from "react-router-dom";
import '@/App.css';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateJsonobj } from "./store/modules/dataState";
import { endTime, timeDetail } from "@/utils/timeFun";
function App() {
  /* 下载隐藏 */
  const [isHidden, setIsHidden] = useState(false);
  /* 接收的json数据 */
  const dispatch = useDispatch();
  const dataJson = useSelector(store => {
    return store.dataState.dataJson;
  });
  const cardTalk = (dataJson.users && Object.values(dataJson.users)) || [];
  const pollsTolk = (dataJson.polls && Object.values(dataJson.polls)) || [];
  useEffect(() => {
    const getMeetId = () => {
      /* 获取会议id */
      const urlParams = new URLSearchParams(window.location.search);
      const paramValue = urlParams.get('meeting_id'); // 获取指定参数的值
      return paramValue;
    }
    dispatch(dateJsonobj(getMeetId()));
  }, [dispatch]);
  /* 标题数组 */
  const titletagglearr = [
    "概览", "概览", "时间轴", "投票"
  ];
  const [titledefaule, setTitledefaule] = useState(0)
  /* 标题切换函数 */
  function titleTrigger(titleValue) {
    setTitledefaule(titleValue)
  }
  
  /* 卡片路由切换样式的改变 */
  const cardfun = (value, e) => {
    const cardElements = document.getElementsByClassName('cardwapper');
    for (let index = 0; index < cardElements.length; index++) {
      const element = cardElements[index];
      element.style.display = "none";
      cardElements[value].style.display = "block";
    }

  }

  return (
    <div className="app">
      <div className="pagetitlebox">
        <div className="left">
          <div className="lefttitletop">会议数据</div>
          <div className="lefttitlebottom">{dataJson.name} 群组快速会议</div>
        </div>
        <div className="right">
          <div className="righttitletop">
            {endTime(dataJson.endedOn, true)}
          </div>
          <div className="righttitlebottom">
            持续时间: {timeDetail(dataJson.createdOn - dataJson.endedOn)}
          </div>
        </div>
      </div>
      <div className="cards">
        <Link to="/" onClick={() => titleTrigger(0)}>
          <div onClick={(e) => cardfun(0, e)} className="card card1">
            <div className="cardleft">
              <div className="cardcount">{cardTalk.length}</div>
              <div className="cardtext">参会人员总数</div>
            </div>
            <div className="cardicon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <div className='cardwapper'></div>
          </div>
        </Link>
        <Link to="active" onClick={() => titleTrigger(1)}>
          <div onClick={(e) => cardfun(1, e)} className="card card2">
            <div className="cardleft">
              <div className="cardcount">0</div>
              <div className="cardtext">活动分数</div>
            </div>
            <div className="cardicon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
            </div>
            <div className='cardwapper'></div>
          </div>
        </Link>
        <Link to="time" onClick={() => titleTrigger(2)}>
          <div onClick={(e) => cardfun(2, e)} className="card card3">
            <div className="cardleft">
              <div className="cardcount">{timeDetail(dataJson.createdOn - dataJson.endedOn)}</div>
              <div className="cardtext">时间轴</div>
            </div>
            <div className='cardwapper'></div>
          </div>
        </Link>
        <Link to="vote" onClick={() => titleTrigger(3)}>
          <div onClick={(e) => cardfun(3, e)} className="card card4">
            <div className="cardleft">
              <div className="cardcount">{pollsTolk.length}</div>
              <div className="cardtext">投票</div>
            </div>
            <div className="cardicon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            </div>
            <div className='cardwapper'></div>
          </div>
        </Link>
      </div>
      <div className="titletaggle">
        <div className="titletaggletext">{titletagglearr[titledefaule]}</div>
        <Outlet />
      </div>
      <div className="bottombox">
        <div className="bottomleft">
          最后更新于 {dataJson.endedOn && endTime(dataJson.endedOn)}
        </div>
        <div className="bottomright">
          {isHidden && <a href='logo512.png' download="下载会话数据">下载会话数据</a>}
        </div>
      </div>
    </div>
  );
}

export default App;
