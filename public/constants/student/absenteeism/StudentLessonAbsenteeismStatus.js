const getAll = [
    {
        enum: 'NOT_ENTERED',
        tr: 'Yoklama Girişi Yapılmamış',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-yellow font-phenomenaBold text-lg text-sis-white ">Yoklama Girişi Yapılmamış</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-yellow font-phenomenaBold text-2xl text-sis-white ">Yoklama Girişi Yapılmamış</span>
    },
    {
        enum: 'ENTERED',
        tr: 'Yoklama Girişi Yapılmış',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white ">Yoklama Girişi Yapılmış</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-success font-phenomenaBold text-2xl text-sis-white ">Yoklama Girişi Yapılmış</span>
    },
    {
        enum: 'FAILED',
        tr: 'Kaldı',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white ">Kaldı</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-fail font-phenomenaBold text-2xl text-sis-white ">Kaldı</span>
    }
]

const NOT_ENTERED = 'NOT_ENTERED';
const ENTERED = 'ENTERED';
const FAILED = 'FAILED';

const StudentLessonAbsenteeismStatus = {
    getAll,
    NOT_ENTERED,
    ENTERED,
    FAILED
};

export default StudentLessonAbsenteeismStatus;