import { useContext, useState, useEffect } from "react";
import { SaveContext } from "../../contexts/SaveContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Timeline.css";

const Timeline = () => {
  const { save, setSave } = useContext(SaveContext);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  const navigate = useNavigate();

  const handleReset = () => {
    setSave([]);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSubmitFlag(true);
  };

  const handleDeleteClick = (index) => {
    setSave((prevSave) => {
      const newSave = [...prevSave];
      newSave.splice(index, 1); // 해당 인덱스의 아이템을 삭제
      localStorage.setItem("save", JSON.stringify(newSave)); // 로컬 스토리지에 저장
      return newSave;
    });
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (submitFlag && selectedItem!== null) {
      const formData = new FormData();
      formData.append("query", selectedItem);
      axios
       .post("http://127.0.0.1:8000/search/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
       .then((response) => {
          navigate('/result', {
            state: { users: response.data.users },
          });
        })
       .catch((error) => {
          console.error(error);
        });
      setSubmitFlag(false);
    }
  }, [submitFlag, selectedItem, navigate]);

  // 페이지당 보여줄 아이템 개수
  const itemsPerPage = 4;

  // 페이지당 보여줄 아이템들
  const pageItems = save.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="timeline-container">
      <table className="Timeline-table-wrap">
        {/*<button onClick={handleReset}>Reset</button>*/}
        <h2 className="timeline-table-title">
          <td className="timeline-table-titlea">
            타임라인
          </td>
        </h2>
        <tbody>
          {pageItems.map((item, index) => (
            <tr className="timeline-my-div2" key={index}>
              <td className="Timeline-keyward">
                <td className="Timeline-keywarda">
                  검색 기록
                </td>
              </td>
              <td className="Timeline-itemkeyward">
                <td className="Timeline-aim-2">
                  {item.map((subItem) => (
                    <div className="Timeline-my-divin">{subItem}</div>
                  ))}
                </td>
              </td>
              <td className="Timeline-button2">
                <td className="Timeline-button2a">
                  <button className="Timeline-img" onClick={() => handleItemClick(item)}>
                    <img src="/img/Timelinerink.png" alt="awsdf" width="60px" height="60px"></img>
                  </button>
                  <button className="Timeline-img" onClick={() => handleDeleteClick(index)}>
                  <img src="/img/Timelinedelete.png" alt="awsdf" width="20px" height="20px"></img>
                  </button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <td className="Timeline-pagination">
        <button className="Timeline-pagination-click" onClick={handlePrevClick} disabled={currentPage === 1}>
          <img className="Timeline-pagination-animation" src="/img/left.png" alt="awsdf" width="30px" height="30px"></img>
        </button>
        <td className="Timeline-pagination-number">{currentPage}</td>
        <button className="Timeline-pagination-click" onClick={handleNextClick} disabled={(save.length < (currentPage * itemsPerPage)+1)}>
          <img className="Timeline-pagination-animation" src="/img/right.png" alt="awsdf" width="30px" height="30px"></img>
        </button>
        {/*pagenation-click 이거 바꿀거면 UserSelectItem.css에서 바꾸기*/}
      </td>
    </div>
  );
};

export default Timeline;