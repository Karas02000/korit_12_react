import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Snackbar, Container, Button, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Carlist() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const queryClient = useQueryClient();

  const columns: GridColDef[] = [
    { field: 'brand', headerName: '제조사', width: 250 },
    { field: 'model', headerName: '모델명', width: 250 },
    { field: 'color', headerName: '색상', width: 200 },
    { field: 'registrationNumber', headerName: '차량 번호', width: 300 },
    { field: 'modelYear', headerName: '연식', width: 200 },
    { field: 'price', headerName: '가격', width: 200 },
    {
      field: 'edit',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditCar cardata={params.row} />
    },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <Tooltip title="delete car">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              if (window.confirm(`${params.row.brand}의 ${params.row.color} ${params.row.model}을(를) 삭제하시겠습니까?`)) {
                mutate(params.row._links.self.href);
              }
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  const { data, error, isSuccess } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars
  });

  const { mutate } = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
    onError: (err) => {
      console.error(err);
      setOpen(true); // 오류 시에도 Snackbar 표시 (메시지 변경 가능)
    }
  });

  const handleDeleteConfirm = () => {
    if (selectedCar) {
      mutate(selectedCar._links.self.href);
      setDialogOpen(false);
      setSelectedCar(null);
    }
  };

  if (!isSuccess) {
    return <Container>Loading ... ⏱️</Container>;
  } else if (error) {
    return <Container>자동차 데이터를 가져오던 중 오류가 발생했습니다... 😂</Container>;
  } else {
    return (
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
          message={error ? "삭제 중 오류가 발생했습니다." : "해당 차량 정보가 삭제되었습니다."}
        />
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <DialogTitle>삭제 확인</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedCar ? `${selectedCar.brand}의 ${selectedCar.color} ${selectedCar.model}을(를) 삭제하시겠습니까?` : ""}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>취소</Button>
            <Button onClick={handleDeleteConfirm} color="error">삭제</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}