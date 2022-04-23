const getAll = [
    {
        enum: 'WAITING',
        tr: 'Onay Bekliyor',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-yellow font-phenomenaBold text-lg text-sis-white ">Onay Bekliyor</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-yellow font-phenomenaBold text-2xl text-sis-white ">Onay Bekliyor</span>
    },
    {
        enum: 'APPROVED',
        tr: 'Kesinleştirildi',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white ">Kesinleştirildi</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-success font-phenomenaBold text-2xl text-sis-white ">Kesinleştirildi</span>
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