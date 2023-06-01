export class ProjectApi {
    private readonly baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async getPersons() {
        const response = await fetch(this.getUrl('/'))
        return await response.json()
    }

    async deletePerson(id: number) {
        const response = await fetch(this.getUrl('/'), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        })
        return await response.json()
    }

    private getUrl(path: string) {
        return `${this.baseUrl}${path}`
    }
}
