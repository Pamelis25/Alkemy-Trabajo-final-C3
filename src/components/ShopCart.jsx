import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function ShopCart() {
  const [items, setItems] = useState([]); // Para guardar mis productos en el carrito
  const [btnComprar, setBtnComprar] = useState(false); //Para mostrar/ocultar el boton Pagar
  const [cartel, setCartel] = useState(true); //Para mostrar/ocultar el mensaje 'El carrito se encuentra vacío ' 

// Array de productos
  const productos = [
    {
      id: 1,
      title: 'ARTIFICIAL',
      price: 10000,
      image: 'images/libro1.jpg',
      quantity: 1,
    },
    {
      id: 2,
      title: 'DESTROZA ESTE DIARIO',
      price: 16500,
      image: 'images/libro4.jpg',
      quantity: 1,
    },
    {
      id: 3,
      title: 'ELON MUSK',
      price: 19000,
      image: 'images/libro3.jpg',
      quantity: 1,
    },
    {
      id: 4,
      title: 'DIBU PASION POR EL FUTBOL',
      price: 15500,
      image: 'images/libro2.jpg',
      quantity: 1,
    },
  ];


  const agregarAlCarrito = (producto) => {
    
    setBtnComprar(true); 
    setCartel(false); 
    
    // Buscar el índice del producto en el carrito, si existe
    const index = items.findIndex((item) => item.id === producto.id);
  
    if (index !== -1) {
      // Si el producto ya está en el carrito
      setItems(
        items.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 } // Incrementar la cantidad del producto
            : item
        )
      );
    } else {
      // Si el producto no está en el carrito, se agrega
      setItems([...items, { ...producto, quantity: 1 }]); // Agregar nuevo producto al carrito con cantidad 1
    }
  };
  
  
  const decrecer = (producto) => {
    // Buscar el producto repetido en el carrito
    const productrepeat = items.find((item) => item.id == producto.id);
  
    // Verificar si la cantidad del producto no es 1 para disminuir su cantidad en el carrito
    productrepeat.quantity != 1 &&
      setItems(
        items.map((item) =>
          item.id == producto.id
            ? { ...producto, quantity: productrepeat.quantity - 1 }
            : item
        )
      );
  };
  

  const calcularTotal = () => {
    // Se utiliza el método reduce en el array items para calcular el total
    const total = items.reduce(
      (acc, elemento) => acc + elemento.price * elemento.quantity,
      0
    );
    return total; // Devuelve el total calculado
  };
  

  const quitarDelCarrito = (producto) => {
    // Buscar el índice del producto en el carrito
    const index = items.findIndex((item) => item.id == producto.id);
     
    // Verificar si el producto existe en el carrito
    if (index != -1) {
      // Crear una copia del array 'items' para no mutar el estado directamente
      const newItems = [...items];
      newItems.splice(index, 1); // Eliminar el producto del array 'newItems'
  
      // Actualizar el estado del carrito con el nuevo array que no incluye el producto eliminado
      setItems(newItems);
    }
  };
  

  useEffect(() => {
    // Verificar si hay productos en el carrito
    if (items == 0) {
      setBtnComprar(false);
      setCartel(true);
    }
  }, [items]);

  //Función para borrar los productos del carrito
const borrarCarrito = () => {
    setItems([]);

}
//Función que simula el pago del carrito
  const mostrarPago = () => {
   
    Swal.fire({
      showCancelButton: true, 
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#3498DB",
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: "#148F77",
      html: `<h2>Informacion de Pago</h2>
      <p><b>Tarjeta de crédito:</b> VISA</p>
      <p><b>Número de tarjeta:</b> **** **** **** 4567</p>
      <p><b>Vto.:</b> 03/26</p>
      <p><b>Código de seguridad:</b> 123</p>
      <p><b>Titular de la tarjeta:</b> JUAN P DÍAZ<br>
      <h3>Total a pagar $${calcularTotal()}</h3>
      `,
  }).then(response => {
    if (response.isConfirmed) {
      Swal.fire('El pago se realizó con éxito', '¡Muchas gracias por su compra!','success');   
      borrarCarrito();       
    }        

});


};


  return (
    <>

      <div className="nav-container">
        <nav className="navbar">
          <h1 className="navbar-logo">Mercado Libro</h1>
        </nav>
      </div>

      {/* Encabezado "Productos" */}
      <h1 className="title-products">Productos</h1>
        {/* Contenedor para mostrar los productos */}
      <div className="container-cart-products">
         {/* Mapeo de la lista de productos */}
        {productos.map((producto) => (
          <div id="card-product" key={producto.id}>
            <ul>
              <li><img src={producto.image} alt={producto.title} /></li>
              <li><b>{producto.title}</b></li>
              <li><b>${producto.price}</b></li>
              <li><button className="btn-product" onClick={() => agregarAlCarrito(producto)}>
                  Comprar
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>

      {/* Encabezado "Carrito" */}
      <h1 className="title-cart">Carrito</h1>
     
     {/* Div para mostrar mensaje si el carrito está vacío */}
      <div className="carrito-style">
       
        {/* Muestra el mensaje si 'cartel' es verdadero */}
        {cartel && "El carrito se encuentra vacío"}
      </div>
     
      {/* Contenedor para mostrar los elementos del carrito */}
      <div className="container-cart">
       
        {/* Mapeo de los elementos en el carrito */}
        {items.map((item) => (
          <>
            <div id="card-cart" key={item.id}>
              <div className="container-items-cart">
                <div className="div1">{item.title}</div>
               
                {/* Mostrar precio total del producto basado en su cantidad */}
                <div className="div2">${item.price * item.quantity}</div>
                
                {/* Botones para decrementar y aumentar la cantidad del producto */}
                <div className="div3">
                  <button onClick={() => decrecer(item)}> - </button>
                  {item.quantity}
                  <button onClick={() => agregarAlCarrito(item)}> + </button>
                </div>
                
                {/* Botón para quitar completamente el producto del carrito */}
                <div className="div4">
                  <button className="btn-product-2" onClick={() => quitarDelCarrito(item)}>
                    Quitar
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      {/* Contenedor para mostrar el total a pagar y el botón de pago */}
      <div className="container-total-cart">
       
        {/* Muestra el total a pagar */}
        <h1 className="total-carrito">Total a pagar ${calcularTotal()} </h1>
       
       {/* Botón de pago que aparece si 'btnComprar' es verdadero */}
        <div>
          {btnComprar && (
            <button className="btn-buy" onClick={() => mostrarPago()}>
              Pagar
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ShopCart;
