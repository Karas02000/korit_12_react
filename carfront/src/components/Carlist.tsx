import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";

export default function Carlist() {
  const [ open, setOpen ] = useState(false);
  const queryClient = useQueryClient();

  const columns: GridColDef[] = [
    {field: 'brand', headerName: '제조사', width: 250, },
    {field: 'model', headerName: '모델명', width: 250, },
    {field: 'color', headerName: '색상', width: 200, },
    {field: 'registrationNumber', headerName: '차량 번호', width: 300, },
    {field: 'modelYear', headerName: '연식', width: 200, },
    {field: 'price', headerName: '가격', width: 200, },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button onClick={() => 
          {if(confirm(`${params.row.brand}의 ${params.row.color} ${params.row.model}을(를) 삭제하시겠습니까?`))
          {
            mutate(params.row._links.self.href)
          }}
        }>Delete</button>
      )
    }
  ]

  const { data, error, isSuccess } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars
  });

  const { mutate } = useMutation({
    mutationFn: deleteCar, // v5 객체 형태 문법
    onSuccess: () => {
      setOpen(true)
      // 삭제 성공 시 'cars' 쿼리를 무효화하여 목록을 자동 갱신합니다.
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      alert("삭제되었습니다.");
    },
    onError: (err) => {
      console.error(err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  });

  if(!isSuccess) {
    return <span>Loading ... ⏱️</span>
  }
  else if (error) {
    return <span>자동차 데이터를 가져오던 중 오류가 발생했습니다... 😂</span>
  }
  else {
    return(
      <>
        <AddCar />
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={row => row._links.self.href}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message='해당 차량 정보가 삭제되었습니다.'
        />
      </>
    );
  }
}

// import { useQuery } from "@tanstack/react-query";
// import { CarResponse } from "../types";
// import axios from 'axios';

// export default function Carlist() {
//   const getCars = async () : Promise<CarResponse[]> => {
//     const response = await axios.get('http://localhost:8080/api/vehicles');

//     return response.data._embedded.cars;
//   }

//   const { data, error, isSuccess } = useQuery({
//     queryKey: ['cars'],
//     queryFn: getCars
//   });

//   if(!isSuccess) {
//     return <span>Loading ... ⏱️</span>
//   }
//   else if (error) {
//     return <span>자동차 데이터를 가져오던 중 오류가 발생했습니다... 😂</span>
//   }
//   else {
//     return(
//       <table>
//         <tbody>
//           {
//             data.map((car: CarResponse) => 
//               <tr key={car._links.self.href}>
//                 <td>{car.brand}</td>
//                 <td>{car.model}</td>
//                 <td>{car.color}</td>
//                 <td>{car.registrationNumber}</td>
//                 <td>{car.modelYear}</td>
//                 <td>{car.price}</td>
//               </tr>
//             )
//           }
//         </tbody>
//       </table>
//     );
//   }
// }