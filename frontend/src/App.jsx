import { useState, useEffect } from 'react';
import './App.css'


import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('')
  const [updatingProductId, setUpdatingProductId] = useState(null);

  useEffect(() => {
    api.get('/products').then((res) => {
      console.log(res.data)
      setProducts(res.data)
    })
  }, [])

  function newProduct() {
    api.post('/products', {
      category,
      price,
      name
    }).then((res) => {
      console.log(res)
    })
  }

  function updateProduct(id, updatedProduct) {
    api.put(`/products/${id}`, updatedProduct).then((res) => {
      console.log(res);
      setProducts(products.map((prod) => (prod._id === id ? res.data : prod)));
      setUpdatingProductId(null);
    });
  }

  function deleteProduct(id) {
    api.delete(`/products/${id}`).then((res) => {
      console.log(res);
    });
  }

  function handleUpdateClick(id) {
    // Configurando o ID do produto em atualização
    setUpdatingProductId(id);

    // Obtendo os detalhes do produto antes da atualização
    api.get(`/products/${id}`).then((res) => {
      const { name, price, category } = res.data;
      setName(name);
      setPrice(price);
      setCategory(category);
    });
  }

  function renderProductsByCategory() {
    const productsByCategory = {};

    products.forEach((prod) => {
      const { category, name, price } = prod;
      if (!productsByCategory[category]) {
        productsByCategory[category] = [];
      }
      productsByCategory[category].push({ name, price });
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            {Object.keys(productsByCategory).map((category) => (
              <th key={category}>{`${category} `}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.name}>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              {Object.keys(productsByCategory).map((category) => (
                <td key={`${category}-${prod.name}`}>
                  {productsByCategory[category].some((p) => p.name === prod.name) ? 'X' : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }


  return (
    <div>
      <h1>Todos os Produtos</h1>
      <ul>
        
        {products.map(prod => (
          <li key={prod._id}>
            {prod.name} - R${prod.price}
            <br/>
            {updatingProductId === prod._id ? ( // Verificando se o produto está em modo de atualização
              <>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                <button onClick={() => updateProduct(prod._id, { name, category, price })}>
                  Confirmar Atualização
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleUpdateClick(prod._id)}>
                  Atualizar
                </button>
                <button onClick={() => deleteProduct(prod._id)}>
                  Deletar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2>Adicionar novos produtos</h2>
      <input type="" placeholder='Nome' onChange={event => setName(event.target.value)}/>
      <input type="" placeholder='Categoria' onChange={event => setCategory(event.target.value)}/>
      <input type="Number" placeholder='Preço' onChange={event => setPrice(event.target.value)}/>
      <button onClick={newProduct}>Adicionar produto</button>
      <div>
        <h2>Produtos por categoria</h2>
        {renderProductsByCategory()}
      </div>

    </div>
  )
}

export default App
