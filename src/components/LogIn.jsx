import "../css/LogIn.css";

function LogIn() {
  return (
    <div className="login-page">
      <h1>Sign In</h1>

      <form className="login-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Your Name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Your Email" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Your Password" />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LogIn;
