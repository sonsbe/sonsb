import Ad from "../components/common/Ad";
import Helper from "../components/Home/Helper";
import Input from "../components/Home/Input";
import LinkedRank from "../components/Home/LinkedRank";
import MainRank from "../components/Home/MainRank";
import TagRank from "../components/Home/TagRank";
import Guide from "../components/Home/Guide";
import './Home.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Home = () => {
    
    const [tags, setTags] = useState([]);
    const [query, setQuery] = useState([]);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [button, setButton] = useState('');
    //const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    const handleSubmit = () => {
          setSubmitFlag(!submitFlag);

    };

    useEffect(() => {
      if (submitFlag) {
        const formData = new FormData();
        formData.append("query", tags);
        formData.append("button", button);
        console.log('보내는 태그', tags);
        axios
          .post("http://127.0.0.1:8000/search/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            //setUsers(response.data.users);
            navigate('/result', {
                state: { users: response.data.users },
            });
          })
          .catch((error) => {
            console.error(error);
          });
        setQuery(tags);
        console.log("query:", query);
      }
    }, [tags, submitFlag, navigate]);
    /*
    const handleSubmit = () => {
    const formData = new FormData();
    formData.append("query", tags);
    console.log('보내는 태그', tags);
    axios
      .post("http://127.0.0.1:8000/search/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Is users an array?", Array.isArray(response.data.users));
        console.log("response.data.users:", response.data.users);
        //setUsers(response.data.users);
        navigate('/result', {
            state: { users: response.data.users },
        });
      })
      .catch((error) => {
        console.error(error);
      });
    setQuery(tags);
  };
*/
  /*
  const getTags = async (newTag) => {
    setTags([...tags, newTag]);
  };
  */
    
    
    return (
        <div className="home">
            <div className="right">
                <div className="helper" ><Helper tags={tags}/></div>
                <div className="input" >
                  <Input onSubmit={handleSubmit} setTags={setTags} tags={tags} button={button} setButton={setButton}/> <Guide/></div>
                
            </div>
        </div>
    )
}

export default Home;