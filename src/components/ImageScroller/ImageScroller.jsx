import "./ImageScroller.css";
import image1 from "../../assets/images/IMG_5851.jpg";
import image2 from "../../assets/images/IMG_5852.jpg";
import image3 from "../../assets/images/IMG_5853.jpg";
import image5 from "../../assets/images/IMG_5855.jpg";
import image6 from "../../assets/images/IMG_5856.jpg";
import image7 from "../../assets/images/IMG_5857.jpg";
import image8 from "../../assets/images/IMG_5858.jpg";
import image9 from "../../assets/images/IMG_5859.jpg";
import image10 from "../../assets/images/IMG_5860.jpg";

export default function ImageScroller() {
    const images = [
        image1,
        image2,
        image3,
        image5,
        image6,
        image7,
        image8,
        image9,
        image10,
    ];
    return (
        <div className="image-scroller-container m-4">
            <div className="image-scroller">
                {images.concat(images).map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        className="scroller-image"
                    />
                ))}
            </div>
        </div>
    );
}
