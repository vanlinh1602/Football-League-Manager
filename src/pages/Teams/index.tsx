import { Button, Col, Form, Layout, Row, Select } from 'antd';
import { ListTeams } from 'features/teams/components';
import { useTeamSlide } from 'features/teams/store';
import moment from 'moment';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getYearOptions } from 'utils/commons';

const Teams = () => {
  const dispatch = useDispatch();
  const { actions } = useTeamSlide();
  const [form] = Form.useForm<{ year: number }>();

  const handleQuery = useCallback(async () => {
    const data = await form.validateFields();

    dispatch(actions.getTeams(data));
  }, [dispatch, actions, form]);

  return (
    <Layout style={{ background: 'white', height: '100%' }}>
      <Form form={form} initialValues={{ year: moment().year() }}>
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
      </Form>
      <ListTeams />
    </Layout>
  );
};

export default Teams;
