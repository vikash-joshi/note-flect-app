import React from "react";
import LandingPage from "./landing";
export default function   Home(){
    return(

<>
<LandingPage />
<footer className=" d-none d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1" previewlistener="true">
     
      </a>
      <span className="mb-3 mb-md-0 text-body-secondary">© 2024 Company, Inc</span>
    </div>
    <div className="col-md-4 d-flex justify-content-end ">
      <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1" previewlistener="true">
      
      </a>
      <span className="mb-3 mb-md-0 text-body-secondary">© 2024 Company, Inc</span>
    </div>
    <ul className="nav col-md-4 d-noen list-unstyled d-flex">
      <li className="ms-3"><a className="text-body-secondary" href="#"><i className="fab fa-facebook"></i></a></li>
      <li className="ms-3"><a className="text-body-secondary" href="#"></a></li>
      <li className="ms-3"><a className="text-body-secondary" href="#"></a></li>
    </ul>
  </footer>
</>
       
    )
}