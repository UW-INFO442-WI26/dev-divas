import "../css/Home.css";

function Home() {
  return (
    <div className="home">


      <section className="hero">
        <h1>Every classroom deserves all the help it needs.</h1>

        <p>
          We match volunteer teachers with schools and organizations
          that need support the most.
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