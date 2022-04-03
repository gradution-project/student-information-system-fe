const getAll = [
    {
        enum: 'WAITING',
        tr: 'Onay Bekleniyor',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-yellow font-phenomenaBold text-lg text-sis-white ">Onay Bekleniyor</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-yellow font-phenomenaBold text-2xl text-sis-white ">Onay Bekleniyor</span>
    },
    {
        enum: 'APPROVED',
        tr: 'Onaylandı',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white ">Onaylandı</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-success font-phenomenaBold text-2xl text-sis-white ">Onaylandı</span>
    },
    {
        enum: 'REJECTED',
        tr: 'Onaylanmadı',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white ">Onaylanmadı</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-fail font-phenomenaBold text-2xl text-sis-white ">Onaylanmadı</span>
    }
]

const WAITING = 'WAITING';
const APPROVED = 'APPROVED';
const REJECTED = 'REJECTED';
const ALL = 'ALL';

const RegistrationStatus = {
    getAll,
    WAITING,
    APPROVED,
    REJECTED,
    ALL
};

export default RegistrationStatus;