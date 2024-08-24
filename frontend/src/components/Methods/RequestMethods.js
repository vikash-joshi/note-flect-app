const SaveRequest=async (Request)=>{
    try {
        const response = await fetch(process.env.REACT_APP_API_URL+"/api/Request/AddRequest", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
            

          },
          body: JSON.stringify(Request)
        });
        if (!response.ok) {
          throw new Error(response.message);
        }
        const json = await response.json();
        return json;
      } catch (error) {
        console.error(error.message);
      }


}

const GetAllRequest=async(PageNo)=>{
    try {
        const response = await fetch(process.env.REACT_APP_API_URL+"/api/Request/GetRequestByUser?Page="+PageNo, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
  
        if (response.status == "400") {
          throw new Error(`Something Went Wrong ${response.message}`);
        }
        const json = await response.json();
        return json;
      } catch (err) {
    return   { messsage:err.message}
    }
}


module.exports = { SaveRequest,GetAllRequest }