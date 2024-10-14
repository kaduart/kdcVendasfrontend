import { Category } from "../models/category";
import { Product } from "../models/product";
import notImg from '../assets/images/computer.png';
import macBookImg from '../assets/images/apple-macbook.png';
import macAllInOneImg from '../assets/images/apple-one-all-one.png';

export const ProductMock: Product[] = [
    {
        id: 1,
        name: "DELL DR",
        price: 5000,
        description:
            `
        DELL DR is
        Made with 50% recycled content, including:
        100% aluminum in the structure is recycled
        100% of the tin in the solder and 100% of the gold in the coating of various printed circuit boards are recycled
        100% of the rare earth metals in all magnets are recycled, which represents 99% of this material in the device
        100% of the cobalt in the bateria8 and MagSafe connector magnets is recycled
        100% of the copper on the main logic board is recycled, a novelty for DELL
    `,
        categories: [
            {
                id: 1,
                name: "Eletronics",
            },
            {
                id: 2,
                name: "Computes",
            }
        ] as Category[],
        imgUrl: notImg

    },
    {
        id: 1,
        name: "MAC Book",
        price: 12000,
        description:
            `
        13-inch MacBook Air with M3 chip
        Made with 50% recycled content, including:
        100% aluminum in the structure is recycled
        100% of the tin in the solder and 100% of the gold in the coating of various printed circuit boards are recycled
        100% of the rare earth metals in all magnets are recycled, which represents 99% of this material in the device
        100% of the cobalt in the bateria8 and MagSafe connector magnets is recycled
        100% of the copper on the main logic board is recycled, a novelty for Apple
    `,
        categories: [
            {
                id: 1,
                name: "Eletronics",
            },
            {
                id: 2,
                name: "Computes",
            }
        ] as Category[],
        imgUrl: macBookImg
    },
    {
        id: 1,
        name: "MAC All in One",
        price: 20000,
        description:
            `
        13-inch MacBook Air with M3 chip
        Made with 50% recycled content, including:
        100% aluminum in the structure is recycled
        100% of the tin in the solder and 100% of the gold in the coating of various printed circuit boards are recycled
        100% of the rare earth metals in all magnets are recycled, which represents 99% of this material in the device
        100% of the cobalt in the bateria8 and MagSafe connector magnets is recycled
        100% of the copper on the main logic board is recycled, a novelty for Apple
    `,
        categories: [
            {
                id: 1,
                name: "Eletronics",
            },
            {
                id: 2,
                name: "Computes",
            }
        ] as Category[],
        imgUrl: macAllInOneImg
    },
    {
        id: 1,
        name: "DELL DR",
        price: 5000,
        description:
            `
        DELL DR is
        Made with 50% recycled content, including:
        100% aluminum in the structure is recycled
        100% of the tin in the solder and 100% of the gold in the coating of various printed circuit boards are recycled
        100% of the rare earth metals in all magnets are recycled, which represents 99% of this material in the device
        100% of the cobalt in the bateria8 and MagSafe connector magnets is recycled
        100% of the copper on the main logic board is recycled, a novelty for DELL
    `,
        categories: [
            {
                id: 1,
                name: "Eletronics",
            },
            {
                id: 2,
                name: "Computes",
            }
        ] as Category[],
        imgUrl: notImg

    },
]