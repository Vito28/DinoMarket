import { useNavigate } from 'react-router-dom'
import { Container, Image } from 'react-bootstrap'

const ProductsNotInCart = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="container-shopify not-cart">
        <div>
          {/* <Image src={s} alt={s}/> */}
        </div>
        <div>
          <h1>Wah, keranjang belanjamu kosong</h1>
          <div className='goto'>
          <button onClick={() => navigate('/')}></button>
          <p>Yuk isi dengan barang impian mu</p>
          
          </div>
          
        </div>
      </div>
    </Container>
  )
}

export default ProductsNotInCart