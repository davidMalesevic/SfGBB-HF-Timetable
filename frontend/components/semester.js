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
import Timetable from "./timetable";

function DatesInRange(startDate, endDate) {
  const days = differenceInDays(endDate, startDate);
  return [...Array(days + 1).keys()].map((i) => addDays(startDate, i));
}

function AllClasses(degreePlans) {
  const allClasses = degreePlans.flatMap((plan) => plan.Classes);
  return allClasses;
}

function Semester({ semester }) {
  const start = new Date(semester.StartEnd.Start);
  const end = new Date(semester.StartEnd.End);
  const datesInRange = DatesInRange(start, end);
  const fridays = datesInRange.filter((day) => isFriday(day));
  const saturdays = datesInRange.filter((day) => isSaturday(day));
  console.log(semester);

  const classes = AllClasses(semester.degree_plans);
  console.log(classes);

  return (
    <div key={semester.id}>
      <h1>{semester.Name}</h1>
      <p>
        {format(parseISO(semester.StartEnd.Start), "dd.MM.yyyy")} -{" "}
        {format(parseISO(semester.StartEnd.End), "dd.MM.yyyy")}
      </p>
      <div>
        <Timetable
          fridays={fridays}
          saturdays={saturdays}
          schoolClasses={classes}
        />
      </div>
    </div>
  );
}
export default Semester;
