import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Snackbar, Container, Button } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

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
      field: 'edit',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (<EditCar cardata={params.row} />
      )
    },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <Button onClick={() => 
          {if(confirm(`${params.row.brand}의 ${params.row.color} ${params.row.model}을(를) 삭제하시겠습니까?`))
          {
            mutate(params.row._links.self.href)
          }}
        }>Delete</Button>
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
    return <Container>Loading ... ⏱️</Container>
  }
  else if (error) {
    return <Container>자동차 데이터를 가져오던 중 오류가 발생했습니다... 😂</Container>
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