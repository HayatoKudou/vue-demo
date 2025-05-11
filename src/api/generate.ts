import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

async function generateApi() {
  try {
    // OpenAPIの仕様から型定義を生成
    const types = execSync('npx openapi-typescript http://localhost:8081/v3/api-docs.yaml --output src/api/generated/types.ts').toString();
    console.log('型定義の生成が完了しました');

    // APIクライアントのベースコードを生成
    const clientCode = `
import { paths } from './types';

type ApiPaths = paths;

export class Api {
  private baseUrl = 'http://localhost:8081';

  async getGreeting(name?: string): Promise<ApiPaths['/greeting']['get']['responses']['200']['content']['*/*']> {
    const response = await fetch(\`\${this.baseUrl}/greeting\${name ? \`?name=\${name}\` : ''}\`);
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  }

  async getTodos(): Promise<ApiPaths['/api/v1/todos']['get']['responses']['200']['content']['application/json']> {
    const response = await fetch(\`\${this.baseUrl}/api/v1/todos\`);
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  }
}
`;

    writeFileSync('src/api/generated/client.ts', clientCode);
    console.log('APIクライアントの生成が完了しました');
  } catch (error) {
    console.error('APIクライアントの生成中にエラーが発生しました:', error);
  }
}

generateApi(); 