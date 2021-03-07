import React from 'react';

interface ICard {
  name: string;
  header: React.ReactNode;
  additionalInfo?: string | number | React.ReactNode;
  footer: string;
  isActive: boolean;
  toggle: Function;
}

const Card = (props: ICard) => {
  const { name, header, additionalInfo, footer, isActive, toggle } = props;

  const handleToggle = () => {
    toggle(!isActive);
  };

  const toggleClassName = `card__toggle${isActive ? ' card__toggle--active' : ''}`;

  const titleClassName = `card__status${isActive ? ' card__status--active' : ''}`;

  return (
    <div className='card__wrapper'>
      <div className='card'>
        <div className='card__header'>
          <div>{header}</div>

          <button onClick={handleToggle} className={toggleClassName}>
            <div className='card__toggle-indicator'></div>
          </button>
        </div>
        <div className={titleClassName}>
          <h2 className='card__title'>{name}</h2>
          <div className='card__additional-info'>{additionalInfo}</div>
        </div>
        <div className='card__footer'>{footer}</div>
      </div>
    </div>
  );
};

export default Card;
