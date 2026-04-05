import { Button, Divider, Scrollbar } from "@tonic-ui/react";
import { useToggle } from "@tonic-ui/react-hooks";
import React, { useState } from "react";
import Lorem from "@/components/Lorem";

const App = () => {
  const [scrollTop, setScrollTop] = useState(0);
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
          onUpdate={({ scrollTop: newScrollTop }) => {
            setScrollTop(newScrollTop);
          }}
          overflow="visible"
          scrollTop={scrollTop}
        >
          <Lorem count={10} />
        </Scrollbar>
      )}
    </>
  );
};

export default App;
