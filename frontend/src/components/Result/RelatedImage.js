import Box from '@mui/material/Box';

const RelatedImage = ({imgsrc}) => {
    return (
        <div>
            <img src={imgsrc} alt="img" width="100%" height="auto"/>
        </div>
    );
};

export default RelatedImage;