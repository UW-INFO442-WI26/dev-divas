import React, { useState, useEffect } from "react"
// import { motion } from "motion/react"
import '../css/Match.css';

// dummy school data for matching
export const dummySchools = [
  {
    id: 1,
    Name: "Elo High School",
    Location: "California, USA",
    Picture: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54",
    Values: "Strong mission, Community service",
    PrefLevel: "High school",
    AvailableTime: "Feb 4, 2026 - June 20, 2026",
    Description: "Elo High School has been established for over 50 years and has been committed to showcase culture and acceptance in the community. They are looking for volunteers who can help with their after-school programs for English and Mathematics tutoring.",
    Link: "https://www.elohighschool.org",
    Contact: "contact@elohighschool.org"
  },
  {
    id: 2,
    Name: "Sanchez Primary School",
    Location: "New York, USA",
    Picture: "https://images.unsplash.com/photo-1562774053-701939374585",
    Values: "Flexible worktime, Fun students",
    PrefLevel: "Middle School",
    AvailableTime: "March 4, 2026 - August 20, 2026",
    Description: "Sanchez Primary School is seeking volunteers who could assist with facilitating their events on promoting reading and mathematics literacy skills that will be hosted during class as break time events. They are flexible with the time commitments of volunteers and welcome any volunteers who wish to make deeper connections with students and gain experience.",
    Link: "https://www.sanchezprimaryschool.org",
    Contact: "contact@sanchezprimaryschool.org"
  },
  {
    id: 3,
    Name: "Yoshea Elementary School",
    Location: "Massachusetts, USA",
    Picture: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54",
    Values: "Friendly staff, Community service",
    PrefLevel: "Middle School",
    AvailableTime: "August 4, 2026 - Not Set",
    Description: "Yoshea Elementary School is a newly establied school in rural aareas of Massachusetts. They are in need for volunteers who are qualified to help with their school programs in promoting literacy and mathematics skills. They are looking for volunteers who value strong community connections and services.",
    Link: "https://www.yosheaelementaryschool.org",
    Contact: "contact@yosheaelementaryschool.org"
  },
  {
    id: 4,
    Name: "Almond Academy",
    Location: "Texas, USA",
    Picture: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54",
    Values: "Strong mission, Friendly staff",
    PrefLevel: "High school",
    AvailableTime: "Feb 4, 2026 - June 20, 2026",
    Description: "Almond Academy is a determined institution valuing the wellness of their students and staff. They promote free and accessible education for all, and are committed to fostering a friendly learning environment. They are looking for volunteers who support and align with these missions and are dedicated to making a positive impact.",
    Link: "https://www.almondacademy.org",
    Contact: "contact@almondacademy.org"
  },
  {
    id: 5,
    Name: "Layhay Primary School",
    Location: "Florida, USA",
    Picture: "https://images.unsplash.com/photo-1562774053-701939374585",
    Values: "Fun students, Flexible worktime",
    PrefLevel: "Middle School",
    AvailableTime: "April 29, 2026 - October 20, 2026",
    Description: "Layhay Primary School has been established since 2010. They are dedicated to make learning fun and engaging for their students. Willing to accomodate volunteers with flexible worktime, they are looking for volunteers who are creative and can help with establishing their fun learning agendas.",
    Link: "https://www.layhayprimaryschool.org",
    Contact: "contact@layhayprimaryschool.org"
  }
]

export default function Match() {
  const [schools, setSchools] = useState([])
  const [lastDirection, setLastDirection] = useState(null)
  const [matchCount, setMatchCount] = useState(0) // count of matches made
  const [successMatch, setSuccessMatch] = useState([]) // state for successful match
  const [selectedSchool, setSelectedSchool] = useState(null)

  // using the locally stored survey data to filter the dummy school data for matching
  // TODO: maybe should've used the database?
  useEffect(() => {
    const userData = localStorage.getItem('userSurveyData')
    if (userData) {
      const surveyData = JSON.parse(userData)
      const userInterests = surveyData.question1 || [] 
      const userEducation = surveyData.question2 || [] 

      // filter schools based on user interests and education level
      const filteredSchools = dummySchools.filter(school => {
        // split by values and match possible interests
        const schoolValues = school.Values.split(',').map(v => v.trim())
        const interestMatch = userInterests.some(interest => schoolValues.includes(interest))

        // if statements handlling bars for education levels
        const educationMatch = userEducation.some(edu => {
          // handling middle school cases
          if (edu === "Middle School") return school.PrefLevel === "Middle School" 
          // this works for now since the dummy data's lowest bar for edu level is high school and beyond
          if (edu === "High school" || edu === "Beyond high school" || edu === "College/University" || edu === "Masters" || edu === "PhD") return school.PrefLevel === "High school"
          return false // edge case, return false since the input is unknown
        })

        return interestMatch && educationMatch
      })

      setSchools(filteredSchools) // set results
      setMatchCount(filteredSchools.length) // set match count
    
    } else {
      // no user input
      <p>Please complete the survey.</p>
    }
  }, [])

  const removeTopCard = (direction) => {
    if (!schools.length) return
    setLastDirection(direction)
    setSchools(prev => prev.slice(0, -1))
    if (direction === "Yes") {
      setSuccessMatch(prev => [...prev, schools[schools.length - 1]])
    }
  }

  const openModal = (school) => {
    setSelectedSchool(school)
  }

  const closeModal = () => {
    setSelectedSchool(null)
  }

  return (
    <div className="container">
      {/* title: render how many schools matched  */}
      <h1 className="title">
        Matched Schools ({schools.length}/{matchCount})
      </h1>
      {/* conditions: different situations for rendering match results */}
      {(() => {
        // no initial matches at all
        if (matchCount === 0) {
          return (
            <p>
              There are no schools matched. Please retake the survey or contact
              us for more options.
            </p>
          )
        }

        // have matches and have schools to swipe/select
        if (schools.length > 0) {
          return (
            <>
              <div className="card-container">
                {schools.map((school, index) => {
                  const isTop = index === schools.length - 1
                  return (
                    <div
                      key={school.id}
                      className="swipe"
                      drag={isTop ? "x" : false}
                      onDragEnd={(event, info) => {
                        if (info.offset.x > 100) removeTopCard("No")
                        else if (info.offset.x < -100) removeTopCard("Yes")
                      }}
                      dragConstraints={{ left: 0, right: 0 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ zIndex: index }}
                    >
                      <div className="card" onClick={() => openModal(school)}>
                        <div
                          className="card-image"
                          style={{ backgroundImage: `url(${school.Picture})` }}
                        ></div>
                        <div className="card-info">
                          <h3>{school.Name}</h3>
                          <p>Qualifications: {school.PrefLevel}</p>
                          <p>{school.Location}</p>
                          <div className="tags">
                            {school.Values.split(",").map((value, idx) => (
                              <span key={idx} className="tag">
                                {value.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="buttons">
                <button onClick={() => removeTopCard("Yes")}>Yes</button>
                <button onClick={() => removeTopCard("No")}>No</button>
              </div>

              {lastDirection && (
                <h2 className="infoText">You chose {lastDirection}</h2>
              )}
            </>
          )
        }

        // there are matched but user selected "No" for all of them
        if (successMatch.length === 0) {
          return <p>No matches selected. Please retake the survey to try again.</p>
        }

        // render school cards that user has selected "Yes" for
        return (
          <>
            <h2 className="congrats">
              Congratulations! You have matched with these schools!
            </h2>
            <div className="congrats-card-container">
              {successMatch.map((school, index) => (
                <div key={index} className="congrats-card" onClick={() => openModal(school)}>
                  <img
                    src={school.Picture}
                    alt={school.Name}
                    className="card-image"
                  />
                  <div className="card-info">
                    <p>{school.Name}</p>
                    <p>Location: {school.Location}</p>
                    <p>Qualifications: {school.PrefLevel}</p>
                    <div className="tags">
                      {school.Values.split(",").map((value, idx) => (
                        <span key={idx} className="tag">
                          {value.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      })()}

      {selectedSchool && (
        <div className="modal-container" onClick={closeModal}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <img
              className="modal-image"
              src={selectedSchool.Picture}
              alt={selectedSchool.Name}
            />
            <h2 className="modal-title">{selectedSchool.Name}</h2>
            <p className="modal-text">Location: {selectedSchool.Location || "Not available"}</p>
            <p className="modal-text">Values: {selectedSchool.Values || "Not available"}</p>
            <p className="modal-text">Preferred Level: {selectedSchool.PrefLevel || "Not available"}</p>
            <p className="modal-text">Available Time: {selectedSchool.AvailableTime || "Not available"}</p>
            <p className="modal-text">Description: {selectedSchool.Description || "Not available"}</p>
            <p className="modal-text"><span className="text-highlight">Contact: {selectedSchool.Contact || "Not available"} </span></p>
            <p className="modal-text">
              Link:{" "}
              {selectedSchool.Link ? (
                <a href={selectedSchool.Link} target="_blank" rel="noreferrer">
                  {selectedSchool.Link}
                </a>
              ) : (
                "Not available"
              )}
            </p>
            <button className="modal-close" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}