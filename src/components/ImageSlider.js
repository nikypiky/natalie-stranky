import Carousel from "react-material-ui-carousel";
import  test  from "../photos/3.jpg";
import test2 from "../photos/test2.jpg";

export default function ImageSlider(props)
{
    var items = [
        {
            photo: test,
            description: "Probably the most random thing you have ever seen!"
        },
        {
            photo: test2,
            description: "Hello World!"
        }
    ]

    return (
        <Carousel indicators={false}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <div>
			<img className="slider-image" src={props.item.photo} alt={props.item.description}/>
        </div>
    )
}
