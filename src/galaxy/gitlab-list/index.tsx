import { Col, Flex, Row, Space, Table, Typography } from 'antd';
const { Paragraph } = Typography;
import HistoryClipboard from '@/galaxy/gitlab-list/components/HistoryClipboard';
import BranchSelect from './components/BranchSelect';
import CreateBranch from './components/CreateBranch';
import DeleteBranch from './components/DeleteBranch';
import ProtectedBranch from './components/ProtectedBranch';
import MergeBranch from './components/MergeBranch';
import Refresh from './components/Refresh';
import { useGitlabListSelectState, useGitlabListStore } from './store';
import type { ProjectInfo } from './types';
import { b } from './components/TestEsm';
console.log(b);
const columns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '分支',
    dataIndex: 'branch',
    key: 'branch',
    render: (_: any, record: ProjectInfo) => {
      return <BranchSelect record={record} />;
    },
  },
  {
    title: '项目地址',
    dataIndex: 'web_url',
    key: 'web_url',
    render: (text: string) => {
      return (
        <>
          <Paragraph
            copyable={{
              text,
            }}
          >
            <a href={text}>{text}</a>
          </Paragraph>
        </>
      );
    },
  },
  {
    title: '项目全称',
    dataIndex: 'name_with_namespace',
    key: 'name_with_namespace',
  },
  {
    title: '标签',
    dataIndex: 'tag_list',
    key: 'tag_list',
  },
  {
    title: '项目描述',
    dataIndex: 'description',
    key: 'description',
  },
];

const GitlabList = () => {
  const gitlabList = useGitlabListStore(state => state.gitlabList);
  const setSelected = useGitlabListSelectState(state => state.setSelected);
  return (
    <div>
      <Space direction={'vertical'} style={{ width: '100%' }}>
        <Flex justify='space-between'>
          <Space>
            <CreateBranch />
            <ProtectedBranch />
            <DeleteBranch />
            <MergeBranch />
          </Space>
          <Space>
            <Refresh />
          </Space>
        </Flex>
        <Table<ProjectInfo>
          rowKey='id'
          dataSource={gitlabList}
          columns={columns}
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            onChange: (_, selectedRows) => {
              setSelected(selectedRows);
            },
          }}
        />
        <Row>
          <Col span={4}>
            <HistoryClipboard />
          </Col>
        </Row>
      </Space>
    </div>
  );
};
export default GitlabList;
