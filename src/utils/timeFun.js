const endTime = (time, isTure) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const localTimeStr = date.toLocaleString();
    let formattedTime = null;
    if (isTure === true) {
        formattedTime = `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日`;

    } else if (isTure === false) {
        formattedTime = `${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    } else if (isTure === "hms") {
        formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    }else {
        formattedTime = localTimeStr.replace(/(^\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(.\d{3})Z/, `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${year}-${month}-${day}`);
    }
    return formattedTime;
};

const timeDetail = (Detailvalue) => {
    const diff = Math.abs(Detailvalue);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    let formattedTime = `${hours}时 ${minutes}分 ${seconds}秒`;
    return formattedTime;; // 输出：00:00:08
};

export { endTime, timeDetail }