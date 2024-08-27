const navItems = ["people", "planets", "starships"];

export default function Nav({ handleSetCategory }) {
    return (
        <nav>
            <ul>
                {navItems.map((item) => (
                    <li key={item}>
                        <button
                            onClick={() =>
                                handleSetCategory(item.toLowerCase())
                            }
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
