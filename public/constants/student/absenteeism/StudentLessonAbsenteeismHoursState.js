const getAll = [
    {
        enum: 'NOT_EXIST',
        tr: 'Ders Saati Bulunmuyor!',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white ">Ders Saati Bulunmuyor!</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-fail font-phenomenaBold text-2xl text-sis-white ">Ders Saati Bulunmuyor!</span>
    },
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
    }
]

const NOT_EXIST = 'NOT_EXIST';
const NOT_ENTERED = 'NOT_ENTERED';
const ENTERED = 'ENTERED';

const StudentLessonAbsenteeismHoursState = {
    getAll,
    NOT_EXIST,
    NOT_ENTERED,
    ENTERED
};

export default StudentLessonAbsenteeismHoursState;