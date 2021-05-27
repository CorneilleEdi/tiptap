import MeiliSearch from 'meilisearch';
import { Inject, Injectable } from '@nestjs/common';
import { MEILISEARCH } from '../../utils/constants/providers.constant';

@Injectable()
export class MeiliSearchService {
    constructor(@Inject(MEILISEARCH) private meilisearchClient: MeiliSearch) {}

    async addDocuments(index: string, documents: any[]) {
        return await this.meilisearchClient.index(index).addDocuments(documents);
    }

    async updateDocuments(index: string, documents: any[]) {
        return await this.meilisearchClient.index(index).updateDocuments(documents);
    }

    async deleteDocuments(index: string, documents: string[]) {
        return await this.meilisearchClient.index(index).deleteDocuments(documents);
    }

    async deleteAllDocuments(index: string) {
        return await this.meilisearchClient.index(index).deleteAllDocuments();
    }

    async searchDocuments(index: string, key: string, filters = '') {
        if (filters) {
            return await this.meilisearchClient.index(index).search(key, { filters });
        } else {
            return await this.meilisearchClient.index(index).search(key);
        }
    }
}
