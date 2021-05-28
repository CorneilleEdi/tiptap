const dayjs = require("dayjs");


export const DateUtil = {
    milliToDate(milli) {
        return milli ? dayjs(milli).toString() : "";
    }
}
