import { useNavigate } from 'react-router-dom'
import { Image } from 'react-bootstrap'

const ProductsNotInCart = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div>
          {/* <Image src={s} alt={s}/> */}
        </div>
        <div>
          <h1>Wah, keranjang belanjamu ksong</h1>
          <p>Yuk isi dengan barang impian mu</p>
          <button onClick={() => navigate('/')}/>
        </div>
      </div>
    </>
  )
}

export default ProductsNotInCart