interface Repo {
    id: number;
    login: string;
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks: number;
    html_url: string;
    created_at: string;
    updated_at: string;
}

function filterRepos(repos: Repo[], criteria: string) {
    let sortedRepos = [...repos];

    switch (criteria) {
        case 'last_created':
            sortedRepos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            break;
        case 'created_first':
            sortedRepos.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            break;
        case 'recent_update':
            sortedRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
            break;
        case 'less_update':
            sortedRepos.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
            break;
        case 'name':
            sortedRepos.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'stars':
            sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
            break;
        case 'forks':
            sortedRepos.sort((a, b) => b.forks - a.forks);
            break;
        default:
            break;
    }

    return sortedRepos;
}

export default filterRepos;
