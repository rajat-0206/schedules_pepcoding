let dayjs = require("dayjs");
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);





const getDays = (year, month) => {
  return dayjs(`${year}-${month}-01`).daysInMonth();
}

const getCurrent = (year, month) => {
  return [...Array(getDays(year, month))].map((day, index) => {
    return {
      date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: true
    };
  });
}

const getPrevious = (year, month, currentMonthDays) => {
  const firstday = getWeekday(currentMonthDays[0].date);
  const lastmonth = dayjs(`${year}-${month}-01`).subtract(1, "month");


  const daytoshow = firstday
    ? firstday - 1
    : 6;

  const lastmonday = dayjs(currentMonthDays[0].date)
    .subtract(daytoshow, "day")
    .date();

  return [...Array(daytoshow)].map((day, index) => {
    return {
      date: dayjs(
        `${lastmonth.year()}-${lastmonth.month() +
        1}-${lastmonday + index}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: lastmonday + index,
      isCurrentMonth: false
    };
  });
}

const getNext = (year, month, currentMonthDays) => {
  const lastday = getWeekday(
    `${year}-${month}-${currentMonthDays.length}`
  );
  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
  const daytoshow = lastday
    ? 7 - lastday
    : lastday;
  return [...Array(daytoshow)].map((day, index) => {
    return {
      date: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false
    };
  });
}

const getWeekday = (date) => {
  return dayjs(date).weekday();
}

const getCalender = (year, month) => {
  if (!year && !month) {
    year = dayjs().format("YYYY");
    month = dayjs().format("M");
  }
  else {
    year = dayjs(year).format("YYYY");
    month = dayjs(month).format("M");
  }


  let currentDays = getCurrent(year, month);
  let lastDays = getPrevious(year, month, currentDays);
  let nextDays = getNext(year, month, currentDays);
  let days = [...lastDays, ...currentDays, ...nextDays];
  return days;

}

module.exports = getCalender;