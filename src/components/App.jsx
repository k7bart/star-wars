import { useState, useEffect } from "react";
import { getData } from "../services/helpers.js";
import { fetchImageSrc } from "../services/helpers.js";

import AudioButton from "./AudioButton.jsx";
import Card from "./Card.jsx";
import Nav from "./Nav.jsx";
import Notice from "./Notice.jsx";

function App() {
    const [entity, setEntity] = useState();
    const [imageSrc, setImageSrc] = useState();
    const [id, setId] = useState(1);
    const [category, setCategory] = useState("people");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            const entity = await getData(id, category);
            const imageSrc = await fetchImageSrc(id, category);

            setIsLoading(false);

            setEntity(entity);
            setImageSrc(imageSrc);
        })();
    }, [id, category]);

    const loadNext = () => {
        setId(id + 1);
    };

    if (!entity || !imageSrc) {
        if (isLoading) return <Notice text="Loading it is..." />;
        return <Notice text="No data" />;
    }

    return (
        <>
            <Nav handleSetCategory={setCategory} />

            <div className={isLoading ? "loading" : undefined}>
                {entity.isAvailable === "not available" ? (
                    <Notice text={entity.isAvailable} />
                ) : (
                    <Card
                        entity={entity}
                        imageSrc={imageSrc}
                        onClick={loadNext}
                        isLoading={isLoading}
                    />
                )}

                <button
                    onClick={loadNext}
                    disabled={isLoading}
                    className="next"
                >
                    next
                </button>
            </div>

            <AudioButton />
        </>
    );
}

export default App;
