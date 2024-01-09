import { Button, notification } from 'antd';
import { Waiting } from 'components';
import { BACKEND } from 'configs';
import { selectUserHandling, selectUserId } from 'features/user/store/selectors';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useMemo } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const userId = useSelector(selectUserId);
  const userHandling = useSelector(selectUserHandling);

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate('/');
    }
  }, [userId, navigate]);

  const providers = useMemo<CustomObject<GoogleAuthProvider>>(() => {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account',
    });
    return {
      google: googleProvider,
    };
  }, []);

  const auth = (provider: string) => {
    signInWithPopup(getAuth(), providers[provider]).catch((error) => {
      if (!error) return;
      if (error.code === 'auth/account-exists-with-different-credential') {
        notification.error({
          message: 'Đăng nhập thất bại',
          description: 'Tài khoản đã tồn tại',
        });
      } else {
        notification.error({
          message: 'Đăng nhập thất bại',
          description: error.message,
        });
      }
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BACKEND}/images/background.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {userHandling ? <Waiting /> : null}
      <div>
        <Button
          style={{ borderRadius: 20 }}
          size="large"
          danger
          type="primary"
          onClick={() => auth('google')}
          icon={<FaGoogle />}
        >
          Login with google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
