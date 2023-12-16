import { Button, Col, Layout, Row, Typography } from 'antd';
import { Header, Waiting } from 'components';
import { LeagueCard, LeagueEditor } from 'features/leagues/compoments';
import { useLeagueSlide } from 'features/leagues/store';
import { selectLeagueHandling, selectLeagues } from 'features/leagues/store/selectors';
import type { League } from 'features/leagues/types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Leagues = () => {
  const dispatch = useDispatch();
  const { actions } = useLeagueSlide();

  const handling = useSelector(selectLeagueHandling);
  const leagueData = useSelector(selectLeagues);
  const [edit, setEdit] = useState<Partial<League>>();

  return (
    <div>
      {handling ? <Waiting /> : null}
      {edit ? <LeagueEditor info={edit} onClose={() => setEdit(undefined)} /> : null}
      <Header
        content={
          <Row justify="space-between">
            <Col>
              <Typography.Title level={4}>Football Leagues</Typography.Title>
            </Col>
            <Col>
              <Button
                type="primary"
                style={{ marginRight: 10 }}
                onClick={() => {
                  dispatch(actions.getLeagues());
                }}
              >
                Tra cứu
              </Button>
              <Button
                type="text"
                style={{ backgroundColor: '#82c91e', color: 'white' }}
                onClick={() => setEdit({})}
              >
                Thêm giải đấu
              </Button>
            </Col>
          </Row>
        }
      />
      <Layout style={{ overflowY: 'scroll', height: window.innerHeight - 100 }}>
        <Row>
          {Object.values(leagueData ?? {}).map((league) => (
            <Col span={6}>
              <LeagueCard info={league} handleEdit={() => setEdit(league)} />
            </Col>
          ))}
        </Row>
      </Layout>
    </div>
  );
};

export default Leagues;
