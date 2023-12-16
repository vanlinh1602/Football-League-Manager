import { Button, Col, Form, InputNumber, Modal, Row, Select } from 'antd';
import { useMatchSlide } from 'features/matches/store';
import type { Event } from 'features/matches/types';
import { selectPlayersOfTeams } from 'features/players/store/selectors';
import { events } from 'lib/options';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'types';
import { generateID } from 'utils/commons';

type Props = {
  info: Partial<Event>;
  teamsOptions: { label: string; value: string }[];
  onCancel: () => void;
};

export const EventEditor = ({ info, onCancel, teamsOptions }: Props) => {
  const dispatch = useDispatch();
  const { actions } = useMatchSlide();
  const [form] = Form.useForm<Event>();
  const [team, setTeam] = useState('');
  const players = useSelector((state: RootState) => selectPlayersOfTeams(state, team));

  const handleSave = async () => {
    try {
      const formData = await form.validateFields();
      const dataUpdate = {
        ...info,
        ...formData,
      };
      if (!info.id) {
        dataUpdate.id = generateID();
      }
      dispatch(actions.updateEvent(dataUpdate));
      onCancel();
    } catch (error) {}
  };

  return (
    <Modal
      open
      title={`${!info.id ? 'Thêm' : 'Sửa'} sự kiện`}
      onCancel={onCancel}
      footer={[
        <Button type="primary" onClick={handleSave}>
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} initialValues={info} layout="vertical">
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item name="name" label="Tên sự kiện" rules={[{ required: true }]}>
              <Select
                options={Object.entries(events).map(([id, name]) => ({ label: name, value: id }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="minute" label="Phút thứ" rules={[{ required: true }]}>
              <InputNumber controls={false} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name={['detail', 'team']} label="Đội" rules={[{ required: true }]}>
          <Select
            options={teamsOptions}
            onChange={(value: string) => {
              setTeam(value);
            }}
          />
        </Form.Item>
        <Form.Item name={['detail', 'player']} label="Cầu thủ">
          <Select
            options={Object.values(players ?? {}).map(({ id, name }) => ({
              label: name,
              value: id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventEditor;
