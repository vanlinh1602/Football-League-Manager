import { Button, Col, Layout, Row, Table, TableColumnType, Typography } from 'antd';
import { Header, Waiting } from 'components';
import { EventEditor } from 'features/events/components';
import { useMatchSlide } from 'features/matches/store';
import {
  selectMatch,
  selectMatchEvents,
  selectMatchHandling,
} from 'features/matches/store/selectors';
import type { Event } from 'features/matches/types';
import { usePlayerSlide } from 'features/players/store';
import { selectPlayerHandling, selectPlayersOfTeams } from 'features/players/store/selectors';
import { selectTeamData } from 'features/teams/store/selectors';
import { events } from 'lib/options';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from 'types';

const Events = () => {
  const dispatch = useDispatch();
  const { actions } = useMatchSlide();
  const { actions: playerAction } = usePlayerSlide();
  const { match: matchID } = useParams();

  const match = useSelector((state: RootState) => selectMatch(state, matchID || ''));
  const handling = useSelector(selectMatchHandling);
  const waiting = useSelector(selectPlayerHandling);
  const matchEvents = useSelector((state: RootState) => selectMatchEvents(state, matchID || ''));
  const { teamA, teamB, mathResult } = match ?? {};
  const teams = useSelector(selectTeamData);
  const teamAPlayers = useSelector((state: RootState) => selectPlayersOfTeams(state, teamA || ''));
  const teamBPlayers = useSelector((state: RootState) => selectPlayersOfTeams(state, teamB || ''));

  useEffect(() => {
    if (!matchEvents && matchID) {
      dispatch(actions.getEvents(matchID));
    }
    if (!teamAPlayers) {
      dispatch(playerAction.getPlayers(teamA || ''));
    }
    if (!teamBPlayers) {
      dispatch(playerAction.getPlayers(teamB || ''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [edit, setEdit] = useState<Partial<Event>>();

  const columns: TableColumnType<Event>[] = useMemo(
    () => [
      {
        title: 'STT',
        align: 'center',
        width: 70,
        render: (_a, _b, index) => index + 1,
      },
      {
        title: 'Sự kiện',
        dataIndex: 'name',
        align: 'center',
        render: (value: string) => events[value],
      },
      {
        title: 'Thời gian',
        width: 200,
        align: 'center',
        dataIndex: 'minute',
        render: (value) => `Phút thứ ${value}`,
      },
      {
        title: 'Đội',
        align: 'center',
        dataIndex: 'detail',
        render: (_any, record) => teams?.[record.detail.team]?.name,
      },
      {
        title: 'Thành viên',
        align: 'center',
        dataIndex: 'detail',
        render: (_any, record) => {
          const players = record.detail.team === match?.teamA ? teamAPlayers : teamBPlayers;
          return players?.[record.detail.player || '']?.name;
        },
      },
    ],
    [match, teamAPlayers, teamBPlayers, teams]
  );
  return (
    <div>
      {handling || waiting ? <Waiting /> : null}
      {edit ? (
        <EventEditor
          info={edit}
          teamsOptions={[
            {
              label: teams?.[teamA || '']?.name || '',
              value: teamA || '',
            },
            {
              label: teams?.[teamB || '']?.name || '',
              value: teamB || '',
            },
          ]}
          onCancel={() => setEdit(undefined)}
        />
      ) : null}
      <Header
        content={
          <div>
            <Row justify="center">
              <Typography.Title level={4}>Diễn biến trận đấu</Typography.Title>
              <Button
                type="primary"
                style={{ position: 'absolute', right: 10 }}
                onClick={() => setEdit({ match: matchID })}
              >
                Thêm sự kiện
              </Button>
            </Row>
          </div>
        }
      />
      <Layout
        style={{ backgroundColor: 'white', height: window.innerHeight - 100, textAlign: 'center' }}
      >
        <Row
          justify="space-between"
          align="middle"
          gutter={12}
          style={{ paddingTop: 10, height: 130 }}
        >
          <Col span={11}>
            <img src={teams?.[teamA!]?.logo} alt="" style={{ width: 80, borderRadius: 48 }} />
            <Typography.Title level={5} style={{ marginTop: 10 }}>
              {teams?.[teamA!]?.name}
            </Typography.Title>
          </Col>
          <Col span={2}>
            <Typography.Title level={1}>
              {`${mathResult?.teamA || 0} - ${mathResult?.teamB || 0}`}
            </Typography.Title>
          </Col>
          <Col span={11}>
            <img src={teams?.[teamB!]?.logo} alt="" style={{ width: 70, borderRadius: 48 }} />
            <Typography.Title level={5} style={{ marginTop: 10 }}>
              {teams?.[teamB!]?.name}
            </Typography.Title>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={Object.values(matchEvents ?? {})}
          scroll={{ y: window.innerHeight - 250 }}
        />
      </Layout>
    </div>
  );
};

export default Events;
