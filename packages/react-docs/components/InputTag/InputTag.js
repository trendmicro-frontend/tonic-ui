import {
  Box,
  Text,
  useColorMode,
} from '@tonic-ui/react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import EditableTag from './EditableTag';
import TagCreator from './TagCreator';
import { useInputTagStyle } from './styles';

const InputTag = forwardRef((props, ref) => {
  const [colorMode] = useColorMode();
  const placeholderColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const invalidColor = {
    dark: 'red:50',
    light: 'red:60',
  }[colorMode];
  const tagCreatorRef = useRef();
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

  const handleTagCreatorBlur = () => {
    setWrapperFocused(false);
    if (tags.length === 0) {
      setPlaceholderVisible(true);
    }
  };
  const handleTagCreatorFocus = () => {
    setWrapperFocused(true);
    setPlaceholderVisible(false);
  };
  const handleTagCreatorKeyUp = (e) => {
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
    tagCreatorRef.current.focus();
  };

  const handleWrapperClick = () => {
    tagCreatorRef.current.focus();
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
        ref={ref}
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
                isInvalid={!!error}
                onChange={handleTagChange(id)}
                onClose={handleTagClose(id)}
              >
                {value}
              </EditableTag>
            );
          })
        }
        <TagCreator
          ref={tagCreatorRef}
          display="inline-flex"
          height="6x"
          onBlur={handleTagCreatorBlur}
          onCreate={createTags}
          onFocus={handleTagCreatorFocus}
          onKeyUp={handleTagCreatorKeyUp}
        />
      </Box>
      {hasError && <Text color={invalidColor}>There are invalid entries.</Text>}
    </>
  );
});

InputTag.displayName = 'InputTag';

export default InputTag;
