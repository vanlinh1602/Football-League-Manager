import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popover,
  Row,
  Select,
  Table,
  TableColumnType,
  Typography,
  Upload,
} from 'antd';
import type { RcFile } from 'antd/lib/upload';
import { useLeagueSlide } from 'features/leagues/store';
import type { League } from 'features/leagues/types';
import { selectTeamData } from 'features/teams/store/selectors';
import type { Team } from 'features/teams/types';
import _ from 'lodash';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateID } from 'utils/commons';
import { getBase64 } from 'utils/image';

type Props = {
  info: Partial<League>;
  onClose: () => void;
};

type TeamOption = {
  label: string;
  value: string;
  logo: string;
};

type ModalProp = {
  teamOptions: TeamOption[];
  onCancel: () => void;
  onConfirm: (id: string) => void;
};

const ModalSelect = ({ teamOptions, onCancel, onConfirm }: ModalProp) => {
  const [form] = Form.useForm<{ id: string }>();
  return (
    <Modal
      title="Chọn đội bóng"
      open
      onCancel={onCancel}
      footer={[
        <Button onClick={onCancel}>Huỷ</Button>,
        <Button
          type="primary"
          onClick={async () => {
            try {
              const { id } = await form.validateFields();
              onConfirm(id);
              onCancel();
            } catch (error) {}
          }}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item name="id">
          <Select options={teamOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const LeagueEditor = ({ info, onClose }: Props) => {
  const dispatch = useDispatch();
  const { actions } = useLeagueSlide();

  const allTeams = useSelector(selectTeamData);

  const [form] = Form.useForm<League>();
  const [image, setImage] = useState<string>(info.image || '');
  const [teamSelected, setTeamSelected] = useState<string[]>(info.participants ?? []);
  const [showSelect, setShowSelect] = useState<boolean>(false);

  const teamOption: TeamOption[] = useMemo(
    () =>
      Object.values(allTeams ?? {})
        .map(({ id, logo, name }) => ({ label: name, value: id, logo }))
        .filter(({ value }) => !teamSelected.includes(value)),
    [allTeams, teamSelected]
  );

  const columns: TableColumnType<Team>[] = useMemo(
    () => [
      {
        title: 'STT',
        width: 50,
        render: (_any, _record, index) => index + 1,
      },
      {
        title: (
          <Row justify="space-between">
            <Col>
              <Typography>Đội tham gia</Typography>
            </Col>
            <Col>
              <Popover content="Thêm đội bóng">
                <PlusOutlined style={{ color: '#94d82d' }} onClick={() => setShowSelect(true)} />
              </Popover>
            </Col>
          </Row>
        ),
        dataIndex: 'name',
        render: (_any, record) => (
          <Row justify="space-between" align="middle">
            <Col>
              <Row align="middle" gutter={5}>
                <Col>
                  <img style={{ borderRadius: 48 }} width={40} src={record.logo} alt="" />
                </Col>
                <Col>
                  <b>{record.name}</b>
                </Col>
              </Row>
            </Col>
            <Col>
              <Popover content="Xoá đội bóng">
                <DeleteOutlined
                  style={{ color: '#ff2500' }}
                  size={24}
                  onClick={() => setTeamSelected((prev) => prev.filter((id) => id !== record.id))}
                />
              </Popover>
            </Col>
          </Row>
        ),
      },
    ],
    []
  );

  const handlerUpload = async (file: RcFile) => {
    const base64 = await getBase64(file);
    setImage(base64);
  };

  const handleSave = async () => {
    try {
      const formData = await form.validateFields();
      const dataUpdate: League = {
        ...info,
        ...formData,
        start: moment(formData.start).valueOf(),
        end: moment(formData.end).valueOf(),
        image,
        participants: teamSelected,
      };

      if (!dataUpdate.id) {
        dataUpdate.id = generateID();
      }
      dispatch(actions.updateLeague(dataUpdate));
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
      {showSelect ? (
        <ModalSelect
          teamOptions={teamOption}
          onCancel={() => setShowSelect(false)}
          onConfirm={(id) => {
            setTeamSelected((prev) => _.uniq([...prev, id]));
          }}
        />
      ) : null}
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...info,
          start: info.start ? moment(info.start) : '',
          end: info.end ? moment(info.end) : '',
        }}
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
            <Form.Item name="name" label="Tên giải đấu" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="start" label="Ngày bắt đầu" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} format="D/M/Y" />
            </Form.Item>
            <Form.Item name="end" label="Ngày kết thúc" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} format="D/M/Y" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table columns={columns} dataSource={teamSelected.map((id) => allTeams![id])} />
    </Modal>
  );
};

export default LeagueEditor;
