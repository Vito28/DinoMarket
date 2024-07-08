
import { useSelector } from "react-redux";

const AuthButton = () => {
  const { isLogin } = useSelector(state => state.auth);

  return (
    <div className="auth">
      {isLogin ? (
        <button className="logOut">LogOut</button>
      ) : (
        <>
          <button className="signin active">SignIn</button>
          <button className="login">LogIn</button>
        </>
      )}
    </div>
  );
};

export default AuthButton;
