import Carousel from "react-material-ui-carousel";

const images = require.context("../../photos", true);
const imageList = images.keys().map(image => images(image));

export default function ImageSlider(props) {
	return (
		<Carousel indicators={false} swipe={false} navButtonsAlwaysInvisible={true}>
			{
				imageList.map((image, i) => <Item key={i} image={image} />)
			}
		</Carousel>
	)
}

function Item(props) {
	return (
	  <div
		className="slider-image"
		style={{ backgroundImage: `url(${props.image})`,
				 backgroundSize: 'contain', /* Ensures the image covers the whole area */
				 backgroundPosition: 'center' /* Centers the image */
			   }}
	  >
	  </div>
	);
  }

// export default function ImageSlider(props) {
// 	return (
// 		<Carousel indicators={false} swipe={false} navButtonsAlwaysInvisible={true}>
// 			{
// 				imageList.map((image, i) => <Item key={i} image={image} />)
// 			}
// 		</Carousel>
// 	)
// }

// function Item(props) {
// 	return (
// 		<div>
// 			<img className="slider-image" src={props.image} alt={'image no. ' + props.key} />
// 		</div>
// 	)
// }
