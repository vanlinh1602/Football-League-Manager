import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Upload } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import { useTeamSlide } from 'features/teams/store';
import type { Team } from 'features/teams/types';
import { countryOptions } from 'lib/options';
import { ActiveTeam } from 'Modals/Team/State/ActiveTeam';
import { InactiveTeam } from 'Modals/Team/State/InactiveTeam';
import { ClassTeam } from 'Modals/Team/Team';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { generateID } from 'utils/commons';
import { getBase64 } from 'utils/image';

type Props = {
  info: Team;
  onClose: () => void;
};

export const TeamEditor = ({ info, onClose }: Props) => {
  const dispatch = useDispatch();
  const { actions } = useTeamSlide();
  const [form] = Form.useForm<Team>();
  const [image, setImage] = useState<string>(info.logo || '');
  const [background, setBackground] = useState<string>(info.background || '');
  const handlerUpload = async (file: RcFile, type: string) => {
    const base64 = await getBase64(file);
    if (type === 'logo') {
      setImage(base64);
    } else {
      setBackground(base64);
    }
  };
  const team = new ClassTeam(info.active ? new ActiveTeam() : new InactiveTeam(), info);

  const handleSave = async () => {
    try {
      const formData = await form.validateFields();
      if (!image) {
        Modal.warn({ title: 'Thiếu thông tin', content: 'Vui lòng chọn logo' });
        return;
      }
      if (formData.founding) {
        formData.founding = formData.founding.valueOf();
      }
      const dataUpdate: Team = {
        ...info,
        ...formData,
        logo: image!,
        background,
      };
      if (!dataUpdate.id) {
        dataUpdate.id = generateID();
      }

      await team.updateTeamInfo(dataUpdate);

      dispatch(actions.fetchTeam({ [dataUpdate.id]: dataUpdate }));
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
      <Row gutter={[5, 10]}>
        <Col span={24}>
          <Upload.Dragger
            name="file"
            height={200}
            accept="image/*"
            listType="picture"
            showUploadList={false}
            beforeUpload={(file) => handlerUpload(file, 'background')}
          >
            {background ? (
              <img
                src={background}
                alt="avatar"
                style={{ width: '100%', height: 170, objectFit: 'cover' }}
              />
            ) : (
              <div>Thêm Background</div>
            )}
          </Upload.Dragger>
        </Col>
        <Col span={6}>
          <Upload
            name="avatar"
            listType="picture-card"
            accept="image/*"
            showUploadList={false}
            beforeUpload={(file) => handlerUpload(file, 'logo')}
          >
            {image ? (
              <img src={image} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div>Thêm logo</div>
            )}
          </Upload>
        </Col>
        <Col span={18}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ ...info, founding: info.founding ? moment(info.founding) : '' } ?? {}}
          >
            <Form.Item name="name" label="Tên đội bóng" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="coach" label="Huấn luyện viên" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="active" label="Đội hoạt động" valuePropName="checked">
                  <Checkbox
                    onChange={({ target }) => {
                      if (target.checked) {
                        team.changeActiveTeam(new ActiveTeam());
                      } else {
                        team.changeActiveTeam(new InactiveTeam());
                      }
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="founding" label="Ngày thành lập" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} format="D/M/Y" />
            </Form.Item>
            <Form.Item name="country" label="Quốc gia" rules={[{ required: true }]}>
              <Select options={countryOptions} />
            </Form.Item>
            <Form.Item name="captain" label="Đội trưởng">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};
