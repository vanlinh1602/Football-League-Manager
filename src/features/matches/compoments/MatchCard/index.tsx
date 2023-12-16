import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, Typography } from 'antd';
import type { Match } from 'features/matches/types';
import { selectTeamData } from 'features/teams/store/selectors';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type Props = {
  info: Match;
  handleEdit: () => void;
};

const MatchCard = ({ info, handleEdit }: Props) => {
  const navigate = useNavigate();
  const teams = useSelector(selectTeamData) ?? {};
  return (
    <Card
      style={{ width: 300, margin: '20px', borderRadius: '20px', overflow: 'hidden' }}
      bodyStyle={{ borderRadius: 12 }}
      actions={[
        <Popover content="Xem trận đấu">
          <EyeOutlined
            key="view"
            onClick={() => navigate(`/matches/${info.league}/${info.id}/events`)}
          />
        </Popover>,
        <Popover content="Chỉnh sửa thông tin">
          <EditOutlined key="edit" onClick={handleEdit} />,
        </Popover>,
      ]}
    >
      <div
        style={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Row align="middle" justify="center">
          <Typography>{moment(info.date).format('H:mm - DD/MM/YYYY')}</Typography>
        </Row>
        <Row align="middle" justify="center">
          <Typography.Title level={5}>{info.round}</Typography.Title>
        </Row>
        <Row justify="space-between" align="middle" gutter={12}>
          <Col span={11}>
            <img src={teams[info.teamA].logo} alt="" style={{ width: 80, borderRadius: 48 }} />
            <Typography.Title level={5} style={{ marginTop: 10 }}>
              {teams[info.teamA].name}
            </Typography.Title>
          </Col>
          <Col span={2}>
            <b>VS</b>
          </Col>
          <Col span={11}>
            <img src={teams[info.teamB].logo} alt="" style={{ width: 70, borderRadius: 48 }} />
            <Typography.Title level={5} style={{ marginTop: 10 }}>
              {teams[info.teamB].name}
            </Typography.Title>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default MatchCard;
