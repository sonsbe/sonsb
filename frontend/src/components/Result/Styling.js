import { useContext, useState, useEffect } from "react";
import "./Styling.css";
import { SaveItemContext } from "../../contexts/SaveItem";
import { SaveRecommendContext } from "../../contexts/SaveRecommend";
import axios from "axios";

const InfoBox = ({ users, setSelectedProduct, index }) => {
  const { users: savedUsers, setUsers: setSavedUsers } = useContext(SaveItemContext);
  const { recommend, setRecommend } = useContext(SaveRecommendContext);
  const [currentPage, setCurrentPage] = useState(1);


  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const itemsPerPage = 3;

  const pageItems = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleReset = () => {
    setRecommend([]);
  };

  const handleReset1 = () => {
    setSavedUsers([]);
  };

  const handleCheckboxChange = (e, user) => {
    setSelectedProduct((prevState) => {
      const newSelected = [...prevState];
      if (e.target.checked) {
        newSelected[index] = user;
      } else {
        newSelected[index] = null;
      }
      return newSelected;
    });

    pageItems.forEach((u) => {
      if (u !== user) {
        document.getElementById(`checkbox-${u.id}`).checked = false;
      }
    });
  };

  const handleSaveButtonClick = (user) => {
    setSavedUsers((prevState) => [user, ...prevState]);
  };

  const handleSaveRecommend = (user) => {
    axios.post("http://127.0.0.1:8000/inter/", { userId: user.id })
    .then((response) => {
        console.log(response.data);
        setRecommend((prevState) => {
          const newRecommend = prevState.filter((item) => item.namea!== response.data.setnum);
          newRecommend.unshift({ namea: response.data.setnum, products: response.data.users });
          return newRecommend;
        });
      })
    .catch((error) => {
        console.error(error);
      });
  }

  /*const handleSaveRecommend = (user) => {

    axios.post("http://127.0.0.1:8000/inter/", { userId: user.id })
      .then((response) => {
        console.log(response.data);
        setRecommend((prevState) => 
        {
        const newRecommend = [{ namea: response.data.setnum, products: response.data.users }, ...prevState];
        return newRecommend;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }*/

  return (
    <table className="Styling-info-box">
       {pageItems.length > 0 ? pageItems.map((user) =>
      user && (
        <td className="Styling-info-item" key={user.id}>
          <td className="Styling-info-detail">
            <td className="Styling-info-detail-name">
              {user.name}
            </td>
            <td className="Styling-info-detail2">
              <td className="Styling-info-item-img">
              <img src={process.env.PUBLIC_URL + user.image} alt={user.name} style={{ width: "100%", height: "100%" }}/>
              </td>
              <td className="Styling-info-detail3">
                <div className="Styling-info-pricebrand">{user.price}</div> 
                <div className="Styling-info-pricebrand">{user.brand}</div>
                <div className="Styling-info-pricebrand">{user.color}</div>
                <td className="Styling-info-detail2">
                  <div className="Styling-info-rink">
                    <a href={user.rink} target="_blank" rel="noopener noreferrer">
                      <img src="/img/t10rink.png" alt="링크" style={{ width: "50px", height: "50px" }}/>
                    </a>
                  </div>
                  <button className="Styling-info-item-button" onClick={() => {handleSaveButtonClick(user); handleSaveRecommend(user)}}>
                    <img src="/img/t10jjim.png"  alt="찜" style={{ width: "50px", height: "50px" }}/>
                  </button>
                  <td className="Styling-info-item-button">
                    <input type="checkbox" id={`checkbox-${user.id}`} onChange={(e) => handleCheckboxChange(e, user)}/>
                    <label className="Styling-info-item-label" for={`checkbox-${user.id}`}></label>
                  </td>
                </td>  
              </td>
            </td >
            
          </td>
        </td>)
       ) : <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: "30px"}}>상품 없음</td>}

       {pageItems.length > 0 &&
      <td className="UserSelectItem-pagination">
        <button className="UserSelectItem-pagination-click" onClick={handlePrevClick} disabled={currentPage === 1}>
        <img className="UserSelectItem-pagination-animation" src="/img/left.png" alt="awsdf" width="30px" height="30px"></img>
        </button>
        <td className="UserSelectItem-pagination-number">{currentPage}</td>
        <button className="UserSelectItem-pagination-click" onClick={handleNextClick} disabled={(users.length < (currentPage * itemsPerPage)+1)}>
        <img className="UserSelectItem-pagination-animation" src="/img/right.png" alt="awsdf2" width="30px" height="30px"></img>
        </button>
      </td>
      }
    </table>
  );
};

/*import { useContext, useState, useEffect } from "react";
import "./Styling.css";
import { SaveItemContext } from "../../contexts/SaveItem";
import { SaveRecommendContext } from "../../contexts/SaveRecommend";
import axios from "axios";

const InfoBox = ({ users, setSelectedProduct, index }) => {
  const { users: savedUsers, setUsers: setSavedUsers } = useContext(SaveItemContext);
  const { recommend, setRecommend } = useContext(SaveRecommendContext);

  const handleCheckboxChange = (e, user) => {
    setSelectedProduct((prevState) => {
      const newSelected = [...prevState];
      if (e.target.checked) {
        newSelected[index] = user;
      } else {
        newSelected[index] = null;
      }
      return newSelected;
    });

    users.forEach((u) => {
      if (u !== user) {
        document.getElementById(`checkbox-${u.id}`).checked = false;
      }
    });
  };

  const handleSaveButtonClick = (user) => {
    setSavedUsers((prevState) => [user, ...prevState]);
  };

  const handleSaveRecommend = (user) => {

    axios.post("http://127.0.0.1:8000/inter/", { userId: user.id })
      .then((response) => {
        console.log(response.data);
        setRecommend((prevState) => 
        [[...response.data.users, user], ...prevState]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <table className="Styling-info-box">
      {users.map((user) => (
        <td className="Styling-info-item" key={user.id}>
          <td className="Styling-info-detail">
            <td className="Styling-info-detail-name">
              {user.name}
            </td>
            <td className="Styling-info-detail2">
              <td className="Styling-info-item-img">
              <img src={process.env.PUBLIC_URL + user.image} alt={user.name} style={{ width: "100px", height: "100px" }}/>
              </td>
              <td className="Styling-info-detail3">
                <div className="Styling-info-pricebrand">{user.price}</div> 
                <div className="Styling-info-pricebrand">{user.brand}</div>
                <div className="Styling-info-pricebrand">{user.color}</div>
                <td className="Styling-info-detail2">
                  <div className="Styling-info-rink">
                    <a href={user.rink} target="_blank" rel="noopener noreferrer">
                      <img src="/img/t10rink.png" style={{ width: "50px", height: "50px" }}/>
                    </a>
                  </div>
                  <button className="Styling-info-item-button" onClick={() => {handleSaveButtonClick(user); handleSaveRecommend(user)}}>
                    <img src="/img/t10jjim.png" style={{ width: "50px", height: "50px" }}/>
                  </button>
                  <td className="Styling-info-item-button">
                    <input type="checkbox" id={`checkbox-${user.id}`} onChange={(e) => handleCheckboxChange(e, user)}/>
                    <label for={`checkbox-${user.id}`}></label>
                  </td>
                </td>  
              </td>
            </td >
            
          </td>
        </td>
      ))}
    </table>
  );
};*/

const CustomButton = ({ onClick, children }) => {
  return (
    <button className="image-button" type="button" onClick={onClick}>
      {children}
    </button>
  );
};

const Styling = ({ users=[], setSelectedProducts }) => {
  
  const category = ['아우터', '모자', '포인트', '상의', '신발', '하의'];
  //const [products, setProducts] = useState([]);
  const [boxes, setBoxes] = useState([false, false, false, false, false, false]);
  const [selectedProduct, setSelectedProduct] = useState([null, null, null, null, null, null]);
  const [buttonImages, setButtonImages] = useState(['아우터b', '모자b', '포인트b', '상의b', '신발b', '하의b']);
  //타이틀에 단어로 필터링해서 박스로 보여줌
  const filterProducts = (category) => {
    console.log(users);
    return users.filter((user) => user.part && user.part.includes(category));
  };
  
  const handleClick = (index) => {
    setBoxes((prevState) => {
      const newBoxes = [...prevState];
      if(newBoxes[index]===true){
        newBoxes[index] = false;
      }
      else if(newBoxes[index]===false){
        for(var i=0; i<newBoxes.length; i++){
          if(i!==index){
            newBoxes[i]= false;
          }
        }
        newBoxes[index] = true;
      }
      return newBoxes;
    });
    setButtonImages(prev => {   // Add this block
      const newImages = [...prev];

      for(var i=0; i<buttonImages.length; i++){
        if(i!==index){
          newImages[i]= `${category[i]}b`;
        }
        else if(i===index){
          newImages[i] = newImages[i] === `${category[index]}b` ? `${category[index]}c` : `${category[index]}b`;
          }
      }
      
      return newImages;
    });
  };
  

  
  useEffect(() => {
    setSelectedProducts(selectedProduct);
  }, [selectedProduct, setSelectedProducts]);

  return (
    <>
    {boxes.map((box, index) => (
      box && (
      <InfoBox
      users={filterProducts(category[index] || [])}
      setSelectedProduct={setSelectedProduct}
      index={index}
    />
      )
    ))}
    
    <table className="app">
      
    {buttonImages.map((image, index) => (
      <td className="button-container" key={index}>
        <CustomButton onClick={() => handleClick(index)}>
          <img src={`img/${image}.jpg`} alt="이미지" height="70px"/>
        </CustomButton>
      </td>
    ))}
          

    </table>
    </>
  );
};

export default Styling;