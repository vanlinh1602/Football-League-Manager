import { Button, Col, Form, Input, Modal, Row, Select, Upload } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import { selectPlayersOfTeams } from 'features/players/store/selectors';
import { useTeamSlide } from 'features/teams/store';
import type { Team } from 'features/teams/types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'types';
import { generateID } from 'utils/commons';
import { getBase64 } from 'utils/image';

type Props = {
  info: Partial<Team>;
  onClose: () => void;
};

export const TeamEditor = ({ info, onClose }: Props) => {
  const dispatch = useDispatch();
  const { actions } = useTeamSlide();
  const [form] = Form.useForm<Team>();

  const teamMembers = useSelector((state: RootState) => selectPlayersOfTeams(state, info.id ?? ''));

  const [image, setImage] = useState<string>(info.logo || '');
  const handlerUpload = async (file: RcFile) => {
    const base64 = await getBase64(file);
    setImage(base64);
  };

  const handleSave = async () => {
    try {
      const formData = await form.validateFields();
      if (!image) {
        Modal.warn({ title: 'Thiếu thông tin', content: 'Vui lòng chọn logo' });
        return;
      }
      const dataUpdate: Team = {
        ...info,
        ...formData,
        logo: image!,
      };

      if (!dataUpdate.id) {
        dataUpdate.id = generateID();
      }

      dispatch(actions.updateTeam(dataUpdate));
      onClose();
    } catch {}
  };

  return (
    <Modal
      open
      title={`${info.id ? 'Sửa' : 'Thêm'} đội bóng`}
      onCancel={onClose}
      footer={[
        <Button type="primary" onClick={handleSave}>
          Lưu
        </Button>,
      ]}
    >
      <Row>
        <Col span={6}>
          <Upload
            name="avatar"
            listType="picture-card"
            accept="image/*"
            showUploadList={false}
            beforeUpload={handlerUpload}
          >
            {image ? (
              <img src={image} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div>Thêm logo</div>
            )}
          </Upload>
        </Col>
        <Col span={18}>
          <Form form={form} layout="vertical" initialValues={info ?? {}}>
            <Form.Item name="name" label="Tên đội bóng" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="coach" label="Huấn luyện viên" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="captain" label="Đội trưởng">
              <Select
                options={Object.values(teamMembers ?? {}).map(({ name, id }) => ({
                  value: id,
                  label: name,
                }))}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};
