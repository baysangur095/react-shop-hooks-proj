import {useState, useMemo, useContext, useCallback, useEffect} from 'react';
import {ThemeContext} from './ThemeContext.jsx';
import ProductCard from './ProductCard.jsx';

const DB_PRODUCTS = [
    { id: 1, name: 'Ноутбук', price: 1200 },
    { id: 2, name: 'Смартфон', price: 800 },
    { id: 3, name: 'Наушники', price: 150 },
    { id: 4, name: 'Монитор', price: 300 },
]

export default function App() {
    const {theme, toggleTheme} = useContext(ThemeContext);

    const [search, setSearch] = useState('');
    const [cards, setCards] = useState(() => {
        const savedCart = localStorage.getItem('myCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {

        localStorage.setItem('myCart', JSON.stringify(cards));
        console.log('Корзина синхронизирована с localStorage:', cards);
    }, [cards]);

    const filtresProducts =  useMemo( ()=>{
        console.log('Запущена фильтрация');
        return DB_PRODUCTS.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }, [search]);

    const handleRemoveFromCart = useCallback((id) => {
        setCards(prevCard => {
            const index = prevCard.indexOf(id);
            if (index > -1) {
                const newCards = [...prevCard];
                newCards.splice(index, 1);
                return newCards;
            }
            return prevCard;
        });
    }, []);

    const handleAddtocard = useCallback((id) => {
        setCards(prevCard => [...prevCard, id]);
    }, [])

    const totalPrice = useMemo(() => {
        console.log('Пересчет итоговой суммы...');

        return cards.reduce((sum, currentId) => {

            const product = DB_PRODUCTS.find(p => p.id === currentId);


            return product ? sum + product.price : sum;
        }, 0);

    }, [cards]);

    return (
        <div style={{
            backgroundColor: theme === 'light'? '#fff' : '#1a1a1a',
            color: theme === 'light' ? '#000' : '#fff',
            minHeight: '100vh',
            padding: '20px',
            transition: 'all 0.3s'
        }}>
            <header style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <h1>Магазин электроники</h1>
                <div>
        <span style={{ marginRight: '20px' }}>
            В корзине <strong>{cards.length}</strong> шт.
        </span>

                    {/* Передали var() как обычную строку в кавычках */}
                    <span style={{
                        marginRight: '20px',
                        color: theme === 'light' ? '#000' : 'var(--accent-cyan)'
                    }}>
            Сумма: <strong>{totalPrice}</strong> $
        </span>

                    <button onClick={toggleTheme}>
                        {theme === 'light' ? 'Темная' : 'Светлая'}
                    </button>
                </div>
            </header>
            <hr/>
            <div style={{
                margin: '20px 0',
            }}>
                <input type="text" placeholder='Search...' value={search} onChange={e => setSearch(e.target.value)} style={{
                    padding: '8px',
                    fontSize: '16px',
                    width: '250px',
                }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filtresProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddTocart={handleAddtocard}
                        onRemoveFromCart={handleRemoveFromCart}
                    />
                ))}
            </div>
        </div>
    )

}