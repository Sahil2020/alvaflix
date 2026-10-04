import 'reflect-metadata';
import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

type Title = {
  id: string;
  name: string;
  year: number;
  rating: string;
  duration: string;
  genre: string;
  synopsis: string;
  image: string;
  accent: string;
  featured?: boolean;
};

const titles: Title[] = [
  { id: 'the-last-light', name: 'The Last Light', year: 2025, rating: 'U/A 16+', duration: '2h 08m', genre: 'Sci-fi thriller', synopsis: 'When the stars begin to disappear, one radio astronomer discovers a signal that should not exist.', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=85', accent: '#283c69', featured: true },
  { id: 'wild-at-heart', name: 'Wild at Heart', year: 2024, rating: 'U/A 13+', duration: '1 Season', genre: 'Nature documentary', synopsis: 'A year in the lives of the remarkable animals rebuilding a wild corner of the world.', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=80', accent: '#48643c' },
  { id: 'blue-hour', name: 'Blue Hour', year: 2025, rating: 'U/A 16+', duration: '6 Episodes', genre: 'Mystery', synopsis: 'A coastal town keeps a secret that surfaces every time the fog rolls in.', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80', accent: '#34546a' },
  { id: 'the-long-way-home', name: 'The Long Way Home', year: 2023, rating: 'U/A 13+', duration: '1h 52m', genre: 'Adventure', synopsis: 'Two estranged siblings take the road trip their father always promised them.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80', accent: '#8c6848' },
  { id: 'after-the-rain', name: 'After the Rain', year: 2025, rating: 'U/A 13+', duration: '8 Episodes', genre: 'Drama', synopsis: 'A neighborhood comes together to rebuild, and finds a new beginning along the way.', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=80', accent: '#434166' },
  { id: 'deep-blue', name: 'Deep Blue', year: 2024, rating: 'U/A 7+', duration: '1h 34m', genre: 'Documentary', synopsis: 'A research crew follows the ocean’s oldest travelers across a changing sea.', image: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=1000&q=80', accent: '#23617a' },
  { id: 'city-of-small-things', name: 'City of Small Things', year: 2024, rating: 'U/A 13+', duration: '2 Seasons', genre: 'Comedy', synopsis: 'The everyday dramas of one apartment building turn out to be anything but ordinary.', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=80', accent: '#7b544d' },
  { id: 'northbound', name: 'Northbound', year: 2023, rating: 'U/A 16+', duration: '1h 48m', genre: 'Adventure', synopsis: 'A stranded climber and a local guide race the first winter storm down the mountain.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80', accent: '#424d64' },
];

@Controller()
class CatalogController {
  @Get('api/health') health() { return { status: 'ok', service: 'Alvaflix API' }; }

  @Get('api/titles') allTitles() { return titles; }
}

@Module({ controllers: [CatalogController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  await app.listen(Number(process.env.API_PORT) || 3001);
  console.log(`Alvaflix API is running on http://localhost:${Number(process.env.API_PORT) || 3001}`);
}

void bootstrap();
