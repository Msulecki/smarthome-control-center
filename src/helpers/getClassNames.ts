interface ClassNamesObject {
  [key: string]: boolean | null | undefined | '' | number;
}

declare type TClassName = Array<string | ClassNamesObject>;

const getClassNames = (classNames: TClassName) => {
  if (![classNames].length) {
    throw new Error('Please provide at least one argument');
  }

  return classNames
    .map((className) => {
      if (typeof className === 'string') {
        return className;
      }

      return Object.keys(className).filter((key) => className[key]);
    })
    .flat()
    .join(' ');
};

export default getClassNames;
