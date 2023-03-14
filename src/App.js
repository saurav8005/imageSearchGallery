
import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const searchData = useRef(null)
  const [searchText, setsearchText] = useState("mountains")
  const [imageData, setImageData] = useState([])
  useEffect(() => {

    const params = {
      method: "flickr.photos.search",
      api_key: "df54c97ff54e7f8c2060cfc15ccbbc60",
      text: searchText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }

    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((res) => {
      console.log(res.data)
      const arr = res.data.photos.photo.map((imgData)=>{
          return fetchFlickrImageUrl(imgData, 'q');
      })
      setImageData(arr)
    }).catch(() => {

    }).finally(() => {

    })
  }, [searchText])
    const fetchFlickrImageUrl = (photo,size) =>{
      let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`

      if(size){
        url += `_${size}`
      }
      url += `.jpg`
      return url
    }
    

  return (
    <>
      <div className='container'>
      <h1>Image Search Gallery</h1>
      <input className='textbox' onChange={(e)=> {searchData.current= e.target.value}} />
      <button onClick={()=> {
        setsearchText(searchData.current)
      }}>Search</button>
      <section>
        <button className='btn' onClick={()=> { setsearchText("mountains")}}>Mountains</button>
        <button className='btn' onClick={()=> { setsearchText("food")}}>Food</button>
        <button className='btn' onClick={()=> { setsearchText("birds")}}>Birds</button>
        <button className='btn' onClick={()=> { setsearchText("beaches")}}>Beaches</button>
      </section>
      </div>
      <section className='imagegallery'>
        {imageData.map((imageurl, key)=>{
          return (
             <article>
              <img src={imageurl} key={key} alt=''   />
             </article>
          )
        })}
      </section>
      
    </>
  );
}

export default App;
