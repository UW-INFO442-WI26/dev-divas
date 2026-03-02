import "../css/FindSchool.css";
import { useState } from "react";
import { dummySchools } from "./Match";

export default function FindSchool() {
  const [selectedSchool, setSelectedSchool] = useState(null)

  const openModal = (school) => {
    setSelectedSchool(school)
  }

  const closeModal = () => {
    setSelectedSchool(null)
  }

  return (
    <div>
      <section className="school-list">
        <h1>Schools that need you now</h1>
        <p>
          These schools have the most urgent need for volunteer teachers.
        </p>
        
        <div className="school-card-container">
          {dummySchools.map((school) => (
            <div key={school.id} className="school-card" onClick={() => openModal(school)}>
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

        {selectedSchool && (
        <div className="modal-container" onClick={closeModal}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <img
              className="modal-image"
              src={selectedSchool.Picture}
              alt={selectedSchool.Name}
            />
            <h2 className="modal-title">{selectedSchool.Name}</h2>
            <p className="modal-text"><strong>Location:</strong> {selectedSchool.Location || "Not available"}</p>
            <p className="modal-text"><strong>Values:</strong> {selectedSchool.Values || "Not available"}</p>
            <p className="modal-text"><strong>Preferred Level:</strong> {selectedSchool.PrefLevel || "Not available"}</p>
            <p className="modal-text"><strong>Available Time:</strong> {selectedSchool.AvailableTime || "Not available"}</p>
            <p className="modal-text"><strong>Description:</strong> {selectedSchool.Description || "Not available"}</p>
            <p className="modal-text"><strong>Contact:</strong> {selectedSchool.Contact || "Not available"}</p>
            <p className="modal-text">
              <strong>Link:</strong>{" "}
              {selectedSchool.Link ? (
                <a href={selectedSchool.Link} target="_blank" rel="noreferrer">
                  {selectedSchool.Link}
                </a>
              ) : (
                "Not available"
              )}
            </p>
            <button className="modal-close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
      </section>
    </div>
  )
}