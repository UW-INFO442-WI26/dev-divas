import "../css/Home.css";

function Home() {
  return (
    <div className="home">


      <section className="hero">
        <h1>Every classroom deserves all the help it needs.</h1>

        <p>
          We help schools find the support they need by matching them with
          passionate volunteer educators who are eager to make a difference
          in students’ learning experiences.
        </p>

        <div className="hero-buttons">
          <button className="browse-btn">Browse Schools</button>
          <button className="volunteer-outline">Volunteer Now!</button>
        </div>
      </section>
      

      <section className="stats">
        <div>
          <h2>120+</h2>
          <p>Schools Registered</p>
        </div>

        <div>
          <h2>850+</h2>
          <p>Active Volunteers</p>
        </div>

        <div>
          <h2>2,400+</h2>
          <p>Matches Made</p>
        </div>
      </section>

    </div>
  );
}

export default Home;