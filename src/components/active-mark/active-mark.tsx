import styles from './active-mark.module.css';
import classNames from 'classnames';

interface ActiveMarkProps {
  className?: string;
  active: boolean;
}

export const ActiveMark: React.FC<ActiveMarkProps> = ({ className, active }) => {
  if (!active) {
    return <div className="size-3" />;
  }
  return (
    <svg viewBox="0 0 16 16" className={classNames('size-3', className)}>
      <title>句读</title>
      <circle cx="8" cy="8" r="6" className={`stroke-brand-5 fill-none stroke-3 ${styles['animated-circle']}`} />
    </svg>
  );
};
