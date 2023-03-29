import { useEffect, useState } from 'react';
import {Auth} from './components/auth';
import {db,auth,storage} from './config/firebase-config'
import {getDocs,collection,addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore'
import { async } from '@firebase/util';
import { ref,uploadBytes } from 'firebase/storage';
function App() {
  const [movieList,setMovieList] = useState([])
  //new movies state
  const [newMovieTitle,setNewMovieTitle] = useState("");
  const [newReleaseDate,setNewReleaseDate]= useState(0)
  const[isNewMovieOscar,setIsNewMovieOscar] = useState(false) 
  const[fileUpload,setFileUpload]= useState(null)

const[updatedTitle,setUpdatedTitle] = useState("")

  const moviesCollectionRef = collection(db,"movies")
  const getMovieList= async()=>{
    //read the data
    try {
      const data = await getDocs(moviesCollectionRef)
      const filterdata = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
      setMovieList(filterdata)
    } catch (error) {
      console.error(error)
    }

   

    //set the movie list
  }
  useEffect(()=>{
   
    getMovieList()
  },[])
const deleteMovie=async(id)=>{
  try {
    const movieDoc = doc(db,"movies",id)
    await deleteDoc(movieDoc)
    getMovieList()
  } catch (error) {
    console.log(error)
  }


}

  const onSubmit = async()=>{
    try {
      await addDoc(moviesCollectionRef,{
        title:newMovieTitle,
      releaseDate:newReleaseDate,
      receivedAnOscar:isNewMovieOscar,
    userId:auth?.currentUser?.uid})     
      getMovieList()
    } catch (error) {
      console.log(error)
    }
    

  }

  const updateMovieTitle = async(id)=>{
    const movieDoc = doc(db,"movies",id)
    await updateDoc(movieDoc,{title:updatedTitle})
    getMovieList()
  }
  const uploadFile = async(id)=>{
    if(!fileUpload) return;
    const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef,fileUpload)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="App">
    <Auth/>
    <input type="text" placeholder='movie title' onChange={(e)=>setNewMovieTitle(e.target.value)} />
    <input type="number" placeholder='movie title' onChange={(e)=>setNewReleaseDate(e.target.value)} />
    <input type="checkbox" checked={isNewMovieOscar} onChange={(e)=>setIsNewMovieOscar(e.target.checked)}/>
    <label>Receive Awatd</label>
    <button onClick={onSubmit}>Submit Movie</button>
    <div>
      {movieList.flatMap((movie)=>(
        <div>
          <h1 style={{color:movie.receivedAnOscar ?"green":"red"}}>{movie.title}</h1>
          <p>Date :{movie.releaseDate} </p>
          <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
          <input placeholder='new title...' onChange={(e)=>setUpdatedTitle(e.target.value)} />
          <button onClick={()=>updateMovieTitle(movie.id)}>Update title</button>
        </div>
      ))}
    </div>
    <div>
      <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])} />
      <button onClick={uploadFile}>Upload File</button>
    </div>
    </div>
  );
}

export default App;
