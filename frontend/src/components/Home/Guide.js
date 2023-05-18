import {useState} from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

const Guide = () => {
    let keyword = ["부위", "상황", "조건", "가격"];
    let part = ["상의", "하의", "신발", "모자", "아우터", "악세사리"]
    let place = ["학교", "결혼식", "소풍", "데이트", "면접"];
    let condition = ["루즈핏", "와이드핏", "슬림핏", "크롭"]
    let price = ["20000", "30000", "40000", "50000"];

    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    return (
        <ButtonDropdown isOpen={open} toggle={toggle}>
            <DropdownToggle caret>{keyword[0]}</DropdownToggle>
            <DropdownMenu>
                <DropdownItem>{part[0]}</DropdownItem>
                <DropdownItem>{part[1]}</DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>
    )
}
export default Guide;