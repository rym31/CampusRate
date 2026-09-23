import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile, writeFile } from 'node:fs/promises';

@Injectable()
export class JsonService {
    constructor(private configService: ConfigService) {}

    private getFilePath(): string {
        return this.configService.get<string>('DATA_FILE_PATH')!;
    }

    async readData<T>(): Promise<T[]> {
        const filePath = this.getFilePath();
        const content = await readFile(filePath, 'utf-8');
        return JSON.parse(content);
    }

    async writeData<T>(data: T[]): Promise<void> {
        const filePath = this.getFilePath();
        const text = JSON.stringify(data);
        await writeFile(filePath, text);
    }
}