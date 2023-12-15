import { Layout } from 'antd';
import { Waiting } from 'components';
import { LeagueCard, LeagueEditor } from 'features/leagues/compoments';
import { useLeagueSlide } from 'features/leagues/store';
import { selectLeagueHandling, selectLeagues } from 'features/leagues/store/selectors';
import type { League } from 'features/leagues/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Leagues = () => {
  const dispatch = useDispatch();
  const { actions } = useLeagueSlide();

  const handling = useSelector(selectLeagueHandling);
  const leagueData = useSelector(selectLeagues);
  const [edit, setEdit] = useState<League>();

  useEffect(() => {
    if (!leagueData) {
      dispatch(actions.getLeagues());
    }
  }, [dispatch, actions, leagueData]);

  return (
    <Layout>
      {handling ? <Waiting /> : null}
      {edit ? <LeagueEditor info={edit} onClose={() => setEdit(undefined)} /> : null}

      {Object.values(leagueData ?? {}).map((league) => (
        <LeagueCard info={league} handleEdit={() => setEdit(league)} />
      ))}
    </Layout>
  );
};

export default Leagues;
