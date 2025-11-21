import wala from '../../Assets/wala.jpg'
import atom from '../../Assets/atom.webp'
import lakshmi from '../../Assets/lakshmi.jpeg'
import fp from '../../Assets/fp.jpeg'
import fountain from '../../Assets/fountain.jpeg'
import datafile from '../DataFile/DataFile'

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59,
    rating: 4.5,
    img: wala,
    type:'cat1'
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 129,
    rating: 4.8,
    img: atom,
    type:'cat1'
  },
  {
    id: 3,
    name: "Sneakers",
    price: 89,
    rating: 4.3,
    img: lakshmi,
    type:'cat1'
  },
  {
    id: 4,
    name: "Modern Backpack",
    price: 49,
    rating: 4.6,
    img: fp,
    type:'cat1'
  },
    {
    id: 5,
    name: "Modern Backpack",
    price: 49,
    rating: 4.6,
    img: fountain,
    type:'cat1'
  }
];


export default products;