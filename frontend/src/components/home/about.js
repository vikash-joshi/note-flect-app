import React from "react";
import { Link } from "react-router-dom";
import "./about.css"
export default function About() {
  return (
    <>
    
    <div className="container">
      <div className="row homecontent mt-4">
        <div className="col-md-5">
          <div className="jumbotron jumbotron_additon text-black">
            
            <h3 className="display-4" style={{fontSize:'49px'}}>Welcome To NoteFlect
              {/*<Typing text="Welcome To NoteFlect"><span></span></Typing>*/}
              </h3>
            <p data-aos-delay="350"   data-aos-anchor-placement="top-bottom" data-aos="zoom-in">I am a software engineer, and I developed NoteFlect — a simple yet powerful notes-taking application designed to streamline your productivity.</p>
            <hr data-aos-delay="350"   data-aos-anchor-placement="top-bottom" data-aos="zoom-in" />
            <p  data-aos-delay="500" data-aos="zoom-in">Whether you’re managing your tasks, jotting down ideas, or organizing important information, NoteFlect helps you keep everything in one place.</p>
            <hr data-aos-delay="600" data-aos="zoom-in" />
            <p  data-aos-delay="700" data-aos="zoom-in">As a full-stack engineer, I aimed to build a clean, intuitive interface that simplifies note-taking, whether you're at home, work, or on the go.
            </p>
            <hr data-aos-delay="800" data-aos="zoom-in" />
            <p  data-aos-delay="900" data-aos="zoom-in">Connect with Me: Feel free to explore my professional profiles to learn more about my work and projects:
            </p>
            <ul data-aos-delay="1000" data-aos="zoom-in">
              <li>GitHub</li>
              <li>LinkedIn</li>
            </ul>
            <p data-aos-delay="1100" data-aos="zoom-in">Thank you for visiting NoteFlect. I hope you find it as useful and intuitive as I intended it to be!</p>
            <Link className="btn btn-primary btn-lg" to="/Login" role="button">Get Started</Link>
          </div>

        </div>
        <div className="col-md-7">
          <img className="about_right_img" src="https://img.freepik.com/free-vector/coach-speaking-before-audience-mentor-presenting-charts-reports-employees-meeting-business-training-seminar-conference-vector-illustration-presentation-lecture-education_74855-8294.jpg?t=st=1724006342~exp=1724009942~hmac=72ae27eeaa14139721d8f2e6da5093f0debbdccdd9ed776683e6b4a402a7c7b4&amp;w=1800"
          /> </div>


      </div>  
      </div>

      <div className="container-fluid p-5 login_register_left_panel mt-5 text-white">
<blockquote className="blockquote">
  <p className="mb-0"><b>Noteflect</b>:
Illuminate Your Ideas with Clarity.
Effortlessly Organize Your Thoughts.
Reflect on Your Progress.
Empower Your Growth with Every Note.</p>
</blockquote>
      </div>
         <div style={{padding:'60px',background:'#eef3ff',marginTop:'35px'}} className="container-fluid text-center">
        <h2 className="fw-bold text-primary mb-4">Features</h2>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-12 mb-4">
            <div className="card_ shadow-sm p-3">
              <div className="circle-icon bg-dark mx-auto mb-3 d-flex justify-content-center align-items-center "><span className="about_us_icon material-symbols-outlined">
                checklist
              </span></div>
              <h4 className="card_-title">Organized Notes</h4>
              <p className="card_-text">Create and manage categories to keep your notes structured.</p>

            </div>
          </div>
          <div className="col-lg-4 col-12 mb-4">
            <div className="card_ shadow-sm p-3">
              <div className="circle-icon bg-primary mx-auto mb-3 d-flex justify-content-center align-items-center "><span className="about_us_icon material-symbols-outlined">
                colors
              </span></div>
              <h4 className="card-title">Rich Text Editor</h4>
              <p className="card-text">Style your notes with different formatting options, add links, and more.</p>

            </div>
          </div>
          <div className="col-lg-4 col-12 mb-4">
            <div className="card_ shadow-sm p-3">
              <div className="circle-icon bg-success mx-auto mb-3 d-flex justify-content-center align-items-center "><span className="about_us_icon material-symbols-outlined">
                mic
              </span></div>
              <h4 className="card-title">Voice & File Upload</h4>
              <p className="card-text">Add notes using voice input or file uploads for flexibility.</p>

            </div>
          </div>
          <div className="col-lg-4 col-12 mb-4">
            <div className="card_ shadow-sm p-3">
              <div className="circle-icon bg-danger mx-auto mb-3 d-flex justify-content-center align-items-center "><span className="about_us_icon material-symbols-outlined">
                lock_person
              </span></div>
              <h4 className="card-title">Authentication</h4>
              <p className="card-text">Secure login and account management features, ensuring your notes are safe.</p>

            </div>
          </div>


          <div className="col-lg-4 col-12 mb-4">
            <div className="card_ shadow-sm p-3">
              <div style={{ background: 'blueviolet' }} className="circle-icon mx-auto mb-3 d-flex justify-content-center align-items-center "><span className="about_us_icon material-symbols-outlined">
                bug_report
              </span></div>
              <h4 className="card-title">Bug and Suggestion Tickets</h4>
              <p className="card-text">Users can raise tickets for suggestions or report bugs directly.</p>

            </div>
          </div>

          <div className="col-lg-4 col-12 mb-4">
            <div className="card_ shadow-sm p-3">
              <div style={{ background: 'cadetblue' }} className="circle-icon  mx-auto mb-3 d-flex justify-content-center align-items-center "><span className="about_us_icon material-symbols-outlined">
                mail
              </span></div>
              <h4 className="card-title">Email Notifications</h4>
              <p className="card-text">Get notified when your account is locked or if you forget your password.</p>

            </div>
          </div>
          <div className="col-lg-4 col-12 mb-4 d-none">
            <div className="card_ shadow-sm p-3">
              <div style={{ background: '#9fc1f4' }} className="circle-icon mx-auto mb-3 d-flex justify-content-center align-items-center "><span className="about_us_icon material-symbols-outlined">
                Notifications_active
              </span></div>
              <h4 className="card-title">Real-time Notifications</h4>
              <p className="card-text">Stay updated with alerts even when you're not logged in.</p>

            </div>
          </div>
        </div>
        <a href="#" className="btn btn-primary mt-3 mb-2">Explore more features</a>
      </div>
    </>
  );
}
