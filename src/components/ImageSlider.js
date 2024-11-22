import Carousel from "react-material-ui-carousel";

const images = require.context("../photos", true);
const imageList = images.keys().map(image => images(image));

export default function ImageSlider(props) {
	// var items = [
	// 	{
	// 		photo: test,
	// 		description: "Probably the most random thing you have ever seen!"
	// 	},
	// 	{
	// 		photo: test2,
	// 		description: "Hello World!"
	// 	}
	// ]

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
		<div>
			<img className="slider-image" src={props.image} alt={'image no. ' + props.key} />
		</div>
	)
}
