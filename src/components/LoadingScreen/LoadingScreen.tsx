interface ILoadingScreen {
  text?: string;
}

const LoadingScreen = (props: ILoadingScreen) => {
  const { text = 'Loading' } = props;

  return (
    <div className='loading-screen__wrapper'>
      <div className='loading-screen'>
        <div className='loading-screen__item'></div>
        <div className='loading-screen__item'></div>
        <div className='loading-screen__item'></div>
        <div className='loading-screen__item'></div>
        <div className='loading-screen__item'></div>
        <div className='loading-screen__item'></div>
        <div className='loading-screen__item'></div>
        <div className='loading-screen__item'></div>
      </div>
      <div className='loading-screen__info'>
        <div className='loading-screen__info--text'>{text}</div>
        <span className='loading-screen__info--dot'>.</span>
        <span className='loading-screen__info--dot'>.</span>
        <span className='loading-screen__info--dot'>.</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
