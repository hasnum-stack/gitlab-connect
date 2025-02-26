import { Button, Form, Input, message, Modal, Tag } from 'antd';
import { createProjectBranchService } from '@/services';
import { useState } from 'react';
import { useGitlabListSelectState } from '../../store';
const FormItem = Form.Item;

function CreateBranch() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedRows = useGitlabListSelectState(state => state.selected);
  const [form] = Form.useForm();
  return (
    <>
      {selectedRows.length === 0 ? null : (
        <Button
          color='cyan'
          variant='solid'
          onClick={async () => {
            setOpen(true);
          }}
        >
          create branch
        </Button>
      )}
      <Modal
        title='新建分支'
        open={open}
        onOk={async () => {
          try {
            setOpen(true);
            const values = await form.validateFields();
            await Promise.all(
              selectedRows.map(row => {
                const { id } = row;
                return createProjectBranchService(id, values);
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
      >
        <Form form={form}>
          <FormItem>
            {selectedRows.map(row => {
              return <Tag key={row.id}>{row.name}</Tag>;
            })}
          </FormItem>
          <FormItem name='branch' label='分支名称'>
            <Input />
          </FormItem>
          <FormItem name='ref' label='基于分支'>
            <Input />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
}
export default CreateBranch;
