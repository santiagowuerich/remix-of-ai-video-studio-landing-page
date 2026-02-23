import merchRemera from '@/assets/merch-remera.jpg';
import merchTotebag from '@/assets/merch-totebag.jpg';
import merchGorra from '@/assets/merch-gorra.jpg';
import merchLibreta from '@/assets/merch-libreta.jpg';
import merchPostales from '@/assets/merch-postales.jpg';
import merchTaza from '@/assets/merch-taza.jpg';

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  image: string;
  material: string;
  inspiration: string;
  sizes?: string[];
  colors?: string[];
  category: string;
}

export const products: Product[] = [
  {
    id: 'remera-unidad',
    name: 'Remera La Unidad',
    shortDescription: 'Algodón premium con diseño arquitectónico del museo',
    description: 'Remera de algodón 100% orgánico con serigrafía del perfil arquitectónico del edificio histórico. Cada prenda lleva un número de serie único.',
    price: 12000,
    image: merchRemera,
    material: 'Algodón orgánico 180g',
    inspiration: 'Inspirada en la fachada neoclásica del edificio penitenciario, construido en 1927.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Negro', 'Blanco'],
    category: 'Indumentaria',
  },
  {
    id: 'totebag-memoria',
    name: 'Bolsa de Tela "Memoria"',
    shortDescription: 'Tote bag de algodón crudo con tipografía del museo',
    description: 'Bolsa de tela resistente con impresión minimalista. Ideal para llevar la experiencia del museo a tu vida cotidiana.',
    price: 6500,
    image: merchTotebag,
    material: 'Algodón crudo 280g',
    inspiration: 'La tipografía utilizada reproduce los registros carcelarios originales.',
    category: 'Accesorios',
  },
  {
    id: 'gorra-unidad',
    name: 'Gorra Bordada',
    shortDescription: 'Gorra negra con logo bordado del museo',
    description: 'Gorra de alta calidad con bordado frontal del isologo del museo. Ajuste trasero metálico.',
    price: 8500,
    image: merchGorra,
    material: 'Gabardina reforzada',
    inspiration: 'El logo bordado sintetiza la arquitectura carcelaria en una forma geométrica pura.',
    colors: ['Negro', 'Gris oscuro'],
    category: 'Accesorios',
  },
  {
    id: 'libreta-archivo',
    name: 'Libreta "Archivo"',
    shortDescription: 'Cuaderno kraft con páginas de diseño archivístico',
    description: 'Libreta de 120 páginas con papel reciclado. Las páginas interiores reproducen texturas de documentos históricos del archivo penitenciario.',
    price: 4500,
    image: merchLibreta,
    material: 'Tapa kraft 300g, interior papel reciclado 90g',
    inspiration: 'Cada página interior lleva marcas sutiles inspiradas en los documentos originales del archivo.',
    category: 'Papelería',
  },
  {
    id: 'postales-arquitectura',
    name: 'Set de Postales',
    shortDescription: 'Serie de 6 ilustraciones arquitectónicas del edificio',
    description: 'Colección de 6 postales con ilustraciones originales del edificio histórico. Impresas en papel de alta calidad con acabado mate.',
    price: 3500,
    image: merchPostales,
    material: 'Papel ilustración 350g, acabado mate',
    inspiration: 'Cada postal captura un ángulo diferente del edificio, desde su fachada hasta los detalles interiores.',
    category: 'Papelería',
  },
  {
    id: 'taza-museo',
    name: 'Taza Cerámica',
    shortDescription: 'Taza de cerámica con diseño minimalista del museo',
    description: 'Taza de cerámica artesanal con el isologo del museo. Apta para lavavajillas y microondas.',
    price: 5000,
    image: merchTaza,
    material: 'Cerámica esmaltada',
    inspiration: 'El diseño minimalista del isologo representa la transformación del espacio carcelario en espacio cultural.',
    colors: ['Blanco', 'Negro'],
    category: 'Hogar',
  },
];

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price);
}
