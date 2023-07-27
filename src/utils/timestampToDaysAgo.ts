// 这里的 timestamp 是 13 位的毫秒级时间戳
function timestampToDaysAgo(timestamp: number) {
    const currentTimestamp = Date.now();
    const differenceInSeconds = Math.floor(
        (currentTimestamp - timestamp) / 1000
    );
    const differenceInDays = Math.floor(differenceInSeconds / (60 * 60 * 24));

    if (differenceInDays === 0) {
        return 'Today';
    } else if (differenceInDays === 1) {
        return '1 day ago';
    } else {
        return `${differenceInDays} days ago`;
    }
}

export default timestampToDaysAgo;
