export class ParamParser {
    public static extractParams(url: string): { offset: string | null; limit: string | null } {
        const parsedUrl = new URL(url)
        const params = parsedUrl.searchParams

        const offset = params.get('offset')
        const limit = params.get('limit')

        return { offset, limit }
    }
}
