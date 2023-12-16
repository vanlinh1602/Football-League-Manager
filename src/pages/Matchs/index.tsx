import { Button, Col, Layout, notification, Row, Select, Typography } from 'antd';
import { Header, Waiting } from 'components';
import { useLeagueSlide } from 'features/leagues/store';
import { selectLeagueHandling, selectLeagues } from 'features/leagues/store/selectors';
import { MatchCard, MatchEditor } from 'features/matches/compoments';
import { useMatchSlide } from 'features/matches/store';
import { selectLeagueMatches, selectMatchHandling } from 'features/matches/store/selectors';
import type { Match } from 'features/matches/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from 'types';

const Matchs = () => {
  const { league: leagueID } = useParams();

  const dispatch = useDispatch();
  const { actions } = useMatchSlide();
  const { actions: leagueAction } = useLeagueSlide();

  const [league, setLeague] = useState(leagueID || '');
  const [editMatch, setEditMatch] = useState<Partial<Match>>();

  const matchHanding = useSelector(selectMatchHandling);
  const leagueHandling = useSelector(selectLeagueHandling);
  const matchs = useSelector((state: RootState) => selectLeagueMatches(state, league));
  const leagues = useSelector(selectLeagues);

  useEffect(() => {
    if (league && !matchs) {
      dispatch(actions.getMatchs(league));
    }
    if (!leagues) {
      dispatch(leagueAction.getLeagues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {matchHanding || leagueHandling ? <Waiting /> : null}
      {editMatch ? <MatchEditor info={editMatch} onClose={() => setEditMatch(undefined)} /> : null}
      <Header
        content={
          <Row align="middle" justify="space-between">
            <Col>
              <Typography.Title level={4}>Trận đấu</Typography.Title>
            </Col>
            <Col>
              <Row gutter={10} align="middle">
                <Col>Chọn giải đấu</Col>
                <Col>
                  <Select
                    value={league}
                    options={Object.values(leagues ?? {}).map((data) => ({
                      label: data.name,
                      value: data.id,
                    }))}
                    style={{ width: 150 }}
                    onChange={(value: string) => setLeague(value)}
                  />
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      dispatch(actions.getMatchs(league));
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
                      if (!league) {
                        notification.warning({
                          message: 'Vui lòng chọn giải đấu',
                        });
                        return;
                      }
                      setEditMatch({ league });
                    }}
                  >
                    Thêm trận đấu
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      />
      <Layout style={{ overflowY: 'scroll', height: window.innerHeight - 100 }}>
        <Row>
          {matchs.map((match) => (
            <Col span={6}>
              <MatchCard info={match} handleEdit={() => setEditMatch(match)} />
            </Col>
          ))}
        </Row>
      </Layout>
    </div>
  );
};

export default Matchs;
