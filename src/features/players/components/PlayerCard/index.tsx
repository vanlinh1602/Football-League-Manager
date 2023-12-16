import { EditOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, Typography } from 'antd';
import type { Player } from 'features/players/types';
import { linearGradientColor, playerRoles } from 'lib/options';
import _ from 'lodash';
import moment from 'moment';

type Props = {
  info: Player;
  handleEdit: () => void;
};

const PlayerCard = ({ info, handleEdit }: Props) => {
  const linearColor = linearGradientColor[_.random(0, linearGradientColor.length - 1)];
  const { name, avatar, birthday, role } = info;

  return (
    <Card
      style={{
        width: '90%',
        margin: '20px',
        borderRadius: '20px',
        backgroundImage: `linear-gradient(to bottom right, ${linearColor[0]}, ${linearColor[1]})`,
        overflow: 'hidden',
      }}
      bodyStyle={{ borderRadius: 12 }}
      cover={
        <img
          alt=""
          src={avatar}
          style={{
            height: 200,
            objectFit: 'cover',
          }}
        />
      }
      actions={[
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
          textAlign: 'center',
          flexDirection: 'column',
        }}
      >
        <Col style={{ marginBottom: 5 }}>
          <Typography style={{ fontWeight: 'bold', fontSize: 24, color: 'white' }}>
            {name}
          </Typography>
        </Col>
        <Row justify="space-between" style={{ width: '100%', textAlign: 'center' }}>
          <Col>
            <Typography>Age</Typography>
            <Typography style={{ fontWeight: 'bold' }}>
              {moment().year() - moment(birthday).year()}
            </Typography>
          </Col>
          <Col style={{ paddingLeft: 15 }}>
            <Typography>Position</Typography>
            <Typography style={{ fontWeight: 'bold' }}>{playerRoles[role]}</Typography>
          </Col>
          <Col>
            <Typography>Contry</Typography>
            <Typography style={{ fontWeight: 'bold' }}>VN</Typography>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default PlayerCard;
