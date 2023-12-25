import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import { useMatchSlide } from 'features/matches/store';
import type { Match } from 'features/matches/types';
import { selectTeamData } from 'features/teams/store/selectors';
import moment from 'moment';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateID } from 'utils/commons';

type Props = {
  info: Partial<Match>;
  onClose: () => void;
};

const MatchEditor = ({ info, onClose }: Props) => {
  const dispatch = useDispatch();
  const { actions } = useMatchSlide();

  const allTeams = useSelector(selectTeamData);

  const [form] = Form.useForm<Match>();
  const teamOptions = useMemo(
    () => Object.values(allTeams ?? {}).map(({ id, name }) => ({ label: name, value: id })),
    [allTeams]
  );
  const handleSave = async () => {
    try {
      const formData = await form.validateFields();
      const dataUpdate: Match = {
        ...info,
        ...formData,
        date: moment(formData.date).valueOf(),
      };
      if (!dataUpdate.id) {
        dataUpdate.id = generateID();
      }

      dispatch(actions.updateMatch(dataUpdate));
      onClose();
    } catch {}
  };

  return (
    <Modal
      width={700}
      open
      title={`${info.id ? 'Sửa thông tin' : 'Thêm'} giải đấu`}
      onCancel={onClose}
      footer={[
        <Button type="primary" onClick={handleSave}>
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ ...info, date: info.date ? moment(info.date) : '' }}
      >
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item name="teamA" label="Đội 1" rules={[{ required: true }]}>
              <Select options={teamOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="teamB" label="Đội 2" rules={[{ required: true }]}>
              <Select options={teamOptions} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="round" label="Lượt đấu" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="place" label="Địa điểm" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="date" label="Ngày thi đấu" rules={[{ required: true }]}>
          <DatePicker
            style={{ width: '100%' }}
            format="H:mm - DD/MM/YYYY"
            showTime={{ format: 'HH:mm' }}
          />
        </Form.Item>
        <Form.Item name="video" label="Youtube video">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MatchEditor;
