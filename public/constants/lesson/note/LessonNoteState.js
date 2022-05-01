const getAll = [
    {
        enum: 'NOT_ENTERED',
        tr: 'Not Girişi Yapılmadı',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-yellow font-phenomenaBold text-lg text-sis-white ">Sonuçlandırılmadı</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-yellow font-phenomenaBold text-2xl text-sis-white ">Sonuçlandırılmadı</span>
    },
    {
        enum: 'UNCONFIRMED',
        tr: 'Kesinleştirilmedi',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-yellow font-phenomenaBold text-lg text-sis-white ">Sonuçlandırılmadı</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-yellow font-phenomenaBold text-2xl text-sis-white ">Sonuçlandırılmadı</span>
    },
    {
        enum: 'CONFIRMED',
        tr: 'Kesinleştirildi',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white ">Geçti</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-success font-phenomenaBold text-2xl text-sis-white ">Geçti</span>
    }
]

const NOT_ENTERED = 'NOT_ENTERED';
const UNCONFIRMED = 'UNCONFIRMED';
const CONFIRMED = 'CONFIRMED';

const LessonNoteStatus = {
    getAll,
    NOT_ENTERED,
    UNCONFIRMED,
    CONFIRMED
};

export default LessonNoteStatus;