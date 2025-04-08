import classNames from 'classnames';

export interface ArrowIconProps {
  className?: string;
  direction?: 'left' | 'right';
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ direction = 'right', className }) => {
  return (
    <span
      className={classNames(
        'inline-flex items-center justify-center',
        {
          'rotate-180': direction === 'left',
        },
        className,
      )}
    >
      <svg
        viewBox="0 0 8 12"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: '1em', width: 'auto' }}
      >
        <path d="M4.696 6H8c0-.165-.036-.342-.293-.47C5.057 4.212 2.809 2.212 1.07.11A.302.302 0 00.837 0H.103a.05.05 0 00-.04.08L4.696 6zM4.696 6H8c0 .165-.036.342-.293.47-2.65 1.318-4.898 3.318-6.637 5.42a.302.302 0 01-.233.11H.103a.05.05 0 01-.04-.08L4.696 6z" />
      </svg>
    </span>
  );
};

ArrowIcon.displayName = 'ArrowIcon';
