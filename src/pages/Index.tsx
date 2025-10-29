import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  material: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Коврики Premium EVA',
    material: 'EVA',
    price: 4500,
    image: 'https://cdn.poehali.dev/projects/f1561795-ee59-4f91-81ab-2a7893fd11fb/files/ad0772fe-c0bb-4356-8c3f-534501a39ecb.jpg',
    description: 'Водонепроницаемые коврики с рельефной поверхностью'
  },
  {
    id: 2,
    name: 'Коврики Eco Leather',
    material: 'Кожзам',
    price: 5500,
    image: 'https://cdn.poehali.dev/projects/f1561795-ee59-4f91-81ab-2a7893fd11fb/files/11f08fb9-517d-41c0-b2ba-bdaa25df907c.jpg',
    description: 'Премиальные коврики из экокожи с прошивкой'
  },
  {
    id: 3,
    name: 'Коврики Comfort Felt',
    material: 'Автовойлок',
    price: 3200,
    image: 'https://cdn.poehali.dev/projects/f1561795-ee59-4f91-81ab-2a7893fd11fb/files/b772d378-b921-4770-a1e0-d2dd30823286.jpg',
    description: 'Мягкие ворсовые коврики для комфорта'
  },
  {
    id: 4,
    name: 'Коврики Sport EVA',
    material: 'EVA',
    price: 4800,
    image: 'https://cdn.poehali.dev/projects/f1561795-ee59-4f91-81ab-2a7893fd11fb/files/ad0772fe-c0bb-4356-8c3f-534501a39ecb.jpg',
    description: 'Спортивная серия с усиленными бортами'
  },
  {
    id: 5,
    name: 'Коврики Lux Leather',
    material: 'Кожзам',
    price: 6200,
    image: 'https://cdn.poehali.dev/projects/f1561795-ee59-4f91-81ab-2a7893fd11fb/files/11f08fb9-517d-41c0-b2ba-bdaa25df907c.jpg',
    description: 'Люксовая серия с перфорацией'
  },
  {
    id: 6,
    name: 'Коврики Classic Felt',
    material: 'Автовойлок',
    price: 2800,
    image: 'https://cdn.poehali.dev/projects/f1561795-ee59-4f91-81ab-2a7893fd11fb/files/b772d378-b921-4770-a1e0-d2dd30823286.jpg',
    description: 'Классические ворсовые коврики'
  }
];

const reviews = [
  { id: 1, author: 'Алексей М.', rating: 5, text: 'Отличные коврики! EVA материал показал себя прекрасно зимой.' },
  { id: 2, author: 'Мария К.', rating: 5, text: 'Кожзам выглядит очень премиально, качество на высоте!' },
  { id: 3, author: 'Дмитрий П.', rating: 4, text: 'Автовойлок мягкий и приятный. Рекомендую!' }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.material === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <header className="bg-secondary/95 backdrop-blur-sm sticky top-0 z-50 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Icon name="Car" size={28} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AutoMats Premium</h1>
                <p className="text-sm text-white/70">Автоковрики премиум класса</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-white/90 hover:text-primary transition-colors">Каталог</a>
              <a href="#materials" className="text-white/90 hover:text-primary transition-colors">Материалы</a>
              <a href="#delivery" className="text-white/90 hover:text-primary transition-colors">Доставка</a>
              <a href="#reviews" className="text-white/90 hover:text-primary transition-colors">Отзывы</a>
              <a href="#contacts" className="text-white/90 hover:text-primary transition-colors">Контакты</a>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative border-primary/30 text-white hover:bg-primary hover:text-white">
                    <Icon name="ShoppingCart" size={20} />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                    <SheetDescription>
                      {cartCount > 0 ? `Товаров: ${cartCount}` : 'Корзина пуста'}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                  {cartCount > 0 && (
                    <div className="mt-8 space-y-4">
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Итого:</span>
                        <span className="text-primary">{cartTotal} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Премиальные автоковрики для вашего авто
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              EVA, кожзам, автовойлок — выберите идеальную защиту для салона
            </p>
            <Button size="lg" className="hover-scale">
              <Icon name="ArrowDown" size={20} className="mr-2" />
              Выбрать коврики
            </Button>
          </div>
        </div>
      </section>

      <section id="materials" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Материалы</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-scale">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <CardTitle>EVA материал</CardTitle>
                <CardDescription>Водонепроницаемый и прочный</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Идеален для защиты от грязи, воды и снега. Легко моется и служит долгие годы.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Star" size={24} className="text-primary" />
                </div>
                <CardTitle>Кожзам</CardTitle>
                <CardDescription>Премиальный внешний вид</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Экокожа придаёт салону роскошный вид. Прочная прошивка и стильный дизайн.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Heart" size={24} className="text-primary" />
                </div>
                <CardTitle>Автовойлок</CardTitle>
                <CardDescription>Мягкость и комфорт</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ворсовая поверхность создаёт уют. Отлично задерживает пыль и грязь.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Каталог</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="EVA">EVA</TabsTrigger>
              <TabsTrigger value="Кожзам">Кожзам</TabsTrigger>
              <TabsTrigger value="Автовойлок">Войлок</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="hover-scale overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      <Badge className="absolute top-2 right-2 bg-primary">{product.material}</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      <Button onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Доставка и оплата</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Icon name="Truck" size={32} className="text-primary mb-4" />
                <CardTitle>Доставка</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>🚚 По Москве — бесплатно при заказе от 5000 ₽</p>
                <p>📦 По России — СДЭК, Почта России</p>
                <p>⚡ Срок доставки — 2-7 дней</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="CreditCard" size={32} className="text-primary mb-4" />
                <CardTitle>Оплата</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>💳 Банковские карты (Visa, MasterCard, Mir)</p>
                <p>💰 Наличные при получении</p>
                <p>🔒 Безопасная оплата</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Отзывы</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map(review => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="User" size={20} className="text-primary" />
                    <CardTitle className="text-lg">{review.author}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Контакты</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={24} className="text-primary" />
              <span className="text-lg">+7 (495) 123-45-67</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Mail" size={24} className="text-primary" />
              <span className="text-lg">info@automats.ru</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={24} className="text-primary" />
              <span className="text-lg">Москва, ул. Автомобильная, 1</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary/50 border-t border-primary/20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 AutoMats Premium. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
