import { EditOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Col, Popover, Row, Table, TableColumnType } from 'antd';
import { Waiting } from 'components';
import { useTeamSlide } from 'features/teams/store';
import { selectTeamData, selectTeamHandling } from 'features/teams/store/selectors';
import type { Team } from 'features/teams/types';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TeamEditor } from './TeamEditor';

const ListTeams = () => {
  const dispatch = useDispatch();
  const { actions } = useTeamSlide();
  const navigate = useNavigate();

  const teamsData = useSelector(selectTeamData);
  const handling = useSelector(selectTeamHandling);
  const [edit, setEdit] = useState<Partial<Team>>();

  useEffect(() => {
    if (!teamsData) {
      dispatch(actions.getTeams());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, dispatch]);

  const columns: TableColumnType<Team>[] = useMemo(
    () => [
      {
        title: 'STT',
        width: 50,
        render: (_any, _record, index) => index + 1,
      },
      {
        title: 'Tên đội bóng',
        dataIndex: 'name',
        render: (_any, record) => (
          <Row align="middle" gutter={5}>
            <Col>
              <img style={{ borderRadius: 48 }} width={40} src={record.logo} alt="" />
            </Col>
            <Col>
              <b>{record.name}</b>
            </Col>
          </Row>
        ),
      },
      {
        title: 'Người sở hữu',
        dataIndex: 'owner',
      },
      {
        render: (_any, record) => (
          <Row gutter={20}>
            <Col>
              <Popover content="Danh sách thành viên">
                <TeamOutlined onClick={() => navigate(`/players/${record.id}`)} />
              </Popover>
            </Col>
            <Col>
              <Popover content="Sửa thông tin đội bóng">
                <EditOutlined onClick={() => setEdit(record)} />
              </Popover>
            </Col>
          </Row>
        ),
      },
    ],
    [navigate]
  );
  return (
    <div>
      {handling ? <Waiting /> : null}
      {edit ? <TeamEditor info={edit} onClose={() => setEdit(undefined)} /> : null}
      <Row justify="end" gutter={[5, 5]}>
        <Col>
          <Button style={{ margin: '10px 10px' }} type="primary" onClick={() => setEdit({})}>
            Thêm đội bóng
          </Button>
        </Col>
      </Row>
      <Table columns={columns} pagination={false} dataSource={Object.values(teamsData ?? {})} />
    </div>
  );
};

export default ListTeams;
