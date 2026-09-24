import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';

@Injectable()
export class JsonService {
  async readData<T>(filePath: string): Promise<T[]> {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as T[];
  }

  async writeData<T>(filePath: string, data: T[]): Promise<void> {
    const text = JSON.stringify(data);
    await writeFile(filePath, text);
  }
}
