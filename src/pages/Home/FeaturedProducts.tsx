export default function FeaturedProducts() {
    const products = [
        { id: 1, name: "prod1" },
        { id: 2, name: "prod2" }
    ]
  return (
    <div>
        <h1>Featured Products</h1>
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    {product.name}
                </li>
            ))}
        </ul>
    </div>
  )
}
