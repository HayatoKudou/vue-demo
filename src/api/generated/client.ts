
import { paths } from './types';

type ApiPaths = paths;

export class Api {
  private baseUrl = 'http://localhost:8081';

  async getGreeting(name?: string): Promise<ApiPaths['/greeting']['get']['responses']['200']['content']['*/*']> {
    const response = await fetch(`${this.baseUrl}/greeting${name ? `?name=${name}` : ''}`);
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  }

  async getTodos(): Promise<ApiPaths['/api/v1/todos']['get']['responses']['200']['content']['application/json']> {
    const response = await fetch(`${this.baseUrl}/api/v1/todos`);
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  }
}
