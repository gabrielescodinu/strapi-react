import React, { useEffect, useState } from 'react';

function App() {
  const [postData, setPostData] = useState({});
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/posts/1?populate=Image,Image2,Card.CardImage')
      .then((response) => response.json())
      .then((data) => {
        setPostData(data.data.attributes);
        setCardData(data.data.attributes.Card);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="h-[500px] bg-cover bg-center p-10" style={{ backgroundImage: `url(http://localhost:1337${postData?.Image2?.data?.attributes?.url})`, }} >
        <h1 className="text-white">{postData.Title}</h1>
        <p>{postData.Content}</p>
      </div>

      <div className='grid grid-cols-3 gap-10 mt-20 p-10'>
        {cardData.map((card) => (
          <div className='rounded-xl shadow-2xl' key={card.id}>
            <img className='' src={`http://localhost:1337${card?.CardImage?.data?.attributes?.url}`} alt="Immagine della card" />
            <h2 className='p-5'>{card.Title}</h2>
          </div>
        ))}
      </div>

      <div className='p-10 mt-20'>
        <img className="h-40 object-cover" src={`http://localhost:1337${postData?.Image?.data?.attributes?.url}`} alt="Immagine del post" />
      </div>
    </div>

  );
}

export default App;
