import { PageHeader } from 'antd';

type Props = {
  content: any;
};

const Header = ({ content }: Props) => (
  <PageHeader style={{ backgroundColor: 'white', marginBottom: 5, height: 64 }}>
    {content}
  </PageHeader>
);

export default Header;
