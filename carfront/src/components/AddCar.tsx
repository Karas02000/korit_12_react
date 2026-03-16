import { Dialog, DialogActions, DialogTitle } from "@mui/material"
import { ChangeEvent, useState } from "react"
import { Car } from "../type"
import { addCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CarDialogContent from "./CarDialogContent";

export default function AddCar() {
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
        },
        onError: (err: unknown) => {console.log(err);}
    });




    const [ open, setOpen ] = useState(false);
    const [ car, setCar ] = useState<Car>({
        brand: (''),
        model: (''),
        color: (''),
        registrationNumber: (''),
        modelYear: (0),
        price: (0)
    })


    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => setOpen(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        if(car.brand==''&&car.model==''){
            alert('올바른 값을 입력하여 주세요.')
        } else {
            mutate(car);
        }
        setCar({
            brand: (''),
            model: (''),
            color: (''),
            registrationNumber: (''),
            modelYear: (0),
            price: (0)
        });
        handleClickClose
    }

    return(
        <>
            <button onClick={handleClickOpen}>New Car</button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>New Car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClickClose}>Cancle</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    )
}