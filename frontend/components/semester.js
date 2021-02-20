import next from "next";

function Semester({ semester }) {
  const start = new Date(semester.StartEnd.Start);
  const end = new Date(semester.StartEnd.End);

  return (
    <div key={semester.id}>
      <h1>{semester.Name}</h1>
      <p>
        {start.toLocaleDateString("de-CH")} - {end.toLocaleDateString("de-CH")}
      </p>
    </div>
  );
}
export default Semester;
