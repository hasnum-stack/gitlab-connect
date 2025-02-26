type ProjectInfo = {
  id: number;
  name: string;
  name_with_namespace: string;
  web_url: string;
  tag_list: string[];
  description: string;
};
type BranchFormValues = {
  branch: string;
  ref: string;
};
type BranchSelectOption = {
  name: string;
};
type BranchSelectOptions = BranchSelectOption[];
export type { ProjectInfo, BranchFormValues, BranchSelectOptions };
