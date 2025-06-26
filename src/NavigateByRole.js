import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavigateByRole = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user?.access_token) {
      if (user?.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user]);

  return null;
};

export default NavigateByRole;
