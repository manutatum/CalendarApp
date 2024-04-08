import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";

//SweetAlert 2
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'
import { useCalendarStore, useUiStore } from "../../hooks";

export const useCalendar = () => {

    const { activeEvent, startSavingEvent } = useCalendarStore();

    const { toogleDateModal } = useUiStore();

    const [formSubmitted, setformSubmitted] = useState(false);

    const [formValues, setformValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    useEffect(() => {
        if(activeEvent !== null){
            setformValues({...activeEvent});
        }
    }, [activeEvent])


    const titleClass = useMemo(() => {

        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid';

    }, [formValues.title, formSubmitted]);

    const onInputChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onDateChange = (e, changing) => {
        setformValues({
            ...formValues,
            [changing]: e
        })
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        setformSubmitted(true);

        // Funcion para calcular la diferencia de tiempo(fecha final,fecha inicial)
        const diff = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(diff) || diff <= 0) {
            Swal.fire('Fechas Incorrectas', 'Revisa las fechas elegidas', 'error')
            return;
        }

        if (formValues.title.length <= 0) return;

        // TODO:
        await startSavingEvent( formValues );
        toogleDateModal();
        setformSubmitted(false);
    }

    return {
        formValues,
        formSubmitted,
        titleClass,
        onInputChange,
        onDateChange,
        onSubmit,
    };
}