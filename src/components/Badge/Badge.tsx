import getClassNames from '../../helpers/getClassNames';

interface IBadge {
  value: number | null;
  isActive: boolean;
  type: 'range' | 'relative';
  range: number[];
}

const Badge = (props: IBadge) => {
  const { value = null, isActive = false, type = 'range', range = [0, 100] } = props;

  const badgeClassName = getClassNames([
    'badge',
    { 'badge--active': isActive },
    { 'badge--hidden': !value && type === 'range' },
    `badge--${type}`,
  ]);

  const badgeWrapperClassName = getClassNames(['badge__wrapper', `badge__wrapper--${type}`]);

  const relativeStyle = {
    filter: `grayscale(${(((value || 0) / range[1]) * 150) / 2}%) brightness(${
      100 + ((value || 0) / range[1]) * 125
    }%)`,
  };

  return (
    <div className={badgeWrapperClassName}>
      <div {...(type === 'relative' && { style: relativeStyle })} className={badgeClassName}>
        {!!value && type === 'range' ? value : null}
      </div>
    </div>
  );
};

export default Badge;
