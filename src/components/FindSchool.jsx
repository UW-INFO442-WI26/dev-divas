import React, { useState } from "react"
import { motion } from "motion/react"
import "../index.css" 

const dummySchools = [
  {
    id: 1,
    Name: "Stanford University",
    Location: "California, USA",
    Picture: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54",
    Values: "Computer Science, Innovation, Research"
  },
  {
    id: 2,
    Name: "New York University",
    Location: "New York, USA",
    Picture: "https://images.unsplash.com/photo-1562774053-701939374585",
    Values: "Business, Arts, Volunteerism"
  },
  {
    id: 3,
    Name: "MIT",
    Location: "Massachusetts, USA",
    Picture: "./public/mock-school-1.jpg",
    Values: "Engineering, Research, Technology"
  }
]

function FindSchool() {
  const [schools, setSchools] = useState(dummySchools)
  const [lastDirection, setLastDirection] = useState(null)

  const removeTopCard = (direction) => {
    if (!schools.length) return
    setLastDirection(direction)
    setSchools(prev => prev.slice(0, -1))
  }

  return (
    <div className="app">
      <h1>Review Schools</h1>

      <div className="cardContainer">
        {schools.map((school, index) => {
          const isTop = index === schools.length - 1
          return (
            <motion.div
              key={school.id}
              className="swipe"
              drag={isTop ? "x" : false}
              onDragEnd={(event, info) => {
                if (info.offset.x > 100) removeTopCard("right")
                else if (info.offset.x < -100) removeTopCard("left")
              }}
              dragConstraints={{ left: 0, right: 0 }}
              whileTap={{ scale: 0.95 }}
              style={{ zIndex: index }}
            >
              <div
                className="card"
                style={{ backgroundImage: `url(${school.Picture})` }}
              >
                <h3>{school.Name}</h3>
                <p>{school.Location}</p>
                <div className="tags">
                  {school.Values.split(',').map((value, idx) => (
                    <span key={idx} className="tag">{value.trim()}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="buttons">
        <button onClick={() => removeTopCard("left")}>Swipe left</button>
        <button onClick={() => removeTopCard("right")}>Swipe right</button>
      </div>

      {lastDirection && (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      )}
    </div>
  )
}

export default FindSchool
