import React from 'react';
import './landing.css'; // Create a CSS file for custom styling
//fimport Typing from 'react-typing-effeçt'
function LandingPage() {
  return (
    <div className="landing-container">
    <div className="hero-section" style={{backgroundColor:'#178fff',color:'#fff',maxHeight:'450px'}}>
      <div className="hero-content">
        <h1>Capture Your Thoughts with NoteFlect</h1>
        <p>
          We built NoteFlect to help you create, organize, and reflect on your ideas with ease. Whether you're jotting down quick thoughts, compiling research, or reflecting on your day, NoteFlect is your go-to tool.
        </p>
        <div className="hero-buttons">
          <button className="get-now-button">Get it Now</button>
          <button className="features-button">Features</button>
        </div>
      </div>
      <div className="hero-image">
        <img src="./../assets/blobs.png" alt="NoteFlect App" />
      </div>
    </div>
  
    <div className="wave-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#178fff" fill-opacity="1" d="M0,64L15,53.3C30,43,60,21,90,10.7C120,0,150,0,180,21.3C210,43,240,85,270,117.3C300,149,330,171,360,165.3C390,160,420,128,450,128C480,128,510,160,540,154.7C570,149,600,107,630,112C660,117,690,171,720,208C750,245,780,267,810,261.3C840,256,870,224,900,202.7C930,181,960,171,990,149.3C1020,128,1050,96,1080,90.7C1110,85,1140,107,1170,138.7C1200,171,1230,213,1260,234.7C1290,256,1320,256,1350,213.3C1380,171,1410,85,1425,42.7L1440,0L1440,0L1425,0C1410,0,1380,0,1350,0C1320,0,1290,0,1260,0C1230,0,1200,0,1170,0C1140,0,1110,0,1080,0C1050,0,1020,0,990,0C960,0,930,0,900,0C870,0,840,0,810,0C780,0,750,0,720,0C690,0,660,0,630,0C600,0,570,0,540,0C510,0,480,0,450,0C420,0,390,0,360,0C330,0,300,0,270,0C240,0,210,0,180,0C150,0,120,0,90,0C60,0,30,0,15,0L0,0Z"></path></svg>
    </div>
  
    <div className="why-section">
      <h2>Why NoteFlect?</h2>
      <div className="card-container">
        <div className="card">
          <div className="card-header">Streamlined Note-Taking</div>
          <div className="card-body">
            Quickly capture ideas, tasks, or inspirations with our user-friendly interface. NoteFlect is designed to accommodate every note-taking style, from quick memos to in-depth journals.
          </div>
        </div>
        <div className="card">
          <div className="card-header">Reflect and Organize</div>
          <div className="card-body">
            Go beyond simple note-taking with features that encourage reflection and organization. Categorize your notes, align them with your goals, and revisit them whenever needed.
          </div>
        </div>
        <div className="card">
          <div className="card-header">Stay Productive and Organized</div>
          <div className="card-body">
            Enhance your productivity with NoteFlect’s intuitive tools. Whether you’re managing personal projects, tracking professional research, or just trying to stay organized, NoteFlect helps you stay on top of your tasks.
          </div>
        </div>
        <div className="card">
          <div className="card-header">Accessible Anytime, Anywhere</div>
          <div className="card-body">
            Your notes are always within reach, whether you’re at your desk, on the go, or simply brainstorming on your phone. NoteFlect syncs across devices, ensuring your ideas are never lost.
          </div>
        </div>
      </div>
    </div>
  
    <div className="cta-section d-none">
      <div className="cta-content">
        <h4>Join the NoteFlect Community</h4>
        <p>Thousands of users trust NoteFlect to help them stay organized and reflective. Join our community and start capturing your thoughts with clarity and ease.</p>
        <h4>Try NoteFlect Today</h4>
        <p>Experience the power of organized thought. Download NoteFlect and take the first step towards enhanced productivity and peace of mind.</p>
      </div>
    </div>
  </div>
  
  );
}

export default LandingPage;
