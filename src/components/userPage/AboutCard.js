import React from "react";
import Carousel from "react-material-ui-carousel";

const images = require.context("../../photos", true);
const imageList = images.keys().map(image => images(image));

const AboutCard = ({ title = "TEXT", text }) => {
  return (
    <div className="about-container">
      <div className="background-image">
        <Carousel indicators={false} swipe={false} navButtonsAlwaysInvisible={true}>
          {
            imageList.map((image, i) => <Item key={i} image={image} />)
          }
        </Carousel>
      </div>
      <div className="about-card">
        <div className="title-box">{title}</div>
        <p className="about-text">
          {text ||
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, "}
        </p>
      </div>
    </div>
  );
};

function Item(props) {
	return (
		<div>
			<img className="slider-image" src={props.image} alt={'image no. ' + props.key} />
		</div>
	)
}


export default AboutCard;
