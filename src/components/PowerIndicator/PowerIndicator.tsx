interface IPowerIndicator {
  power: number;
  type: 'range' | 'relative';
  range: number[];
}

const PowerIndicator = (props: IPowerIndicator) => {
  const { power = 0, type = 'range', range = [0, 100] } = props;

  const isPowerBinary = range[1] - range[0] === 1;
  const badgeDescription = (isPowerBinary && (power ? 'On' : 'Off')) || power;

  return (
    <div className='power-indicator__wrapper'>
      <div className={`power-indicator ${type}`}>
        <div className='power-indicator__content'>
          {type === 'range' && (
            <>
              <div className={'power-indicator__bar'} style={{ height: `${(power / range[1]) * 100}%` }}></div>
              <span className='power-indicator__power'>{badgeDescription}</span>
            </>
          )}
          {type === 'relative' && (
            <div
              className='power-indicator__color'
              style={{
                filter: `grayscale(${((power / range[1]) * 150) / 2}%) brightness(${100 + (power / range[1]) * 125}%)`,
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PowerIndicator;
