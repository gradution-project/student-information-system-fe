const getAll = [
    {
        enum: 'WAITING',
        tr: 'Onay Bekliyor',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-yellow font-phenomenaBold text-lg text-sis-white ">Onay Bekliyor</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-yellow font-phenomenaBold text-2xl text-sis-white ">Onay Bekliyor</span>
    },
    {
        enum: 'APPROVED',
        tr: 'Onaylandı',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white ">Onaylandı</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-success font-phenomenaBold text-2xl text-sis-white ">Onaylandı</span>
    },
    {
        enum: 'REJECTED',
        tr: 'Reddedildi',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white ">Reddedildi</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-fail font-phenomenaBold text-2xl text-sis-white ">Reddedildi</span>
    },
    {
        enum: 'CONFIRMED',
        tr: 'Kesinleştirildi',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white ">Kesinleştirildi</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-success font-phenomenaBold text-2xl text-sis-white ">Kesinleştirildi</span>
    },
    {
        enum: 'UNCONFIRMED',
        tr: 'Kesinleştirilmedi',
        miniComponent: <span className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white ">Kesinleştirilmedi</span>,
        component: <span className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-fail font-phenomenaBold text-2xl text-sis-white ">Kesinleştirilmedi</span>
    }
]

const WAITING = 'WAITING';
const APPROVED = 'APPROVED';
const REJECTED = 'REJECTED';
const CONFIRMED = 'CONFIRMED';
const UNCONFIRMED = 'UNCONFIRMED';
const ALL = 'ALL';

const StudentGraduationStatus = {
    getAll,
    WAITING,
    APPROVED,
    REJECTED,
    CONFIRMED,
    UNCONFIRMED,
    ALL
};

export default StudentGraduationStatus;