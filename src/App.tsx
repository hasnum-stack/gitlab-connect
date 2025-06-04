import CopyListener from '@/components/CopyListener';
import RightClickModal from '@/components/RightClickModal';
import GitlabList from '@/galaxy/gitlab-list';
const App = () => {
  return (
    <>
      <GitlabList />
      <RightClickModal />
      {/*<RightClickMenu />*/}
      <CopyListener />
    </>
  );
};
export default App;
