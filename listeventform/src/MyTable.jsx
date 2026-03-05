export default function MyTable() {
    const data = [
        {id:1, brand:"BMW", model:"X5"},
        {id:2, brand:"Mercedes", model:"C200"},
        {id:3, brand:"Audi", model:"A4"},
    ]


    return (
        <>
            <table>
                <tbody>
                    
                    {
                        data.map(car => <tr key={car.id}>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </>
    )
}