import { protectedProjectBranchService } from '@/services';
import { Button, Form, Input, Modal, Tag, message } from 'antd';
import { useState } from 'react';
import { useGitlabListSelectState } from '../../store';
const FormItem = Form.Item;

function ProtectedBranch() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedRows = useGitlabListSelectState(state => state.selected);
  const [form] = Form.useForm();
  return (
    <>
      {selectedRows.length === 0 ? null : (
        <Button
          color='pink'
          variant='solid'
          onClick={async () => {
            setOpen(true);
          }}
        >
          protected branch
        </Button>
      )}
      <Modal
        title='保护分支'
        open={open}
        onOk={async () => {
          try {
            setOpen(true);
            const values = await form.validateFields();
            await Promise.all(
              selectedRows.map(row => {
                const { id } = row;
                return protectedProjectBranchService(id, values);
              }),
            );
            message.success('保护成功');
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
          <FormItem name='name' label='分支名称'>
            <Input />
          </FormItem>
          {/*<FormItem name='ref' label='基于分支'>*/}
          {/*  <Input />*/}
          {/*</FormItem>*/}
        </Form>
      </Modal>
    </>
  );
}
export default ProtectedBranch;
