import { useEffect, useState } from 'react';

const PostRank = () => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('product')) || [];

        savedProducts.sort((a, b) => b.score - a.score);

        const sortedPosts = savedProducts
            .filter(product => product.name1 !== null && product !== null)
            .map(product => ({ name: product.name1, score: product.score }));

        setPost(sortedPosts);
    }, []);


    
    
    return (
        <div style={{ border: "1px solid black", width: "300px", borderRadius: "5px", opacity: 0.9 }}>
          <div style={{textAlign: "center",height: '50px', fontSize: "25px", backgroundColor: 'black', color: 'white', padding: '5px'}}>
            <p>좋아요 랭킹</p>
          </div>
          <div style={{backgroundColor: 'white', padding: '20px'}}>
          <ul style={{ listStyleType: "none", padding: "0" }}>
          {post.slice(0, 7).map((item, index) => (
              <li key={index} style={{ fontSize: '18px', marginBottom: '10px' }}>
              <span>
                  {index+1}.&nbsp;
              </span>
              {item.name}
          </li>
          ))}
          </ul>
          </div>
        </div>
      );
}

export default PostRank;