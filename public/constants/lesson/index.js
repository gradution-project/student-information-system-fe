export const lessonSemesters = [
    {
        enum: 'FIRST',
        tr: '1. Dönem'
    },
    {
        enum: 'SECOND',
        tr: '2. Dönem'
    },
    {
        enum: 'THIRD',
        tr: '3. Dönem'
    },
    {
        enum: 'FOURTH',
        tr: '4. Dönem'
    },
    {
        enum: 'FIFTH',
        tr: '5. Dönem'
    },
    {
        enum: 'SIXTH',
        tr: '6. Dönem'
    },
    {
        value: 'SEVENTH',
        tr: '7. Dönem'
    },
    {
        enum: 'EIGHTH',
        tr: '8. Dönem'
    },
    {
        enum: 'NINTH',
        tr: '9. Dönem'
    },
    {
        enum: 'TENTH',
        tr: '10. Dönem'
    },
    {
        enum: 'ELEVENTH',
        tr: '11. Dönem'
    },
    {
        enum: 'TWELFTH',
        tr: '12. Dönem'
    },
]

export const lessonCompulsory = [
    {
        enum: 'COMPULSORY',
        tr: 'Zorunlu'
    },
    {
        enum: 'ELECTIVE',
        tr: 'Seçmeli'
    }
]

export const lessonStatuses = [
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
