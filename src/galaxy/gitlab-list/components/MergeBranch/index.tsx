import type { FormInstance } from 'antd';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { createProjectMergeRequestsService } from '@/services';
import { useEffect, useState } from 'react';
import { useGitlabListSelectState } from '../../store';
import type { ProjectInfo } from '@/galaxy/gitlab-list/types';

const FormItem = Form.Item;
type FormValues = {
  source_branch: string;
  target_branch: string;
  assignee_id: string;
  title: string;
};

const createMergeRequestPreview = (projectInfo: ProjectInfo, mergeBranchFormValues: FormValues) => {
  return [
    projectInfo.web_url,
    '/-/merge_requests/new?',
    `merge_request[source_project_id]=${projectInfo.id}`,
    `&merge_request[source_branch]=${mergeBranchFormValues.source_branch}`,
    `&merge_request[target_project_id]=${projectInfo.id}}`,
    `&merge_request[target_branch]=${mergeBranchFormValues.target_branch}`,
  ].join('');
};

//创建去处理按钮
const createGoToProcess = () => {
  const PUBLIC_SERVICE_TARGET = import.meta.env.PUBLIC_SERVICE_TARGET;
  const PUBLIC_PROJECT_USERNAME = import.meta.env.PUBLIC_PROJECT_USERNAME;
  return [PUBLIC_SERVICE_TARGET, '/dashboard/merge_requests?', `assignee_username=${PUBLIC_PROJECT_USERNAME}`].join('');
};

const useMergeTitle = ({ form }: { form: FormInstance<FormValues> }) => {
  const source_branch = Form.useWatch('source_branch', form);
  const target_branch = Form.useWatch('target_branch', form);
  useEffect(() => {
    form.setFieldsValue({ title: `${source_branch} -> ${target_branch}` });
  }, [source_branch, target_branch, form]);
};

function MergeBranch() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedRows = useGitlabListSelectState(state => state.selected);
  const [form] = Form.useForm<FormValues>();
  useMergeTitle({ form });

  return (
    <>
      {selectedRows.length === 0 ? null : (
        <Button
          type='primary'
          onClick={async () => {
            setOpen(true);
          }}
        >
          merge request
        </Button>
      )}
      <Modal
        title='merge request'
        open={open}
        onOk={async () => {
          try {
            setOpen(true);
            const values = await form.validateFields();
            await Promise.all(
              selectedRows.map(row => {
                const { id } = row;
                return createProjectMergeRequestsService(id, values);
              }),
            );
            message.success('新建成功');
          } finally {
            setLoading(false);
          }
        }}
        confirmLoading={loading}
        onCancel={() => {
          setOpen(false);
        }}
        okText='Submit'
        footer={originNode => {
          return (
            <>
              {originNode}
              <Button
                color='pink'
                variant='solid'
                onClick={() => {
                  for (const selectedRow of selectedRows) {
                    const url = createMergeRequestPreview(selectedRow, form.getFieldsValue());
                    window.open(url);
                  }
                }}
              >
                Preview
              </Button>
              <Button
                color='cyan'
                variant='solid'
                onClick={() => {
                  const url = createGoToProcess();
                  window.open(url);
                }}
              >
                Go dashboard
              </Button>
            </>
          );
        }}
      >
        <Form<FormValues>
          form={form}
          initialValues={{ assignee_id: '77', source_branch: '', target_branch: '' }}
          labelCol={{ span: 4 }}
        >
          <FormItem name='title' label='标题'>
            <Input />
          </FormItem>
          <FormItem name='source_branch' label='源分支' rules={[{ required: true }]}>
            <Input />
          </FormItem>
          <FormItem name='target_branch' label='合并至' rules={[{ required: true }]}>
            <Input />
          </FormItem>
          <FormItem name='assignee_id' hidden>
            <Input />
          </FormItem>
          <FormItem>
            <Row gutter={[8, 8]}>
              {selectedRows.map(row => {
                return (
                  <Col span={8} key={row.id}>
                    <Button
                      color='primary'
                      variant='dashed'
                      onClick={async () => {
                        const values = await form.validateFields();
                        const url = createMergeRequestPreview(row, values);
                        window.open(url);
                      }}
                    >
                      {row.name}
                    </Button>
                  </Col>
                );
              })}
            </Row>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
}
export default MergeBranch;
