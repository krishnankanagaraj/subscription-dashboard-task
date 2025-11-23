import { useEffect } from 'react';
import { useIdle } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const IdleTimer = () => {
  const isIdle = useIdle(15 * 60 * 1000); // 15 minutes in milliseconds (15 * 60 * 1000)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isIdle && isAuthenticated) {
      dispatch(logout());
      navigate('/login');
      toast.info('You have been logged out due to inactivity.');
    }
  }, [isIdle, isAuthenticated, dispatch, navigate]);

  return null;
};


export default IdleTimer;
