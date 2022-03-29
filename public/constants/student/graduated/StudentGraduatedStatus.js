const getAll = [
    {
        enum: 'WAITING',
        tr: 'Beklemede',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-yellow font-phenomenaBold text-lg text-sis-white ">Beklemede</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-yellow font-phenomenaBold text-2xl text-sis-white ">Beklemede</span>
    },
    {
        enum: 'APPROVED',
        tr: 'Kabul Edildi',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white ">Kabul Edildi</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-success font-phenomenaBold text-2xl text-sis-white ">Kabul Edildi</span>
    },
    {
        enum: 'CONFIRMED',
        tr: 'Onaylandı',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white ">Onaylandı</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-success font-phenomenaBold text-2xl text-sis-white ">Onaylandı</span>
    },
    {
        enum: 'REJECTED',
        tr: 'Red Edildi',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white ">Red Edildi</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-fail font-phenomenaBold text-2xl text-sis-white ">Red Edildi</span>
    },
    {
        enum: 'UNCONFIRMED',
        tr: 'Onaylanmadı',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white ">Onaylanmadı</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-fail font-phenomenaBold text-2xl text-sis-white ">Onaylanmadı</span>
    }
]

const WAITING = 'WAITING';
const APPROVED = 'APPROVED';
const CONFIRMED = 'CONFIRMED';
const REJECTED = 'REJECTED';
const UNCONFIRMED = 'UNCONFIRMED';
const ALL = 'ALL';

const StudentGraduatedStatus = {
    getAll,
    WAITING,
    APPROVED,
    CONFIRMED,
    REJECTED,
    UNCONFIRMED,
    ALL
};

export default StudentGraduatedStatus;