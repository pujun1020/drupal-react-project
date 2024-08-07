
import "@/components/active/active.css";

//表格title

export default function Active() {
    return (
        <div className="activewapper">
            <div className="nosuorce-wapper">
                <div className="cardicon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                </div>
                <div className="nosuorce-title">没有活动分数</div>
            </div>
        </div>
    );
}