import { Col, Layout, Typography } from 'antd';
import { Header } from 'components';
import { ListTeams } from 'features/teams/components';

const Teams = () => (
  // const dispatch = useDispatch();
  // const { actions } = useTeamSlide();
  // const [form] = Form.useForm<{ year: number }>();

  // const handleQuery = useCallback(async () => {
  //   const data = await form.validateFields();

  //   dispatch(actions.getTeams(data));
  // }, [dispatch, actions, form]);
  <div>
    <Header
      content={
        <Col>
          <Typography.Title level={4}>Danh sách đội bóng</Typography.Title>
        </Col>
      }
    />
    <Layout style={{ background: 'white', overflowY: 'scroll', height: window.innerHeight - 100 }}>
      <ListTeams />
    </Layout>
  </div>
);
export default Teams;
