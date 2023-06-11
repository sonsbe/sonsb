import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/LoggedIn";
import TextField from '@mui/material/TextField';

const Login = () => {
  const [user, setUser] = useState({ id: "", password: "" });
  const [stage, setStage] = useState(1);
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;
  const setIsLoggedIn = authContext.toggleLogin;
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (stage === 1) {
      if (user.id === storedUser.id) {
        setStage(2);
      } else {
        alert("아이디가 잘못되었습니다.");
      }
    } else {
      if (user.password === storedUser.password) {
        alert("로그인 성공!");
        setIsLoggedIn(true);
        navigate("/");
      } else {
        alert("비밀번호가 잘못되었습니다.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
      <div style={{border: "1px solid black", borderRadius: "5px", width: "30%", height: "30%", position: "absolute", top: "30%"}}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "100%", padding: "20px" }}>
          <div className="top" style={{ display: "flex", flexDirection: "column", alignSelf: "flex-start", fontSize: "30px", fontWeight: "bold", marginLeft: "30px"}}>
              <>
              <img 
                src={process.env.PUBLIC_URL + '/img/logo7.png'} 
                alt="Logo"
                style={{ height: '50px'}} />
                <div style={{marginLeft: "10px"}}>
                  <label>로그인</label>
                </div>
              </>
          </div>
          <div className="middle" style={{marginBottom: "0px"}}>
            {stage === 1 && (
              <>
                <TextField 
                  sx={{
                    width: 400
                }}
                id="standard-basic"
                name="id" 
                label="아이디" 
                variant="standard"
                value={user.id}
                onChange={handleChange}/>
              </>
            )}
            {stage === 2 && (
              <>
                <TextField 
                sx={{
                  width: 400
              }}
                id="standard-basic" 
                name="password"
                label="비밀번호" 
                type="password"
                variant="standard"
                value={user.password}
                onChange={handleChange}  />
              </>
            )}
          </div>
          <div className="bottom-part" style={{ width: "100%",display: "flex", justifyContent: "flex-end"}}>
            <button onClick={handleLogin} style={{ border: "none", borderRadius: "5px", backgroundColor: "#4242e6", color: "white", width: "100px"}}>{stage === 1 ? 'Next' : 'Log In'}</button>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default Login;