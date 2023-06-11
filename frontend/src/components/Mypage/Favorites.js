import { useContext, useState, useEffect } from "react";
import { SaveItemContext } from "../../contexts/SaveItem";
import "./Favorites.css";

const Favorites = () => {
  const { users, setUsers } = useContext(SaveItemContext);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  const handleReset1 = () => {
    setUsers([]);
  };

  const handleDeleteClick = (id) => {
    setUsers((prevUsers) => {
      const newUsers = prevUsers.filter((user) => user.id!== id); // id로 비교해서 같은 id인것들을 제거
      localStorage.setItem("users", JSON.stringify(newUsers)); // 로컬 스토리지에 저장
      return newUsers;
    });
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  // 페이지당 보여줄 아이템 개수
  const itemsPerPage = 4;

  // 페이지당 보여줄 아이템들
  const pageItems = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="favorites-container">
      <table className="favorites-table-wrap">
        <h2 className="favorites-table-title">
          <td className="favorites-table-titlea">
            찜 목록
          </td>
        </h2>
        <tbody>
          {pageItems.map((user) => (
            <tr className="favorites-my-div2" key={user.id}>
              <td className="favorites-keyward">
                <td className="favorites-keywarda">
                  <img src="/img/Ad_1.jpg" alt={user.image} width="80px" height="80px"></img>
                  {/*<img src={user.image} alt={user.image} width="80px" height="80px"></img>*/}  
                </td>
              </td>
              <td className="Favorites-itemkeyward">
                <td className="Favorites-my-divin-name">
                  {user.name}
                </td>
                <td className="Favorites-my-divin-price">
                  {user.price}
                </td>
              </td>
              <td className="Favorites-delete">
                <td className="Favorites-button2a">
                  <td className="Favorites-img">
                    <a href={user.rink} target="_blank" rel="noopener noreferrer">
                      <img src="/img/jiimrink2.png" alt="awsdf" width="30px" height="30px"></img>
                    </a>
                    </td>
                  <button className="Favorites-img" onClick={() => handleDeleteClick(user.id)}>
                    <img src="/img/Timelinedelete.png" alt="awsdf" width="20px" height="20px"></img>
                  </button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <td className="Favorites-pagination">
        <button className="Favorites-pagination-click" onClick={handlePrevClick} disabled={currentPage === 1}>
          <img className="Favorites-pagination-animation" src="/img/left.png" alt="awsdf" width="30px" height="30px"></img>
        </button>
        <td className="Favorites-pagination-number">{currentPage}</td>
        <button className="Favorites-pagination-click" onClick={handleNextClick} disabled={(users.length < (currentPage * itemsPerPage)+1)}>
          <img className="Favorites-pagination-animation" src="/img/right.png" alt="awsdf" width="30px" height="30px"></img>
        </button>
        {/*pagenation-click 이거 바꿀거면 UserSelectItem.css에서 바꾸기*/}
      </td>
    </div>
  );
};

export default Favorites;

/*import { useContext } from "react";
import { SaveItemContext } from "../../contexts/SaveItem";
import "./Favorites.css";

const Favorites = () => {
  const { users, setUsers } = useContext(SaveItemContext);

  const handleReset1 = () => {
    setUsers([]);
  };

  const handleDeleteClick = (id) => {
    setUsers((prevUsers) => {
      const newUsers = prevUsers.filter((user) => user.id !== id); // id로 비교해서 같은 id인것들을 제거
      localStorage.setItem("users", JSON.stringify(newUsers)); // 로컬 스토리지에 저장
      return newUsers;
    });
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const itemsPerPage = 10;

  // 페이지당 보여줄 아이템들
  const pageItems = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <table className="table-wrap">
      <h2 className="table-title">찜 목록</h2>
        {users.map((user) => (
          <tr className="my-div2" key={user.id}>
            <td className="keyward">
              {user.image}
            </td>
            <td className="Favorites-itemkeyward">
              <td className="Favorites-my-divin">
                {user.name}
              </td>
              <td className="Favorites-my-divin">
                {user.price}
              </td>
              <td className="Favorites-my-divin">
                {user.tag}
              </td>
            </td>
            <td className="Favorites-delete">
              <button className="Favorites-button2" onClick={() => handleDeleteClick(user.id)}>삭제</button>
            </td>
            
          </tr>
        ))}
    </table>
  );
};

export default Favorites;*/