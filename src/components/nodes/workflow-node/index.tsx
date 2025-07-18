import { useCallback } from 'react';
import { Play } from 'lucide-react';

import {
  NodeHeaderTitle,
  NodeHeader,
  NodeHeaderActions,
  NodeHeaderAction,
  NodeHeaderDeleteAction,
  NodeHeaderIcon,
} from '../../node-header';
import { NODE_SIZE, WorkflowNodeData } from '..';
import { useWorkflowRunner } from '../../../hooks/use-workflow-runner';
import { iconMapping } from '../../../data/icon-mapping';
import { BaseNode } from '../../base-node';
import { NodeStatusIndicator } from '../../node-status-indicator';

// This is an example of how to implement the WorkflowNode component. All the nodes in the Workflow Builder example
// are variations on this CustomNode defined in the index.tsx file.
// You can also create new components for each of your nodes for greater flexibility.
function WorkflowNode({
  id,
  data,
  children,
}: {
  id: string;
  data: WorkflowNodeData;
  children?: React.ReactNode;
}) {
  const { runWorkflow } = useWorkflowRunner();
  const onClick = useCallback(() => runWorkflow(id), [id, runWorkflow]);

  const IconComponent = data?.icon ? iconMapping[data.icon] : undefined;

  return (
    <NodeStatusIndicator status={data?.status}>
      <BaseNode className="p-1" style={{ ...NODE_SIZE }}>
        <NodeHeader>
          <NodeHeaderIcon>
            {IconComponent ? <IconComponent aria-label={data?.icon} /> : null}
          </NodeHeaderIcon>
          <NodeHeaderTitle>{data?.title}</NodeHeaderTitle>
          <NodeHeaderActions>
            <NodeHeaderAction onClick={onClick} label="Run node">
              <Play className="stroke-blue-500 fill-blue-500" />
            </NodeHeaderAction>
            <NodeHeaderDeleteAction />
          </NodeHeaderActions>
        </NodeHeader>
        {children}
      </BaseNode>
    </NodeStatusIndicator>
  );
}

export default WorkflowNode;
