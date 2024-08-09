import React, { useContext, useEffect, useState } from "react";
import "../styles/DashBoard.css";
import AddTask from "../components/AddTask";
import View from "../components/View";
import { getTasks } from "../services/allApi";
import { searchTask } from "../services/allApi";
import RefreshContext, { RefreshContextApi } from "../context/RefreshContext";

function Dashboard() {
  const [data, setData] = useState([]);
  const [search,setSearch]=useState("")
  
  const  {refresh}=useContext(RefreshContextApi)
  useEffect(() => {
    getData();
  }, [refresh]);
  useEffect(()=>{
    getSearch()
  },[search])

  const getData = async () => {
    const result = await getTasks();
    if (result.status == 200) {
      setData(result.data);
      console.log(result.data);
    } else {
      console.log(result.response.data);
    }
  };

  const getSearch=async()=>{
    if(search){
      const result=await searchTask(search)
      setData(result.data)
    }
    else{
      getData()
    }
  }
  return (
    <>
      <div className="container d-flex mt-5  justify-content-center ">
        <div className="mx-4">
          <AddTask />
        </div>
        <div>
          <input
            className="form-control me-2 "
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e)=>{setSearch(e.target.value)}}
          />
        </div>
      </div>
      <div className="card3 d-flex flex-wrap" style={{width:"100%"}}>
      {data.length > 0 ? (
        data.map((item) => (
          <div className="card1 mx-3" >
            <div className="card my-3" style={{ width: "18rem" }}>
              <div className="card-body ">
                <h5 class="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>

                <div>
                  <View id={item._id}/>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>data not found</p>
      )}
      </div>
    </>
  );
}

export default Dashboard;
