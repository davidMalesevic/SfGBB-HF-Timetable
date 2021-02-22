import next from "next";
import React from "react";
import {
  addDays,
  differenceInDays,
  parseISO,
  format,
  isFriday,
  isSaturday,
} from "date-fns";

function DatesInRange(startDate, endDate) {
  const days = differenceInDays(endDate, startDate);
  return [...Array(days + 1).keys()].map((i) => addDays(startDate, i));
}

function Semester({ semester }) {
  const start = new Date(semester.StartEnd.Start);
  const end = new Date(semester.StartEnd.End);
  const datesInRange = DatesInRange(start, end);
  const schoolDays = datesInRange.filter(
    (day) => isFriday(day) || isSaturday(day)
  );
  const dayBlocks = schoolDays.map((day, index) =>
    isFriday(day) ? (
      <React.Fragment key={index}>
        <div className="day">{format(day, "dd.MM")}</div>
        <div className="day">Vormittag</div>
        <div className="day">Nachmittag</div>
      </React.Fragment>
    ) : (
      <React.Fragment key={index}>
        <div className="day">{format(day, "dd.MM")}</div>
        <div className="day">Vormittag</div>
      </React.Fragment>
    )
  );

  return (
    <div key={semester.id}>
      <h1>{semester.Name}</h1>
      <p>
        {format(parseISO(semester.StartEnd.Start), "dd.MM.yyyy")} -{" "}
        {format(parseISO(semester.StartEnd.End), "dd.MM.yyyy")}
      </p>
      <div className="dayList">{dayBlocks}</div>
    </div>
  );
}
export default Semester;
