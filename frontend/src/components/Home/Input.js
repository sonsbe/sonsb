import {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Input = ({setTags, onSubmit, tags, button, setButton}) => {
    const [input, setInput] = useState('');
    const [start, setStart] = useState(0);
    const [check, setCheck] = useState(false); 
    const [isDisabled, setIsDisabled] = useState(false);
    //const [button, setButton] = useState('');
    const [btnActive, setBtnActive] = useState("");

    var newTag = null;
    let btn = ['N', 'E', 'S'];

    const toggleActive = (e) => {
      setBtnActive((prev) => {
        setButton(btn[e.target.value]);
        return e.target.value;
      });
    };
    /*
    const removeTag = (tag) => {
      setTags(prevTags => prevTags.filter((t) => t !== tag))
    }
    */
    useEffect(()=>{
      //성별 감지->버튼 활성화
      if(input.includes("공용")||input.includes("남자")||input.includes("여자")){
        setCheck(true);
        setIsDisabled(true);
        console.log("감지");
        console.log(btnActive);
      }
      /*입력 수정
      for(let tag of tags){
        if(!input.includes(tag)&&tags.length!==0){
          removeTag(tag);
          console.log("태그", tag);
          console.log("태그들", tags);
        }
      }
      */
    },[input])

    const handleOnKeyPress = async (e) => {
      if (e.key === "Enter" || e.key === " ") {
        console.log("before:" + start);
        newTag = input.substr(start, input.length).trim();
        if (newTag === "") {
          return;
        }
        await setTags([...tags, newTag]);
        setStart(input.length);
        
        /*if (callback) {
          callback();
        }*/
      }
    };
      
    const handleSubmit = async (e) => {
      await handleOnKeyPress({ key: " " });
      onSubmit();
    };

    return (
        <div className="textfield-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
          {/*<div style={{display: 'flex', flexDirection: 'row'}}>
              <button onClick={()=>{setButton('N')}}>N</button>
              <button onClick={()=>{setButton('E')}}>E</button>
              <button onClick={()=>{setButton('S')}}>S</button>
    </div>*/}
    <div className="container">
      {btn.map((item, idx) => {
        return (
          <>
            <button
              value={idx}
              className={"btn" + (idx === btnActive ? " active" : "")}
              onClick={toggleActive}
            >
              {item}
            </button>
          </>
        );
      })}
    </div>
            <TextField
                style={{width: '500px'}}
                id="outlined-multiline-static"
                multiline
                rows={20}
                placeholder="입력"
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e) => handleOnKeyPress(e, e.target.value)}
            >
              </TextField>
                
                    <Button style={{marginLeft: 'auto'}} disabled={!isDisabled} variant="contained" onClick={handleSubmit}>
                    입력
                    </Button>
      </div>
    )
}
export default Input;