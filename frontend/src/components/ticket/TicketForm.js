const SaveRequest=async (Request)=>{
  try {

      const response = await fetch(process.env.REACT_APP_API_URL+"/api/Request/Save", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
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


module.exports={SaveRequest}