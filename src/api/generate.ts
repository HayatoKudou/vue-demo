import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

async function generateApi() {
  try {
    // 出力ディレクトリの設定
    const outputDir = 'src/api/generated';
    
    // 出力ディレクトリが存在しない場合は作成
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    console.log('APIクライアントを生成中...');

    // npxを使ってopenapi-typescript-codegenを実行
    execSync(`npx openapi-typescript-codegen --input http://localhost:8081/v3/api-docs.yaml --output ${outputDir} --client fetch --useUnionTypes`);

    console.log('APIクライアントの生成が完了しました');
    
    // 念のため、型定義も生成しておく
    console.log('OpenAPI型定義を生成中...');
    execSync(`npx openapi-typescript http://localhost:8081/v3/api-docs.yaml --output ${outputDir}/types.ts`);
    console.log('型定義の生成が完了しました');
    
  } catch (error) {
    console.error('APIクライアントの生成中にエラーが発生しました:', error);
  }
}

generateApi(); 