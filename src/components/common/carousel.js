import React from 'react';
import _ from 'lodash';
import Slider from 'react-slick';

const SampleArrow = React.createClass({
  render: function() {
    const values = _.omit(this.props, ['slideCount', 'currentSlide', 'position', 'classeName', 'className']);
    return <button {...values} className={this.props.classeName}><i className={`chevron circle ${this.props.position} icon`}></i></button>;
  }
});

const Carousel = ({ items }) => {
  if (items.length) {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      utoplay: true,
      autoplaySpeed: 3000,
      nextArrow: <SampleArrow classeName='slicker slicker-next' position='right' />,
      prevArrow: <SampleArrow classeName='slicker slicker-prev' position='left' />
    };

    const itemsRender = items.map((car) => {
      return (
        <div key={car._id} className='carousel-size'>
          <img src={car.photo} role='presentation' />
          <div className='description'>
            <div className='description-car'>{car.name}</div>
            <div className='description-price'>A partir de <span> R$ {car.price} </span></div>
          </div>
        </div>
      );
    });

    return (
      <div className='ui grid carousel'>
        <div className='column'>
          <Slider {...settings}>
            {itemsRender}
          </Slider>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export { Carousel };
