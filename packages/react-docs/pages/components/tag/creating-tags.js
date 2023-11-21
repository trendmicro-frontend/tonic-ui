import {
  Box,
  Text,
  useColorMode,
} from '@tonic-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import EditableTag from './components/EditableTag';
import TagInput from './components/TagInput';

const useInputTagStyle = ({
  isFocused,
}) => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'transparent',
    light: 'white',
  }[colorMode];
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const hoverBorderColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];
  const invalidBorderColor = {
    dark: 'red:50',
    light: 'red:60',
  }[colorMode];
  const focusBorderColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const disabledBorderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];

  return {
    backgroundColor,
    border: 1,
    borderColor: isFocused ? focusBorderColor : borderColor,
    borderRadius: 'sm',
    fontSize: 'sm',
    lineHeight: 'sm',
    height: '9x',
    px: 'calc(.75rem - 1px)', // 12px - 1px
    py: 'calc(.375rem - 1px)', // 6px - 1px
    _hover: {
      borderColor: hoverBorderColor,
    },
    _disabled: {
      borderColor: disabledBorderColor,
      cursor: 'not-allowed',
      opacity: disabledOpacity,
    },
    _invalid: {
      borderColor: invalidBorderColor,
    },
  };
};

const App = () => {
  const [colorMode] = useColorMode();
  const placeholderColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const invalidColor = {
    dark: 'red:50',
    light: 'red:60',
  }[colorMode];
  const tagInputRef = useRef();
  const [tags, setTags] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [isWrapperFocused, setWrapperFocused] = useState(false);
  const createTags = (values) => {
    if (values.length === 0) {
      return;
    }
    values = values.filter(value => {
      if (value.trim() === '') {
        return false; // skip
      }
      return true;
    }).map((value, i) => {
      const tagId = new Date().getTime() + i;
      return {
        id: tagId,
        value: value,
      };
    });
    const newTags = [...tags, ...values];
    setTags(newTags);
  };
  const updateTag = ({ id, value }) => {
    const newTags = [...tags];
    const tag = newTags.find((t) => t.id === id);
    tag.value = value || tag.value;
    setTags(newTags);
  };

  const handleTagInputBlur = () => {
    setWrapperFocused(false);
    if (tags.length === 0) {
      setPlaceholderVisible(true);
    }
  };
  const handleTagInputFocus = () => {
    setWrapperFocused(true);
    setPlaceholderVisible(false);
  };
  const handleTagInputKeyUp = (e) => {
    const keyCode = e.keyCode;
    const value = e.target.value;
    if (keyCode == 8) { // Delete
      if (!value && tags.length > 0) {
        // remove last tag
        tags.splice((tags.length-1), 1);
        setTags([...tags]);
      }
    }
  };

  const handleTagChange = (tagId) => ({ value }) => {
    updateTag({ id: tagId, value });
  };
  const handleTagClose = (tagId) => () => {
    const newTags = tags.filter((t) => t.id !== tagId);
    setTags(newTags);
    tagInputRef.current.focus();
  };

  const handleWrapperClick = () => {
    tagInputRef.current.focus();
  };
  const styleProps = useInputTagStyle({
    isFocused: isWrapperFocused,
  });

  useEffect(() => {
    const verifyTag = ({ id, value }) => {
      const isDuplicate = tags.find((t) => t.value === value && t.id !== id);
      if (isDuplicate) {
        return 'Duplicate entries';
      }
      return '';
    };
    const invalidTags = tags.map((tag) => {
      tag.error = verifyTag({ id: tag.id, value: tag.value });
      return tag;
    }).filter(t => t.error.length > 0);

    if (invalidTags.length >= 1) {
      setHasError(true);
    }
    if (invalidTags.length === 0) {
      setHasError(false);
    }
  }, [tags]);

  return (
    <>
      <Box
        aria-invalid={hasError}
        display="flex"
        onClick={handleWrapperClick}
        {...styleProps}
      >
        {placeholderVisible && (
          <Text
            display="inline-flex"
            py="2q"
            color={placeholderColor}
          >
            Add new tag
          </Text>
        )}
        {
          tags.map(tag => {
            const id = tag.id;
            const value = tag.value;
            const error = tag.error;
            return (
              <EditableTag
                key={id}
                mr="2x"
                title={value}
                error={!!error}
                onChange={handleTagChange(id)}
                onClose={handleTagClose(id)}
              >
                {value}
              </EditableTag>
            );
          })
        }
        <TagInput
          ref={tagInputRef}
          display="inline-flex"
          height="6x"
          onBlur={handleTagInputBlur}
          onCreate={createTags}
          onFocus={handleTagInputFocus}
          onKeyUp={handleTagInputKeyUp}
        />
      </Box>
      {hasError && <Text color={invalidColor}>There are invalid entries.</Text>}
    </>
  );
};

export default App;
