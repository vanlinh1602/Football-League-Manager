import { Button, Card, Col, Layout, Row, Typography } from 'antd';
import { Header, Waiting } from 'components';
import { selectTeamHandling } from 'features/teams/store/selectors';
import { useUserSlice } from 'features/user/store';
import { selectUserHandling } from 'features/user/store/selectors';
import { getAuth, signOut } from 'firebase/auth';
import _ from 'lodash';
import { FaPersonRunning } from 'react-icons/fa6';
import { FiLogOut, FiUsers } from 'react-icons/fi';
import { GiChampions } from 'react-icons/gi';
import { PiSoccerBallFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const teamHandling = useSelector(selectTeamHandling);
  const userHandling = useSelector(selectUserHandling);

  const { actions } = useUserSlice();
  const dispatch = useDispatch();
  const renderCard = (name: string, icon: any, right: boolean = false) => (
    <Col
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: 220,
      }}
      span={12}
    >
      <Card
        style={{
          width: 350,
          borderRadius: 24,
          color: 'blue',
          textAlign: 'center',
          position: 'absolute',
          ...(right ? { right: 20 } : { left: 20 }),
        }}
        onClick={() => navigate(_.toLower(name))}
      >
        <Row justify="center" align="middle">
          <Col>
            {icon}
            <Typography.Title style={{ marginTop: 20 }} level={1}>
              {name}
            </Typography.Title>
          </Col>
        </Row>
      </Card>
    </Col>
  );

  return (
    <div>
      {teamHandling || userHandling ? <Waiting /> : null}
      <Header
        content={
          <div>
            <Row justify="center">
              <Typography.Title level={4}>FootBall League Manager</Typography.Title>
              <Button
                type="primary"
                style={{ float: 'right', position: 'absolute', right: 20, borderRadius: 24 }}
                onClick={async () => {
                  await signOut(getAuth());
                  dispatch(actions.signOut());
                }}
                icon={<FiLogOut />}
              >
                Sign Out
              </Button>
            </Row>
          </div>
        }
      />
      <Layout style={{ marginTop: 20 }}>
        <Row gutter={[10, 50]} justify="center">
          {renderCard('Leagues', <GiChampions style={{ fontSize: 100 }} />, true)}

          {renderCard('Matches', <PiSoccerBallFill style={{ fontSize: 100 }} />)}

          {renderCard('Teams', <FiUsers style={{ fontSize: 100 }} />, true)}

          {renderCard('Players', <FaPersonRunning style={{ fontSize: 100 }} />)}
        </Row>
      </Layout>
    </div>
  );
};

export default Home;
