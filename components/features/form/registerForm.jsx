import React from "react";

export default function registerForm() {
  return (
    <div>
      {" "}
      <form action="#">
        <div className="form-group">
          <label htmlFor="singin-email">Your email address:</label>
          <input
            type="email"
            className="form-control"
            id="register-email"
            name="register-email"
            placeholder="Your Email address *"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="singin-password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="register-password"
            name="register-password"
            placeholder="Password *"
            required
          />
        </div>
        <div className="form-footer">
          <div className="form-checkbox">
            <input
              type="checkbox"
              className="custom-checkbox"
              id="register-agree"
              name="register-agree"
              required
            />
            <label className="form-control-label" htmlFor="register-agree">
              I agree to the privacy policy
            </label>
          </div>
        </div>
        <button className="btn btn-dark btn-block btn-rounded" type="submit">
          Register
        </button>
      </form>
      <div className="form-choice text-center">
        <label className="ls-m">or Register With</label>
        <div className="social-links">
          {/* <ALink
        href="#"
        className="social-link social-google fab fa-google border-no"
      ></ALink>
      <ALink
        href="#"
        className="social-link social-facebook fab fa-facebook-f border-no"
      ></ALink>
      <ALink
        href="#"
        className="social-link social-twitter fab fa-twitter border-no"
      ></ALink> */}
        </div>
      </div>
    </div>
  );
}
