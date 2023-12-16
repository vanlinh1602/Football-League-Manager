import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Popover, Row, Typography } from 'antd';
import type { League } from 'features/leagues/types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

type Props = {
  info: League;
  handleEdit: () => void;
};

const LeagueCard = ({ info, handleEdit }: Props) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{ width: 300, margin: '20px', borderRadius: '20px', overflow: 'hidden' }}
      bodyStyle={{ borderRadius: 12 }}
      cover={<img alt="" src={info.image} style={{ height: 200, objectFit: 'cover' }} />}
      actions={[
        <Popover content="Xem các trận đấu">
          <EyeOutlined key="view" onClick={() => navigate('/')} />
        </Popover>,
        <Popover content="Chỉnh sửa thông tin">
          <EditOutlined key="edit" onClick={handleEdit} />,
        </Popover>,
      ]}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Row>
          <Typography.Title level={5}>{info.name}</Typography.Title>
        </Row>
        <Row>
          <Typography>
            {`${moment(info.start).format('DD/MM/YYYY')} - ${moment(info.end).format(
              'DD/MM/YYYY'
            )}`}
          </Typography>
        </Row>
      </div>
    </Card>
  );
};

export default LeagueCard;
