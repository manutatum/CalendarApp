
// ** COMPONENTE DEL CUADRO DEL EVENTO **

export const CalendarEventBox = ({ event }) => {

    const { title, user } = event

    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name} </span>
        </>
    )
}
