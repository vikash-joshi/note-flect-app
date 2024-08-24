
const fetchallUsers=async(PageNo)=>{
    try {
        const response = await fetch(process.env.REACT_APP_API_URL+`/api/Admin/getUsers?PageNo=${PageNo}`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });

        const json = await response.json();
        return json;
      } catch (err) {
    return   { messsage:err.message}
    }
}


const fetchEmailLogs=async(PageNo)=>{
  try {
      const response = await fetch(process.env.REACT_APP_API_URL+`/api/Admin/GetEmailLogs?PageNo=${PageNo}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      const json = await response.json();
      return json;
    } catch (err) {
  return   { messsage:err.message}
  }
}

const fetchRequestList=async()=>{
  try {
      const response = await fetch(process.env.REACT_APP_API_URL+`/api/User/GetRequestList`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      const json = await response.json();
      return json;
    } catch (err) {
  return   { messsage:err.message}
  }
}



const CreateUser=async(User,Methods,route)=>{
  try {
    let URL=process.env.REACT_APP_API_URL+"/api/"+(route ? route : 'Admin')+"/"+Methods;
    const response = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(User)
    });
    const json = await response.json();
    console.log(json)
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

const UpdateUser=async(User)=>{
  try {
    
    const response = await fetch(process.env.REACT_APP_API_URL+"/api/users/update", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(User)
    });
    const json = await response.json();
    console.log(json)
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

const SendMailLog =async(MailBody)=>{
  try {
    const response = await fetch(process.env.REACT_APP_API_URL+"/api/Admin/SendMail", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        FromEmail:MailBody.FromEmail,
        ToEmail:MailBody.ToEmail,
        Subject:MailBody.Subject,
        Body:MailBody.Body,
        User:MailBody.UserId
      })
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}


module.exports={fetchallUsers,SendMailLog,CreateUser,fetchEmailLogs,UpdateUser}
