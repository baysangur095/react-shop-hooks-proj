import React from 'react';
const ProductCard = React.memo(({ product, onAddTocart, onRemoveFromCart }) => {
    console.log(`Рендер карточки: ${product.name}`);

    return (
        <div style={{
            border: '1px solid gray',
            padding: '15px',
            margin: '15px',
            borderRadius: '8px',
            width: '150px',
        }}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>

            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button onClick={() => onAddTocart(product.id)}>
                    Add to cart
                </button>

                <button
                    onClick={() => onRemoveFromCart(product.id)}
                    style={{
                        backgroundColor: '#ff4d4d',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        cursor: 'pointer'
                    }}
                >
                    Remove
                </button>
            </div>
        </div>
    );
});

export default ProductCard;