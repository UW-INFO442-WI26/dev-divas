import "../css/FindSchool.css";

const dummySchools = [
  {
    id: 1,
    Name: "Elo High School",
    Location: "California, USA",
    Picture: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54",
    Values: "Strong mission, Community service",
    PrefLevel: "High school"
  },
  {
    id: 2,
    Name: "Sanchez Primary School",
    Location: "New York, USA",
    Picture: "https://images.unsplash.com/photo-1562774053-701939374585",
    Values: "Flexible worktime, Fun students",
    PrefLevel: "Middle School"
  },
  {
    id: 3,
    Name: "Yoshea Elementary School",
    Location: "Massachusetts, USA",
    Picture: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54",
    Values: "Friendly staff, Community service",
    PrefLevel: "Middle School"
  },
  {
    id: 4,
    Name: "Almond Academy",
    Location: "Texas, USA",
    Picture: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54",
    Values: "Strong mission, Friendly staff",
    PrefLevel: "High school"
  },
  {
    id: 5,
    Name: "Layhay Primary School",
    Location: "Florida, USA",
    Picture: "https://images.unsplash.com/photo-1562774053-701939374585",
    Values: "Fun students, Flexible worktime",
    PrefLevel: "Middle School"
  }
]

export default function FindSchool() {
  return (
    <div>
      <section className="school-list">
        <h1>Schools that need you now</h1>
        <p>
          These schools have the most urgent need for volunteer teachers.
        </p>
        
        <div className="school-card-container">
          {dummySchools.map((school) => (
            <div key={school.id} className="school-card">
              <img src={school.Picture} alt={school.Name} className="school-image" />
              <div className="school-info">
                <h2>{school.Name}</h2>
                <p>{school.Location}</p>
                <p>Values: {school.Values}</p>
                <p>Preferred Level: {school.PrefLevel}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}