import {useState} from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

const Guide = () => {
    let keyword = ["성별", "부위", "계절", "상황", "조건", "색상", "연령", "핏"];
let options = {
    "성별": ["남성", "여성"],
    "부위": ["상의", "하의", "신발", "아우터", "모자", "포인트"],
    "계절": ["봄", "여름", "가을", "겨울"],
    "상황": ["데일리", "일상", "데이트", "소개팅", "미팅", "기념일", "여행", "면접", "결혼식", "장례식", "비즈니스", "학교", "캠퍼스", "공대", "바닷가", "피서", "산", "아웃도어", "산책", "운동", "활동", "소풍", "나들이", "꽃구경"],
    "조건": ["대학생", "고등학생", "학생", "직장인", "회사원", "교수", "커플", "남친룩", "여친룩", "주말룩", "꾸안꾸", "캐주얼", "미니멀", "댄디", "깔끔", "레트로", "감성", "포멀", "스포티", "스트릿", "개성", "청량", "쿨", "기본", "베이직", "편한", "아메카지", "밀리터리", "하이패션", "페니", "빈티지", "라이프스타일", "모던"],
    "색상": ["빨강", "주황", "노랑", "초록", "파랑", "보라", "분홍", "갈색", "검정", "흰색", "아이보리", "회색"],
    "연령": ["10", "20", "30", "40", "50"],
    "핏": ["레귤러핏", "루즈핏", "오버핏", "세미오버핏", "오버사이즈", "슬림핏", "스트레이트핏", "와이드핏", "세미와이드핏", "테이퍼드핏"]
};
    
    const [openDropdown, setOpenDropdown] = useState('');

    const toggleDropdown = (keyword) => {
        if (openDropdown === keyword) {
            setOpenDropdown('');
        } else {
            setOpenDropdown(keyword);
        }
    }

    return (
        <>
        <div className="drowdown" style={{ display: "flex", flexWrap: "wrap", flexDirection: "column", marginLeft: "100px", marginTop: "50px",height: "50%"}}>
            {keyword.map((word, index) => (
                <ButtonDropdown style={{ flexBasis: '25%', marginRight: "10px", padding: "5px", height: "0%" }} isOpen={openDropdown === word} toggle={() => toggleDropdown(word)} key={index}>
                <DropdownToggle caret style={{ borderRadius: "5px", width: '100%', height: '54%' }}>{word}</DropdownToggle>
                <DropdownMenu>
                    {options[word].map((option, index) => (
                        <DropdownItem key={index}>{option}</DropdownItem>
                    ))}
                </DropdownMenu>
            </ButtonDropdown>
        
            ))}
            
        </div>
        
        <div style={{height: "50%"}} />
        </>
    )
}
export default Guide;