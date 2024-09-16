//import { ChatBox } from "../components/ChatBox";
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import {GetUserProfile, ServerUrl, GetProfile} from '../utils/utils'
import styles from "../styles/Chat.module.css";
import { Avatar } from "../components/Avatar";
import {LoadingSpinner} from "../components/LoadingSpinner";


const MessageCard = ({ content, user, cardOrientation }) => {
  return (
    <>
    <div className={styles.Outer}>
        <span className={cardOrientation}>
        <Avatar text={user.username || user.passage_id} />
      </span>
      <span>{content}</span>
      </div>
    </>
  );
};
//<span className={styles.userName}>{user.username || user.passage_id}</span>
//         {user.firstName}



function Chat() 
{
    const { otherId } = useParams()
    // initialize state
    const [otherProfile, setOtherProfile] = React.useState({firstname:""});
    const [messages, setMessages] = React.useState([]);
    const  SERVER_URL = ServerUrl();
//    const [otherName, setOtherName] = React.useState("(Friend)");

    const [userData, setUserData] = React.useState(null);
    const [userID, setUserID] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const handleSubmit = (formValue) => 
    {
      console.log(formValue);
      setIsLoading(true)
      // post the formValue
      // setLoading to true
      // wait until the response is returned
      // setLoading to false
      // get the new list of messages and display them (change state) (maybe not state since it's updated only when a request is sent - useRef? useQuery?)
    };


    React.useEffect(() => 
     {
      const getUserData = async () => 
      {
        const data = await GetUserProfile();
        if (data)
        {
          console.log(data)
          setUserData(data);
          setUserID(data._id);
        }
      };
      getUserData();
    }, []);

    // fetch one listing by id
    React.useEffect(() => {
      const getOne = async () => 
        {
          console.log("Getting other profile for "+ otherId);
//            const profile = await axios.post(`${SERVER_URL}/user/Profile/${otherId}`,authHeader);
            const profile = await GetProfile(otherId);
            setOtherProfile(profile)
//            setOtherName(otherProfile.firstname);
          console.log("Got other profile : "+ profile);
}
        getOne();
    }, [otherId]);

    React.useEffect(() => {
      const getOne = async () => 
      {
        if(userID && otherId)
        {
          const listing = await axios.get(`${SERVER_URL}/message/${userID}/${otherId}`)
          setMessages(listing.data.messages || [])
        }
      }
      getOne();
  }, [otherId, SERVER_URL,userID]);

  var messagesA = messages.map(listing=>{
            listing.time =  new Date(listing.sendAt);
            listing.className = listing.fromUserID === userID ? styles.OutGoing : styles.InComing;
            listing.user = listing.fromUserID === userID ? userData : otherProfile;
            return listing;
          });
   var messagesB = messagesA.sort((a,b)=>a.time.getTime()-b.time.getTime());          
  
  const listingElements = messagesB.map((message,idx) => (
    <tr>
    <td>
    <span key={idx} className={message.className}>
    <MessageCard
      content={message.text}
      user={message.user}
      orientation={message.className}
    />
  </span>
  </td>
  </tr>
));

var otherName = otherProfile ? otherProfile.firstname : "(Friend)";



return (
  <div>
    <div>
      <span className={styles.view}>
          <h1 >{otherName}</h1>
      </span>
    </div>
    <div className={styles.container}>
      <table className={styles.chatTbl}>
        <tbody>
          {listingElements}
        </tbody>
      </table>
    </div>
    <div>
       <form onSubmit={(v) => handleSubmit(v)}>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Enter message here"
          />
          {isLoading ? <LoadingSpinner /> : <button type="submit">Send</button>}
        </form>
      </div>      
  </div>    
)


}


export default Chat;
