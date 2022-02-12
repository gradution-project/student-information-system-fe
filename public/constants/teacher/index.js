export const teacherDegrees = [
    {
        enum: 'RESEARCH_ASSOCIATE',
        tr: 'Araştırma Görevlisi'
    },
    {
        enum: 'TEACHING_ASSOCIATE',
        tr: 'Öğretim Görevlisi'
    },
    {
        enum: 'ASSISTANT_PROFESSOR',
        tr: 'Doktora Öğretim Üyesi'
    },
    {
        enum: 'ASSOCIATE_PROFESSOR',
        tr: 'Doçent'
    },
    {
        enum: 'PROFESSOR',
        tr: 'Profesör'
    }
]

export const teacherRoles = [
    {
        enum: 'TEACHER',
        tr: 'Öğretmen'
    },
    {
        enum: 'ADVISOR',
        tr: 'Danışman Öğretmen'
    },
    {
        enum: 'HEAD_OF_DEPARTMENT',
        tr: 'Bölüm Başkanı'
    }
]

export const teacherStatuses = [
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
