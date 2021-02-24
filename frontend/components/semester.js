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
import Masterplan from "./masterplan";

function DatesInRange(startDate, endDate) {
  const days = differenceInDays(endDate, startDate);
  return [...Array(days + 1).keys()].map((i) => addDays(startDate, i));
}

function LessonBlocks(subject) {
  console.log(subject);
  let i = 0;
  let lessonBlocks = [];
  for (i = 0; i < subject.slots; i++) {
    lessonBlocks.push({ name: subject.name, teacher: "hans" });
  }

  return lessonBlocks;
}

function LessonSlots(datesInRange, vacations) {
  const schoolDaysInRange = datesInRange.filter(
    (day) => isFriday(day) || isSaturday(day)
  );

  const allVacationDates = vacations.flatMap((vacation) => vacation.dates);
  const vacationDates = allVacationDates.flat();

  const schoolDates = schoolDaysInRange.filter(
    (date) =>
      !vacationDates.some((vacDate) => vacDate.getTime() === date.getTime())
  );

  const slots = schoolDates.map(function (date) {
    if (isFriday(date)) {
      const schoolDay = {
        date: date,
        slots: [
          {
            nr: 1,
            subject: null,
            tutor: null,
          },
          {
            nr: 2,
            subject: null,
            tutor: null,
          },
        ],
        class: null,
      };
      return schoolDay;
    } else {
      const schoolDay = {
        date: date,
        slots: [
          {
            nr: 1,
            subject: null,
            tutor: null,
          },
        ],
        class: null,
      };
      return schoolDay;
    }
  });

  console.log(slots);

  return [schoolDates];
}

function AllClasses(degreePlans) {
  const allClasses = degreePlans.flatMap((plan) => plan.Classes);
  return allClasses;
}

function CleanClasses(allClasses) {
  const groupsOfStudents = allClasses.map((group, index) => {
    const subjectsInfo = group.Subjects.map((subject) => {
      const tutorsInfo = subject.tutors.map((tutor) => {
        const tutorInfo = {
          name: tutor.Name,
          isBerliner: tutor.isBerliner,
        };
        return tutorInfo;
      });
      const subjectInfo = {
        name: subject.Name,
        tutors: tutorsInfo,
        lessonCount: subject.NumberOfLessons,
        slots: subject.NumberOfLessons / 5,
      };
      return subjectInfo;
    });
    const groupOfStudents = {
      index: index,
      name: group.Name,
      subjects: subjectsInfo,
    };
    return groupOfStudents;
  });
  return groupsOfStudents;
}

function Semester({ semester }) {
  const vacations = semester.vacations.map((vacation) => {
    const vacationData = {
      name: vacation.Name,
      dates: [
        DatesInRange(
          new Date(vacation.VacationStartEnd.Start),
          new Date(vacation.VacationStartEnd.End)
        ),
      ],
    };
    return vacationData;
  });

  const start = new Date(semester.StartEnd.Start);
  const end = new Date(semester.StartEnd.End);
  const datesInRange = DatesInRange(start, end);
  const lessonSlots = LessonSlots(datesInRange, vacations);
  const lessonSlotCount = lessonSlots.map((lessonSlot) => lessonSlot.length);
  const classes = AllClasses(semester.degree_plans);
  const cleanClasses = CleanClasses(classes);
  const cleanClass = cleanClasses[0];
  console.log(cleanClass);

  const lessonBlocks = cleanClass.subjects.map((subject) => {
    const blocks = LessonBlocks(subject);
    return blocks;
  });

  console.log(lessonBlocks);

  return (
    <div key={semester.id}>
      <h1>{semester.Name}</h1>
      <p>
        {format(parseISO(semester.StartEnd.Start), "dd.MM.yyyy")} -{" "}
        {format(parseISO(semester.StartEnd.End), "dd.MM.yyyy")}
      </p>
      <div></div>
    </div>
  );
}
export default Semester;
