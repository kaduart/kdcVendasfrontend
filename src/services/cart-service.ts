import { OrderDTO, OrderItemDTO } from "../models/order";
import * as cartRepository from '../localStorage/cartRepository';
import { Product } from '../models/product';
export function saveCart(cart: OrderDTO) {
    cartRepository.save(cart);
}

export function getCart(): OrderDTO {
    return cartRepository.getOrder();
}

export function addProduct(product: Product) {
    const cart = cartRepository.getOrder();

    const item = cart.items.find(item => item.productId === product.id);

    if (!item) {
        cart.items.push(new OrderItemDTO(product.id, 1, product.name, product.price, product.imgUrl));
        cartRepository.save(cart);
    }
}

export function clearCart() {
    cartRepository.clear();
}

export function increaseItem(productId: number) {
    const cart = cartRepository.getOrder();
    const item = cart.items.find(item => item.productId === productId);

    if (item) {
        item.quantity++;
        cartRepository.save(cart);
    }

}

export function decreaseItem(productId: number) {
    const cart = cartRepository.getOrder();
    const item = cart.items.find(item => item.productId === productId);

    if (item) {
        item.quantity--;

        if (item.quantity < 1) {
            cart.items = cart.items.filter(item => item.productId !== productId);
        }

        cartRepository.save(cart);
    }

}
