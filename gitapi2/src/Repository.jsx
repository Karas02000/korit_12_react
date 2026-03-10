import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Repositories() {
    const getRepositories = async () => {
        const response = await axios.get("https://api.github.com/search/repositories?q=korit_12");
        return response.data.items;
    }

    const { isLoading, isError, data } = useQuery({
        queryKey: ["repositories"],
        queryFn: getRepositories
    });

    if (isLoading) return <p>Loading...⏳</p>
    if (isError) return <p>Something went wrong...💣</p>
    else {
        return (
            <table>
                <tbody>
                    {
                        data.map(repo =>
                            <tr key={repo.id}>
                                <td>{repo.full_name}</td>
                                <td>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.id}의 리포지토리🔎
                                    </a>
                                </td>
                                <td>{repo.description}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        );
    }
}