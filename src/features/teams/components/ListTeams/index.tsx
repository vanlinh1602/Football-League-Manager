import { EditOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Col, Popover, Row, Table, TableColumnType } from 'antd';
import { selectTeamData } from 'features/teams/store/selectors';
import type { Team } from 'features/teams/types';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { TeamEditor } from './TeamEditor';

const ListTeams = () => {
  const teamsData = useSelector(selectTeamData);
  const [edit, setEdit] = useState<Team>();

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
      },
      {
        title: 'Người sở hữu',
        dataIndex: 'owner',
      },
      {
        render: (_any, record) => (
          <Row style={{ width: '100%' }} justify="space-between">
            <Popover content="Danh sách thành viên">
              <TeamOutlined />
            </Popover>
            <Popover content="Sửa thông tin đội bóng">
              <EditOutlined onClick={() => setEdit(record)} />
            </Popover>
          </Row>
        ),
      },
    ],
    []
  );
  return (
    <div>
      {edit ? <TeamEditor info={edit} /> : null}
      <Row justify="end" gutter={[5, 5]}>
        <Col>
          <Button type="primary">Thêm đội bóng</Button>
        </Col>
      </Row>
      <Table columns={columns} pagination={false} dataSource={Object.values(teamsData ?? {})} />
    </div>
  );
};

export default ListTeams;
