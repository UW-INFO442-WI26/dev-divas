// Nicole: I have used all of this page for matching algorithm
// TODO: Just render the dummy school as simple cards for viewing

// import React, { useState } from "react"
// import { motion } from "motion/react"
// import "../index.css" 

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
      <h1>Review Schools</h1>
    </div>
  )
}

// function FindSchool() {
//   const [schools, setSchools] = useState(dummySchools)
//   const [lastDirection, setLastDirection] = useState(null)
//   const [isVisible, setIsVisible] = useState(true)

//   const removeTopCard = (direction) => {
//     if (!schools.length) return
//     setLastDirection(direction)
//     setSchools(prev => prev.slice(0, -1))
//   }

//   return (
//     <div className="app">
//       <h1>Review Schools</h1>

//       <div className="cardContainer">
//         {schools.map((school, index) => {
//           const isTop = index === schools.length - 1
//           return (
//             <motion.div
//               key={school.id}
//               className="swipe"
//               drag={isTop ? "x" : false}
//               onDragEnd={(event, info) => {
//                 if (info.offset.x > 100) removeTopCard("right")
//                 else if (info.offset.x < -100) removeTopCard("left")
//               }}
//               dragConstraints={{ left: 0, right: 0 }}
//               whileTap={{ scale: 0.95 }}
//               style={{ zIndex: index }}
//             >
//               <div
//                 className="card"
//                 style={{ backgroundImage: `url(${school.Picture})` }}
//               >
//                 <h3>{school.Name}</h3>
//                 <p>{school.Location}</p>
//                 <div className="tags">
//                   {school.Values.split(',').map((value, idx) => (
//                     <span key={idx} className="tag">{value.trim()}</span>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )
//         })}
//       </div>

//       <div className="buttons">
//         <button onClick={() => removeTopCard("left")}>Swipe left</button>
//         <button onClick={() => removeTopCard("right")}>Swipe right</button>
//       </div>

//       {lastDirection && (
//         <h2 className="infoText">You swiped {lastDirection}</h2>
//       )}
//     </div>
//   )
// }

// export default FindSchool
