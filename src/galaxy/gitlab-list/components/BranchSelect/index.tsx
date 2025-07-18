import type { ProjectInfo } from '@/galaxy/gitlab-list/types';
import { getProjectBranchesService } from '@/services';
import toClipboard from '@/utils/toClipboard';
import { useDebounceFn } from 'ahooks';
import { Flex, Select } from 'antd';
import { createStyles } from 'antd-style';
import { GitBranch } from 'lucide-react';
import { useState } from 'react';

const useStyles = createStyles(({ token }) => {
  const primaryColor = token.colorPrimary;
  const motionDurationSlow = token.motionDurationSlow;
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    cursor: {
      '&:hover': {
        color: primaryColor,
      },
      transition: `all ${motionDurationSlow}`,
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
  const [value, setValue] = useState<string>('');
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
          value={value}
          onChange={async value => {
            if (!value) return;
            //直接复制到粘贴板
            await toClipboard(value);
            setValue(value);
          }}
          allowClear
          onClear={() => {
            setValue('');
          }}
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
        {value && (
          <GitBranch
            size={18}
            className={styles.cursor}
            onClick={() => {
              const web_url = record.web_url;
              const url = `${web_url}/-/tree/${value}`;
              window.open(url);
            }}
          />
        )}
      </Flex>
    </>
  );
};
export default BranchSelect;
