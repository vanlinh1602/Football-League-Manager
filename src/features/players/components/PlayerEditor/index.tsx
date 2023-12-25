import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
} from 'antd';
import type { RcFile } from 'antd/lib/upload';
import { usePlayerSlide } from 'features/players/store';
import type { Player } from 'features/players/types';
import { countryOptions, playerRoles } from 'lib/options';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { generateID } from 'utils/commons';
import { getBase64 } from 'utils/image';

type Props = {
  info: Partial<Player>;
  onClose: () => void;
};

const PlayerEditor = ({ info, onClose }: Props) => {
  const dispatch = useDispatch();
  const { actions } = usePlayerSlide();
  const [form] = Form.useForm<Player>();
  const [image, setImage] = useState<string>(info.avatar || '');
  const handlerUpload = async (file: RcFile) => {
    const base64 = await getBase64(file);
    setImage(base64);
  };

  const handleSave = async () => {
    try {
      const formData = await form.validateFields();
      if (!image) {
        Modal.warn({ title: 'Thiếu thông tin', content: 'Vui lòng chọn hình ảnh' });
        return;
      }

      if (formData.birthday) {
        formData.birthday = formData.birthday.valueOf();
      }

      const dataUpdate: Player = {
        ...info,
        ...formData,
        avatar: image,
      };

      if (!dataUpdate.id) {
        dataUpdate.id = generateID();
      }

      dispatch(actions.updatePlayer(dataUpdate));
      onClose();
    } catch {}
  };

  return (
    <Modal
      width={700}
      open
      title={`${info.id ? 'Sửa' : 'Thêm'} cầu thủ`}
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
        initialValues={{ ...info, birthday: info.birthday ? moment(info.birthday) : '' } ?? {}}
      >
        <Row gutter={10}>
          <Col span={8}>
            <Upload.Dragger
              name="file"
              accept="image/*"
              height={240}
              listType="picture"
              showUploadList={false}
              beforeUpload={handlerUpload}
            >
              {image ? (
                <img src={image} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <div>Thêm hình ảnh</div>
              )}
            </Upload.Dragger>
          </Col>
          <Col span={16}>
            <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="birthday" label="Ngày sinh">
              <DatePicker style={{ width: '100%' }} format="D/M/Y" />
            </Form.Item>
            <Form.Item name="country" label="Quốc gia" rules={[{ required: true }]}>
              <Select options={countryOptions} />
            </Form.Item>
            <Form.Item name="number" label="Số áo" rules={[{ required: true }]}>
              <InputNumber controls={false} />
            </Form.Item>
            <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
              <Select
                options={Object.entries(playerRoles).map(([id, name]) => ({
                  label: name,
                  value: id,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="description" label="Mô tả">
              <Input.TextArea style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default PlayerEditor;
