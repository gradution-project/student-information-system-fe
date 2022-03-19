const getAll = [
    {
        enum: 'ACTIVE',
        tr: 'Aktif',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white ">Aktif</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-success font-phenomenaBold text-2xl text-sis-white ">Aktif</span>
    },
    {
        enum: 'PASSIVE',
        tr: 'Pasif',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-yellow font-phenomenaBold text-lg text-sis-white ">Pasif</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-yellow font-phenomenaBold text-2xl text-sis-white ">Pasif</span>
    },
    {
        enum: 'DELETED',
        tr: 'Silinmiş',
        miniComponent: <span
            className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white ">Silinmiş</span>,
        component: <span
            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-fail font-phenomenaBold text-2xl text-sis-white ">Silinmiş</span>
    }
]

const ACTIVE = 'ACTIVE';
const PASSIVE = 'PASSIVE';
const DELETED = 'DELETED';
const ALL = 'ALL';

const DepartmentStatus = {
    getAll,
    ACTIVE,
    PASSIVE,
    DELETED,
    ALL
};

export default DepartmentStatus;