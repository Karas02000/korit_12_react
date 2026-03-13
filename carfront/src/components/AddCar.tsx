import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { ChangeEvent, useState } from "react"
import { Car } from "../type"
import { addCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
                <DialogContent>
                    <input type="text" placeholder="제조사" name='brand' value={car.brand} onChange={handleChange} /><br />
                    <input type="text" placeholder="모델명" name='model' value={car.model} onChange={handleChange} /><br />
                    <input type="text" placeholder="색상" name='color' value={car.color} onChange={handleChange} /><br />
                    <input type="text" placeholder="차량번호" name='registrationNumber' value={car.registrationNumber} onChange={handleChange} /><br />
                    <input type="number" placeholder="연식" name='modelYear' value={car.modelYear} onChange={handleChange} /><br />
                    <input type="number" placeholder="가격" name='price' value={car.price} onChange={handleChange} /><br />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClickClose}>Cancle</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    )
}