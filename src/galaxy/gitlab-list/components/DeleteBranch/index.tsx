import { deleteProjectBranchService } from '@/services';
import { Button, Form, Input, Modal, Tag, message } from 'antd';
import { useState } from 'react';
import { useGitlabListSelectState } from '../../store';
const FormItem = Form.Item;
function DeleteBranch() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedRows = useGitlabListSelectState(state => state.selected);
  const [form] = Form.useForm();
  return (
    <>
      {selectedRows.length === 0 ? null : (
        <Button
          danger
          type='primary'
          onClick={async () => {
            setOpen(true);
          }}
        >
          delete branch
        </Button>
      )}
      <Modal
        title='删除分支'
        open={open}
        onOk={async () => {
          try {
            setOpen(true);
            const values = await form.validateFields();
            await Promise.all(
              selectedRows.map(row => {
                const { id } = row;
                const { branch } = values;
                return deleteProjectBranchService(id, branch);
              }),
            );
            message.success('删除成功');
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
        </Form>
      </Modal>
    </>
  );
}
export default DeleteBranch;
