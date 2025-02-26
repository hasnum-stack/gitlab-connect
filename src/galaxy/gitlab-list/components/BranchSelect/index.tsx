import { useState } from 'react';
import { Select } from 'antd';
import type { ProjectInfo } from '@/galaxy/gitlab-list/types';
import { getProjectBranchesService } from '@/services';
import toClipboard from '@/utils/toClipboard';
import { useDebounceFn } from 'ahooks';
import { useHistoryClipboard } from '@/galaxy/gitlab-list/store';

type BranchSelectProps = {
  record: ProjectInfo;
};
type Branch = {
  name: string;
};

const BranchSelect = ({ record }: BranchSelectProps) => {
  const id = record?.id;
  const pushClipboard = useHistoryClipboard(state => state.push);
  const [options, setOptions] = useState<Branch[]>([]);
  const { run: handleSearch } = useDebounceFn(
    async value => {
      if (value) {
        const res = await getProjectBranchesService(id, { search: value });
        setOptions(res);
      }
    },
    {
      wait: 300,
    },
  );
  return (
    <>
      <Select
        onChange={async value => {
          if (!value) return;
          //直接复制到粘贴板
          await toClipboard(value);
          pushClipboard(value);
        }}
        allowClear
        style={{
          width: 500,
        }}
        showSearch
        options={options}
        fieldNames={{
          value: 'name',
          label: 'name',
        }}
        placeholder='请选择分支'
        onSearch={handleSearch}
      />
    </>
  );
};
export default BranchSelect;
