import { useNavigate } from 'react-router-dom';

const ProductsNotInCart = () => {
  const navigate = useNavigate();

  return (
    <div role="main" className='container-shopify not-cart'>
      <div>
        <div></div>
        <div className='goto'>
          <h1>Your shopping cart is empty</h1>
          <p>Lets fill it with your dream items</p>
          <button onClick={() => navigate('/')} aria-label="Go back to Homepage">Go back to Homepage</button>
        </div>
      </div>
    </div>
  );
};


export default ProductsNotInCart;