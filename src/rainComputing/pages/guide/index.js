import React, { useState } from 'react';
import { Document, Page ,pdfjs } from 'react-pdf';

import PDF from "assets/guide/guide.pdf"
import { Card } from 'reactstrap';
import { Link } from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Guide = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  

  return (
    <div >
      <div className="card " >
      <div className="card-body ">
      <p className="card-text d-flex justify-content-center fs-2 ">
        <i className='mdi mdi-account text-primary '></i>USER MANUAL</p>
        <buton className="bg-primary py-2 px-5">  
        <i className="mdi mdi-download text-white"></i>    
            <Link to={PDF} download="guide.pdf" className='text-white'> Download Here </Link>
        </buton>


  </div>
  { " "}
        <div className="d-flex justify-content-center bg-secondary w-100 col-sm-6"   >
       <Document  file={PDF} onLoadSuccess={onDocumentLoadSuccess}>
       {Array.from(new Array(numPages), (el, index) => (
        <Page renderMode='svg' scale={96/72} key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
      </Document> 
      </div>
      </div>
    </div>
  );
}

export default Guide;
