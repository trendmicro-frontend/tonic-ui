import { Button, Divider, Scrollbar } from "@tonic-ui/react";
import { useToggle } from "@tonic-ui/react-hooks";
import React, { useRef } from "react";
import Lorem from "@/components/Lorem";

const App = () => {
  const scrollTopRef = useRef();
  const [on, toggle] = useToggle(true);

  return (
    <>
      <Button onClick={toggle}>
        Toggle Visibility
      </Button>
      <Divider my="4x" />
      {on && (
        <Scrollbar
          height={200}
          onUpdate={({ scrollTop }) => {
            scrollTopRef.current = scrollTop;
          }}
          overflow="visible"
          scrollTop={scrollTopRef.current}
        >
          <Lorem count={10} />
        </Scrollbar>
      )}
    </>
  );
};

export default App;
