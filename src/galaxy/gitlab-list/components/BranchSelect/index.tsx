import { useState } from 'react';
import { Select, Flex, theme } from 'antd';
import type { ProjectInfo } from '@/galaxy/gitlab-list/types';
import { getProjectBranchesService } from '@/services';
import toClipboard from '@/utils/toClipboard';
import { useDebounceFn } from 'ahooks';
import { GitBranch } from 'lucide-react';
import { createStyles } from 'antd-style';
const useStyles = createStyles(({ token, prefixCls }) => {
  console.log(prefixCls);
  const primaryColor = token.colorPrimary;
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    cursor: {
      '&:hover': {
        color: 'var(--ant-color-primary)',
      },
      cursor: 'pointer',
    },
  };
});

type BranchSelectProps = {
  record: ProjectInfo;
};
type Branch = {
  name: string;
};

const BranchSelect = ({ record }: BranchSelectProps) => {
  const { styles } = useStyles();
  const id = record?.id;
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
      <Flex align='center' gap='small'>
        <Select
          onChange={async value => {
            if (!value) return;
            //直接复制到粘贴板
            await toClipboard(value);
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
        <GitBranch className={styles.cursor} />
      </Flex>
    </>
  );
};
export default BranchSelect;
