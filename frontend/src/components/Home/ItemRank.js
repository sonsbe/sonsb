import { useEffect, useState } from 'react';

const ItemRank = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('product')) || [];

        for(let i=0; i<savedProducts.length; i++) {
            for(let j=0; j<savedProducts[i].products.length;j++){
                if(savedProducts[i].products[j]!==null)
                setProducts((prevState)=> [...prevState, savedProducts[i].products[j].name])
            }
        }
    }, []);

    const productsFrequency = {};
    for (const product of products){
        productsFrequency[product] = (productsFrequency[product] || 0) +1;
    }
    const sortedProducts = Object.entries(productsFrequency).sort((a, b) => b[1] - a[1]);

    return (
        <div style={{ border: "1px solid black", width: "300px", borderRadius: "5px", opacity: 0.9 }}>
          <div style={{textAlign: "center",height: '50px', fontSize: "25px", backgroundColor: 'black', color: 'white', padding: '5px'}}>
            <p>상품 랭킹</p>
          </div>
          <div style={{backgroundColor: 'white', padding: '20px'}}>
          <ul style={{ listStyleType: "none", padding: "0" }}>
          {sortedProducts.slice(0, 7).map(([product], index) => (
              <li key={index} style={{ fontSize: '18px', marginBottom: '10px' }}>
              <span>
                  {index+1}.&nbsp;
              </span>
              {product}
          </li>
          ))}
          </ul>
          </div>
        </div>
      );
}

export default ItemRank;