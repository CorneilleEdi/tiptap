declare interface PromiseConstructor {
    allSettled(
        promises: Array<Promise<any>>,
    ): Promise<Array<{ status: 'fulfilled' | 'rejected'; value?: any; reason?: any }>>;
}
