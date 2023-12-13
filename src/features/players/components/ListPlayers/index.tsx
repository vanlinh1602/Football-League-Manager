import { EditOutlined } from '@ant-design/icons';
import { Col, Popover, Row, Table, TableColumnType, Typography } from 'antd';
import { selectPlayersOfTeams } from 'features/players/store/selectors';
import type { Player } from 'features/players/types';
import { playerRoles } from 'lib/options';
import _ from 'lodash';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'types';

import PlayerEditor from '../PlayerEditor';

type Props = {
  team: string;
};

const ListPlayers = ({ team }: Props) => {
  const players = useSelector((state: RootState) => selectPlayersOfTeams(state, team));
  const [edit, setEdit] = useState<Player>();

  const columns: TableColumnType<Player>[] = useMemo(
    () => [
      {
        title: 'STT',
        width: 50,
        render: (_any, _record, index) => index + 1,
      },
      {
        title: 'Tên cầu thủ',
        dataIndex: 'name',
        render: (_any, record) => (
          <Row align="middle" gutter={5}>
            <Col>
              <img style={{ borderRadius: 48 }} width={40} src={record.avatar} alt="" />
            </Col>
            <Col>
              <b>{record.name}</b>
            </Col>
          </Row>
        ),
      },
      {
        title: 'Vai trò',
        dataIndex: 'role',
        render: (role) => _.get(playerRoles, role, role),
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        render: (des) => <Typography>{des}</Typography>,
      },
      {
        render: (_any, record) => (
          <Row gutter={20}>
            <Col>
              <Popover content="Sửa thông tin">
                <EditOutlined onClick={() => setEdit(record)} />
              </Popover>
            </Col>
          </Row>
        ),
      },
    ],
    []
  );
  return (
    <div>
      {edit ? <PlayerEditor info={edit} onClose={() => setEdit(undefined)} /> : null}
      <Table columns={columns} pagination={false} dataSource={Object.values(players ?? {})} />
    </div>
  );
};

export default ListPlayers;
