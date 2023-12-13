import { PageHeader } from 'antd';
import _ from 'lodash';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const param = useLocation();
  const title = useMemo(() => {
    const path = _.compact(param.pathname.split('/'))?.[0];
    switch (path) {
      case 'teams':
        return 'Danh sách đội bóng';
      default:
        return 'Trang chủ';
    }
  }, [param]);
  return <PageHeader style={{ backgroundColor: 'white', marginBottom: 5 }} title={title} />;
};

export default Header;
