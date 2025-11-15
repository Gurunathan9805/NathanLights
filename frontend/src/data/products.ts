interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
}

const productsData: Product[] = [
  {
    id: "1",
    name: "Aurora Table Lamp",
    category: "table",
    price: 4999,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    rating: 4.5,
    reviews: 23,
    description: "Elegant 3D printed table lamp with resin accents",
    inStock: true,
  },
  {
    id: "2",
    name: "Nordic Pendant Light",
    category: "pendant",
    price: 7999,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400",
    rating: 5,
    reviews: 45,
    description: "Modern pendant light with wooden finish",
    inStock: true,
  },
  {
    id: "3",
    name: "Minimalist Wall Sconce",
    category: "wall",
    price: 3499,
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400",
    rating: 4,
    reviews: 18,
    description: "Sleek wall-mounted lighting solution",
    inStock: true,
  },
  {
    id: "4",
    name: "LED Strip Kit",
    category: "led",
    price: 2999,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    rating: 4.5,
    reviews: 67,
    description: "Customizable RGB LED strip lighting",
    inStock: true,
  },
  {
    id: "5",
    name: "Garden Path Light",
    category: "outdoor",
    price: 5499,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400",
    rating: 4.5,
    reviews: 34,
    description: "Weather-resistant outdoor lighting",
    inStock: true,
  },
  {
    id: "6",
    name: "Crystal Chandelier",
    category: "pendant",
    price: 12999,
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400",
    rating: 5,
    reviews: 89,
    description: "Luxury resin crystal pendant",
    inStock: true,
  },
  {
    id: "7",
    name: "Desk Reading Lamp",
    category: "table",
    price: 3999,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=400",
    rating: 4,
    reviews: 56,
    description: "Adjustable reading lamp with USB port",
    inStock: false,
  },
  {
    id: "8",
    name: "Smart LED Bulb",
    category: "led",
    price: 1499,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
    rating: 4.5,
    reviews: 123,
    description: "WiFi-enabled smart bulb",
    inStock: true,
  },
];

export default productsData;
