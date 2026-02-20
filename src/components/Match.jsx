import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { ref, onValue, get, getDatabase } from 'firebase/database';
// import { database } from '../firebase.js';
import '../index.css';
import app from '../Firebase.js';

const database = getDatabase(app);
const schoolRef = ref(database, "Schools")

function Match () {
  const [schools, setSchools] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  useEffect(() => {
    const unsubscribe = onValue(schoolRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const schoolsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setSchools(schoolsArray);
        setCurrentIndex(schoolsArray.length - 1);
      }
    });
    return unsubscribe;
  }, []);

  const childRefs = useMemo(
    () =>
      Array(schools.length)
        .fill(0)
        .map((i) => React.createRef()),
    [schools.length]
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < schools.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < schools.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {schools.map((school, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={school.id}
            onSwipe={(dir) => swiped(dir, school.Name, index)}
            onCardLeftScreen={() => outOfFrame(school.Name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + school.Picture + ')' }}
              className='card'
            >
              <h3>{school.Name}</h3>
              <p>{school.Location}</p>
              <div className='tags'>
                {school.Values.split(',').map((value, idx) => (
                  <span key={idx} className='tag'>{value.trim()}</span>
                ))}
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  )
}

export default Match