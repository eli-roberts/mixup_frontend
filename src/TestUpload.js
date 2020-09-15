import React, {useState} from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [linkToFile, setLink] = useState("")
  const postFile = (data, file, fileName) => {
    const postData = new FormData()
    setLink(data.url)
    for(const key in data.signed_url.fields){
      postData.append(key, data.signed_url.fields[key])
    }
    postData.append('file', file)

    axios.post(data.signed_url.url, postData)
  }

  const getSignedRequest = (file) => {
    const file_name = file.name.replace(/ /g, "_")
    axios.get("http://localhost:8000/create_signed_link", {params: {file_name}})
    .then(res => postFile(res.data, file, file_name))
  }


  const onUpload = (e) => {
    const file = e.target.files[0]
    if (!file){ 
      return alert("No file was selected.")
    }
    getSignedRequest(file)
  }

  return (
    <div className="App">
      <form onSubmit={e => e(console.log(FormData))}>
        <input type="text" placeholder="placeholder text"></input>
        <input type="file" accept="audio/*" onChange={onUpload}/>
        <a href={linkToFile} target="_blank">Link to File</a>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default App;
