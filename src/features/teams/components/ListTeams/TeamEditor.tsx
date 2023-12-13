import { Col, Form, Input, Modal, Row, Upload } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import type { Team } from 'features/teams/types';
import { useState } from 'react';
import { getBase64 } from 'utils/image';

type Props = {
  info: Team;
};

export const TeamEditor = ({ info }: Props) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<string>();
  const handlerUpload = async (file: RcFile) => {
    const base64 = await getBase64(file);
    setImage(base64);
  };
  return (
    <Modal open title={`${info.id ? 'Sửa' : 'Thêm'} đội bóng`}>
      <Row>
        <Col span={6}>
          <Upload
            name="avatar"
            listType="picture-card"
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
            <Form.Item name="name" label="Tên đội bóng">
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Người sỡ hữu">
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};
