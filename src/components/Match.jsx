import React, { useState, useEffect } from "react"
import { motion } from "motion/react"
import '../css/Match.css';

// dummy school data for matching
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

export default function Match() {
  const [schools, setSchools] = useState([])
  const [lastDirection, setLastDirection] = useState(null)
  const [isVisible, setIsVisible] = useState(true) // possible animation for later implementation

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
    
    } else {
      // no user input
      <p>Please complete the survey.</p>
    }
  }, [])

  const removeTopCard = (direction) => {
    if (!schools.length) return
    setLastDirection(direction)
    setSchools(prev => prev.slice(0, -1))
  }

  return (
    <div className="container">
      <h1 className="title">Matched Schools</h1>
      {schools.length === 0 ? (
        <p>There are no schools left. Please retake the survey or contact us for more options.</p>
      ) : (
        <>
          <div className="cardContainer">
            {schools.map((school, index) => {
              const isTop = index === schools.length - 1
              return (
                <motion.div
                  key={school.id}
                  className="swipe"
                  drag={isTop ? "x" : false}
                  onDragEnd={(event, info) => {
                    if (info.offset.x > 100) removeTopCard("no")
                    else if (info.offset.x < -100) removeTopCard("yes")
                  }}
                  dragConstraints={{ left: 0, right: 0 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ zIndex: index }}
                >
                  <div className="card">
                    <div
                      className="card-image"
                      style={{ backgroundImage: `url(${school.Picture})` }}
                    ></div>
                    <div className="card-info">
                      <h3>{school.Name}</h3>
                      <p>Qualifications: {school.PrefLevel}</p>
                      <p>{school.Location}</p>
                      <div className="tags">
                        {school.Values.split(',').map((value, idx) => (
                          <span key={idx} className="tag">{value.trim()}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
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
      )}
    </div>
  )
}