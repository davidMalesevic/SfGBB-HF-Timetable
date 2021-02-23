import {
  addDays,
  differenceInDays,
  parseISO,
  format,
  isFriday,
  isSaturday,
} from "date-fns";

function Timetable({ fridays, saturdays, schoolClasses }) {
  console.log(fridays);
  console.log(saturdays);
  return (
    <div className="gridColumn">
      <div className="column">
        {fridays.map((friday) => (
          <React.Fragment>
            {schoolClasses.map((schoolClass) => (
              <div className="row">
                <div className="border date">{format(friday, "E dd.MM")}</div>
                <div className="border subject">
                  {schoolClass.Name}
                  Vormittag
                </div>
                <div className="border subject">
                  {schoolClass.Name}
                  Nachmittag
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="column">
        {saturdays.map((saturday) => (
          <React.Fragment>
            {schoolClasses.map((schoolClass) => (
              <div className="row">
                <div className="border date">{format(saturday, "E dd.MM")}</div>
                <div className="border subject">
                  {schoolClass.Name}
                  Vormittag
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Timetable;
