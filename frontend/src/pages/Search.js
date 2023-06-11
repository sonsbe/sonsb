import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
const Search = ({}) => {
    const location = useLocation();
    const users = location.state.users;
  
    const userStyle = {
        width: '50%',
        borderBottom: '1px solid #dcdcdc',
        borderTop: '1px solid #dcdcdc',
      padding: '30px',
      marginTop: '0px',
      margin: '0px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    };
    const infoStyle = {
      marginLeft: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    };
  
    if(users===null){
        console.log('users is null')
    }
    else
        console.log("users", users);
  
    return (
            <div className="search-results" style={{
              marginTop: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start' 
            }}>
              <h2 syle>검색 결과</h2>
        { users.length >0 ? users.map((user) => 
        user && (
          <div key={user.id} style={userStyle}>
            <div style={{ display: "flex", width: "150px", height: "150px", alignContent: "center", textAlign: "center", marginRight: "20px"}}>
            <img src={process.env.PUBLIC_URL + user.image} alt={user.name} style={{ height: "150px", width: "150px"  }}/>
            </div>
            <div style={infoStyle}>
            <a href={user.rink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
  <h2>{user.name}</h2>
</a>
              
              <p>{user.price}원</p>
              <p>{user.brand} </p>
              <p>
              {user.color.map((color) => {
                          if (color === '검정') {
                            return <img className="color-img" src="/img/color/검정.png" alt="모자1" width="20px" height="20px"></img>;
                          } else if (color === '하양') {
                            return <img className="color-img" src="/img/color/하양.png" alt="모자1" width="20px" height="20px"></img>;
                          } else if (color === '파랑'){
                            return <img className="color-img" src="/img/color/파랑.png" alt="모자1" width="20px" height="20px"></img>;
                          } else if (color === '갈색'){
                            return <img className="color-img" src="/img/color/갈색.png" alt="모자1" width="20px" height="20px"></img>;
                          } else if (color === '노랑'){
                            return <img className="color-img" src="/img/color/노랑.png" alt="모자1" width="20px" height="20px"></img>;
                          } else if (color === '보라'){
                            return <img className="color-img" src="/img/color/보라.png" alt="모자1" width="20px" height="20px"></img>;
                          } else if (color === '분홍'){
                            return <img className="color-img" src="/img/color/분홍.png" alt="모자1" width="20px" height="20px"></img>;
                          } else if (color === '빨강'){
                            return <img className="color-img" src="/img/color/빨강.png" alt="모자1" width="20px" height="20px"></img>;
                          } else if (color === '아이보리'){
                            return <img className="color-img" src="/img/color/아이보리.png" alt="모자1" width="20px" height="20px"></img>;
                          } else if (color === '주황'){
                            return <img className="color-img" src="/img/color/주황.png" alt="모자1" width="20px" height="20px"></img>;
                          } else if (color === '초록'){
                            return <img className="color-img" src="/img/color/초록.png" alt="모자1" width="20px" height="20px"></img>;
                          } else if (color === '회색'){
                            return <img className="color-img" src="/img/color/회색.png" alt="모자1" width="20px" height="20px"></img>;
                          }
                            else {
                            return color;
                          }
                        })}
                        </p>
        {/*<a href={user.rink} target="_blank" rel="noopener noreferrer"><img src="/img/jiimrink2.png" alt="링크" width="25px" /></a>*/}
            </div>
          </div>)
          ) : <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: "30px"}}>상품 없음</td>
        }
      </div>
    );
  };
  
  export default Search;