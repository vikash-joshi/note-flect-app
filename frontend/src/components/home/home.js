import React from "react";
import { Link } from "react-router-dom";
import LandingPage from "./landing";
export default function   Home(){
    return(

<>
<LandingPage />
<div className="container d-none">
          <div className="row homecontent mt-4">
            <div className="col-md-12">
            <div className="jumbo_home jumbotron">
            <div className="d-flex justify-content-center align-items-center flex-column" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Capture Your Thoughts with NoteFlect</h1>
      <img className="img-fluid aos-init aos-animate" data-aos="fade-up-left" data-aos-anchor-placement="center-center" 
            style={{width:'60%'}}
            src="https://img.freepik.com/premium-vector/editable-flat-illustration-language-test_203633-8220.jpg" 
 className="home_img" />
 <iframe src="https://lottie.host/embed/ba70799b-9e09-4411-beda-7f5c7e3d0b8a/mgUqMopJBk.json"></iframe>
            
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        In today’s fast-paced world, keeping track of your thoughts and ideas can be a challenge. NoteFlect offers a seamless solution to help you capture, organize, and reflect on your thoughts, all in one intuitive platform. Whether you're jotting down quick notes, compiling detailed research, or reflecting on your day-to-day experiences, NoteFlect is your go-to tool for keeping everything in one place.
      </p>

      <h2 style={{ color: '#2980b9', marginTop: '30px' }}>Why NoteFlect?</h2>
      <ul style={{ fontSize: '18px', lineHeight: '1.8', marginLeft: '20px' }}>
        <li><strong>Streamlined Note-Taking</strong>: Quickly capture ideas, tasks, or inspirations with our user-friendly interface. NoteFlect is designed to accommodate every note-taking style, from quick memos to in-depth journals.</li>
        <li><strong>Reflect and Organize</strong>: Go beyond simple note-taking with features that encourage reflection and organization. Categorize your notes, align them with your goals, and revisit them whenever needed.</li>
        <li><strong>Stay Productive and Organized</strong>: Enhance your productivity with NoteFlect’s intuitive tools. Whether you’re managing personal projects, tracking professional research, or just trying to stay organized, NoteFlect helps you stay on top of your tasks.</li>
        <li><strong>Accessible Anytime, Anywhere</strong>: Your notes are always within reach, whether you’re at your desk, on the go, or simply brainstorming on your phone. NoteFlect syncs across devices, ensuring your ideas are never lost.</li>
      </ul>

      <h2 style={{ color: '#2980b9', marginTop: '30px' }}>Join the NoteFlect Community</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        Thousands of users trust NoteFlect to help them stay organized and reflective. Join our community and start capturing your thoughts with clarity and ease.
      </p>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button 
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            padding: '15px 30px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Try NoteFlect Today
        </button>
      </div>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '16px', color: '#555' }}>
        Experience the power of organized thought. Download NoteFlect and take the first step towards enhanced productivity and peace of mind.
      </p>
    </div>
</div>

            </div>
            <div className="col-md-7 d-none">
            <img className="img-fluid aos-init aos-animate" data-aos="fade-up-left" data-aos-anchor-placement="center-center" 
            style={{width:'100%'}}
            src="https://img.freepik.com/premium-vector/editable-flat-illustration-language-test_203633-8220.jpg" 
 className="home_img" />
            
        </div>
        </div>
        </div>  
</>
       
    )
}