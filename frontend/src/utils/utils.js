
export  function FormToJson(formData)
{
    var object = {};
//    formData.forEach((value, key) => object[key] = value);
    for(var i =0; i < formData.length; ++i)
    {
        const key = formData[i].name;
        const value = formData[i].value;
//        console.log(`Object[${key}] = '${value}'`);
        if (key && value)
            object[key] = value;
    }
    //var json = JSON.stringify(object);
    //return json;    

    return object;
}

export function ServerUrl()
{
    //var  SERVER_URL=process.env.SERVER_URL;
    const SERVER_URL="http://localhost:8000";
    
    return SERVER_URL;
}

export async function GetUserProfile()
{
    const SERVER_URL=ServerUrl();
    const authToken = localStorage.getItem('psg_auth_token');
  
    // Make API call to fetch user details using the auth token
    try 
    {
      const response = await fetch(SERVER_URL+"/user/getUserProfile", {
          method: "POST", // or 'PUT'
          headers: {
              "Authorization": `Bearer ${authToken}`
          }
      });
      const data = await response.json()
      return data;
    } 
    catch (error) 
    {
        // Handle error if the API call fails
        console.error(error);
        return null;
    }
}

export async function GetProfile(mongoId)
{
    const SERVER_URL=ServerUrl();
    const authToken = localStorage.getItem('psg_auth_token');
  
    // Make API call to fetch user details using the auth token
    try 
    {
      const response = await fetch(SERVER_URL+"/user/Profile/"+ mongoId, {
          method: "POST", 
          headers: {
              "Authorization": `Bearer ${authToken}`
          }
      });
      const data = await response.json();
      console.log("GetProfile", data);
      return data;
    } 
    catch (error) 
    {
        // Handle error if the API call fails
        console.error(error);
        return null;
    }
}
/*
export async function GetAuthMiddleware ()
{

    const passageConfig = {
        appID: process.env.PASSAGE_APP_ID,
        apiKey: process.env.PASSAGE_API_KEY,
        authStrategy: "HEADER",
    };

    // passage middleware
    let passage = new Passage(passageConfig);
    let passageAuthMiddleware = (() => {
      return async (req, res, next) => {
        try {
          let userID = await passage.authenticateRequest(req);
          if (userID) {
            // user is authenticated
            res.userID = userID;
            next();
          }
        } catch (e) {
          // unauthorized
        }
      };
    })();    

    return passageAuthMiddleware;
}
*/