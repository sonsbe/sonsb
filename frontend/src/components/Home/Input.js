import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Input = ({getTags, onSubmit}) => {
    const [input, setInput] = useState('');
    const [start, setStart] = useState(0);
    var newTag = null;

    
    const handleOnKeyPress = async (e, callback) => {
      if (e.key === "Enter" || e.key === " ") {
        console.log("before:" + start);
        newTag = input.substr(start, input.length).trim();
        if (newTag === "") {
          return;
        }
        await getTags(newTag);
        setStart(input.length);
        if (callback) {
          callback();
        }
      }
    };
      
    const handleSubmit = async (e) => {
      await handleOnKeyPress({ key: " " }, () => {
        onSubmit();
      });
    };
    
    return (
        <div className="textfield-wrapper">
            <TextField
                style={{width: '500px'}}
                id="outlined-multiline-static"
                multiline
                rows={20}
                placeholder="입력"
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e) => handleOnKeyPress(e, e.target.value)}
            />
                
                    <Button variant="contained" onClick={handleSubmit}>
                    입력
                    </Button>
               
              
      </div>
    )
}
export default Input;


