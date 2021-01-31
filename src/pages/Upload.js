import React,{useState} from 'react'
import api from "../api";

function Upload() {
  const [selectedFile,setSelectedFile] = useState({});
  const [isOk, setIsOk ] = useState(false);
  const [isError, setIsError ] = useState(false);  


  const onFileChange = async (event) => {
    setIsOk(false);
    setIsError(false);
    // Update the state
    setSelectedFile(event.target.files[0]);
    // Create an object of formData
    const formData = new FormData();
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }
    // Update the formData object
    formData.append(
      "file",
      event.target.files[0]
    );
  
    // Request made to the backend api
    // Send formData object
    try{
      const response = await api.post("/transactions/upload", formData,config);
      
      if(response.status === 200){
        setIsOk(true);
        setIsError(false);
      }else{
        console.error(response);
        setIsOk(false);
        setIsError(true);
      }
    }catch(err){
      setIsOk(false);
      setIsError(true);
    }
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="twelve columns">
          <h3>Upload</h3>
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          Please upload a CSV file, with the following columns (AIB format):
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <ul>
            <li>Posted Account</li>
            <li>Posted Transactions Date</li>
            <li>Description1</li>
            <li>Description2</li>
            <li>Description3</li>
            <li>Debit Amount</li>
            <li>Credit Amount</li>
            <li>Balance</li>
            <li>Posted Currency</li>
            <li>Transaction Type</li>
            <li>Local Currency Amount</li>
            <li>Local Currency</li>
          </ul>
        </div>
      </div>
      <form>
        <div className="row">
          <div className="one-third column">
            <label className="button-primary file-upload">
              <input type="file" onChange={onFileChange}/>
              Upload
            </label>
          </div>
        </div>
        <div className="row">
          {isOk && (<p> File uploaded!</p>)}
          {isError && (<p>Error uploading {selectedFile.name}</p>)}
        </div>
      </form>
    </div>
  )
}

export default Upload