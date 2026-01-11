export default function Categories() {
    const categories = [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Clothing" }
    ]

    return( 
        <div>
            <h3>Categories: </h3>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                    </li>
                ))}
            </ul>
    </div>
    )
}
