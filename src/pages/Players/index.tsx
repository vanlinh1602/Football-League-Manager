import { Button, Col, Layout, notification, Row, Select, Typography } from 'antd';
import { Header, Waiting } from 'components';
import { PlayerCard, PlayerEditor } from 'features/players/components';
import { usePlayerSlide } from 'features/players/store';
import { selectPlayerHandling, selectPlayersOfTeams } from 'features/players/store/selectors';
import type { Player } from 'features/players/types';
import { selectTeamData, selectTeamHandling } from 'features/teams/store/selectors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from 'types';

const Players = () => {
  const { team: teamId } = useParams();

  const dispatch = useDispatch();
  const { actions: playersAction } = usePlayerSlide();
  const allTeams = useSelector(selectTeamData);

  const playersHandling = useSelector(selectPlayerHandling);
  const teamsHandling = useSelector(selectTeamHandling);

  const [team, setTeam] = useState(teamId || '');
  const [editPlayer, setEditPlayer] = useState<Partial<Player>>();

  const players = useSelector((state: RootState) => selectPlayersOfTeams(state, team));
  useEffect(() => {
    if (teamId && !players) {
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
                      setEditPlayer({ team });
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
        {editPlayer ? (
          <PlayerEditor info={editPlayer} onClose={() => setEditPlayer(undefined)} />
        ) : null}
        <Row>
          {Object.values(players ?? {}).map((player) => (
            <Col span={6}>
              <PlayerCard info={player} handleEdit={() => setEditPlayer(player)} />
            </Col>
          ))}
        </Row>
      </Layout>
    </div>
  );
};

export default Players;
