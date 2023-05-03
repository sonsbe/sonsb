import Box from '@mui/material/Box';

const SelectedList = ({ selectedProducts }) => {
  const category = ['상의', '하의', '신발', '모자', '아우터', '부위테스트'];
  var total=0;

  selectedProducts.forEach((product) => {
    if (product) {
      total += product.price;
    }
  });

    return(
       
      <div>
        <Box 
          sx={{
            width: '100%', 
            height: 'auto', 
            border: 1,
            borderRadius: '16px'
         }}>
        {selectedProducts.map((product, index) =>
          product ? (
            <div key={index}>
                {category[index]}: {product.name}{" "}
                가격: {product.price}
                <hr/>
            </div>
          ) : null
        )}
        {total > 0 && <div>Total: {total}</div>}
        </Box>
      </div>
    );
};
export default SelectedList;