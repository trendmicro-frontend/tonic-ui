import { SVGIcon } from '../icon';

const IconIndeterminate = (props) => {
  return (
    <SVGIcon viewBox="0 0 16 16" {...props}>
      <g fill="currentColor">
        <rect x="4" y="4" width="8" height="8" />
      </g>
    </SVGIcon>
  );
};

IconIndeterminate.displayName = 'IconIndeterminate';

export default IconIndeterminate;
