import { Button, Col, Layout, notification, Row, Select } from 'antd';
import { Waiting } from 'components';
import { PlayerEditor } from 'features/players/components';
import ListPlayers from 'features/players/components/ListPlayers';
import { usePlayersSlide } from 'features/players/store';
import { selectLayers, selectPlayerHandling } from 'features/players/store/selectors';
import { useTeamsSlide } from 'features/teams/store';
import { selectTeamData, selectTeamHandling } from 'features/teams/store/selectors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Players = () => {
  const { team: teamId } = useParams();

  const dispatch = useDispatch();
  const { actions: playersAction } = usePlayersSlide();
  const { actions: teamsAction } = useTeamsSlide();
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
    <Layout style={{ background: 'white', height: '100%' }}>
      {teamsHandling || playersHandling ? <Waiting /> : null}
      {addPlayer ? <PlayerEditor info={{ team }} onClose={() => setAddPlayer(false)} /> : null}

      <Row justify="space-between" style={{ margin: 10 }}>
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
        </Row>
        <Col style={{ float: 'right', position: 'relative' }}>
          <Button
            type="primary"
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
      <ListPlayers team={team} />
    </Layout>
  );
};

export default Players;
