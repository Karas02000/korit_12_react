//CarDialogContent.tsx
import { Car } from "../type";
import { DialogContent } from "@mui/material";

type DialogFormProps = {
    car: Car;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CarDialogContent( {car, handleChange} : DialogFormProps) {


    return(
        <>
            <DialogContent>
                <input type="text" placeholder="제조사" name='brand' value={car.brand} onChange={handleChange} /><br />
                <input type="text" placeholder="모델명" name='model' value={car.model} onChange={handleChange} /><br />
                <input type="text" placeholder="색상" name='color' value={car.color} onChange={handleChange} /><br />
                <input type="text" placeholder="차량번호" name='registrationNumber' value={car.registrationNumber} onChange={handleChange} /><br />
                <input type="number" placeholder="연식" name='modelYear' value={car.modelYear} onChange={handleChange} /><br />
                <input type="number" placeholder="가격" name='price' value={car.price} onChange={handleChange} /><br />
            </DialogContent>
        </>
    );
}