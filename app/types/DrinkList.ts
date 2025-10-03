export interface Coffee {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

export const drinkList: Coffee[] = [
  {
    id: '1',
    name: 'AFRICANO',
    description: "black, if that's what you're into!",
    image: 'https://images.unsplash.com/photo-1630040995437-80b01c5dd52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NTkzOTI0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Hot Coffee',
  },
  {
    id: '2',
    name: 'FILIPINO',
    description: 'muggles call it "cappuccino"',
    image: 'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGJlYW5zfGVufDF8fHx8MTc1OTQ2OTA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Hot Coffee',
  },
  {
    id: '3',
    name: "COFFEE FOR CULTURED BEINGS",
    description: "Pour over, beans from a single origin farm, loved by nerds and engineers",
    image: 'https://images.unsplash.com/photo-1643909618082-d916d591c2a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwZm9hbSUyMGFydHxlbnwxfHx8fDE3NTk0ODk5Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Hot Coffee',
  },
  {
    id: '4',
    name: "HEBREW",
    description: "Aeropress, for the discerning drinker",
    image: 'https://images.unsplash.com/photo-1644764399224-f7d18b1e8d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwY29sZCUyMGJyZXd8ZW58MXx8fHwxNzU5Mzk4NjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Iced Coffee',
  },
];

// Type for coffee with customizations (for cart items)
export type CoffeeWithCustomization = Coffee & {
  customizationKey: string; // Unique key based on customizations
};

// Example categories
export const categories = ['All', 'Hot Coffee', 'Iced Coffee', 'Specialty'];
export type Category = typeof categories[number];
export const defaultCategory: Category = 'All';