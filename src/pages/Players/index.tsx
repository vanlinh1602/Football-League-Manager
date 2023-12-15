import { Button, Col, Layout, notification, Row, Select, Typography } from 'antd';
import { Header, Waiting } from 'components';
import { PlayerEditor } from 'features/players/components';
import ListPlayers from 'features/players/components/ListPlayers';
import { usePlayerSlide } from 'features/players/store';
import { selectLayers, selectPlayerHandling } from 'features/players/store/selectors';
import { useTeamSlide } from 'features/teams/store';
import { selectTeamData, selectTeamHandling } from 'features/teams/store/selectors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Players = () => {
  const { team: teamId } = useParams();

  const dispatch = useDispatch();
  const { actions: playersAction } = usePlayerSlide();
  const { actions: teamsAction } = useTeamSlide();
  const allTeams = useSelector(selectTeamData);

  const playersHandling = useSelector(selectPlayerHandling);
  const allPlayers = useSelector(selectLayers);
  const teamsHandling = useSelector(selectTeamHandling);

  const [team, setTeam] = useState(teamId || '');
  const [addPlayer, setAddPlayer] = useState(false);

  useEffect(() => {
    if (!allTeams) {
      dispatch(teamsAction.getTeams());
    }
    if (teamId && !allPlayers?.[team]) {
      dispatch(playersAction.getPlayers(team));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header
        content={
          <Row align="middle" justify="space-between">
            <Col>
              <Typography.Title level={4}>Danh sách cầu thủ</Typography.Title>
            </Col>
            <Col>
              <Row gutter={10} align="middle">
                <Col>Chọn đội</Col>
                <Col>
                  <Select
                    value={team}
                    options={Object.values(allTeams ?? {}).map((data) => ({
                      label: data.name,
                      value: data.id,
                    }))}
                    style={{ width: 150 }}
                    onChange={(value: string) => setTeam(value)}
                  />
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      dispatch(playersAction.getPlayers(team));
                    }}
                  >
                    Tìm kiếm
                  </Button>
                </Col>
                <Col style={{ float: 'right', position: 'relative' }}>
                  <Button
                    type="text"
                    style={{ backgroundColor: '#82c91e', color: 'white' }}
                    onClick={() => {
                      if (!team) {
                        notification.warning({
                          message: 'Vui lòng chọn đội bóng',
                        });
                        return;
                      }
                      setAddPlayer(true);
                    }}
                  >
                    Thêm cầu thủ
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      />
      <Layout style={{ overflowY: 'scroll', height: window.innerHeight - 100 }}>
        {teamsHandling || playersHandling ? <Waiting /> : null}
        {addPlayer ? <PlayerEditor info={{ team }} onClose={() => setAddPlayer(false)} /> : null}
        <ListPlayers team={team} />
      </Layout>
    </div>
  );
};

export default Players;
