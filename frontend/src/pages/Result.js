import RelatedImage from "../components/Result/RelatedImage";
import RelatedLink from "../components/Result/RelatedLink";
import SelectedList from "../components/Result/SelectedList";
import Styling from "../components/Result/Styling";
import './Result.css';
import { useState } from "react";
import { useLocation } from 'react-router-dom';

const Result = () => {
    const [selectedProducts, setSelectedProducts] = useState([null, null, null, null, null, null]);
    
    const location = useLocation();
    const users = location.state.users;
    return (
    <div className="page-top">
        <table className="page-content-left">
        </table>
        <table className="page-content">
            <td className="center-section">
            <td>
                <img className="imga" src="/img/model.png" alt="모자1" width="80px" height="80px"></img>
            </td>
                <Styling users={users} setSelectedProducts={setSelectedProducts}/>
            </td>
            <td className="bottom-section">
                <SelectedList selectedProducts={selectedProducts}/>
            </td>
        </table>
        <table className="page-content-right">
            <RelatedImage imgsrc={users[0].modelimage} />
            <div style={{ marginTop: "30px", height: '1px', width: "250px", backgroundColor: 'black', opacity: 0.5 }} /> 
            <RelatedLink user={users[0]}/>
        </table>
    </div>
    )
}

export default Result;