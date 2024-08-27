import { convertString } from "../services/helpers.js";

function PropertyItem({ property, value }) {
    return (
        <li>
            <span className="property">{convertString(property)}</span>
            <span className="data">{value}</span>
        </li>
    );
}

function Card({ entity, imageSrc, onClick, isLoading }) {
    const { name, ...properties } = entity;

    return (
        <>
            <div className="card">
                <h3 className="name">{name}</h3>
                <img src={imageSrc} alt={name} />

                <ul className="properties">
                    {Object.entries(properties).map(([key, value]) => (
                        <PropertyItem key={key} property={key} value={value} />
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Card;
