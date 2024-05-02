import React, { useEffect, useState } from 'react';
import "./Modal.scss";
import svgClose from '../../Assets/btnClose.svg';
import { Product } from '../../Models/Product';

interface ModalProps {
  closeModal: () => void;
  cartItems: Product[];
  deleteFromCart: (index: number) => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal, cartItems, deleteFromCart }) => {
  const [quantities, setQuantities] = useState<number[]>(Array(cartItems.length).fill(1));
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item, index) => {
      return acc + (parseFloat(item.price) * quantities[index]);
    }, 0);
    setTotalPrice(total);
  }, [cartItems, quantities]);

  const decreaseQuantity = (index: number) => {
    const currentQuantities = [...quantities];
    currentQuantities[index] = Math.max(1, quantities[index] - 1);
    setQuantities(currentQuantities);
  };

  const increaseQuantity = (index: number) => {
    const currentQuantities = [...quantities];
    currentQuantities[index] = quantities[index] + 1;
    setQuantities(currentQuantities);
  };

  const btnFinish = () => {
    closeModal();
  };

  return (
    <div className='modal-container'>
      <div className='modal-container__header'>
        <p className='modal-container__header-title'>Carrinho de Compras</p>

        <div>
          <img
            className='modal-container__header-btn-close'
            src={svgClose}
            alt="Botão de Fechar"
            onClick={closeModal}
          />
        </div>
      </div>

      {cartItems.map((item, index) => (
        <div className='modal-container__shopping-cart' key={index}>
          <img className='modal-container__shopping-cart__product-img' src={item.photo} alt="" />
          <div className='modal-container__shopping-cart__product-name'>{item.name}</div>
          <div className='modal-container__shopping-cart__product-quantify'>
            Qtd.
            <div className='modal-container__shopping-cart__product-quantify-border'>
              <div className='modal-container__shopping-cart__product-quantify-minus' onClick={() => decreaseQuantity(index)}>-</div>
              <div>| {quantities[index]} |</div>
              <div className='modal-container__shopping-cart__product-quantify-plus' onClick={() => increaseQuantity(index)}>+</div>
            </div>
          </div>
          <div className='modal-container__shopping-cart__product-price'>{item.price}</div>
          <img
            className='modal-container__shopping-cart__btn-close'
            src={svgClose}
            alt="Botão de Fechar"
            onClick={() => deleteFromCart(index)}
          />
        </div>
      ))}


      <div className='modal-container__total-price'>
        <div>Total:</div>
        <div>{totalPrice}</div>
      </div>

      <div className='modal-container__finish' onClick={btnFinish}>Finalizar Compra</div>
    </div>
  );
};

export default Modal;

