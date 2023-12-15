import { Layout } from 'antd';
import { ListTeams } from 'features/teams/components';

const Teams = () => (
  // const dispatch = useDispatch();
  // const { actions } = useTeamSlide();
  // const [form] = Form.useForm<{ year: number }>();

  // const handleQuery = useCallback(async () => {
  //   const data = await form.validateFields();

  //   dispatch(actions.getTeams(data));
  // }, [dispatch, actions, form]);
  <Layout style={{ background: 'white', height: '100%' }}>
    {/* <Form form={form} initialValues={{ year: moment().year() }}>
        <Row gutter={10}>
          <Col span={4}>
            <Form.Item name="year" label="Chọn năm">
              <Select options={getYearOptions()} />
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" onClick={handleQuery}>
              Tra cứu
            </Button>
          </Col>
        </Row>
      </Form> */}
    <ListTeams />
  </Layout>
);
export default Teams;
