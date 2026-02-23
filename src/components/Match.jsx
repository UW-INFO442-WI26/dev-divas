import React, { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { database } from '../firebase.js'
import { motion } from 'motion/react'
import '../index.css'

const schoolRef = ref(database, "Schools")

function Match() {
  const [schools, setSchools] = useState([])
  const [lastDirection, setLastDirection] = useState(null)

  useEffect(() => {
    const unsubscribe = onValue(schoolRef, snapshot => {
      const data = snapshot.val()
      if (data) {
        const schoolsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }))
        setSchools(schoolsArray)
      }
    })
    return unsubscribe
  }, [])

  const removeTopCard = (direction) => {
    if (!schools.length) return
    setLastDirection(direction)
    setSchools(prev => prev.slice(0, -1))
  }

  return (
    <div className="app">
      <h1>School Matcher</h1>

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
        <button onClick={() => removeTopCard("left")}>Swipe left!</button>
        <button onClick={() => removeTopCard("right")}>Swipe right!</button>
      </div>

      {lastDirection && (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      )}
    </div>
  )
}

export default Match