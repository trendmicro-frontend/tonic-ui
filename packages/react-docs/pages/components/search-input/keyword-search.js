import { Button, Flex, SearchInput } from '@tonic-ui/react';
import React, { useRef, useState } from 'react';

const App = () => {
  const ref = useRef();
  const [placeholder, setPlaceholder] = useState('Search');
  const [inputWidth, setInputWidth] = useState(180);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchKeyword = (keyword) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  const onChange = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  };
  const onClearInput = (e) => {
    setKeyword('');
  };
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      const keyword = e.target.value;
      if (keyword) {
        searchKeyword(keyword);
      }
    }
  };
  const handleClickReset = (e) => {
    setKeyword('');
    if (isLoading) {
      setIsLoading(false);
    }
  };

  return (
    <Flex alignItems="center" columnGap="4x">
      <SearchInput
        ref={ref}
        placeholder={placeholder}
        value={keyword}
        isLoading={isLoading}
        readOnly={isLoading}
        onChange={onChange}
        onClearInput={onClearInput}
        onFocus={() => {
          setPlaceholder('Company name, endpoint name');
          setInputWidth(360);

          requestAnimationFrame(() => {
            ref.current.select();
          });
        }}
        onBlur={() => {
          setPlaceholder('Search');
          // Shrink width when the value is empty
          setInputWidth(keyword ? 360 : 180);
        }}
        onKeyPress={onKeyPress}
        width={inputWidth}
        inputProps={{
          textOverflow: 'ellipsis',
        }}
      />
      <Button
        disabled={!keyword}
        onClick={handleClickReset}
      >
        Reset
      </Button>
    </Flex>
  );
};

export default App;
