import { getProjectService } from '@/services';
import { Button } from 'antd';
import { ListRestart } from 'lucide-react';
import projectIds from '../../../../utils/projectIds';
import { useGitlabListStore } from '../../store';

function Refresh() {
  const setGitlabList = useGitlabListStore(state => state.setGitlabList);

  return (
    <>
      <Button
        icon={<ListRestart size={14} />}
        type='primary'
        onClick={async () => {
          const gitlabInfo = await Promise.all(projectIds.map(id => getProjectService(id)));
          localStorage.setItem('gitlabInfo', JSON.stringify(gitlabInfo));
          setGitlabList(gitlabInfo);
        }}
      >
        刷新
      </Button>
    </>
  );
}
export default Refresh;
