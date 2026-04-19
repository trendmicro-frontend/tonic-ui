import { Box, Collapse, LinkButton } from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import CodeBlock from '@/components/CodeBlock';

const SourceCode = ({ name, code }) => {
  const [isOpen, onToggle] = useToggle(false);

  return (
    <>
      <Box mb="2x">
        <LinkButton onClick={onToggle}>{name}</LinkButton>
      </Box>
      <Collapse in={isOpen} unmountOnExit>
        <CodeBlock code={code} />
      </Collapse>
    </>
  );
};

export default SourceCode;
