export async function normalApiConfig(apiUrl: string) {
    return {
        basePath: apiUrl,
        isJsonMime: () => true,
    };
}
