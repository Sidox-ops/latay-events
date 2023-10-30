import ImageScroller from "./ImageScroller/ImageScroller";
export default function Card({ title, content, imageUrl }) {
    return (
        <div className=" rounded overflow-hidden shadow-lg bg-white m-4">
            <ImageScroller />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <div className="text-gray-700 text-base">{content}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
                {/* Vous pouvez ajouter des tags ou des boutons ici si nécessaire */}
                {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    #tag1
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    #tag2
                </span> */}
            </div>
        </div>
    );
}
