import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// CarResponse 타입이 정의되어 있다고 가정합니다.
// interface CarResponse { ... }

function Carlist() {
    const getCars = async (): Promise<CarResponse[]> => {
        const response = await axios.get('http://localhost:8080/api/vehicles');
        return response.data._embedded.cars;
    };

    // 1. isSuccess 대신 isPending(로딩 중)과 isError(에러 발생)를 사용합니다.
    const { data, isPending, isError } = useQuery({
        queryKey: ['cars'],
        queryFn: getCars
    });

    // 2. 논리 순서 수정: 로딩 중인지 먼저 확인하고, 그다음 에러를 확인합니다.
    if (isPending) {
        return <span>Loading ... ⏱️</span>;
    } 
    
    if (isError) {
        return <span>자동차를 불러오는 데에 오류가 발생하였습니다.</span>;
    }

    // 3. data가 확실히 존재할 때 렌더링합니다.
    return (
        <table>
            <thead>
                <tr>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Registration</th>
                    <th>Year</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    // 4. 문법 수정: 매개변수에 소괄호()를 치고, 반환값에는 소괄호()를 사용해 return을 생략합니다.
                    data.map((car: CarResponse) => (
                        <tr key={car._links.self.href}>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.color}</td>
                            <td>{car.registrationNumber}</td>
                            <td>{car.modelYear}</td>
                            <td>{car.price}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default Carlist;