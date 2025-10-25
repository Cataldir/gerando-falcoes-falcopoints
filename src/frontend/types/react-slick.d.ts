declare module 'react-slick' {
  import * as React from 'react';

  export interface ReactSlickSettings {
    dots?: boolean;
    arrows?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    beforeChange?: (current: number, next: number) => void;
    nextArrow?: React.ReactNode;
    prevArrow?: React.ReactNode;
  }

  export interface SliderProps extends ReactSlickSettings {
    className?: string;
    children?: React.ReactNode;
  }

  export default class Slider extends React.Component<SliderProps> {
    slickNext(): void;
    slickPrev(): void;
    slickGoTo(slide: number, dontAnimate?: boolean): void;
  }
}
